import type { JSX } from 'preact';
import { WATCH } from '../content/watch';

/**
 * Video courses live outside the app. Cards are for recall; watching
 * someone explain a thing the first time is what these are for.
 */
export function WatchPage(): JSX.Element {
  const featured = WATCH.filter((w) => w.featured);
  const rest = WATCH.filter((w) => !w.featured);

  return (
    <div class="stack">
      <section class="panel">
        <div class="panel-title">Watch first, then drill</div>
        <p class="small dim">
          Flashcards are good at keeping something you already understand.
          They are bad at teaching it to you cold. If a deck feels like it
          assumes knowledge you do not have, watch the matching lesson from
          one of these, then come back and let the cards do their job.
        </p>
      </section>

      {featured.map((w) => (
        <a key={w.url} class="panel" href={w.url} target="_blank" rel="noopener">
          <div class="badge badge-due">START HERE</div>
          <div class="tile-title mt">{w.title}</div>
          <div class="tiny dim">
            {w.who} · {w.length}
          </div>
          <p class="small dim mt">{w.blurb}</p>
        </a>
      ))}

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
