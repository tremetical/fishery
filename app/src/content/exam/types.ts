import type { SubjectId } from '../types';

export interface ExamQuestion {
  id: string;
  area: SubjectId;
  q: string;
  /** exactly three choices, FAA-style */
  choices: [string, string, string];
  /** index into choices */
  answer: 0 | 1 | 2;
  why: string;
  cite?: string;
  unverified?: boolean;
  /** id of a training figure (see components/figures.tsx) shown with the question */
  figure?: string;
}

export function qbank(
  prefix: string,
  area: SubjectId,
  items: (Omit<ExamQuestion, 'id' | 'area'> & { slug: string })[],
): ExamQuestion[] {
  const seen = new Set<string>();
  return items.map(({ slug, ...rest }) => {
    const id = `${prefix}:${slug}`;
    if (seen.has(id)) throw new Error(`duplicate question: ${id}`);
    seen.add(id);
    return { id, area, ...rest };
  });
}
