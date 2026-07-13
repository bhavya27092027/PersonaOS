export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type BugType =
    | 'Syntax Error'
    | 'Logical Error'
    | 'Runtime Error'
    | 'Infinite Loop'
    | 'Off-By-One'
    | 'Null Pointer'
    | 'Wrong Condition'
    | 'Incorrect Loop';

export interface Question {
    id: string;
    category: string;
    difficulty: Difficulty;
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    xp: number;
    codeSnippet?: string;
    language?: string;
    bugType?: BugType;
    correctedCode?: string;
    bugLine?: number;
    whyThisHappens?: string;
    bestPractice?: string;
}

export interface CategoryMeta {
    id: string;
    label: string;
    color: string;
    iconKey: string;
}

export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export const DIFFICULTY_XP: Record<Difficulty, number> = {
    Easy: 10,
    Medium: 20,
    Hard: 30,
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
    Easy: '#10b981',
    Medium: '#fbbf24',
    Hard: '#ef4444',
};

export const BUG_TYPE_COLORS: Record<BugType, string> = {
    'Syntax Error': '#ef4444',
    'Logical Error': '#fbbf24',
    'Runtime Error': '#ec4899',
    'Infinite Loop': '#f97316',
    'Off-By-One': '#10b981',
    'Null Pointer': '#a78bfa',
    'Wrong Condition': '#7c3aed',
    'Incorrect Loop': '#22d3ee',
};

export interface QuizConfig {
    itemId: string;
    difficulty: Difficulty;
    questions: Question[];
}
