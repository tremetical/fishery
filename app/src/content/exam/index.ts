import type { ExamQuestion } from './types';
import {
  regsQuestions,
  airspaceQuestions,
  radioQuestions,
  proceduresQuestions,
} from './bank1';
import { weatherQuestions, chartsQuestions, aeroQuestions } from './bank2';
import {
  systemsQuestions,
  performanceQuestions,
  wbQuestions,
  aeromedQuestions,
} from './bank3';
import {
  navQuestions,
  regs2Questions,
  performance2Questions,
  airspace2Questions,
  weather2Questions,
  systems2Questions,
  procedures2Questions,
  wb2Questions,
  aeromed2Questions,
} from './bank4';
import {
  sectionalFigQuestions,
  perfFigQuestions,
  wbFigQuestions,
  asiFigQuestions,
  vorFigQuestions,
} from './bank5';

export type { ExamQuestion } from './types';

export const QUESTIONS: ExamQuestion[] = [
  ...regsQuestions,
  ...airspaceQuestions,
  ...radioQuestions,
  ...proceduresQuestions,
  ...weatherQuestions,
  ...chartsQuestions,
  ...aeroQuestions,
  ...systemsQuestions,
  ...performanceQuestions,
  ...wbQuestions,
  ...aeromedQuestions,
  ...navQuestions,
  ...regs2Questions,
  ...performance2Questions,
  ...airspace2Questions,
  ...weather2Questions,
  ...systems2Questions,
  ...procedures2Questions,
  ...wb2Questions,
  ...aeromed2Questions,
  ...sectionalFigQuestions,
  ...perfFigQuestions,
  ...wbFigQuestions,
  ...asiFigQuestions,
  ...vorFigQuestions,
];

export function questionById(id: string): ExamQuestion | undefined {
  return QUESTIONS.find((q) => q.id === id);
}
