import type { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { store } from '../lib/store';
import { navigate } from '../lib/router';
import { confetti } from '../lib/confetti';
import {
  makeMetar,
  rawMetar,
  decodeMetar,
  category,
  type Metar,
  type Category,
} from '../lib/metargen';

/*
 * METAR Lab: an endless stream of generated reports. Two-step drill:
 * 1) call the flight category (checked automatically),
 * 2) decode the whole report out loud, then reveal the line-by-line answer.
 */

const CATS: Category[] = ['VFR', 'MVFR', 'IFR', 'LIFR'];
const CAT_COLOR: Record<Category, string> = {
  VFR: 'var(--accent)',
  MVFR: 'var(--info)',
  IFR: 'var(--warning)',
  LIFR: 'var(--special)',
};

const ROUND = 6;

export function ToolMetarPage(): JSX.Element {
  const [m, setM] = useState<Metar>(() => makeMetar());
  const [guess, setGuess] = useState<Category | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [tally, setTally] = useState({ hit: 0, miss: 0 });
  const done = tally.hit + tally.miss;

  const actual = category(m);

  const next = () => {
    void store.bumpDrill('metar');
    if (done >= ROUND) confetti();
    setM(makeMetar());
    setGuess(null);
    setRevealed(false);
  };

  // Fixed-length round with an end screen — not an endless stream.
  if (done >= ROUND && guess === null) {
    const pct = Math.round((tally.hit / done) * 100);
    return (
      <div class="stack">
        <div class="panel center" style="padding: 32px 16px">
          <div style="font-size: 44px">🌦️</div>
          <div class="stat-num mt" style="font-size: 44px">{pct}%</div>
          <div class="stat-label mt">round complete — METAR Lab</div>
          <p class="small dim mt">
            {tally.hit} categories called right · {tally.miss} missed
          </p>
        </div>
        <button
          class="btn btn-primary btn-block btn-big"
          onClick={() => setTally({ hit: 0, miss: 0 })}
        >
          Another round
        </button>
        <button class="btn btn-block" onClick={() => navigate('study/weather')}>
          Done
        </button>
      </div>
    );
  }

  const pickCat = (c: Category) => {
    if (guess !== null) return;
    setGuess(c);
    setTally((t) => (c === actual ? { ...t, hit: t.hit + 1 } : { ...t, miss: t.miss + 1 }));
  };

  return (
    <div class="session">
      <div class="session-meta">
        <span>METAR Lab</span>
        <span class="mono">
          {Math.min(done + 1, ROUND)}/{ROUND} ·{' '}
          <span style="color: var(--accent)">{tally.hit}✓</span>{' '}
          <span style="color: var(--warning)">{tally.miss}✗</span>
        </span>
      </div>
      <div class="session-progress">
        <div style={`width: ${Math.round((done / ROUND) * 100)}%`} />
      </div>

      <div class="session-card-area">
        <div class="flashcard">
          <div class="mono" style="font-size: 16.5px; line-height: 1.6; word-spacing: 2px; overflow-wrap: break-word">
            {rawMetar(m)}
          </div>

          <hr class="hr" />
          <div class="tiny dim" style="text-transform: uppercase; letter-spacing: 0.07em">
            Flight category?
          </div>
          <div class="gradebar mt" style="gap: 6px">
            {CATS.map((c) => {
              const chosen = guess === c;
              const showTruth = guess !== null && c === actual;
              return (
                <button
                  key={c}
                  class="gradebtn"
                  style={
                    showTruth
                      ? `color: ${CAT_COLOR[c]}; border-color: ${CAT_COLOR[c]}; background: color-mix(in srgb, ${CAT_COLOR[c]} 14%, transparent)`
                      : chosen
                        ? 'color: var(--warning); border-color: var(--warning); text-decoration: line-through'
                        : guess !== null
                          ? 'opacity: 0.4'
                          : ''
                  }
                  onClick={() => pickCat(c)}
                >
                  {c}
                </button>
              );
            })}
          </div>
          {guess !== null && guess !== actual && (
            <p class="small mt" style="color: var(--warning)">
              It’s {actual} — check the ceiling (lowest BKN/OVC) against visibility; the worse one wins.
            </p>
          )}

          {!revealed && guess !== null && (
            <button class="flashcard-cover" onClick={() => setRevealed(true)}>
              <div class="badge badge-neutral">DECODE IT OUT LOUD, THEN</div>
              <div class="flashcard-cover-hint">Tap for the full decode</div>
            </button>
          )}

          {revealed && (
            <div class="flashcard-answer">
              {decodeMetar(m).map((line, i) => (
                <div key={i} class="small" style="padding: 3px 0; border-bottom: 1px dashed var(--line)">
                  {line}
                </div>
              ))}
              <p class="tiny faint mt">
                Generated practice report — coherent, but not real weather.
              </p>
            </div>
          )}
        </div>
      </div>

      <div class="session-actions">
        <button class="reveal-btn" disabled={guess === null} onClick={next}>
          {guess === null ? 'CALL THE CATEGORY FIRST' : done >= ROUND ? 'FINISH ROUND' : 'NEXT REPORT'}
        </button>
      </div>
    </div>
  );
}
