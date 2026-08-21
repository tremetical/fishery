import type { JSX } from 'preact';
import { useState } from 'preact/hooks';
import type { Route } from '../lib/router';
import { navigate } from '../lib/router';
import { makeScenario, makeSpellItem, type CallScenario, type SpellItem } from '../lib/radiogen';
import { speak, stopSpeaking, canSpeak, recognitionAvailable, listenOnce } from '../lib/speech';
import { store, useStore } from '../lib/store';
import { confetti } from '../lib/confetti';
import { deckById } from '../content';
import { Rich } from '../components/rich';
import { IconSpeaker, IconMic } from '../components/icons';

export function RadioPage(props: { route: Route }): JSX.Element {
  const sub = props.route.parts[1];
  if (sub === 'spell') return <SpellDrill />;
  if (sub === 'calls') return <CallsDrill />;
  return <RadioHub />;
}

function RadioHub(): JSX.Element {
  useStore();
  const phonetic = deckById('phonetic')!;
  const phras = deckById('phraseology')!;
  const pc = store.deckCounts(phonetic);
  const rc = store.deckCounts(phras);

  return (
    <div class="stack">
      <h1 class="page-h">
        Radio trainer
        <span class="sub">
          The goal is your mouth, not your eyes — every drill wants to be
          answered out loud.
        </span>
      </h1>

      <button class="tile" onClick={() => navigate('radio/spell')}>
        <div class="tile-icon" style="background: var(--accent-soft)">
          <span class="emoji">🔤</span>
        </div>
        <div class="tile-body">
          <div class="tile-title">Spell it</div>
          <div class="tile-sub">
            Random tail numbers and PNW airport idents — say them phonetically
          </div>
        </div>
      </button>

      <button class="tile" onClick={() => navigate('radio/calls')}>
        <div class="tile-icon" style="background: var(--info-soft)">
          <span class="emoji">📡</span>
        </div>
        <div class="tile-body">
          <div class="tile-title">Calls & readbacks</div>
          <div class="tile-sub">
            Hear a clearance, say the readback. Call-ups and CTAF calls too
          </div>
        </div>
      </button>

      <div class="panel-title mt">Flashcard decks</div>

      <button class="tile" onClick={() => navigate('session/deck/phonetic')}>
        <div class="tile-body">
          <div class="tile-title">{phonetic.title}</div>
          <div class="tile-sub">{phonetic.description}</div>
        </div>
        <div class="tile-end">
          {pc.due > 0 && <span class="badge badge-due">{pc.due} due</span>}
          {pc.newCards > 0 && <span class="badge badge-new">{pc.newCards} new</span>}
        </div>
      </button>

      <button class="tile" onClick={() => navigate('session/deck/phraseology')}>
        <div class="tile-body">
          <div class="tile-title">{phras.title}</div>
          <div class="tile-sub">{phras.description}</div>
        </div>
        <div class="tile-end">
          {rc.due > 0 && <span class="badge badge-due">{rc.due} due</span>}
          {rc.newCards > 0 && <span class="badge badge-new">{rc.newCards} new</span>}
        </div>
      </button>

      <p class="tiny faint">
        Scenario details (frequencies, winds, ATIS letters) are generated
        practice data, not live information. Runway numbers are real.
      </p>
    </div>
  );
}

/* ---------- shared drill scaffolding ---------- */

function useDrillTally() {
  const [hit, setHit] = useState(0);
  const [miss, setMiss] = useState(0);
  return {
    hit,
    miss,
    done: hit + miss,
    addHit: () => setHit((n) => n + 1),
    addMiss: () => setMiss((n) => n + 1),
    reset: () => {
      setHit(0);
      setMiss(0);
    },
  };
}

/* Drills run as fixed-length ROUNDS (sized to the path's requirements),
 * not endless streams — a visible finish line, then an end screen with a
 * way out. Endless + no exit was the original sin here. */

