import { describe, it, expect } from 'vitest';
import {
  answer,
  newCardState,
  isDue,
  isDueSoon,
  previewIntervals,
  endOfLocalDay,
  MINUTE,
  DAY,
  LEECH_LAPSES,
  MAX_INTERVAL_DAYS,
  MIN_EASE,
  type CardState,
  type Grade,
} from './srs';

// Fixed "now": 2026-08-20 10:00 local
const NOW = new Date(2026, 7, 20, 10, 0, 0).getTime();
const noFuzz = () => 0.5; // fuzz factor 0.95 + 0.1*0.5 = 1.0 exactly

function reviewCard(intervalDays: number, ease = 2.5, lapses = 0): CardState {
  return {
    ...newCardState('t'),
    phase: 'review',
    intervalDays,
    ease,
    lapses,
    due: NOW,
    reps: 5,
  };
}

function grades(card: CardState, seq: Grade[], start = NOW): CardState {
  let s = card;
  let t = start;
  for (const g of seq) {
    s = answer(s, g, t, noFuzz);
    t = s.due; // review again exactly when due
  }
  return s;
}

describe('learning a new card', () => {
  it('Good on a new card advances to the second learning step (10m)', () => {
    const s = answer(newCardState('a'), 2, NOW, noFuzz);
    expect(s.phase).toBe('learning');
    expect(s.step).toBe(1);
    expect(s.due).toBe(NOW + 10 * MINUTE);
  });

  it('Again on a new card schedules the first step (1m)', () => {
    const s = answer(newCardState('a'), 0, NOW, noFuzz);
    expect(s.phase).toBe('learning');
    expect(s.step).toBe(0);
    expect(s.due).toBe(NOW + 1 * MINUTE);
  });

  it('Good through both steps graduates to a 1-day review card', () => {
    const s = grades(newCardState('a'), [2, 2]);
    expect(s.phase).toBe('review');
    expect(s.intervalDays).toBe(1);
    expect(s.ease).toBe(2.5); // graduation never touches ease
  });

  it('Easy on a new card graduates immediately at 4 days', () => {
    const s = answer(newCardState('a'), 3, NOW, noFuzz);
    expect(s.phase).toBe('review');
    expect(s.intervalDays).toBe(4);
    expect(s.due).toBe(NOW + 4 * DAY);
  });

  it('Again mid-learning resets to the first step', () => {
    let s = answer(newCardState('a'), 2, NOW, noFuzz); // step 1
    s = answer(s, 0, NOW + 10 * MINUTE, noFuzz);
    expect(s.step).toBe(0);
    expect(s.due).toBe(NOW + 10 * MINUTE + 1 * MINUTE);
  });

  it('Hard repeats the current step without advancing', () => {
    let s = answer(newCardState('a'), 2, NOW, noFuzz); // step 1 (10m)
    s = answer(s, 1, NOW + 10 * MINUTE, noFuzz);
    expect(s.step).toBe(1);
    expect(s.due).toBe(NOW + 20 * MINUTE);
  });
});

describe('review scheduling', () => {
  it('Good multiplies the interval by ease', () => {
    const s = answer(reviewCard(10, 2.5), 2, NOW, noFuzz);
    expect(s.intervalDays).toBe(25);
    expect(s.ease).toBe(2.5);
    expect(s.due).toBe(NOW + 25 * DAY);
  });

  it('Hard multiplies by 1.2 and drops ease by 0.15', () => {
    const s = answer(reviewCard(10, 2.5), 1, NOW, noFuzz);
    expect(s.intervalDays).toBe(12);
    expect(s.ease).toBe(2.35);
  });

  it('Easy multiplies by ease*1.3 and raises ease by 0.15', () => {
    const s = answer(reviewCard(10, 2.5), 3, NOW, noFuzz);
    expect(s.intervalDays).toBe(33); // 10 * 2.5 * 1.3 = 32.5 → 33
    expect(s.ease).toBe(2.65);
  });

  it('interval always grows by at least one day, even at minimum ease', () => {
    const s = answer(reviewCard(1, MIN_EASE), 1, NOW, noFuzz); // 1*1.2 would round to 1
    expect(s.intervalDays).toBe(2);
  });

  it('interval never exceeds the cap', () => {
    const s = answer(reviewCard(300, 2.5), 2, NOW, noFuzz);
    expect(s.intervalDays).toBe(MAX_INTERVAL_DAYS);
  });

  it('ease never drops below the floor', () => {
    let s = reviewCard(10, MIN_EASE);
    s = answer(s, 1, NOW, noFuzz);
    expect(s.ease).toBe(MIN_EASE);
  });
});

