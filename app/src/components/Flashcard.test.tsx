// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/preact';
import { Flashcard } from './Flashcard';
import type { Card } from '../content/types';

afterEach(cleanup);

const SECRET = 'XRAY-SECRET-ANSWER';
const WHY = 'SECRET-EXPLANATION';
const card: Card = {
  id: 'test:leak',
  front: 'What is the secret?',
  back: SECRET,
  why: WHY,
  cite: '14 CFR 61.109',
};

describe('Flashcard answer never leaks before reveal', () => {
  it('answer, explanation, and citation are absent from the DOM pre-reveal', () => {
    render(<Flashcard card={card} revealed={false} onReveal={() => {}} />);
    // Not merely invisible — absent. document-wide, not container-scoped.
    expect(document.body.innerHTML).not.toContain(SECRET);
    expect(document.body.innerHTML).not.toContain(WHY);
    expect(document.body.innerHTML).not.toContain('61.109');
    expect(document.body.textContent).toContain('What is the secret?');
  });

  it('answer appears only after reveal', () => {
    let revealed = false;
    const { rerender, getByText } = render(
      <Flashcard card={card} revealed={revealed} onReveal={() => (revealed = true)} />,
    );
    fireEvent.click(getByText(/tap to reveal/i));
    expect(revealed).toBe(true);
    rerender(<Flashcard card={card} revealed={true} onReveal={() => {}} />);
    expect(document.body.textContent).toContain(SECRET);
    expect(document.body.textContent).toContain(WHY);
  });

  it('re-render with a NEW card while revealed=false never flashes the new answer', () => {
    const { rerender } = render(
      <Flashcard card={card} revealed={true} onReveal={() => {}} />,
    );
    const next: Card = { id: 'test:2', front: 'Next?', back: 'NEXT-SECRET' };
    // The exact prototype bug: advancing to the next card while the previous
    // one was revealed. revealed must flip to false in the same render.
    rerender(<Flashcard card={next} revealed={false} onReveal={() => {}} />);
    expect(document.body.innerHTML).not.toContain('NEXT-SECRET');
  });
});
