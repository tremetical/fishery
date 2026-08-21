import type { Deck, Subject, SubjectId } from './types';
import { basicsDeck } from './decks/basics';
import { phoneticDeck, phraseologyDeck } from './decks/radio';
import { airspaceDeck } from './decks/airspace';
import { metarDeck, wxTheoryDeck } from './decks/weather';
import { chartsDeck } from './decks/charts';
import { regsDeck } from './decks/regs';
import { aeroDeck } from './decks/aero';
import { systemsDeck } from './decks/systems';
import { performanceDeck } from './decks/performance';
import { wbDeck } from './decks/wb';
import { aeromedDeck } from './decks/aeromed';
import { proceduresDeck } from './decks/procedures';
import { navDeck } from './decks/nav';
import { airportDeck } from './decks/airport';
import { oralDocsDeck, oralXcDeck, maneuversDeck } from './decks/checkride';

export const SUBJECTS: Subject[] = [
  {
    id: 'basics',
    title: 'Start Here',
    icon: '🌱',
    blurb:
      'The words and ideas every other subject assumes you already know. Begin here.',
  },
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
    tools: [
      {
        label: 'Airspace explorer',
        route: 'tools/airspace',
        hint: 'Tappable cross-section — the whole system in one picture',
      },
    ],
  },
  {
    id: 'weather',
    title: 'Weather',
    icon: '🌦️',
    blurb: 'METAR/TAF, fronts, stability, icing, fog, thunderstorms.',
    tools: [
      {
        label: 'METAR Lab',
        route: 'tools/metar',
        hint: 'Endless generated reports — call the category, decode it all',
      },
    ],
  },
  {
    id: 'charts',
    title: 'Sectional Charts',
    icon: '🗺️',
    blurb: 'Symbols, airspace boundaries, MEF, navaids, special use.',
  },
  {
    id: 'nav',
    title: 'Navigation',
    icon: '🧭',
    blurb: 'Pilotage, dead reckoning, VOR, wind triangle, fuel planning.',
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
    tools: [
      {
        label: 'W&B worksheet',
        route: 'tools/wb',
        hint: 'Full problems, your arithmetic checked step by step',
      },
    ],
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
  {
    id: 'checkride',
    title: 'Checkride Prep',
    icon: '🎓',
    blurb: 'Oral exam scenarios out loud, plus every maneuver’s ACS standards.',
  },
];

export const DECKS: Deck[] = [
  basicsDeck,
  phoneticDeck,
  phraseologyDeck,
  airspaceDeck,
  metarDeck,
  wxTheoryDeck,
  chartsDeck,
  regsDeck,
  aeroDeck,
  systemsDeck,
  performanceDeck,
  wbDeck,
  aeromedDeck,
  proceduresDeck,
  navDeck,
  airportDeck,
  oralDocsDeck,
  oralXcDeck,
  maneuversDeck,
];

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
