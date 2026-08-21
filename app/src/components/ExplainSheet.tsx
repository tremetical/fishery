import type { JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import {
  claudeWebUrl,
  getAiKey,
  streamExplain,
  type ChatMessage,
  type ExplainContext,
} from '../lib/ai';
import { navigate } from '../lib/router';
import { Rich } from './rich';

/**
 * "Explain" — an AI tutor sheet anchored to whatever the student is
 * looking at. With an API key: in-app streaming chat. Without: a one-tap
 * handoff to claude.ai with the material prefilled.
 */
export function ExplainButton(props: { context: ExplainContext }): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button class="explain-btn" onClick={() => setOpen(true)}>
        ✨ Explain
      </button>
      {open && <Sheet context={props.context} onClose={() => setOpen(false)} />}
    </>
  );
}

const STARTERS = [
  'Break this down piece by piece',
  'Give me a concrete example',
  'Why does this matter in real flying?',
];

function Sheet(props: { context: ExplainContext; onClose: () => void }): JSX.Element {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void getAiKey().then((k) => setHasKey(!!k));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [msgs]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setError(null);
    setDraft('');
    const history: ChatMessage[] = [...msgs, { role: 'user', text: question }];
    setMsgs([...history, { role: 'assistant', text: '…' }]);
    setBusy(true);
    try {
      const reply = await streamExplain(props.context, history, (partial) =>
        setMsgs([...history, { role: 'assistant', text: partial }]),
      );
      setMsgs([...history, { role: 'assistant', text: reply }]);
    } catch (e) {
      setMsgs(history);
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div class="sheet-backdrop" onClick={props.onClose}>
      <div class="sheet" onClick={(e) => e.stopPropagation()}>
        <div class="sheet-header">
          <div>
            <div class="tile-title">Tutor</div>
            <div class="tiny dim">{props.context.label}</div>
          </div>
          <button class="iconbtn" aria-label="Close" onClick={props.onClose}>
            ✕
          </button>
        </div>

        {hasKey === null ? (
          <div class="panel center dim small" style="margin: 12px">
            …
          </div>
        ) : hasKey ? (
          <>
            <div class="sheet-scroll" ref={scrollRef}>
              {msgs.length === 0 && (
                <div class="stack" style="padding: 4px 0">
                  <p class="small dim">
                    Ask anything about what's on screen — or start with:
                  </p>
                  {STARTERS.map((s) => (
                    <button key={s} class="tile" style="min-height: 48px; padding: 10px 14px" onClick={() => void send(s)}>
                      <span class="small">{s}</span>
                    </button>
                  ))}
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i} class={`bubble bubble-${m.role}`}>
                  <Rich text={m.text} />
                </div>
              ))}
              {error && (
                <p class="small" style="color: var(--warning)">
                  {error}
                </p>
              )}
            </div>
            <div class="sheet-input">
              <input
                type="text"
                placeholder="Ask the tutor…"
                value={draft}
                onInput={(e) => setDraft((e.target as HTMLInputElement).value)}
                onKeyDown={(e) => e.key === 'Enter' && void send(draft)}
              />
              <button class="btn btn-primary" disabled={busy || !draft.trim()} onClick={() => void send(draft)}>
                {busy ? '…' : 'Send'}
              </button>
            </div>
            <p class="tiny faint" style="padding: 0 14px 10px">
              AI answers can be wrong — the FAR/AIM and your CFI are the
              authorities.
            </p>
          </>
        ) : (
          <div class="stack" style="padding: 14px">
            <a
              class="btn btn-primary btn-block btn-big"
              href={claudeWebUrl(props.context)}
              target="_blank"
              rel="noopener"
            >
              Ask Claude about this
            </a>
            <p class="small dim">
              Opens Claude (app or web) with this material prefilled — use
              your regular free Claude account and ask anything.
            </p>
            <button
              class="btn btn-quiet btn-block"
              onClick={() => {
                props.onClose();
                navigate('settings');
              }}
            >
              Or add an API key in Settings for chat right here
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
