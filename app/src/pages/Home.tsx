import type { JSX } from 'preact';
import { navigate } from '../lib/router';
import { DECKS } from '../content';
import { store, useStore } from '../lib/store';

export function HomePage(): JSX.Element {
  useStore();

  const counts = DECKS.map((d) => store.deckCounts(d));
  const due = counts.reduce((n, c) => n + c.due, 0);
  const fresh = Math.min(
    counts.reduce((n, c) => n + c.newCards, 0),
    Math.max(0, store.settings.newPerDay - store.introducedToday),
  );
  const leeches = store.leeches(DECKS);
  const streak = store.streak();
  const reviewsToday = store.reviewsToday;

  const hour = new Date().getHours();
  const greeting = hour < 5 ? 'Early start' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div class="stack">
      <h1 class="page-h">
        {greeting}, pilot.
        <span class="sub">
          {due + fresh > 0
            ? 'The schedule has work for you.'
            : reviewsToday > 0
              ? 'All caught up. Nice.'
              : 'Nothing due yet — start something new.'}
        </span>
      </h1>

      <button
        class="btn btn-primary btn-block btn-big"
        onClick={() => navigate('session/all')}
      >
        {due + fresh > 0 ? `Start session — ${due} due · ${fresh} new` : 'Free review'}
      </button>

      <div class="panel">
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
              {leeches.length} card{leeches.length === 1 ? '' : 's'} keep
              failing — worth a different approach than repetition
            </div>
          </div>
        </button>
      )}

      <button class="tile" onClick={() => navigate('radio/calls')}>
        <div class="tile-icon" style="background: var(--info-soft)">
          <span class="emoji">📡</span>
        </div>
        <div class="tile-body">
          <div class="tile-title">Radio reps</div>
          <div class="tile-sub">Two minutes of readbacks, out loud</div>
        </div>
      </button>

      <button class="tile" onClick={() => navigate('exam')}>
        <div class="tile-icon" style="background: var(--special-soft)">
          <span class="emoji">📝</span>
        </div>
        <div class="tile-body">
          <div class="tile-title">Written exam practice</div>
          <div class="tile-sub">Question bank & timed simulation</div>
        </div>
      </button>
    </div>
  );
}
