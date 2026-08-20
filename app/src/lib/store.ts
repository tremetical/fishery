/*
 * App state: card review states, settings, review log. Single in-memory
 * source of truth hydrated from IndexedDB at startup; every mutation writes
 * through to IndexedDB before notifying subscribers.
 */

import { useEffect, useState } from 'preact/hooks';
import { idb, requestPersistence } from './db';
import {
  answer,
  newCardState,
  isDue,
  isDueSoon,
  type CardState,
  type Grade,
  type Phase,
} from './srs';
import type { Card, Deck } from '../content/types';

export interface LogEntry {
  ts: number;
  cardId: string;
  deckId: string;
  grade: Grade;
  /** phase before the answer was applied */
  phase: Phase;
  /** interval (days) after the answer, 0 while learning */
  ivl: number;
}

export interface ExamResult {
  ts: number;
  mode: 'practice' | 'sim';
  total: number;
  correct: number;
  seconds: number;
  areas: Record<string, { correct: number; total: number }>;
  missedIds: string[];
}

export interface Settings {
  newPerDay: number;
  sessionCap: number;
  ttsEnabled: boolean;
  ttsRate: number;
}

export const DEFAULT_SETTINGS: Settings = {
  newPerDay: 10,
  sessionCap: 20,
  ttsEnabled: true,
  ttsRate: 0.92,
};

interface DayCounter {
  date: string; // local YYYY-MM-DD
  introduced: number;
  reviews: number;
}

// ---- module state ----
const cardStates = new Map<string, CardState>();
let settings: Settings = { ...DEFAULT_SETTINGS };
let day: DayCounter = { date: localDate(Date.now()), introduced: 0, reviews: 0 };
let log: LogEntry[] = [];
let exams: ExamResult[] = [];
let ready = false;
let persisted = false;

let version = 0;
const subs = new Set<() => void>();
function notify(): void {
  version++;
  subs.forEach((f) => f());
}

export function localDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

function rollDay(now: number): void {
  const today = localDate(now);
  if (day.date !== today) {
    day = { date: today, introduced: 0, reviews: 0 };
    void idb.put('kv', day, 'day');
  }
}

// ---- init ----
let initPromise: Promise<void> | null = null;

export function initStore(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const [states, kvSettings, kvDay, logRows, examRows] = await Promise.all([
      idb.getAll<CardState>('cards'),
      idb.get<Settings>('kv', 'settings'),
      idb.get<DayCounter>('kv', 'day'),
      idb.getAll<LogEntry>('log'),
      idb.getAll<ExamResult>('exams'),
    ]);
    for (const s of states) cardStates.set(s.id, s);
    if (kvSettings) settings = { ...DEFAULT_SETTINGS, ...kvSettings };
    if (kvDay) day = kvDay;
    rollDay(Date.now());
    log = logRows.sort((a, b) => a.ts - b.ts);
    exams = examRows.sort((a, b) => a.ts - b.ts);
    persisted = await requestPersistence();
    ready = true;
    notify();
  })();
  return initPromise;
}

/** Re-render subscriber components whenever the store changes. */
export function useStore(): number {
  const [, setV] = useState(version);
  useEffect(() => {
    const f = () => setV(version);
    subs.add(f);
    // catch changes between first render and effect
    f();
    return () => {
      subs.delete(f);
    };
  }, []);
  return version;
}

