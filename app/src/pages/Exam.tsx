import type { JSX } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import type { Route } from '../lib/router';
import { navigate } from '../lib/router';
import { QUESTIONS, questionById, type ExamQuestion } from '../content/exam';
import { SUBJECTS, subjectById } from '../content';
import { store, useStore, type ExamResult } from '../lib/store';
import { idb } from '../lib/db';
import { confetti } from '../lib/confetti';
import { Rich } from '../components/rich';
import { Figure } from '../components/figures';

const SIM_COUNT = 60;
const SIM_SECONDS = 2.5 * 3600;
const PASS_PCT = 70;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Persisted mid-exam state: a 2.5-hour session must survive an app kill. */
interface SimState {
  qIds: string[];
  /** per-question permutation of choice display order */
  perms: number[][];
  answers: (number | null)[]; // indexes into the ORIGINAL choices
  idx: number;
  endsAt: number;
}

export function ExamPage(props: { route: Route }): JSX.Element {
  const sub = props.route.parts[1];
  if (sub === 'practice') return <Practice />;
  if (sub === 'sim') return <Sim />;
  return <ExamHub />;
}

/* ---------------- hub ---------------- */

function ExamHub(): JSX.Element {
  useStore();
  const [pendingSim, setPendingSim] = useState(false);
  useEffect(() => {
    void idb.get<SimState>('kv', 'simState').then((s) => setPendingSim(!!s));
  }, []);

  const sims = store.exams.filter((e) => e.mode === 'sim');
  const last = sims[sims.length - 1];

  return (
    <div class="stack">
      <h1 class="page-h">
        Written exam
        <span class="sub">
          {QUESTIONS.length} questions in the bank · pass is {PASS_PCT}% on the real thing
        </span>
      </h1>

      <button class="tile" onClick={() => navigate('exam/practice')}>
        <div class="tile-icon" style="background: var(--accent-soft)">
          <span class="emoji">🎯</span>
        </div>
        <div class="tile-body">
          <div class="tile-title">Practice</div>
          <div class="tile-sub">
            Instant feedback with the why and the regulation, one question at a time
          </div>
        </div>
      </button>

      <button class="tile" onClick={() => navigate('exam/sim')}>
        <div class="tile-icon" style="background: var(--warning-soft)">
          <span class="emoji">⏱️</span>
        </div>
        <div class="tile-body">
          <div class="tile-title">{pendingSim ? 'Resume simulation' : 'Timed simulation'}</div>
          <div class="tile-sub">
            {SIM_COUNT} questions · 2 h 30 m · no feedback until you finish, like the real exam
          </div>
        </div>
        {pendingSim && <span class="badge badge-learning">IN PROGRESS</span>}
      </button>

      {last && (
        <div class="panel">
          <div class="panel-title">Last simulation</div>
          <div class="rowline">
            <span class="stat-num" style={`color: var(${pct(last) >= PASS_PCT ? '--accent' : '--warning'})`}>
              {pct(last)}%
            </span>
            <span class="small dim">
              {last.correct}/{last.total} · {new Date(last.ts).toLocaleDateString()} ·{' '}
              {pct(last) >= PASS_PCT ? 'PASS' : 'NOT YET'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function pct(r: ExamResult): number {
  return Math.round((r.correct / r.total) * 100);
}

/* ---------------- practice ---------------- */

function Practice(): JSX.Element {
  const [area, setArea] = useState<string>('all');
  const pool = useMemo(
    () => shuffle(QUESTIONS.filter((q) => area === 'all' || q.area === area)),
    [area],
  );
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [tally, setTally] = useState({ hit: 0, miss: 0 });
  const [missed, setMissed] = useState<string[]>([]);

  const q = pool[i % pool.length];
  const perm = useMemo(() => shuffle([0, 1, 2]), [q?.id]);

  const areasPresent = SUBJECTS.filter((s) => QUESTIONS.some((q2) => q2.area === s.id));

  const finish = async () => {
    const total = tally.hit + tally.miss;
    if (total > 0) {
      await store.addExamResult({
        ts: Date.now(),
        mode: 'practice',
        total,
        correct: tally.hit,
        seconds: 0,
        areas: {},
        missedIds: missed,
      });
    }
    navigate('exam');
  };

  if (!q) return <div class="panel">No questions in this area yet.</div>;

  return (
    <div class="session">
      <div class="session-meta">
        <span>Practice</span>
        <span class="mono">
          <span style="color: var(--accent)">{tally.hit}✓</span>{' '}
          <span style="color: var(--warning)">{tally.miss}✗</span>
        </span>
      </div>

      <div style="overflow-x: auto; margin-bottom: 10px">
        <div style="display: flex; gap: 6px; width: max-content">
          <button
            class={`badge ${area === 'all' ? 'badge-due' : 'badge-neutral'}`}
            style="min-height: 36px; padding: 0 12px"
            onClick={() => { setArea('all'); setI(0); setPicked(null); }}
          >
            All
          </button>
          {areasPresent.map((s) => (
            <button
              key={s.id}
              class={`badge ${area === s.id ? 'badge-due' : 'badge-neutral'}`}
              style="min-height: 36px; padding: 0 12px"
              onClick={() => { setArea(s.id); setI(0); setPicked(null); }}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div class="session-card-area">
        <QuestionCard
          q={q}
          perm={perm}
          picked={picked}
          showFeedback={picked !== null}
          onPick={(orig) => {
            if (picked !== null) return;
            setPicked(orig);
            if (orig === q.answer) setTally((t) => ({ ...t, hit: t.hit + 1 }));
            else {
              setTally((t) => ({ ...t, miss: t.miss + 1 }));
              setMissed((m) => [...m, q.id]);
            }
          }}
        />
      </div>

      <div class="session-actions">
        {picked !== null ? (
          <button
            class="reveal-btn"
            onClick={() => { setI((n) => n + 1); setPicked(null); }}
          >
            NEXT QUESTION
          </button>
        ) : (
          <button class="btn btn-quiet btn-block" onClick={() => void finish()}>
            End practice
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- shared question card ---------------- */

function QuestionCard(props: {
  q: ExamQuestion;
  perm: number[];
  picked: number | null;
  showFeedback: boolean;
  onPick: (originalIndex: number) => void;
}): JSX.Element {
  const { q, perm, picked, showFeedback, onPick } = props;
  const subject = subjectById(q.area);

  return (
    <div class="flashcard" style="min-height: 0">
      <div class="tiny dim" style="letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 8px">
        {subject?.title ?? q.area}
      </div>
      <div style="font-size: 17px; font-weight: 700; line-height: 1.4">
        <Rich text={q.q} />
      </div>

      {q.figure && <Figure id={q.figure} />}

      <div class="stack mt">
        {perm.map((orig, displayIdx) => {
          const isPicked = picked === orig;
          const isCorrect = orig === q.answer;
          let style = '';
          if (showFeedback) {
            if (isCorrect) style = 'border-color: var(--accent); background: var(--accent-soft)';
            else if (isPicked) style = 'border-color: var(--warning); background: var(--warning-soft)';
            else style = 'opacity: 0.55';
          }
          return (
            <button
              key={orig}
              class="choice-btn"
              style={style}
              disabled={showFeedback}
              onClick={() => onPick(orig)}
            >
              <span class="mono dim" style="margin-right: 8px">
                {String.fromCharCode(65 + displayIdx)}
              </span>
              {q.choices[orig]}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div class="flashcard-answer">
          <div class="small">
            <Rich text={q.why} />
          </div>
          {(q.cite || q.unverified) && (
            <div class="flashcard-cite">
              {q.cite && <span class="mono">{q.cite}</span>}
              {q.unverified && <span class="badge badge-leech">UNVERIFIED</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- simulation ---------------- */

function Sim(): JSX.Element {
  const [state, setState] = useState<SimState | null | 'loading'>('loading');
  const [result, setResult] = useState<ExamResult | null>(null);
  const [, setTick] = useState(0);

  // load or create
  useEffect(() => {
    void idb.get<SimState>('kv', 'simState').then((saved) => {
      if (saved && saved.qIds.length > 0) setState(saved);
      else setState(newSim());
    });
  }, []);

  // clock
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  if (state === 'loading') return <div class="panel">Loading…</div>;

  if (result) return <SimResults result={result} />;

  if (!state) return <div class="panel">Something went wrong.</div>;

  const remaining = Math.max(0, Math.floor((state.endsAt - Date.now()) / 1000));
  const q = questionById(state.qIds[state.idx])!;
  const perm = state.perms[state.idx];
  const answered = state.answers.filter((a) => a !== null).length;

  const save = (s: SimState) => {
    setState(s);
    void idb.put('kv', s, 'simState');
  };

  const submit = async () => {
    const areas: ExamResult['areas'] = {};
    const missedIds: string[] = [];
    let correct = 0;
    state.qIds.forEach((id, i) => {
      const qq = questionById(id)!;
      const a = (areas[qq.area] ??= { correct: 0, total: 0 });
      a.total++;
      if (state.answers[i] === qq.answer) {
        correct++;
        a.correct++;
      } else {
        missedIds.push(id);
      }
    });
    const r: ExamResult = {
      ts: Date.now(),
      mode: 'sim',
      total: state.qIds.length,
      correct,
      seconds: SIM_SECONDS - remaining,
      areas,
      missedIds,
    };
    await store.addExamResult(r);
    await idb.del('kv', 'simState');
    if (correct / state.qIds.length >= PASS_PCT / 100) confetti();
    setResult(r);
  };

  if (remaining === 0) {
    void submit();
    return <div class="panel">Time — scoring…</div>;
  }

  return (
    <div class="session">
      <div class="session-meta">
        <span class="mono" style={remaining < 600 ? 'color: var(--warning); font-weight: 700' : ''}>
          {fmtClock(remaining)}
        </span>
        <span class="mono">
          {state.idx + 1}/{state.qIds.length} · {answered} answered
        </span>
      </div>
      <div class="session-progress">
        <div style={`width: ${Math.round((answered / state.qIds.length) * 100)}%`} />
      </div>

      <div class="session-card-area">
        <QuestionCard
          q={q}
          perm={perm}
          picked={state.answers[state.idx]}
          showFeedback={false}
          onPick={(orig) =>
            save({
              ...state,
              answers: state.answers.map((a, i) => (i === state.idx ? orig : a)),
            })
          }
        />
      </div>

      <div class="session-actions">
        <div class="gradebar" style="grid-template-columns: 1fr 1fr">
          <button
            class="gradebtn"
            disabled={state.idx === 0}
            onClick={() => save({ ...state, idx: state.idx - 1 })}
          >
            ← Back
          </button>
          {state.idx + 1 < state.qIds.length ? (
            <button class="gradebtn grade-2" onClick={() => save({ ...state, idx: state.idx + 1 })}>
              Next →
            </button>
          ) : (
            <button
              class="gradebtn grade-3"
              onClick={() => {
                const blank = state.answers.filter((a) => a === null).length;
                if (
                  blank === 0 ||
                  window.confirm(`${blank} unanswered question${blank === 1 ? '' : 's'} will count as wrong. Finish anyway?`)
                )
                  void submit();
              }}
            >
              Finish
            </button>
          )}
        </div>
        <button
          class="btn btn-quiet btn-block mt"
          onClick={() => {
            if (window.confirm('Abandon this simulation? Progress will be discarded.')) {
              void idb.del('kv', 'simState');
              navigate('exam');
            }
          }}
        >
          Abandon
        </button>
      </div>
    </div>
  );
}

function newSim(): SimState {
  const qIds = shuffle(QUESTIONS.map((q) => q.id)).slice(0, Math.min(SIM_COUNT, QUESTIONS.length));
  const s: SimState = {
    qIds,
    perms: qIds.map(() => shuffle([0, 1, 2])),
    answers: qIds.map(() => null),
    idx: 0,
    endsAt: Date.now() + SIM_SECONDS * 1000,
  };
  void idb.put('kv', s, 'simState');
  return s;
}

function fmtClock(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    : `${m}:${String(sec).padStart(2, '0')}`;
}

/* ---------------- results ---------------- */

function SimResults(props: { result: ExamResult }): JSX.Element {
  const r = props.result;
  const score = Math.round((r.correct / r.total) * 100);
  const pass = score >= PASS_PCT;
  const [showMissed, setShowMissed] = useState(false);

  return (
    <div class="stack">
      <div class="panel center" style="padding: 28px 16px">
        <div class="stat-num" style={`font-size: 52px; color: var(${pass ? '--accent' : '--warning'})`}>
          {score}%
        </div>
        <div class="stat-label mt">{pass ? 'PASS — nice flying' : `below the ${PASS_PCT}% bar — keep at it`}</div>
        <p class="small dim mt">
          {r.correct} of {r.total} correct · {Math.round(r.seconds / 60)} minutes used
        </p>
      </div>

      <div class="panel">
        <div class="panel-title">By knowledge area</div>
        {Object.entries(r.areas)
          .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
          .map(([area, s]) => {
            const p = Math.round((s.correct / s.total) * 100);
            return (
              <div key={area} style="padding: 5px 0">
                <div class="rowline small">
                  <span>{subjectById(area)?.title ?? area}</span>
                  <span class="mono dim">
                    {s.correct}/{s.total}
                  </span>
                </div>
                <div class="session-progress" style="margin: 4px 0 0">
                  <div
                    style={`width: ${p}%; background: var(${p >= 70 ? '--accent' : '--warning'})`}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {r.missedIds.length > 0 && (
        <div class="panel">
          <button class="rowline" style="width: 100%; min-height: var(--tap)" onClick={() => setShowMissed((v) => !v)}>
            <span class="panel-title" style="margin: 0">
              Review the {r.missedIds.length} you missed
            </span>
            <span class="dim">{showMissed ? '▴' : '▾'}</span>
          </button>
          {showMissed &&
            r.missedIds.map((id) => {
              const q = questionById(id);
              if (!q) return null;
              return (
                <div key={id} style="padding: 12px 0; border-top: 1px solid var(--line)">
                  <div class="small" style="font-weight: 700">
                    <Rich text={q.q} />
                  </div>
                  <div class="small mt" style="color: var(--accent)">
                    {q.choices[q.answer]}
                  </div>
                  <div class="small dim mt">
                    <Rich text={q.why} />
                  </div>
                  {q.cite && <div class="tiny mono mt" style="color: var(--info)">{q.cite}</div>}
                </div>
              );
            })}
        </div>
      )}

      <button class="btn btn-primary btn-block btn-big" onClick={() => navigate('exam')}>
        Done
      </button>
    </div>
  );
}
