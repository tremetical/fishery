/*
 * Spaced-repetition scheduler: an SM-2 variant closely following Anki's
 * production behavior (learning steps, ease factor, lapse handling).
 *
 * Chosen over fancier algorithms (FSRS) deliberately: this family has two
 * decades of real-world validation, and — more important for this app —
 * every rule below is simple enough to pin down with an exact unit test.
 * See srs.test.ts; if you change a constant, a test must change with it.
 *
 * Pure module: no Date.now(), no Math.random(), no storage. Time and
 * randomness are injected so behavior is reproducible.
 */

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/** Again / Hard / Good / Easy */
export type Grade = 0 | 1 | 2 | 3;
export const GRADES: Grade[] = [0, 1, 2, 3];

export type Phase = 'new' | 'learning' | 'review' | 'relearning';

export interface CardState {
  id: string;
  phase: Phase;
  /** index into LEARNING_STEPS / RELEARNING_STEPS while (re)learning */
  step: number;
  /** ease factor; multiplies the interval on Good */
  ease: number;
  /** current review interval in days (0 until first graduation) */
  intervalDays: number;
  /** epoch ms when next due */
  due: number;
  lapses: number;
  reps: number;
  leech: boolean;
  lastReviewed: number | null;
}

/** Minutes between exposures while a card is being learned. */
export const LEARNING_STEPS_MIN = [1, 10];
/** Re-learning after a lapse: one short step, then back to review. */
export const RELEARNING_STEPS_MIN = [10];

export const START_EASE = 2.5;
export const MIN_EASE = 1.3;
export const GRADUATING_INTERVAL_DAYS = 1;
export const EASY_INTERVAL_DAYS = 4;
export const EASY_BONUS = 1.3;
export const HARD_MULTIPLIER = 1.2;
/** On a lapse the old interval is halved, not zeroed: relearned material
 * comes back faster than brand-new material, but still soon. */
export const LAPSE_INTERVAL_MULTIPLIER = 0.5;
export const MAX_INTERVAL_DAYS = 365;
/** Lapse count at which a card is flagged a leech and surfaced as a
 * trouble spot. Anki defaults to 8; we flag earlier because "keeps
 * failing" is exactly what the user wants to see. */
export const LEECH_LAPSES = 4;

export function newCardState(id: string): CardState {
  return {
    id,
    phase: 'new',
    step: 0,
    ease: START_EASE,
    intervalDays: 0,
    due: 0, // new cards are always "due" until introduced
    lapses: 0,
    reps: 0,
    leech: false,
    lastReviewed: null,
  };
}

export type Rng = () => number;

/** ±5% fuzz so cards reviewed together don't stay glued together forever.
 * rng()=0.5 (the test default) yields exactly 1.0 — no fuzz. */
function fuzz(days: number, rng: Rng): number {
  if (days < 2.5) return Math.round(days);
  const factor = 0.95 + 0.1 * rng();
  return Math.max(1, Math.round(days * factor));
}

function clampInterval(days: number): number {
  return Math.min(MAX_INTERVAL_DAYS, Math.max(1, Math.round(days)));
}

/**
 * Apply a grade to a card. Returns a NEW state (input is not mutated).
 */
