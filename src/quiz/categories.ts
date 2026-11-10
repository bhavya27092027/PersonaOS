import type { CategoryMeta } from './types';

export const CATEGORIES: CategoryMeta[] = [
    { id: 'react', label: 'React', color: '#61DAFB', iconKey: 'react' },
    { id: 'javascript', label: 'JavaScript', color: '#F7DF1E', iconKey: 'javascript' },
    { id: 'typescript', label: 'TypeScript', color: '#3178C6', iconKey: 'typescript' },
    { id: 'java', label: 'Java', color: '#ED8B00', iconKey: 'java' },
    { id: 'cpp', label: 'C++', color: '#00599C', iconKey: 'cpp' },
    { id: 'python', label: 'Python', color: '#3776AB', iconKey: 'python' },
    { id: 'sql', label: 'SQL', color: '#E48E00', iconKey: 'sql' },
    { id: 'dbms', label: 'DBMS', color: '#4169E1', iconKey: 'dbms' },
    { id: 'os', label: 'Operating Systems', color: '#22d3ee', iconKey: 'os' },
    { id: 'networks', label: 'Computer Networks', color: '#ec4899', iconKey: 'networks' },
    { id: 'aiml', label: 'AI / ML', color: '#FF6F00', iconKey: 'aiml' },
];

export const CATEGORY_MAP = Object.fromEntries(
    CATEGORIES.map((c) => [c.id, c]),
) as Record<string, CategoryMeta>;
