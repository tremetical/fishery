import type { Deck, Subject, SubjectId } from './types';
import { phoneticDeck, phraseologyDeck } from './decks/radio';

export const SUBJECTS: Subject[] = [
  {
    id: 'radio',
    title: 'Radio & Comms',
    icon: '🎧',
    blurb: 'Phonetic alphabet, phraseology, readbacks, light gun signals.',
    tools: [
      {
        label: 'Radio trainer',
        route: 'radio',
        hint: 'Spoken drills: tail numbers, call-ups, readbacks',
      },
    ],
  },
  {
    id: 'airspace',
    title: 'Airspace',
    icon: '🗼',
    blurb: 'Classes A–G: dimensions, entry, equipment, VFR minimums.',
  },
  {
    id: 'weather',
    title: 'Weather',
    icon: '🌦️',
    blurb: 'METAR/TAF, fronts, stability, icing, fog, thunderstorms.',
  },
  {
    id: 'charts',
    title: 'Sectional Charts',
    icon: '🗺️',
    blurb: 'Symbols, airspace boundaries, MEF, navaids, special use.',
  },
  {
    id: 'regs',
    title: 'Regulations',
    icon: '📖',
    blurb: 'FAR 61 & 91 — what gets tested and what gets pilots violated.',
  },
  {
    id: 'aero',
    title: 'Aerodynamics',
    icon: '🌀',
    blurb: 'Lift, stalls, spins, load factor, stability, turns.',
  },
  {
    id: 'systems',
    title: 'Aircraft Systems',
    icon: '⚙️',
    blurb: 'Engine, fuel, electrical, pitot-static, gyros, carb ice.',
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: '📈',
    blurb: 'Density altitude, takeoff/landing distance, cruise charts.',
  },
  {
    id: 'wb',
    title: 'Weight & Balance',
    icon: '⚖️',
    blurb: 'The method: weights, arms, moments, CG, envelopes.',
  },
  {
    id: 'aeromed',
    title: 'Aeromedical',
    icon: '🫀',
    blurb: 'Hypoxia, hyperventilation, illusions, IMSAFE, night vision.',
  },
  {
    id: 'procedures',
    title: 'Flight Ops',
    icon: '🛫',
    blurb: 'Pattern work, right-of-way, wake turbulence, emergencies.',
  },
];

export const DECKS: Deck[] = [phoneticDeck, phraseologyDeck];

export function decksFor(subject: SubjectId): Deck[] {
  return DECKS.filter((d) => d.subject === subject);
}

export function deckById(id: string): Deck | undefined {
  return DECKS.find((d) => d.id === id);
}

export function subjectById(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

const cardIndex = new Map(DECKS.flatMap((d) => d.cards.map((c) => [c.id, { card: c, deck: d }])));
export function cardById(id: string): { card: import('./types').Card; deck: Deck } | undefined {
  return cardIndex.get(id);
}
