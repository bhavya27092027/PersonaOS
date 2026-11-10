import type { CategoryMeta, Difficulty, Question } from '../types';
import { debugCppQuestions } from './cpp';
import { debugJavaQuestions } from './java';
import { debugJsQuestions } from './javascript';
import { debugPyQuestions } from './python';

export const DEBUG_LANGUAGES: CategoryMeta[] = [
    { id: 'debug-cpp', label: 'C++', color: '#00599C', iconKey: 'cpp' },
    { id: 'debug-java', label: 'Java', color: '#ED8B00', iconKey: 'java' },
    { id: 'debug-js', label: 'JavaScript', color: '#F7DF1E', iconKey: 'javascript' },
    { id: 'debug-py', label: 'Python', color: '#3776AB', iconKey: 'python' },
];

export const DEBUG_LANG_MAP = Object.fromEntries(
    DEBUG_LANGUAGES.map((l) => [l.id, l]),
) as Record<string, CategoryMeta>;

export const ALL_DEBUG_QUESTIONS: Question[] = [
    ...debugCppQuestions,
    ...debugJavaQuestions,
    ...debugJsQuestions,
    ...debugPyQuestions,
];

const BY_LANG: Record<string, Question[]> = ALL_DEBUG_QUESTIONS.reduce(
    (acc, q) => {
        (acc[q.category] ||= []).push(q);
        return acc;
    },
    {} as Record<string, Question[]>,
);

export function getDebugQuestions(langId: string, difficulty: Difficulty): Question[] {
    return (BY_LANG[langId] ?? []).filter((q) => q.difficulty === difficulty);
}

export function hasDebugQuestions(langId: string, difficulty: Difficulty): boolean {
    return getDebugQuestions(langId, difficulty).length > 0;
}

export function availableDebugDifficulties(langId: string): Difficulty[] {
    return (['Easy', 'Medium', 'Hard'] as Difficulty[]).filter((d) =>
        hasDebugQuestions(langId, d),
    );
}

export function countDebugByLang(langId: string): number {
    return (BY_LANG[langId] ?? []).length;
}

export function pickDebugQuestions(langId: string, difficulty: Difficulty, limit = 5): Question[] {
    const pool = getDebugQuestions(langId, difficulty);
    const a = [...pool];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, limit);
}
