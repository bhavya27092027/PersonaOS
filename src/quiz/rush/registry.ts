import type { Question } from '../types';
import { rushQuestions } from './questions';

export const RUSH_CATEGORIES = [
    'rush-guess-output',
    'rush-time-complexity',
    'rush-concepts',
    'rush-syntax',
    'rush-missing-code',
    'rush-identify-error',
] as const;

export const RUSH_CATEGORY_LABELS: Record<string, string> = {
    'rush-guess-output': 'Guess the Output',
    'rush-time-complexity': 'Time Complexity',
    'rush-concepts': 'Programming Concepts',
    'rush-syntax': 'Syntax Check',
    'rush-missing-code': 'Missing Code',
    'rush-identify-error': 'Identify the Error',
};

export const RUSH_ALL_QUESTIONS = rushQuestions;

export function pickRushQuestions(limit: number): Question[] {
    const a = [...rushQuestions];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, limit);
}
