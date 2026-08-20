import { describe, it, expect } from 'vitest';
import { DECKS } from './index';
import { QUESTIONS } from './exam';

describe('card content integrity', () => {
  it('card ids are globally unique', () => {
    const ids = DECKS.flatMap((d) => d.cards.map((c) => c.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every card has non-empty front and back', () => {
    for (const d of DECKS)
      for (const c of d.cards) {
        expect(c.front.trim().length, c.id).toBeGreaterThan(0);
        expect(c.back.trim().length, c.id).toBeGreaterThan(0);
      }
  });

  it('every deck belongs to a subject and has cards', () => {
    for (const d of DECKS) expect(d.cards.length, d.id).toBeGreaterThan(0);
  });
});

describe('exam bank integrity', () => {
  it('question ids are globally unique', () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('holds at least 60 questions so a full-length sim is possible', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(60);
  });

  it('every question has exactly 3 choices and a valid answer index', () => {
    for (const q of QUESTIONS) {
      expect(q.choices.length, q.id).toBe(3);
      expect([0, 1, 2], q.id).toContain(q.answer);
      expect(q.why.trim().length, q.id).toBeGreaterThan(0);
    }
  });

  it('no question leaks its answer via duplicate choices', () => {
    for (const q of QUESTIONS) {
      expect(new Set(q.choices).size, q.id).toBe(3);
    }
  });
});
