import type { JSX } from 'preact';
import type { Route } from '../lib/router';
import { navigate } from '../lib/router';
import {
  buildUnits,
  stepDone,
  stepRoute,
  drillProgress,
  unitUnlocked,
  unitProgress,
} from '../lib/course';
import { useStore } from '../lib/store';

const STEP_ICON = { lesson: '📖', drill: '🎙️', checkpoint: '🏁', finalsim: '📝' } as const;

export function UnitPage(props: { route: Route }): JSX.Element {
  useStore();
  const unitId = props.route.parts[1];
  const units = buildUnits();
  const i = units.findIndex((u) => u.spec.id === unitId);
  if (i < 0) return <div class="panel">Unit not found.</div>;
  const unit = units[i];
  const unlocked = unitUnlocked(units, i);
  const { done, total } = unitProgress(unit);
  const next = unit.steps.find((s) => !stepDone(s));

  return (
    <div class="stack">
      <h1 class="page-h">
        <span class="emoji">{unit.spec.icon}</span> {unit.spec.title}
        <span class="sub">{unit.spec.tagline}</span>
      </h1>

      {!unlocked && (
        <div class="panel small dim">
          🔒 Finish the previous unit to unlock this one. (The Study tab is
          never locked if you want to roam ahead.)
        </div>
      )}

      <div class="panel" style="padding: 10px 14px">
        <div class="rowline small">
          <span class="dim">Unit progress</span>
          <span class="mono">
            {done}/{total}
          </span>
        </div>
        <div class="session-progress" style="margin: 8px 0 2px">
          <div style={`width: ${Math.round((done / total) * 100)}%`} />
        </div>
      </div>

      {unit.steps.map((step) => {
        const isDone = stepDone(step);
        const isNext = step === next && unlocked;
        const sub =
          step.type === 'drill'
            ? `${step.sub} — ${drillProgress(step)}/${step.spec.count} done`
            : step.sub;
        return (
          <button
            key={step.index}
            class="tile"
            disabled={!unlocked}
            style={`${isNext ? 'border-color: var(--accent);' : ''} ${!unlocked ? 'opacity: 0.55' : ''}`}
            onClick={() => navigate(stepRoute(step))}
          >
            <div
              class="tile-icon"
              style={`background: ${isDone ? 'var(--accent-soft)' : 'var(--surface-2)'}`}
            >
              <span class="emoji">{isDone ? '✅' : STEP_ICON[step.type]}</span>
            </div>
            <div class="tile-body">
              <div class="tile-title">{step.label}</div>
              <div class="tile-sub">{sub}</div>
            </div>
            {isNext && <span class="badge badge-due">NEXT</span>}
            {isDone && <span class="badge badge-neutral">DONE</span>}
          </button>
        );
      })}
    </div>
  );
}
