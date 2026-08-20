import type { JSX } from 'preact';
import { navigate } from '../lib/router';
import { DECKS } from '../content';
import { store, useStore, localDate } from '../lib/store';
import { Rich } from '../components/rich';

const MATURE_DAYS = 21;

export function ProgressPage(): JSX.Element {
  useStore();
  const log = store.log;

  // ---- headline stats ----
  const totalCards = DECKS.reduce((n, d) => n + d.cards.length, 0);
  let seen = 0,
    mature = 0;
  for (const d of DECKS)
    for (const c of d.cards) {
      const s = store.state(c.id);
      if (s.phase !== 'new') seen++;
      if (s.phase === 'review' && s.intervalDays >= MATURE_DAYS) mature++;
    }

  // 30-day retention: of review-phase answers, how many weren't "Again"
  const cutoff = Date.now() - 30 * 86400_000;
  const recentReviews = log.filter((e) => e.ts >= cutoff && e.phase === 'review');
  const retention =
    recentReviews.length > 0
      ? Math.round(
          (recentReviews.filter((e) => e.grade > 0).length / recentReviews.length) * 100,
        )
      : null;

  // ---- daily bars (last 28 days) ----
  const days: { label: string; count: number }[] = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = localDate(d.getTime());
    days.push({ label: key, count: 0 });
  }
  const dayIndex = new Map(days.map((d, i) => [d.label, i]));
  for (const e of log) {
    const i = dayIndex.get(localDate(e.ts));
    if (i !== undefined) days[i].count++;
  }
  const maxCount = Math.max(1, ...days.map((d) => d.count));

  const leeches = store.leeches(DECKS);
  const sims = store.exams.filter((e) => e.mode === 'sim').slice(-8).reverse();

  return (
    <div class="stack">
      <div class="panel">
        <div class="grid3">
          <div class="center">
            <div class="stat-num">{store.streak()}</div>
            <div class="stat-label">day streak</div>
          </div>
          <div class="center">
            <div class="stat-num">
              {seen}
              <span class="dim" style="font-size: 15px">/{totalCards}</span>
            </div>
            <div class="stat-label">cards seen</div>
          </div>
          <div class="center">
            <div class="stat-num" style={retention !== null && retention >= 85 ? 'color: var(--accent)' : ''}>
              {retention === null ? '—' : `${retention}%`}
            </div>
            <div class="stat-label">30-day recall</div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">Reviews — last 4 weeks ({log.length} all-time)</div>
        <svg viewBox="0 0 336 72" style="width: 100%; display: block" aria-label="Daily review bar chart">
          {days.map((d, i) => {
            const h = d.count === 0 ? 2 : 4 + (d.count / maxCount) * 60;
            return (
              <rect
                key={d.label}
                x={i * 12 + 1}
                y={68 - h}
                width="9"
                height={h}
                rx="2"
                fill={d.count === 0 ? 'var(--line)' : 'var(--accent)'}
                opacity={d.count === 0 ? 0.6 : 0.5 + 0.5 * (d.count / maxCount)}
              />
            );
          })}
        </svg>
        <div class="rowline tiny faint">
          <span>4 weeks ago</span>
          <span>today</span>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">Mastery by deck</div>
        {DECKS.map((d) => {
          let newC = 0, learn = 0, young = 0, matureC = 0;
          for (const c of d.cards) {
            const s = store.state(c.id);
            if (s.phase === 'new') newC++;
            else if (s.phase === 'learning' || s.phase === 'relearning') learn++;
            else if (s.intervalDays >= MATURE_DAYS) matureC++;
            else young++;
          }
          const total = d.cards.length;
          const seg = (n: number) => `${(n / total) * 100}%`;
          return (
            <div key={d.id} style="padding: 6px 0">
              <div class="rowline small">
                <span>{d.title}</span>
                <span class="tiny dim mono">
                  {matureC + young}/{total}
                </span>
              </div>
              <div style="display: flex; height: 8px; border-radius: 4px; overflow: hidden; background: var(--surface-2); margin-top: 4px">
                <div style={`width: ${seg(matureC)}; background: var(--accent)`} />
                <div style={`width: ${seg(young)}; background: var(--info)`} />
                <div style={`width: ${seg(learn)}; background: var(--caution)`} />
              </div>
            </div>
          );
        })}
        <div class="tiny faint mt">
          <span style="color: var(--accent)">■</span> mature (21d+ interval) ·{' '}
          <span style="color: var(--info)">■</span> young ·{' '}
          <span style="color: var(--caution)">■</span> learning · gray = not seen
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">
          Trouble spots {leeches.length > 0 && `(${leeches.length})`}
        </div>
        {leeches.length === 0 ? (
          <p class="small dim">
            Nothing here. Cards that keep failing (4+ lapses) get flagged and
            listed — they usually need a mnemonic or a different mental model,
            not more repetition.
          </p>
        ) : (
          leeches.map(({ card, deck, state }) => (
            <div key={card.id} style="padding: 10px 0; border-top: 1px solid var(--line)">
              <div class="small" style="font-weight: 700">
                <Rich text={card.front} />
              </div>
              <div class="tiny dim mt">
                {deck.title} · {state.lapses} lapses ·{' '}
                <span style="color: var(--accent)"><Rich text={card.back.length > 80 ? card.back.slice(0, 80) + '…' : card.back} /></span>
              </div>
            </div>
          ))
        )}
      </div>

      <div class="panel">
        <div class="panel-title">Exam simulations</div>
        {sims.length === 0 ? (
          <p class="small dim">
            No sims yet.{' '}
            <a
              href="#/exam/sim"
              onClick={(e) => {
                e.preventDefault();
                navigate('exam/sim');
              }}
            >
              Fly one
            </a>{' '}
            — the score history lands here.
          </p>
        ) : (
          sims.map((r) => {
            const p = Math.round((r.correct / r.total) * 100);
            return (
              <div key={r.ts} class="rowline" style="padding: 7px 0; border-top: 1px solid var(--line)">
                <span class="small">{new Date(r.ts).toLocaleDateString()}</span>
                <span class="mono small">
                  {r.correct}/{r.total} ·{' '}
                  <b style={`color: var(${p >= 70 ? '--accent' : '--warning'})`}>{p}%</b>
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
