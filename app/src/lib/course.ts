/*
 * Course runtime: turns the unit specs into concrete steps, derives
 * completion from existing data (card states, drill counters, exam
 * results) rather than storing its own "done" flags — so progress
 * survives backups and never disagrees with reality.
 */

import { COURSE, CHECKPOINT_PASS, SIM_PASS, type UnitSpec, type DrillSpec } from '../content/course';
import { deckById } from '../content';
import { QUESTIONS } from '../content/exam';
import type { Card } from '../content/types';
import { store } from './store';

export type Step =
  | { type: 'lesson'; unitId: string; index: number; deckId: string; from: number; to: number; label: string; sub: string }
  | { type: 'drill'; unitId: string; index: number; spec: DrillSpec; label: string; sub: string }
  | { type: 'checkpoint'; unitId: string; index: number; label: string; sub: string }
  | { type: 'finalsim'; unitId: string; index: number; label: string; sub: string };

export interface Unit {
  spec: UnitSpec;
  steps: Step[];
}

export function buildUnits(): Unit[] {
  return COURSE.map((spec) => {
    const steps: Step[] = [];
    let i = 0;
    for (const d of spec.decks) {
      const deck = deckById(d.deckId);
      if (!deck) continue;
      const n = deck.cards.length;
      const lessons = Math.ceil(n / d.lessonSize);
      for (let l = 0; l < lessons; l++) {
        const from = l * d.lessonSize;
        const to = Math.min(n, from + d.lessonSize);
        steps.push({
          type: 'lesson',
          unitId: spec.id,
          index: i++,
          deckId: deck.id,
          from,
          to,
          label: lessons > 1 ? `Lesson ${l + 1} of ${lessons}` : 'Lesson',
          sub: `${to - from} new cards · ${deck.title}`,
        });
      }
    }
    for (const spec2 of spec.drills ?? []) {
      steps.push({
        type: 'drill',
        unitId: spec.id,
        index: i++,
        spec: spec2,
        label: spec2.label,
        sub: spec2.hint,
      });
    }
    if (spec.checkpoint) {
      steps.push({
        type: 'checkpoint',
        unitId: spec.id,
        index: i++,
        label: 'Checkpoint',
        sub: `Mini-test — ${Math.round(CHECKPOINT_PASS * 100)}% to pass`,
      });
    }
    if (spec.finalSim) {
      steps.push({
        type: 'finalsim',
        unitId: spec.id,
        index: i++,
        label: 'Full exam simulation',
        sub: `60 questions · 2 h 30 m · ${Math.round(SIM_PASS * 100)}% to pass`,
      });
    }
    return { spec, steps };
  });
}

export function lessonCards(step: Extract<Step, { type: 'lesson' }>): Card[] {
  const deck = deckById(step.deckId);
  return deck ? deck.cards.slice(step.from, step.to) : [];
}

export function stepDone(step: Step): boolean {
  switch (step.type) {
    case 'lesson':
      return lessonCards(step).every((c) => store.state(c.id).phase !== 'new');
    case 'drill':
      return (store.drills[step.spec.kind] ?? 0) >= step.spec.count;
    case 'checkpoint':
      return store.exams.some(
        (e) =>
          e.mode === 'checkpoint' &&
          e.checkpoint === step.unitId &&
          e.correct / e.total >= CHECKPOINT_PASS,
      );
    case 'finalsim':
      return store.exams.some(
        (e) => e.mode === 'sim' && e.correct / e.total >= SIM_PASS,
      );
  }
}

/** Progress within a drill step, for "7/10 reps" labels. */
export function drillProgress(step: Extract<Step, { type: 'drill' }>): number {
  return Math.min(step.spec.count, store.drills[step.spec.kind] ?? 0);
}

export function unitDone(unit: Unit): boolean {
  return unit.steps.every(stepDone);
}

export function unitUnlocked(units: Unit[], idx: number): boolean {
  return idx === 0 || unitDone(units[idx - 1]);
}

export function unitProgress(unit: Unit): { done: number; total: number } {
  const done = unit.steps.filter(stepDone).length;
  return { done, total: unit.steps.length };
}

/** Route (hash path) that a step starts at. */
export function stepRoute(step: Step): string {
  switch (step.type) {
    case 'lesson':
      return `lesson/${step.unitId}/${step.index}`;
    case 'drill':
      return step.spec.route;
    case 'checkpoint':
      return `checkpoint/${step.unitId}`;
    case 'finalsim':
      return 'exam/sim';
  }
}

/** The next thing to do on the path: first not-done step of the first
 * unlocked, not-done unit. Null when the whole course is complete. */
export function continueTarget(units: Unit[]): { unit: Unit; step: Step } | null {
  for (let i = 0; i < units.length; i++) {
    if (!unitUnlocked(units, i)) return null; // shouldn't happen: previous incomplete returns first
    const step = units[i].steps.find((s) => !stepDone(s));
    if (step) return { unit: units[i], step };
  }
  return null;
}

/* ---------------- checkpoint quiz generation ---------------- */

export interface CheckItem {
  q: string;
  choices: string[];
  answer: number;
  why?: string;
  cite?: string;
  figure?: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * A checkpoint mixes real exam-bank questions with MCQs generated from the
 * unit's own cards (correct back + two distractor backs from the same deck
 * — wrong by construction since backs are unique per deck).
 */
export function buildCheckpointItems(unit: Unit): CheckItem[] {
  const cp = unit.spec.checkpoint;
  if (!cp) return [];
  const items: CheckItem[] = [];

  const examPool = shuffle(QUESTIONS.filter((q) => cp.areas.includes(q.area)));
  for (const q of examPool.slice(0, cp.examCount)) {
    const perm = shuffle([0, 1, 2]);
    items.push({
      q: q.q,
      choices: perm.map((i) => q.choices[i]),
      answer: perm.indexOf(q.answer),
      why: q.why,
      cite: q.cite,
      figure: q.figure,
    });
  }

  const unitCards = unit.steps
    .filter((s): s is Extract<Step, { type: 'lesson' }> => s.type === 'lesson')
    .flatMap(lessonCards)
    .filter((c) => c.back.length <= 160);
  const deckBacks = new Map<string, string[]>();
  for (const s of unit.steps)
    if (s.type === 'lesson' && !deckBacks.has(s.deckId)) {
      const deck = deckById(s.deckId)!;
      deckBacks.set(s.deckId, deck.cards.map((c) => c.back));
    }

  for (const card of shuffle(unitCards).slice(0, cp.cardCount)) {
    const deckId = card.id.split(':')[0];
    const pool = (deckBacks.get(deckId) ?? []).filter(
      (b) => b !== card.back && b.length <= 160,
    );
    const distractors = shuffle(pool).slice(0, 2);
    if (distractors.length < 2) continue;
    const choices = shuffle([card.back, ...distractors]);
    items.push({
      q: card.front,
      choices,
      answer: choices.indexOf(card.back),
      why: card.why,
      cite: card.cite,
    });
  }

  return shuffle(items);
}
