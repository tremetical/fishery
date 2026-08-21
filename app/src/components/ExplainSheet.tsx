import type { JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import {
  claudeWebUrl,
  getAiKey,
  getAiProject,
  handoffText,
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

/** Clipboard API where available, legacy execCommand where it is not. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const okCopy = document.execCommand('copy');
    document.body.removeChild(ta);
    return okCopy;
  } catch {
    return false;
  }
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
  const [project, setProject] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void getAiKey().then((k) => setHasKey(!!k));
    void getAiProject().then(setProject);
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
            {/*
              Copy first, open second. The ?q= prefill is undocumented and
              does not survive the jump into the Claude iOS app, so relying
              on it left people staring at an empty prompt box. Two explicit
              taps always work, and the copy happens on its own tap so no
              navigation can cancel it.
            */}
            <div class="handoff-preview" aria-label="Question to send">
              {handoffText(props.context)}
            </div>
            <button
              class={`btn btn-block btn-big ${copied ? 'btn-quiet' : 'btn-primary'}`}
              onClick={() => void copyText(handoffText(props.context)).then(setCopied)}
            >
              {copied ? '✓ Copied' : '1 · Copy this question'}
            </button>
            <a
              class={`btn btn-block btn-big ${copied ? 'btn-primary' : ''}`}
              href={claudeWebUrl(props.context, project)}
              target="_blank"
              rel="noopener"
            >
              2 · Open Claude, then paste
            </a>
            <p class="small dim">
              {project
                ? 'Opens your pinned project, so everything you ask stays in one conversation.'
                : 'Opens Claude on your own account — the question includes this card plus what you keep getting wrong.'}
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
