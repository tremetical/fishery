import type { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { store } from '../lib/store';
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

export function ToolMetarPage(): JSX.Element {
  const [m, setM] = useState<Metar>(() => makeMetar());
  const [guess, setGuess] = useState<Category | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [tally, setTally] = useState({ hit: 0, miss: 0 });

  const actual = category(m);

  const next = () => {
    void store.bumpDrill('metar');
    setM(makeMetar());
    setGuess(null);
    setRevealed(false);
  };

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
          <span style="color: var(--accent)">{tally.hit}✓</span>{' '}
          <span style="color: var(--warning)">{tally.miss}✗</span>
        </span>
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
          {guess === null ? 'CALL THE CATEGORY FIRST' : 'NEXT REPORT'}
        </button>
      </div>
    </div>
  );
}