function DrillShell(props: {
  title: string;
  round: number;
  tally: { hit: number; miss: number; done: number };
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  return (
    <div class="session">
      <div class="session-meta">
        <span>{props.title}</span>
        <span class="mono">
          {Math.min(props.tally.done + 1, props.round)}/{props.round} ·{' '}
          <span style="color: var(--accent)">{props.tally.hit}✓</span>{' '}
          <span style="color: var(--warning)">{props.tally.miss}✗</span>
        </span>
      </div>
      <div class="session-progress">
        <div style={`width: ${Math.round((props.tally.done / props.round) * 100)}%`} />
      </div>
      {props.children}
    </div>
  );
}

function RoundComplete(props: {
  title: string;
  tally: { hit: number; miss: number; done: number };
  onAgain: () => void;
  exitTo: string;
}): JSX.Element {
  const pct = props.tally.done > 0 ? Math.round((props.tally.hit / props.tally.done) * 100) : 0;
  return (
    <div class="stack">
      <div class="panel center" style="padding: 32px 16px">
        <div style="font-size: 44px">🎯</div>
        <div class="stat-num mt" style="font-size: 44px">{pct}%</div>
        <div class="stat-label mt">round complete — {props.title}</div>
        <p class="small dim mt">
          {props.tally.hit} nailed · {props.tally.miss} missed
        </p>
      </div>
      <button class="btn btn-primary btn-block btn-big" onClick={props.onAgain}>
        Another round
      </button>
      <button class="btn btn-block" onClick={() => navigate(props.exitTo)}>
        Done
      </button>
    </div>
  );
}

function MicCheck(props: { keywords: string[]; onHeard?: (t: string) => void }): JSX.Element | null {
  const [state, setState] = useState<'idle' | 'listening' | 'done'>('idle');
  const [heard, setHeard] = useState<string | null>(null);

  if (!recognitionAvailable()) return null;

  const start = async () => {
    setState('listening');
    stopSpeaking();
    const { result } = listenOnce(9000);
    const text = await result;
    setHeard(text);
    setState('done');
    if (text) props.onHeard?.(text);
  };

  const matched =
    heard === null
      ? []
      : props.keywords.filter((k) => heard.toLowerCase().includes(k.toLowerCase()));

  return (
    <div class="panel mt" style="padding: 10px 12px">
      {state === 'idle' && (
        <button class="btn btn-block" onClick={() => void start()}>
          <IconMic /> Check me — say it to the mic
        </button>
      )}
      {state === 'listening' && (
        <div class="center small dim" style="min-height: var(--tap); display:flex; align-items:center; justify-content:center">
          Listening… speak your call now
        </div>
      )}
      {state === 'done' && (
        <div class="small">
          {heard ? (
            <>
              <div class="dim">
                Heard: <i>“{heard}”</i>
              </div>
              <div class="mt tiny">
                {props.keywords.map((k) => (
                  <span
                    key={k}
                    class={`badge ${matched.includes(k) ? 'badge-due' : 'badge-leech'}`}
                    style="margin: 0 4px 4px 0"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <span class="dim">Couldn’t hear that — no signal needed for the drill, self-grade instead.</span>
          )}
          <button class="btn btn-quiet mt" onClick={() => { setState('idle'); setHeard(null); }}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function SelfGrade(props: { onMiss: () => void; onHit: () => void }): JSX.Element {
  return (
    <div class="gradebar" style="grid-template-columns: 1fr 1fr">
      <button class="gradebtn grade-0" onClick={props.onMiss}>
        Missed it
      </button>
      <button class="gradebtn grade-2" onClick={props.onHit}>
        Nailed it
      </button>
    </div>
  );
}

/* ---------- Spell-it drill ---------- */

const SPELL_ROUND = 10;

function SpellDrill(): JSX.Element {
  const [item, setItem] = useState<SpellItem>(() => makeSpellItem());
  const [revealed, setRevealed] = useState(false);
  const tally = useDrillTally();
  const tts = canSpeak() && store.settings.ttsEnabled;

  const next = (wasLast: boolean) => {
    stopSpeaking();
    if (wasLast) confetti();
    setItem(makeSpellItem());
    setRevealed(false);
  };

  if (tally.done >= SPELL_ROUND) {
    return (
      <RoundComplete
        title="spell it"
        tally={tally}
        onAgain={() => {
          tally.reset();
          setItem(makeSpellItem());
          setRevealed(false);
        }}
        exitTo="radio"
      />
    );
  }

  return (
    <DrillShell title="Spell it" round={SPELL_ROUND} tally={tally}>
      <div class="session-card-area">
        <div class="flashcard">
          <div class="tiny dim" style="letter-spacing: 0.08em; text-transform: uppercase">
            {item.label}
          </div>
          <div class="mono center" style="font-size: 44px; font-weight: 700; padding: 30px 0; letter-spacing: 0.06em">
            {item.display}
          </div>

          {!revealed && (
            <button class="flashcard-cover" onClick={() => setRevealed(true)}>
              <div class="badge badge-neutral">SAY IT OUT LOUD, THEN</div>
              <div class="flashcard-cover-hint">Tap to reveal</div>
            </button>
          )}

          {revealed && (
            <div class="flashcard-answer">
              <div class="flashcard-back">
                <span>{item.answer}</span>
                {tts && (
                  <button class="iconbtn" aria-label="Speak answer" onClick={() => void speak(item.answer, store.settings.ttsRate)}>
                    <IconSpeaker />
                  </button>
                )}
              </div>
              {item.note && <div class="flashcard-why">{item.note}</div>}
            </div>
          )}
        </div>

        {!revealed && (
          <MicCheck keywords={item.answer.split(' ')} />
        )}
      </div>

      <div class="session-actions">
        {revealed ? (
          <SelfGrade
            onMiss={() => { void store.bumpDrill('spell'); tally.addMiss(); next(tally.done + 1 >= SPELL_ROUND); }}
            onHit={() => { void store.bumpDrill('spell'); tally.addHit(); next(tally.done + 1 >= SPELL_ROUND); }}
          />
        ) : (
          <button class="reveal-btn" onClick={() => setRevealed(true)}>
            REVEAL
          </button>
        )}
      </div>
    </DrillShell>
  );
}

/* ---------- Calls & readbacks drill ---------- */

const CALLS_ROUND = 6;

function CallsDrill(): JSX.Element {
  const [sc, setSc] = useState<CallScenario>(() => makeScenario());
  const [revealed, setRevealed] = useState(false);
  const tally = useDrillTally();
  const tts = canSpeak() && store.settings.ttsEnabled;

  const next = (wasLast: boolean) => {
    stopSpeaking();
    if (wasLast) confetti();
    setSc(makeScenario());
    setRevealed(false);
  };

  if (tally.done >= CALLS_ROUND) {
    return (
      <RoundComplete
        title="calls & readbacks"
        tally={tally}
        onAgain={() => {
          tally.reset();
          setSc(makeScenario());
          setRevealed(false);
        }}
        exitTo="radio"
      />
    );
  }

  return (
    <DrillShell title="Calls & readbacks" round={CALLS_ROUND} tally={tally}>
      <div class="session-card-area">
        <div class="flashcard">
          <div class="tiny" style="letter-spacing: 0.08em; text-transform: uppercase; color: var(--info)">
            {sc.kind}
          </div>
          <div class="flashcard-front mt" style="font-size: 17px">
            <Rich text={sc.prompt} />
          </div>

          {sc.promptSpeak && tts && (
            <button class="btn mt" onClick={() => void speak(sc.promptSpeak!, store.settings.ttsRate)}>
              <IconSpeaker /> Hear the call
            </button>
          )}

          {!revealed && (
            <button class="flashcard-cover" onClick={() => setRevealed(true)}>
              <div class="badge badge-neutral">KEY UP — SAY YOUR CALL, THEN</div>
              <div class="flashcard-cover-hint">Tap to reveal</div>
            </button>
          )}

          {revealed && (
            <div class="flashcard-answer">
              <div class="flashcard-back" style="font-size: 16.5px">
                <Rich text={sc.expected} />
                {tts && (
                  <button class="iconbtn" aria-label="Speak expected call" onClick={() => void speak(sc.expectedSpeak, store.settings.ttsRate)}>
                    <IconSpeaker />
                  </button>
                )}
              </div>
              <div class="flashcard-why">{sc.note}</div>
            </div>
          )}
        </div>

        {!revealed && <MicCheck keywords={sc.keywords} />}
      </div>

      <div class="session-actions">
        {revealed ? (
          <SelfGrade
            onMiss={() => { void store.bumpDrill('calls'); tally.addMiss(); next(tally.done + 1 >= CALLS_ROUND); }}
            onHit={() => { void store.bumpDrill('calls'); tally.addHit(); next(tally.done + 1 >= CALLS_ROUND); }}
          />
        ) : (
          <button class="reveal-btn" onClick={() => setRevealed(true)}>
            REVEAL
          </button>
        )}
      </div>
    </DrillShell>
  );
}
