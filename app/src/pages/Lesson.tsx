import type { JSX } from 'preact';
import type { Route } from '../lib/router';
import { SessionView } from '../components/SessionView';
import { buildUnits, lessonCards, type Step } from '../lib/course';
import { store, type SessionItem } from '../lib/store';
import { isDue, isDueSoon } from '../lib/srs';

/**
 * A path lesson: introduces its slice of cards in authored order (the path
 * IS the introduction mechanism, so the daily new-card budget doesn't
 * apply here), with any due reviews from the slice first.
 */
export function LessonPage(props: { route: Route }): JSX.Element {
  const [, unitId, idxStr] = props.route.parts;
  const units = buildUnits();
  const unit = units.find((u) => u.spec.id === unitId);
  const step = unit?.steps.find(
    (s): s is Extract<Step, { type: 'lesson' }> =>
      s.type === 'lesson' && s.index === Number(idxStr),
  );

  if (!unit || !step) return <div class="panel">Lesson not found.</div>;

  const build = (): SessionItem[] => {
    const now = Date.now();
    const cards = lessonCards(step);
    const review: SessionItem[] = [];
    const fresh: SessionItem[] = [];
    for (const c of cards) {
      const s = store.state(c.id);
      const item = { card: c, deckId: step.deckId };
      if (s.phase === 'new') fresh.push(item);
      else if (isDue(s, now) || isDueSoon(s, now)) review.push(item);
    }
    return [...review, ...fresh];
  };

  return (
    <SessionView
      title={`${unit.spec.title} · ${step.label}`}
      build={build}
      exitTo={`unit/${unit.spec.id}`}
      mode="lesson"
    />
  );
}
