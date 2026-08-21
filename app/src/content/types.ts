export type SubjectId =
  | 'radio'
  | 'airspace'
  | 'weather'
  | 'charts'
  | 'nav'
  | 'regs'
  | 'aero'
  | 'systems'
  | 'performance'
  | 'wb'
  | 'aeromed'
  | 'procedures'
  | 'checkride';

export interface Card {
  /** Stable id, `${deckId}:${slug}` — review history is keyed on this, so
   * never rename a slug once shipped; retire the card and add a new one. */
  id: string;
  /** Prompt. Supports **bold**, `mono`, and newlines. */
  front: string;
  /** Answer — never placed in the DOM until revealed (see Flashcard.tsx). */
  back: string;
  /** Why: explanation, mnemonic, gotcha. Shown under the answer. */
  why?: string;
  /** Source, e.g. "14 CFR 91.155" or "AIM 4-3-2". */
  cite?: string;
  /** Set when the author couldn't fully verify the reference. Rendered as a
   * visible flag so it never gets memorized as gospel. */
  unverified?: boolean;
  /** Radio decks: text to speak aloud via TTS (may differ from `back`). */
  speak?: string;
  /** Oral-prep cards: prompt the user to answer out loud before revealing. */
  sayAloud?: boolean;
}

export interface Deck {
  id: string;
  subject: SubjectId;
  title: string;
  description: string;
  cards: Card[];
}

export interface Subject {
  id: SubjectId;
  title: string;
  icon: string; // emoji
  blurb: string;
  /** interactive tools that live with this subject */
  tools?: { label: string; route: string; hint: string }[];
}

/** Convenience for authoring: expands slugs into full card ids. */
export function deck(
  meta: Omit<Deck, 'cards'>,
  cards: (Omit<Card, 'id'> & { slug: string })[],
): Deck {
  const seen = new Set<string>();
  return {
    ...meta,
    cards: cards.map(({ slug, ...c }) => {
      const id = `${meta.id}:${slug}`;
      if (seen.has(id)) throw new Error(`duplicate card slug: ${id}`);
      seen.add(id);
      return { id, ...c };
    }),
  };
}