export function answer(
  state: CardState,
  grade: Grade,
  now: number,
  rng: Rng = () => 0.5,
): CardState {
  const s: CardState = { ...state, reps: state.reps + 1, lastReviewed: now };

  const steps =
    s.phase === 'relearning' ? RELEARNING_STEPS_MIN : LEARNING_STEPS_MIN;

  if (s.phase === 'new') {
    s.phase = 'learning';
    s.step = 0;
  }

  if (s.phase === 'learning' || s.phase === 'relearning') {
    const relearning = s.phase === 'relearning';
    switch (grade) {
      case 0: // Again — back to the first step
        s.step = 0;
        s.due = now + steps[0] * MINUTE;
        break;
      case 1: // Hard — repeat the current step
        s.due = now + steps[Math.min(s.step, steps.length - 1)] * MINUTE;
        break;
      case 2: // Good — advance; graduate past the last step
        if (s.step + 1 < steps.length) {
          s.step += 1;
          s.due = now + steps[s.step] * MINUTE;
        } else {
          graduate(s, relearning ? s.intervalDays : GRADUATING_INTERVAL_DAYS, now, rng);
        }
        break;
      case 3: // Easy — graduate immediately
        graduate(s, relearning ? Math.max(1, s.intervalDays) : EASY_INTERVAL_DAYS, now, rng);
        break;
    }
    return s;
  }

  // phase === 'review'
  switch (grade) {
    case 0: {
      // Lapse
      s.lapses += 1;
      if (s.lapses >= LEECH_LAPSES) s.leech = true;
      s.ease = Math.max(MIN_EASE, s.ease - 0.2);
      s.intervalDays = clampInterval(s.intervalDays * LAPSE_INTERVAL_MULTIPLIER);
      s.phase = 'relearning';
      s.step = 0;
      s.due = now + RELEARNING_STEPS_MIN[0] * MINUTE;
      break;
    }
    case 1: {
      s.ease = Math.max(MIN_EASE, s.ease - 0.15);
      const next = Math.max(s.intervalDays + 1, s.intervalDays * HARD_MULTIPLIER);
      s.intervalDays = clampInterval(fuzz(next, rng));
      s.due = now + s.intervalDays * DAY;
      break;
    }
    case 2: {
      const next = Math.max(s.intervalDays + 1, s.intervalDays * s.ease);
      s.intervalDays = clampInterval(fuzz(next, rng));
      s.due = now + s.intervalDays * DAY;
      break;
    }
    case 3: {
      const next = Math.max(
        s.intervalDays + 1,
        s.intervalDays * s.ease * EASY_BONUS,
      );
      s.ease = s.ease + 0.15;
      s.intervalDays = clampInterval(fuzz(next, rng));
      s.due = now + s.intervalDays * DAY;
      break;
    }
  }
  return s;
}

function graduate(s: CardState, intervalDays: number, now: number, rng: Rng): void {
  s.phase = 'review';
  s.step = 0;
  s.intervalDays = clampInterval(fuzz(intervalDays, rng));
  s.due = now + s.intervalDays * DAY;
}

/** End of the local calendar day containing `now`. A review card due any
 * time today is studied today — you shouldn't have to wait until 9pm. */
export function endOfLocalDay(now: number): number {
  const d = new Date(now);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

export function isDue(state: CardState, now: number): boolean {
  if (state.phase === 'new') return true;
  if (state.phase === 'review') return state.due <= endOfLocalDay(now);
  return state.due <= now; // learning steps are minute-scale: exact
}

/** Learning-phase card whose step timer hasn't expired yet, but will within
 * the session horizon — kept in the session so a 5-minute session can
 * finish its 1m/10m steps. */
export function isDueSoon(state: CardState, now: number, horizonMs = 20 * MINUTE): boolean {
  return (
    (state.phase === 'learning' || state.phase === 'relearning') &&
    state.due > now &&
    state.due <= now + horizonMs
  );
}

/** Human label for what each grade would schedule — shown on the buttons. */
export function previewIntervals(
  state: CardState,
  now: number,
): Record<Grade, string> {
  const out = {} as Record<Grade, string>;
  for (const g of GRADES) {
    const next = answer(state, g, now);
    const delta = next.due - now;
    out[g] = next.phase === 'review' ? fmtDays(next.intervalDays) : fmtMinutes(delta);
  }
  return out;
}

function fmtMinutes(ms: number): string {
  const min = Math.round(ms / MINUTE);
  return min < 60 ? `${min}m` : `${Math.round(min / 60)}h`;
}

function fmtDays(days: number): string {
  if (days < 30) return `${days}d`;
  if (days < 360) return `${Math.round(days / 30.4)}mo`;
  return `${(days / 365).toFixed(1)}y`;
}
