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
];

export function questionById(id: string): ExamQuestion | undefined {
  return QUESTIONS.find((q) => q.id === id);
}
