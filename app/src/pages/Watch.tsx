import type { JSX } from 'preact';
import { FIRST, PLAN, WATCH } from '../content/watch';

/**
 * Video courses live outside the app. Cards are for recall; watching
 * someone explain a thing the first time is what these are for.
 */
export function WatchPage(): JSX.Element {
  const rest = WATCH;

  return (
    <div class="stack">
      <a class="panel" href={FIRST.url} target="_blank" rel="noopener"
         style="border-color: var(--accent)">
        <div class="badge badge-due">WATCH THIS FIRST</div>
        <div class="tile-title mt">{FIRST.title}</div>
        <div class="tiny dim">{FIRST.who}</div>
        <p class="small dim mt">{FIRST.blurb}</p>
      </a>

      <section class="panel">
        <div class="panel-title">How to actually use these</div>
        <p class="small dim">
          One topic per sitting, in this order: <b>watch it</b>, then{' '}
          <b>drill it here</b>, then <b>see it in the airplane</b>. About
          30 minutes of video and 10 of cards, most days, beats a six-hour
          binge — the card scheduler is built around you coming back.
        </p>
        <p class="tiny faint mt">
          Do not try to finish a whole course before your next lesson. And
          if you cannot explain what you just watched out loud, re-watch
          that part rather than pushing on.
        </p>
      </section>

      <div class="panel-title" style="margin: 8px 2px 0">The order</div>
      {PLAN.map((p, i) => (
        <div key={p.when} class="tile" style="align-items: flex-start">
          <div class="tile-icon" style="background: var(--surface-2)">
            <span class="mono">{i + 1}</span>
          </div>
          <div class="tile-body">
            <div class="tile-title">{p.when}</div>
            <div class="tile-sub">
              <b>Watch:</b> {p.watch}
            </div>
            <div class="tile-sub">
              <b>Then:</b> {p.then}
            </div>
          </div>
        </div>
      ))}

      <div class="panel-title" style="margin: 8px 2px 0">Where to watch</div>

      <div class="panel-title" style="margin: 8px 2px 0">More</div>
      {rest.map((w) => (
        <a key={w.url} class="tile" href={w.url} target="_blank" rel="noopener">
          <div class="tile-body">
            <div class="tile-title">{w.title}</div>
            <div class="tile-sub">
              {w.who} · {w.length}
            </div>
            <div class="tile-sub">{w.blurb}</div>
          </div>
        </a>
      ))}

      <p class="tiny faint" style="margin: 4px 2px 0">
        These are other people's courses, linked for convenience — this app
        does not control them and their content can change. Free tiers may
        ask for an account.
      </p>
    </div>
  );
}
