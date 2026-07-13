import { useMemo } from 'react';

type Lang = 'cpp' | 'java' | 'javascript' | 'python' | 'text';

interface Token {
    text: string;
    type: 'keyword' | 'string' | 'comment' | 'number' | 'function' | 'punct' | 'plain';
}

const KEYWORDS: Record<string, string[]> = {
    cpp: ['int', 'float', 'double', 'char', 'bool', 'void', 'long', 'short', 'unsigned', 'signed', 'const', 'static', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'class', 'struct', 'public', 'private', 'protected', 'new', 'delete', 'this', 'true', 'false', 'nullptr', 'include', 'using', 'namespace', 'std', 'template', 'typename', 'auto', 'vector', 'cout', 'cin', 'endl'],
    java: ['int', 'float', 'double', 'char', 'boolean', 'void', 'long', 'short', 'byte', 'final', 'static', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'class', 'interface', 'extends', 'implements', 'public', 'private', 'protected', 'new', 'this', 'super', 'true', 'false', 'null', 'import', 'package', 'try', 'catch', 'finally', 'throw', 'throws', 'abstract', 'instanceof', 'String', 'System', 'out', 'println', 'print', 'Integer'],
    javascript: ['var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'class', 'extends', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'try', 'catch', 'finally', 'throw', 'import', 'export', 'from', 'default', 'async', 'await', 'console', 'log', 'of', 'in'],
    python: ['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 'class', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'lambda', 'global', 'nonlocal', 'True', 'False', 'None', 'and', 'or', 'not', 'is', 'in', 'pass', 'yield', 'assert', 'self', 'print', 'len', 'range', 'int', 'str', 'float', 'list', 'dict'],
    text: [],
};

const COLORS: Record<Token['type'], string> = {
    keyword: '#7c3aed',
    string: '#10b981',
    comment: '#6b7280',
    number: '#fbbf24',
    function: '#00d4ff',
    punct: '#9ca3af',
    plain: '#e5e7eb',
};

function tokenize(code: string, lang: Lang): Token[] {
    const kw = new Set(KEYWORDS[lang] ?? []);
    const tokens: Token[] = [];
    let i = 0;
    const n = code.length;

    const isWord = (c: string) => /[A-Za-z0-9_]/.test(c);

    while (i < n) {
        const c = code[i];

        // Newline / whitespace
        if (c === '\n' || c === ' ' || c === '\t') {
            let j = i;
            while (j < n && (code[j] === ' ' || code[j] === '\t' || code[j] === '\n')) j++;
            tokens.push({ text: code.slice(i, j), type: 'plain' });
            i = j;
            continue;
        }

        // Line comment
        if (c === '/' && code[i + 1] === '/') {
            let j = i;
            while (j < n && code[j] !== '\n') j++;
            tokens.push({ text: code.slice(i, j), type: 'comment' });
            i = j;
            continue;
        }
        if (c === '#') {
            let j = i;
            while (j < n && code[j] !== '\n') j++;
            tokens.push({ text: code.slice(i, j), type: 'comment' });
            i = j;
            continue;
        }

        // Block comment
        if (c === '/' && code[i + 1] === '*') {
            let j = i + 2;
            while (j < n && !(code[j] === '*' && code[j + 1] === '/')) j++;
            j = Math.min(n, j + 2);
            tokens.push({ text: code.slice(i, j), type: 'comment' });
            i = j;
            continue;
        }

        // String
        if (c === '"' || c === "'" || c === '`') {
            const quote = c;
            let j = i + 1;
            while (j < n && code[j] !== quote) {
                if (code[j] === '\\') j++;
                j++;
            }
            j = Math.min(n, j + 1);
            tokens.push({ text: code.slice(i, j), type: 'string' });
            i = j;
            continue;
        }

        // Number
        if (/[0-9]/.test(c)) {
            let j = i;
            while (j < n && /[0-9.xXa-fA-F_]/.test(code[j])) j++;
            tokens.push({ text: code.slice(i, j), type: 'number' });
            i = j;
            continue;
        }

        // Word (keyword / function / plain)
        if (isWord(c)) {
            let j = i;
            while (j < n && isWord(code[j])) j++;
            const word = code.slice(i, j);
            if (kw.has(word)) {
                tokens.push({ text: word, type: 'keyword' });
            } else if (code[j] === '(') {
                tokens.push({ text: word, type: 'function' });
            } else {
                tokens.push({ text: word, type: 'plain' });
            }
            i = j;
            continue;
        }

        // Punctuation
        tokens.push({ text: c, type: 'punct' });
        i++;
    }

    return tokens;
}

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
}

export function CodeBlock({ code, language = 'text', title }: CodeBlockProps) {
    const lang = (language in KEYWORDS ? language : 'text') as Lang;
    const tokens = useMemo(() => tokenize(code, lang), [code, lang]);
    const lineCount = code.split('\n').length;

    return (
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d0d14]">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-space-mono text-[11px] text-gray-500 uppercase tracking-wide">
                    {title ?? lang}
                </span>
            </div>

            {/* Code body with line numbers */}
            <div className="flex overflow-x-auto">
                <div className="shrink-0 select-none py-4 px-3 text-right border-r border-white/5 bg-white/[0.01]">
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i} className="font-space-mono text-[12px] leading-[1.6] text-gray-600">
                            {i + 1}
                        </div>
                    ))}
                </div>
                <pre className="py-4 px-4 flex-1 min-w-0">
                    <code className="font-space-mono text-[13px] leading-[1.6]">
                        {tokens.map((t, idx) => (
                            <span key={idx} style={{ color: COLORS[t.type] }}>
                                {t.text}
                            </span>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}
