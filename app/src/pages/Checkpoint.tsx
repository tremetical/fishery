import type { JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import type { Route } from '../lib/router';
import { navigate } from '../lib/router';
import { buildUnits, buildCheckpointItems, type CheckItem } from '../lib/course';
import { CHECKPOINT_PASS } from '../content/course';
import { store } from '../lib/store';
import { Rich } from '../components/rich';

/**
 * Checkpoint mini-test: Duolingo-style — immediate feedback per question,
 * but a score at the end, and 80% to pass the unit. Retry freely; every
 * attempt is a fresh mix of exam questions and card-derived MCQs.
 */
export function CheckpointPage(props: { route: Route }): JSX.Element {
  const unitId = props.route.parts[1];
  const unit = useMemo(() => buildUnits().find((u) => u.spec.id === unitId), [unitId]);
  const [attempt, setAttempt] = useState(0);
  const items = useMemo(() => (unit ? buildCheckpointItems(unit) : []), [unit, attempt]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!unit) return <div class="panel">Unit not found.</div>;
  if (items.length === 0) return <div class="panel">No checkpoint for this unit.</div>;

  const item: CheckItem = items[idx];
  const pass = correct / items.length >= CHECKPOINT_PASS;

  const finish = async () => {
    setFinished(true);
    if (!saved) {
      setSaved(true);
      await store.addExamResult({
        ts: Date.now(),
        mode: 'checkpoint',
        checkpoint: unit.spec.id,
        total: items.length,
        correct,
        seconds: 0,
        areas: {},
        missedIds: [],
      });
    }
  };

  const retry = () => {
    setAttempt((a) => a + 1);
    setIdx(0);
    setPicked(null);
    setCorrect(0);
    setFinished(false);
    setSaved(false);
  };

  if (finished) {
    const score = Math.round((correct / items.length) * 100);
    return (
      <div class="stack">
        <div class="panel center" style="padding: 32px 16px">
          <div style="font-size: 44px">{pass ? '🏁' : '🌀'}</div>
          <div class="stat-num mt" style={`font-size: 44px; color: var(${pass ? '--accent' : '--warning'})`}>
            {score}%
          </div>
          <div class="stat-label mt">
            {pass
              ? `checkpoint passed — ${unit.spec.title} complete`
              : `need ${Math.round(CHECKPOINT_PASS * 100)}% — go around and try again`}
          </div>
          <p class="small dim mt">
            {correct} of {items.length} correct
          </p>
        </div>
        {pass ? (
          <button class="btn btn-primary btn-block btn-big" onClick={() => navigate('')}>
            Continue the path
          </button>
        ) : (
          <button class="btn btn-primary btn-block btn-big" onClick={retry}>
            Retry checkpoint
          </button>
        )}
        <button class="btn btn-quiet btn-block" onClick={() => navigate(`unit/${unit.spec.id}`)}>
          Back to unit
        </button>
      </div>
    );
  }

  return (
    <div class="session">
      <div class="session-meta">
        <span>
          {unit.spec.title} · Checkpoint
        </span>
        <span class="mono">
          {idx + 1}/{items.length}
        </span>
      </div>
      <div class="session-progress">
        <div style={`width: ${Math.round((idx / items.length) * 100)}%`} />
      </div>

      <div class="session-card-area">
        <div class="flashcard" style="min-height: 0">
          <div style="font-size: 17px; font-weight: 700; line-height: 1.4">
            <Rich text={item.q} />
          </div>
          <div class="stack mt">
            {item.choices.map((c, i) => {
              let style = '';
              if (picked !== null) {
                if (i === item.answer) style = 'border-color: var(--accent); background: var(--accent-soft)';
                else if (i === picked) style = 'border-color: var(--warning); background: var(--warning-soft)';
                else style = 'opacity: 0.55';
              }
              return (
                <button
                  key={i}
                  class="choice-btn"
                  style={style}
                  disabled={picked !== null}
                  onClick={() => {
                    setPicked(i);
                    if (i === item.answer) setCorrect((n) => n + 1);
                  }}
                >
                  <span class="mono dim" style="margin-right: 8px">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <Rich text={c} />
                </button>
              );
            })}
          </div>
          {picked !== null && (item.why || item.cite) && (
            <div class="flashcard-answer">
              {item.why && (
                <div class="small">
                  <Rich text={item.why} />
                </div>
              )}
              {item.cite && (
                <div class="flashcard-cite">
                  <span class="mono">{item.cite}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div class="session-actions">
        {picked !== null && (
          <button
            class="reveal-btn"
            onClick={() => {
              if (idx + 1 < items.length) {
                setIdx((n) => n + 1);
                setPicked(null);
              } else {
                void finish();
              }
            }}
          >
            {idx + 1 < items.length ? 'NEXT' : 'SEE RESULT'}
          </button>
        )}
      </div>
    </div>
  );
}
