// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { COURSE } from '../content/course';
import { deckById } from '../content';
import { QUESTIONS } from '../content/exam';
import {
  buildUnits,
  buildCheckpointItems,
  continueTarget,
  lessonCards,
  unitUnlocked,
  stepDone,
} from './course';

describe('course structure', () => {
  it('every unit deck exists', () => {
    for (const u of COURSE)
      for (const d of u.decks) expect(deckById(d.deckId), `${u.id}:${d.deckId}`).toBeDefined();
  });

  it('lessons cover every card of their decks exactly once', () => {
    for (const unit of buildUnits()) {
      for (const d of unit.spec.decks) {
        const deck = deckById(d.deckId)!;
        const covered = unit.steps
          .filter((s) => s.type === 'lesson' && s.deckId === d.deckId)
          .flatMap((s) => lessonCards(s as never).map((c) => c.id));
        expect(covered.length, `${unit.spec.id}:${d.deckId}`).toBe(deck.cards.length);
        expect(new Set(covered).size).toBe(covered.length);
      }
    }
  });

  it('checkpoint exam draws are satisfiable from the bank', () => {
    for (const u of COURSE) {
      if (!u.checkpoint || u.checkpoint.examCount === 0) continue;
      const pool = QUESTIONS.filter((q) => u.checkpoint!.areas.includes(q.area));
      expect(pool.length, u.id).toBeGreaterThanOrEqual(u.checkpoint.examCount);
    }
  });

  it('checkpoints generate a full quiz with valid answers', () => {
    for (const unit of buildUnits()) {
      if (!unit.spec.checkpoint) continue;
      const items = buildCheckpointItems(unit);
      const want = unit.spec.checkpoint.examCount + unit.spec.checkpoint.cardCount;
      expect(items.length, unit.spec.id).toBeGreaterThanOrEqual(want - 1); // tolerate 1 skipped card MCQ
      for (const it2 of items) {
        expect(it2.choices.length).toBe(3);
        expect(it2.choices[it2.answer]).toBeDefined();
        expect(new Set(it2.choices).size).toBe(3);
      }
    }
  });

  it('a fresh student is unlocked only into unit 1, continuing at its first lesson', () => {
    const units = buildUnits();
    expect(unitUnlocked(units, 0)).toBe(true);
    expect(unitUnlocked(units, 1)).toBe(false);
    const t = continueTarget(units);
    expect(t?.unit.spec.id).toBe(units[0].spec.id);
    expect(t?.step.type).toBe('lesson');
    expect(stepDone(t!.step)).toBe(false);
  });

  it('the course ends with the final sim unit', () => {
    const last = COURSE[COURSE.length - 1];
    expect(last.finalSim).toBe(true);
  });
});
