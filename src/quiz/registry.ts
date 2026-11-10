import type { Difficulty, Question } from './types';
import { reactQuestions } from './questions/react';
import { javascriptQuestions } from './questions/javascript';
import { typescriptQuestions } from './questions/typescript';
import { javaQuestions } from './questions/java';
import { cppQuestions } from './questions/cpp';
import { pythonQuestions } from './questions/python';
import { sqlQuestions } from './questions/sql';
import { dbmsQuestions } from './questions/dbms';
import { osQuestions } from './questions/os';
import { networksQuestions } from './questions/networks';
import { aimlQuestions } from './questions/aiml';
import { CATEGORIES } from './categories';

export const ALL_QUESTIONS: Question[] = [
    ...reactQuestions,
    ...javascriptQuestions,
    ...typescriptQuestions,
    ...javaQuestions,
    ...cppQuestions,
    ...pythonQuestions,
    ...sqlQuestions,
    ...dbmsQuestions,
    ...osQuestions,
    ...networksQuestions,
    ...aimlQuestions,
];

const QUESTIONS_BY_CATEGORY: Record<string, Question[]> = ALL_QUESTIONS.reduce(
    (acc, q) => {
        (acc[q.category] ||= []).push(q);
        return acc;
    },
    {} as Record<string, Question[]>,
);

export function getQuestions(categoryId: string, difficulty: Difficulty): Question[] {
    const pool = QUESTIONS_BY_CATEGORY[categoryId] ?? [];
    return pool.filter((q) => q.difficulty === difficulty);
}

export function hasQuestions(categoryId: string, difficulty: Difficulty): boolean {
    return getQuestions(categoryId, difficulty).length > 0;
}

export function availableDifficulties(categoryId: string): Difficulty[] {
    return (['Easy', 'Medium', 'Hard'] as Difficulty[]).filter((d) =>
        hasQuestions(categoryId, d),
    );
}

export function countByCategory(categoryId: string): number {
    return (QUESTIONS_BY_CATEGORY[categoryId] ?? []).length;
}

export function totalQuestions(): number {
    return ALL_QUESTIONS.length;
}

export function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function pickQuestions(categoryId: string, difficulty: Difficulty, limit = 5): Question[] {
    return shuffle(getQuestions(categoryId, difficulty)).slice(0, limit);
}

export function categoryExists(categoryId: string): boolean {
    return CATEGORIES.some((c) => c.id === categoryId);
}
