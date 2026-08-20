import type { JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Flashcard } from './Flashcard';
import { navigate } from '../lib/router';
import { store, type SessionItem } from '../lib/store';
import { previewIntervals, GRADES, MINUTE, type Grade } from '../lib/srs';

const GRADE_LABELS: Record<Grade, string> = {
  0: 'Again',
  1: 'Hard',
  2: 'Good',
  3: 'Easy',
};

/** Learning steps shorter than this reappear within the same session. */
const REQUEUE_HORIZON = 20 * MINUTE;

export function SessionView(props: {
  title: string;
  build: () => SessionItem[];
  exitTo: string;
}): JSX.Element {
  const initial = useMemo(props.build, []);
  const [queue, setQueue] = useState<SessionItem[]>(initial);
  const [revealed, setRevealed] = useState(false);
  const [counts, setCounts] = useState<Record<Grade, number>>({ 0: 0, 1: 0, 2: 0, 3: 0 });
  const [answered, setAnswered] = useState(0);

  const current = queue[0];

  if (initial.length === 0) {
    return (
      <EmptyState
        title="Nothing due"
        body="No cards are waiting in this scope. Come back later, or raise your new-cards-per-day in Settings."
        exitTo={props.exitTo}
      />
    );
  }

  if (!current) {
    const total = answered;
    const misses = counts[0];
    return (
      <div class="session">
        <h1 class="page-h">
          Session complete
          <span class="sub">{props.title}</span>
        </h1>
        <div class="panel">
          <div class="summary-grid">
            {GRADES.map((g) => (
              <div key={g}>
                <div class="stat-num" style={`color: var(${g === 0 ? '--warning' : g === 1 ? '--caution' : g === 2 ? '--accent' : '--info'})`}>
                  {counts[g]}
                </div>
                <div class="stat-label">{GRADE_LABELS[g]}</div>
              </div>
            ))}
          </div>
          <hr class="hr" />
          <p class="small dim center">
            {total} answers · {total > 0 ? Math.round(((total - misses) / total) * 100) : 0}% recalled
          </p>
        </div>
        <div class="stack mt">
          <button class="btn btn-primary btn-block btn-big" onClick={() => navigate(props.exitTo)}>
            Done
          </button>
        </div>
      </div>
    );
  }

  const state = store.state(current.card.id);
  const previews = previewIntervals(state, Date.now());
  const progress = answered / (answered + queue.length);

  const grade = async (g: Grade) => {
    const next = await store.answerCard(current.card, current.deckId, g);
    setCounts((c) => ({ ...c, [g]: c[g] + 1 }));
    setAnswered((a) => a + 1);
    setQueue((q) => {
      const rest = q.slice(1);
      const stillLearning =
        (next.phase === 'learning' || next.phase === 'relearning') &&
        next.due <= Date.now() + REQUEUE_HORIZON;
      return stillLearning ? [...rest, q[0]] : rest;
    });
    // revealed flips off in the same commit as the card swap — the no-leak
    // rule in Flashcard.tsx depends on this ordering never being animated.
    setRevealed(false);
  };

  return (
    <div class="session">
      <div class="session-progress">
        <div style={`width: ${Math.round(progress * 100)}%`} />
      </div>
      <div class="session-meta">
        <span>{props.title}</span>
        <span class="mono">{queue.length} left</span>
      </div>

      <div class="session-card-area">
        <Flashcard
          key={current.card.id + ':' + state.reps}
          card={current.card}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
        />
      </div>

      <div class="session-actions">
        {revealed ? (
          <div class="gradebar">
            {GRADES.map((g) => (
              <button key={g} class={`gradebtn grade-${g}`} onClick={() => void grade(g)}>
                {GRADE_LABELS[g]}
                <small>{previews[g]}</small>
              </button>
            ))}
          </div>
        ) : (
          <button class="reveal-btn" onClick={() => setRevealed(true)}>
            REVEAL
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyState(props: { title: string; body: string; exitTo: string }): JSX.Element {
  return (
    <div class="stack">
      <div class="panel center" style="padding: 40px 20px">
        <div style="font-size: 40px">✅</div>
        <h2 class="mt">{props.title}</h2>
        <p class="small dim mt">{props.body}</p>
      </div>
      <button class="btn btn-block" onClick={() => navigate(props.exitTo)}>
        Back
      </button>
    </div>
  );
}
