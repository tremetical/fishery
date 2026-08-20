import { deck } from '../types';

/*
 * Weight & balance concepts. The W&B Worksheet tool generates full problems
 * to work through step by step; these cards cover the method and the traps.
 */

export const wbDeck = deck(
  {
    id: 'wb',
    subject: 'wb',
    title: 'Weight & balance',
    description:
      'The method — datum, arm, moment, CG — and the traps around fuel, limits, and shifting weight.',
  },
  [
    {
      slug: 'definitions',
      front: 'Define **datum**, **arm**, and **moment**.',
      back: 'Datum: the reference plane all measurements start from. Arm: distance from datum to the item. Moment: weight × arm.',
      why: 'The datum is arbitrary (often the firewall or spinner tip) — only the manufacturer’s choice matters, and the POH uses it consistently.',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'cg-formula',
      front: 'The one formula that is all of weight & balance?',
      back: '**CG = total moment ÷ total weight.**',
      why: 'Every W&B problem: list weights, multiply each by its arm, add everything, divide. Walking an examiner through it out loud is the checkride skill.',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'empty-weight',
      front: 'What’s included in **basic empty weight**?',
      back: 'Airframe, engines, permanently installed equipment, unusable fuel, full operating fluids including full oil.',
      why: 'It is specific to YOUR aircraft — from its current W&B record, not a generic POH number.',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'useful-load',
      front: '**Useful load** =',
      back: 'Max gross weight − basic empty weight: everything you’re allowed to add (people, fuel, bags).',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'fuel-weight',
      front: 'Weight of **avgas** per gallon? Oil?',
      back: 'Avgas: 6 lb/gal. Oil: 7.5 lb/gal.',
      why: '40 gallons = 240 lb — a passenger’s worth of weight you can choose not to carry when the runway is short.',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'overweight',
      front: 'Effects of flying **over max gross weight**?',
      back: 'Longer takeoff, weaker climb, higher stall speed, lower cruise, worse structural margins, longer landing — and you’re a test pilot outside the certified envelope.',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'cg-limits-why',
      front: 'What actually sets the **forward** and **aft** CG limits?',
      back: 'Forward: enough elevator authority to raise the nose (flare/stall recovery). Aft: enough longitudinal stability to recover from stalls at all.',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'fuel-burn-cg',
      front: 'Does burning fuel move the CG?',
      back: 'Yes, unless the tank arm equals the CG: CG moves AWAY from the tank location as fuel burns. Check W&B at takeoff AND landing weights.',
      why: 'Legal at takeoff, out of limits after three hours is a real failure mode.',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'weight-shift',
      front: 'The **weight-shift** formula (moving bags between compartments)?',
      back: 'weight moved ÷ total weight = ΔCG ÷ distance moved. (Solve for whichever piece you need.)',
      why: 'Exam staple: “How far must 50 lb move to shift CG 2 inches?”',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'moment-index',
      front: 'Your POH lists “moment/1000.” Why, and what must you remember?',
      back: 'Moments get huge, so tables divide by 1,000 (a moment index). Keep every number in the SAME index — mixing raw and /1000 moments is the classic arithmetic faceplant.',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'envelope',
      front: 'You plot weight vs CG (or moment) and the point sits on the envelope **line**. Legal?',
      back: 'On the line is within limits — but you have zero margin for the errors in your assumptions (passenger weights, bag estimates). Move something.',
      cite: 'PHAK Ch. 10',
    },
    {
      slug: 'utility-category',
      front: 'Your trainer has **normal** and **utility** category envelopes. What’s the difference?',
      back: 'Utility (allowed spins/some maneuvers, higher load factors: +4.4g vs +3.8g) requires a smaller, usually more forward envelope — often front seats only, limited fuel/bags.',
      cite: 'PHAK Ch. 10; POH',
    },
    {
      slug: 'stations',
      front: 'Typical **stations** you’ll fill in for a 4-seat trainer W&B?',
      back: 'Basic empty weight (with its moment), front seats, rear seats, fuel, baggage area(s) — each with the POH arm.',
      cite: 'POH Section 6',
    },
    {
      slug: 'lateral',
      front: 'Is there a **lateral** (left-right) W&B consideration in a trainer?',
      back: 'Not one you compute — but uneven fuel between wing tanks shows up as a persistent roll trim demand.',
      cite: 'PHAK Ch. 10',
    },
  ],
);
