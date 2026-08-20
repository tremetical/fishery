/*
 * Weight & balance problem generator. The airplane is a fictional
 * "Trainer 180" with numbers resembling a late-model C172 — clearly labeled
 * practice data, NOT any real aircraft's POH. Answers derive from the same
 * structure the prompt does.
 */

import type { Rng } from './radiogen';

export const WB_AIRCRAFT = {
  name: 'Trainer 180 (practice airplane — use YOUR POH for real flights)',
  maxGross: 2400,
  arms: { front: 37, rear: 73, fuel: 48, baggage: 95 },
  fuelCapacityGal: 40,
  baggageLimit: 120,
  // Envelope: forward limit 35.0" up to 1950 lb, then linear to 38.5" at
  // 2400 lb. Aft limit 47.3" at all weights.
  fwdLimitAt(weight: number): number {
    if (weight <= 1950) return 35.0;
    return 35.0 + ((weight - 1950) / (2400 - 1950)) * 3.5;
  },
  aftLimit: 47.3,
};

export interface WbRow {
  label: string;
  weight: number;
  arm: number;
}

export interface WbProblem {
  rows: WbRow[];
  totalWeight: number;
  totalMoment: number;
  cg: number; // inches aft of datum
  overGross: boolean;
  fwdLimit: number;
  cgOk: boolean;
}

function ri(min: number, max: number, rng: Rng): number {
  return min + Math.floor(rng() * (max - min + 1));
}

export function makeWbProblem(rng: Rng = Math.random): WbProblem {
  const a = WB_AIRCRAFT.arms;
  const emptyWeight = ri(1620, 1720, rng);
  const emptyArm = 38.5 + ri(0, 10, rng) / 10; // 38.5–39.5
  const pilot = ri(14, 22, rng) * 10;
  const frontPax = rng() < 0.6 ? ri(11, 21, rng) * 10 : 0;
  const rearPax = rng() < 0.5 ? ri(10, 20, rng) * 10 + (rng() < 0.4 ? ri(10, 17, rng) * 10 : 0) : 0;
  const fuelGal = ri(15, 40, rng);
  const baggage = rng() < 0.7 ? ri(1, 8, rng) * 10 : 0;

  const rows: WbRow[] = [
    { label: 'Basic empty weight', weight: emptyWeight, arm: emptyArm },
    { label: 'Pilot & front passenger', weight: pilot + frontPax, arm: a.front },
    ...(rearPax > 0 ? [{ label: 'Rear passengers', weight: rearPax, arm: a.rear }] : []),
    { label: `Fuel (${fuelGal} gal @ 6 lb)`, weight: fuelGal * 6, arm: a.fuel },
    ...(baggage > 0 ? [{ label: 'Baggage', weight: baggage, arm: a.baggage }] : []),
  ];

  const totalWeight = rows.reduce((s, r) => s + r.weight, 0);
  const totalMoment = rows.reduce((s, r) => s + r.weight * r.arm, 0);
  const cg = totalMoment / totalWeight;
  const fwdLimit = WB_AIRCRAFT.fwdLimitAt(totalWeight);
  const overGross = totalWeight > WB_AIRCRAFT.maxGross;
  const cgOk = cg >= fwdLimit && cg <= WB_AIRCRAFT.aftLimit;

  return { rows, totalWeight, totalMoment, cg, overGross, fwdLimit, cgOk };
}