export const store = {
  get ready(): boolean {
    return ready;
  },
  get persisted(): boolean {
    return persisted;
  },
  get settings(): Settings {
    return settings;
  },
  get log(): readonly LogEntry[] {
    return log;
  },
  get exams(): readonly ExamResult[] {
    return exams;
  },

  async setSettings(patch: Partial<Settings>): Promise<void> {
    settings = { ...settings, ...patch };
    await idb.put('kv', settings, 'settings');
    notify();
  },

  state(cardId: string): CardState {
    return cardStates.get(cardId) ?? newCardState(cardId);
  },

  /** Cards introduced today, for the daily new-card budget. */
  get introducedToday(): number {
    rollDay(Date.now());
    return day.introduced;
  },
  get reviewsToday(): number {
    rollDay(Date.now());
    return day.reviews;
  },

  async answerCard(card: Card, deckId: string, grade: Grade): Promise<CardState> {
    const now = Date.now();
    rollDay(now);
    const prev = this.state(card.id);
    const next = answer(prev, grade, now, Math.random);
    cardStates.set(card.id, next);

    if (prev.phase === 'new') day.introduced += 1;
    day.reviews += 1;

    const entry: LogEntry = {
      ts: now,
      cardId: card.id,
      deckId,
      grade,
      phase: prev.phase,
      ivl: next.intervalDays,
    };
    log.push(entry);

    await Promise.all([
      idb.put('cards', next),
      idb.add('log', entry),
      idb.put('kv', day, 'day'),
    ]);
    notify();
    return next;
  },

  async addExamResult(r: ExamResult): Promise<void> {
    exams.push(r);
    await idb.add('exams', r);
    notify();
  },

  // ---- derived queries ----

  deckCounts(deckDef: Deck, now = Date.now()): {
    total: number;
    newCards: number;
    learning: number;
    due: number;
    leeches: number;
  } {
    let newCards = 0,
      learning = 0,
      due = 0,
      leeches = 0;
    for (const c of deckDef.cards) {
      const s = this.state(c.id);
      if (s.phase === 'new') newCards++;
      else if (s.phase === 'learning' || s.phase === 'relearning') {
        learning++;
        if (isDue(s, now) || isDueSoon(s, now)) due++;
      } else if (isDue(s, now)) due++;
      if (s.leech) leeches++;
    }
    return { total: deckDef.cards.length, newCards, learning, due, leeches };
  },

  /** All leech cards across the given decks — the "trouble spots" list. */
  leeches(decks: Deck[]): { card: Card; deck: Deck; state: CardState }[] {
    const out: { card: Card; deck: Deck; state: CardState }[] = [];
    for (const d of decks)
      for (const c of d.cards) {
        const s = cardStates.get(c.id);
        if (s?.leech) out.push({ card: c, deck: d, state: s });
      }
    out.sort((a, b) => b.state.lapses - a.state.lapses);
    return out;
  },

  /** Study streak: consecutive days (ending today or yesterday) with ≥1 review. */
  streak(now = Date.now()): number {
    const days = new Set(log.map((e) => localDate(e.ts)));
    exams.forEach((e) => days.add(localDate(e.ts)));
    let streak = 0;
    const cursor = new Date(now);
    if (!days.has(localDate(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1);
    while (days.has(localDate(cursor.getTime()))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  },
};

// ---- session building ----

export interface SessionItem {
  card: Card;
  deckId: string;
}

/**
 * Build a study queue: due learning cards first (finish what you started),
 * then due reviews (most overdue first), then new cards within the daily
 * budget. Capped so a session stays five-minutes-friendly.
 */
export function buildSession(
  decks: Deck[],
  opts?: { cap?: number; includeNew?: boolean },
): SessionItem[] {
  const now = Date.now();
  const cap = opts?.cap ?? settings.sessionCap;
  const includeNew = opts?.includeNew ?? true;

  const learning: { item: SessionItem; due: number }[] = [];
  const review: { item: SessionItem; due: number }[] = [];
  const fresh: SessionItem[] = [];

  for (const d of decks) {
    for (const c of d.cards) {
      const s = store.state(c.id);
      const item = { card: c, deckId: d.id };
      if (s.phase === 'new') fresh.push(item);
      else if (s.phase === 'learning' || s.phase === 'relearning') {
        if (isDue(s, now) || isDueSoon(s, now)) learning.push({ item, due: s.due });
      } else if (isDue(s, now)) review.push({ item, due: s.due });
    }
  }

  learning.sort((a, b) => a.due - b.due);
  review.sort((a, b) => a.due - b.due);

  const queue: SessionItem[] = [
    ...learning.map((x) => x.item),
    ...review.map((x) => x.item),
  ].slice(0, cap);

  if (includeNew) {
    const budget = Math.max(0, settings.newPerDay - store.introducedToday);
    const room = Math.max(0, cap - queue.length);
    queue.push(...fresh.slice(0, Math.min(budget, room)));
  }
  return queue;
}
