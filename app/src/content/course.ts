import type { SubjectId } from './types';

/*
 * The course path: ordered units built from the decks, drills, and question
 * bank. Each unit = bite-size lessons (auto-split from its decks) + drills
 * + a checkpoint mini-test. Passing the checkpoint (80%) completes the unit
 * and unlocks the next. The Study tab stays unlocked for free-range study —
 * the path only orders what "next" means.
 */

export interface DrillSpec {
  /** counter key in store.drills */
  kind: string;
  count: number;
  route: string;
  label: string;
  hint: string;
}

export interface UnitSpec {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  /** decks whose cards this unit teaches, split into lessons of lessonSize */
  decks: { deckId: string; lessonSize: number }[];
  drills?: DrillSpec[];
  /** checkpoint composition; omitted only for the final-exam unit */
  checkpoint?: {
    /** exam-bank areas to draw from */
    areas: SubjectId[];
    examCount: number;
    /** MCQs generated from this unit's own cards */
    cardCount: number;
  };
  /** final unit: complete by passing a full timed sim */
  finalSim?: boolean;
}

export const CHECKPOINT_PASS = 0.8;
export const SIM_PASS = 0.7;

export const COURSE: UnitSpec[] = [
  {
    id: 'radio-1',
    title: 'Phonetic alphabet',
    icon: '🔤',
    tagline: 'Alfa to Zulu, zero to niner — out loud.',
    decks: [{ deckId: 'phonetic', lessonSize: 12 }],
    drills: [
      {
        kind: 'spell',
        count: 10,
        route: 'radio/spell',
        label: 'Spell-it drill ×10',
        hint: 'Tail numbers and airport idents, phonetically',
      },
    ],
    checkpoint: { areas: [], examCount: 0, cardCount: 8 },
  },
  {
    id: 'radio-2',
    title: 'Radio calls',
    icon: '🎧',
    tagline: 'Say the right words, in the right order.',
    decks: [{ deckId: 'phraseology', lessonSize: 10 }],
    drills: [
      {
        kind: 'calls',
        count: 6,
        route: 'radio/calls',
        label: 'Readback drill ×6',
        hint: 'Hear a clearance, say the readback',
      },
    ],
    checkpoint: { areas: ['radio'], examCount: 4, cardCount: 4 },
  },
  {
    id: 'airspace',
    title: 'Airspace',
    icon: '🗼',
    tagline: 'Who owns the sky from the surface to FL600.',
    decks: [{ deckId: 'airspace', lessonSize: 11 }],
    drills: [
      {
        kind: 'airspace',
        count: 6,
        route: 'tools/airspace',
        label: 'Explore all six classes',
        hint: 'Tap through A, B, C, D, E, and G in the explorer',
      },
    ],
    checkpoint: { areas: ['airspace'], examCount: 5, cardCount: 3 },
  },
  {
    id: 'weather-1',
    title: 'METAR & TAF',
    icon: '🌦️',
    tagline: 'Read the weather like a sentence.',
    decks: [{ deckId: 'metar', lessonSize: 10 }],
    drills: [
      {
        kind: 'metar',
        count: 6,
        route: 'tools/metar',
        label: 'METAR Lab ×6',
        hint: 'Call the category, decode the report',
      },
    ],
    checkpoint: { areas: ['weather'], examCount: 4, cardCount: 4 },
  },
  {
    id: 'weather-2',
    title: 'Weather theory',
    icon: '🌩️',
    tagline: 'Fronts, fog, ice, and why the PNW invented all three.',
    decks: [{ deckId: 'wx-theory', lessonSize: 10 }],
    checkpoint: { areas: ['weather'], examCount: 5, cardCount: 3 },
  },
  {
    id: 'charts',
    title: 'Sectional charts',
    icon: '🗺️',
    tagline: 'Every symbol between you and the terrain.',
    decks: [{ deckId: 'charts', lessonSize: 10 }],
    checkpoint: { areas: ['charts'], examCount: 5, cardCount: 3 },
  },
  {
    id: 'nav',
    title: 'Navigation',
    icon: '🧭',
    tagline: 'Getting there on purpose, with fuel left.',
    decks: [{ deckId: 'nav', lessonSize: 8 }],
    checkpoint: { areas: ['nav'], examCount: 5, cardCount: 3 },
  },
  {
    id: 'aero',
    title: 'Aerodynamics',
    icon: '🌀',
    tagline: 'Why it flies, and why it stops flying.',
    decks: [{ deckId: 'aero', lessonSize: 9 }],
    checkpoint: { areas: ['aero'], examCount: 5, cardCount: 3 },
  },
  {
    id: 'systems',
    title: 'Aircraft systems',
    icon: '⚙️',
    tagline: 'The machine, its plumbing, and its lies.',
    decks: [{ deckId: 'systems', lessonSize: 9 }],
    checkpoint: { areas: ['systems'], examCount: 5, cardCount: 3 },
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: '📈',
    tagline: 'Density altitude and the honest arithmetic of runways.',
    decks: [{ deckId: 'performance', lessonSize: 8 }],
    checkpoint: { areas: ['performance'], examCount: 5, cardCount: 3 },
  },
  {
    id: 'wb',
    title: 'Weight & balance',
    icon: '⚖️',
    tagline: 'Moments, CG, and the go/no-go call.',
    decks: [{ deckId: 'wb', lessonSize: 7 }],
    drills: [
      {
        kind: 'wb',
        count: 2,
        route: 'tools/wb',
        label: 'Work 2 full W&B problems',
        hint: 'Every step of your arithmetic, checked',
      },
    ],
    checkpoint: { areas: ['wb'], examCount: 4, cardCount: 4 },
  },
  {
    id: 'regs',
    title: 'Regulations',
    icon: '📖',
    tagline: 'FAR 61 & 91 — tested, and violated.',
    decks: [{ deckId: 'regs', lessonSize: 10 }],
    checkpoint: { areas: ['regs'], examCount: 6, cardCount: 2 },
  },
  {
    id: 'aeromed',
    title: 'Aeromedical',
    icon: '🫀',
    tagline: 'The pilot is a system too.',
    decks: [{ deckId: 'aeromed', lessonSize: 10 }],
    checkpoint: { areas: ['aeromed'], examCount: 5, cardCount: 3 },
  },
  {
    id: 'ops',
    title: 'Flight operations',
    icon: '🛫',
    tagline: 'Patterns, runways, wake, and when the engine gets quiet.',
    decks: [
      { deckId: 'airport', lessonSize: 8 },
      { deckId: 'procedures', lessonSize: 9 },
    ],
    checkpoint: { areas: ['procedures'], examCount: 5, cardCount: 3 },
  },
  {
    id: 'final',
    title: 'The written',
    icon: '🏁',
    tagline: 'Prove it: 60 questions, 2 h 30 m, 70% to pass.',
    decks: [],
    finalSim: true,
  },
];
