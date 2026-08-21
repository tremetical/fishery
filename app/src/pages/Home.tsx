import type { JSX } from 'preact';
import { navigate } from '../lib/router';
import { DECKS } from '../content';
import { store, useStore } from '../lib/store';
import { storageMode } from '../lib/db';
import {
  buildUnits,
  continueTarget,
  stepRoute,
  unitDone,
  unitUnlocked,
  unitProgress,
} from '../lib/course';

export function HomePage(): JSX.Element {
  useStore();

  const counts = DECKS.map((d) => store.deckCounts(d));
  const due = counts.reduce((n, c) => n + c.due, 0);
  const leeches = store.leeches(DECKS);
  const streak = store.streak();
  const reviewsToday = store.reviewsToday;

  const units = buildUnits();
  const target = continueTarget(units);

  const hour = new Date().getHours();
  const greeting =
    hour < 5 ? 'Early start' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div class="stack">
      {storageMode() === 'memory' && (
        <div class="panel small" style="border-color: var(--warning); color: var(--warning)">
          ⚠️ <b>Progress will NOT be saved here.</b> This browser context
          refused persistent storage (preview pages do this). Use the
          installed app or a normal browser tab for real studying.
        </div>
      )}
      <h1 class="page-h">
        {greeting}, pilot.
        <span class="sub">
          {target
            ? `Next on the path: ${target.unit.spec.title} — ${target.step.label.toLowerCase()}.`
            : 'Course complete. Keep the reviews alive.'}
        </span>
      </h1>

      {target ? (
        <button
          class="btn btn-primary btn-block btn-big"
          onClick={() => navigate(stepRoute(target.step))}
        >
          Continue — {target.step.label}
        </button>
      ) : (
        <button class="btn btn-primary btn-block btn-big" onClick={() => navigate('session/all')}>
          Review session
        </button>
      )}

      {due > 0 && (
        <button class="tile" style="border-color: var(--caution)" onClick={() => navigate('session/all')}>
          <div class="tile-icon" style="background: var(--caution-soft)">
            <span class="emoji">⏰</span>
          </div>
          <div class="tile-body">
            <div class="tile-title">Reviews due</div>
            <div class="tile-sub">
              {due} card{due === 1 ? '' : 's'} the scheduler wants back — do these before new stuff
            </div>
          </div>
          <span class="badge badge-learning">{due}</span>
        </button>
      )}

      <div class="panel" style="padding: 10px 14px">
        <div class="grid3">
          <div class="center">
            <div class="stat-num">{reviewsToday}</div>
            <div class="stat-label">today</div>
          </div>
          <div class="center">
            <div class="stat-num" style={streak > 0 ? 'color: var(--accent)' : ''}>{streak}</div>
            <div class="stat-label">day streak</div>
          </div>
          <div class="center">
            <div class="stat-num" style={leeches.length > 0 ? 'color: var(--warning)' : ''}>
              {leeches.length}
            </div>
            <div class="stat-label">trouble</div>
          </div>
        </div>
      </div>

      {leeches.length > 0 && (
        <button class="tile" onClick={() => navigate('progress')}>
          <div class="tile-icon" style="background: var(--warning-soft)">
            <span class="emoji">🚩</span>
          </div>
          <div class="tile-body">
            <div class="tile-title">Trouble spots</div>
            <div class="tile-sub">
              {leeches.length} card{leeches.length === 1 ? '' : 's'} keep failing — worth a different
              approach than repetition
            </div>
          </div>
        </button>
      )}

      <button class="tile" onClick={() => navigate('settings')}>
        <div class="tile-icon" style="background: var(--info-soft)">
          <span class="emoji">⚙️</span>
        </div>
        <div class="tile-body">
          <div class="tile-title">Settings</div>
          <div class="tile-sub">
            Night mode, backups, AI tutor, and app updates
          </div>
        </div>
      </button>

      <div class="panel-title" style="margin: 8px 2px 0">The path</div>

      <div class="path">
        {units.map((u, i) => {
          const unlocked = unitUnlocked(units, i);
          const finished = unitDone(u);
          const { done, total } = unitProgress(u);
          const isCurrent = target?.unit === u;
          return (
            <button
              key={u.spec.id}
              class={`path-node ${finished ? 'is-done' : ''} ${isCurrent ? 'is-current' : ''} ${!unlocked ? 'is-locked' : ''}`}
              disabled={!unlocked}
              onClick={() => navigate(`unit/${u.spec.id}`)}
            >
              <div class="path-ring">
                <svg viewBox="0 0 44 44" aria-hidden>
                  <circle cx="22" cy="22" r="19" class="path-ring-track" />
                  <circle
                    cx="22"
                    cy="22"
                    r="19"
                    class="path-ring-fill"
                    stroke-dasharray={`${(done / total) * 119.4} 119.4`}
                  />
                </svg>
                <span class="emoji path-icon">{!unlocked ? '🔒' : finished ? '✅' : u.spec.icon}</span>
              </div>
              <div class="tile-body">
                <div class="tile-title">{u.spec.title}</div>
                <div class="tile-sub">{u.spec.tagline}</div>
              </div>
              <span class="mono tiny dim">
                {done}/{total}
              </span>
            </button>
          );
        })}
      </div>

      <p class="tiny faint">
        The path orders what's next; the Study tab is never locked. Reviews
        keep coming back on schedule either way — that part is the engine.
      </p>
    </div>
  );
}
