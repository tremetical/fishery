import type { JSX } from 'preact';
import type { Card } from '../content/types';
import { Rich } from './rich';
import { IconSpeaker } from './icons';
import { speak, canSpeak } from '../lib/speech';
import { store } from '../lib/store';

/*
 * ARCHITECTURAL RULE — answer must never leak before reveal.
 *
 * The answer, explanation, and citation are NOT rendered into the DOM until
 * `revealed` is true. Not hidden with CSS, not opacity 0, not behind a flip
 * transform — absent. CSS-hidden answers leak through transition frames,
 * find-in-page, screen readers, and dev tools. Conditional rendering is the
 * whole fix, permanently. Guarded by a test in Flashcard.test.tsx; don't
 * "optimize" this into a visibility toggle.
 */

export function Flashcard(props: {
  card: Card;
  revealed: boolean;
  onReveal: () => void;
}): JSX.Element {
  const { card, revealed, onReveal } = props;

  const sayIt = card.speak !== undefined;

  return (
    <div class={`flashcard ${revealed ? 'is-revealed' : ''}`}>
      <div class="flashcard-front">
        <Rich text={card.front} />
      </div>

      {!revealed && (
        <button class="flashcard-cover" onClick={onReveal}>
          {sayIt && <div class="badge badge-neutral">SAY IT OUT LOUD, THEN</div>}
          <div class="flashcard-cover-hint">Tap to reveal</div>
        </button>
      )}

      {revealed && (
        <div class="flashcard-answer">
          <div class="flashcard-back">
            <Rich text={card.back} />
            {sayIt && store.settings.ttsEnabled && canSpeak() && (
              <button
                class="iconbtn"
                aria-label="Speak answer"
                onClick={() => void speak(card.speak!, store.settings.ttsRate)}
              >
                <IconSpeaker />
              </button>
            )}
          </div>
          {card.why && (
            <div class="flashcard-why">
              <Rich text={card.why} />
            </div>
          )}
          {(card.cite || card.unverified) && (
            <div class="flashcard-cite">
              {card.cite && <span class="mono">{card.cite}</span>}
              {card.unverified && (
                <span class="badge badge-leech">UNVERIFIED</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