describe('lapses and relearning', () => {
  it('Again on a review card lapses: ease -0.2, interval halved, 10m relearn step', () => {
    const s = answer(reviewCard(20, 2.5), 0, NOW, noFuzz);
    expect(s.phase).toBe('relearning');
    expect(s.lapses).toBe(1);
    expect(s.ease).toBe(2.3);
    expect(s.intervalDays).toBe(10);
    expect(s.due).toBe(NOW + 10 * MINUTE);
  });

  it('a lapsed interval never drops below 1 day', () => {
    const s = answer(reviewCard(1, 2.5), 0, NOW, noFuzz);
    expect(s.intervalDays).toBe(1);
  });

  it('graduating from relearning restores the halved interval', () => {
    let s = answer(reviewCard(20, 2.5), 0, NOW, noFuzz); // relearning, 10d pending
    s = answer(s, 2, s.due, noFuzz);
    expect(s.phase).toBe('review');
    expect(s.intervalDays).toBe(10);
  });

  it(`the ${LEECH_LAPSES}th lapse flags the card as a leech`, () => {
    let s = reviewCard(20, 2.5);
    for (let i = 0; i < LEECH_LAPSES; i++) {
      expect(s.leech).toBe(false);
      s = answer(s, 0, NOW, noFuzz); // lapse
      s = answer(s, 2, s.due, noFuzz); // relearn → review
    }
    expect(s.lapses).toBe(LEECH_LAPSES);
    expect(s.leech).toBe(true);
  });
});

describe('dueness', () => {
  it('new cards are always due', () => {
    expect(isDue(newCardState('a'), NOW)).toBe(true);
  });

  it('a review card due later today is due now; due tomorrow is not', () => {
    const today = { ...reviewCard(5), due: endOfLocalDay(NOW) - 1 };
    const tomorrow = { ...reviewCard(5), due: endOfLocalDay(NOW) + 1 };
    expect(isDue(today, NOW)).toBe(true);
    expect(isDue(tomorrow, NOW)).toBe(false);
  });

  it('learning cards use exact minute timing, with a due-soon horizon', () => {
    const s = answer(newCardState('a'), 2, NOW, noFuzz); // due +10m
    expect(isDue(s, NOW)).toBe(false);
    expect(isDue(s, NOW + 10 * MINUTE)).toBe(true);
    expect(isDueSoon(s, NOW)).toBe(true);
    expect(isDueSoon(s, NOW - 30 * MINUTE)).toBe(false);
  });
});

describe('grade previews', () => {
  it('shows minutes for learning outcomes and days for graduation', () => {
    const p = previewIntervals(newCardState('a'), NOW);
    expect(p[0]).toBe('1m');
    expect(p[2]).toBe('10m');
    expect(p[3]).toBe('4d');
  });

  it('shows day-scale outcomes for a review card', () => {
    const p = previewIntervals(reviewCard(10, 2.5), NOW);
    expect(p[0]).toBe('10m'); // lapse → relearn step
    expect(p[1]).toBe('12d');
    expect(p[2]).toBe('25d');
    expect(p[3]).toBe('1mo'); // 33 days formats as ~1 month
  });

  it('never mutates the card it previews', () => {
    const card = reviewCard(10, 2.5);
    const before = JSON.stringify(card);
    previewIntervals(card, NOW);
    expect(JSON.stringify(card)).toBe(before);
  });
});

describe('long-run behavior', () => {
  it('a consistently-Good card grows roughly geometrically and stays capped', () => {
    let s: CardState = newCardState('a');
    const intervals: number[] = [];
    let t = NOW;
    for (let i = 0; i < 12; i++) {
      s = answer(s, 2, t, noFuzz);
      t = s.due;
      if (s.phase === 'review') intervals.push(s.intervalDays);
    }
    // 1, 3 (2.5→3), 8, 20, 50, 125, 313, 365, 365...
    expect(intervals[0]).toBe(1);
    for (let i = 1; i < intervals.length; i++) {
      expect(intervals[i]).toBeGreaterThanOrEqual(intervals[i - 1]);
    }
    expect(intervals[intervals.length - 1]).toBe(MAX_INTERVAL_DAYS);
  });

  it('a struggling card (alternating fail/pass) stays on short intervals', () => {
    let s: CardState = grades(newCardState('a'), [2, 2]); // graduated at 1d
    for (let i = 0; i < 6; i++) {
      s = answer(s, 0, s.due, noFuzz); // fail
      s = answer(s, 2, s.due, noFuzz); // relearn
    }
    expect(s.intervalDays).toBeLessThanOrEqual(2);
    expect(s.ease).toBe(MIN_EASE);
    expect(s.leech).toBe(true);
  });
});
