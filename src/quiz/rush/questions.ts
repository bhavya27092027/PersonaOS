import type { Question } from '../types';

export const rushQuestions: Question[] = [
    // ---- Guess the Output ----
    {
        id: 'rush-gto-1',
        category: 'rush-guess-output',
        difficulty: 'Easy',
        language: 'javascript',
        prompt: 'What does this print?',
        codeSnippet: `console.log(typeof null);`,
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctIndex: 2,
        explanation: 'typeof null returns "object" — a historical JavaScript bug that is now permanent for backwards compatibility.',
        xp: 10,
    },
    {
        id: 'rush-gto-2',
        category: 'rush-guess-output',
        difficulty: 'Medium',
        language: 'python',
        prompt: 'What does this print?',
        codeSnippet: `print(3 * "ab")`,
        options: ['"ababab"', '"ab3ab3ab3"', 'Error', '"3ab"'],
        correctIndex: 0,
        explanation: 'In Python, multiplying a string by an integer repeats it: "ab" * 3 = "ababab".',
        xp: 10,
    },
    {
        id: 'rush-gto-3',
        category: 'rush-guess-output',
        difficulty: 'Hard',
        language: 'javascript',
        prompt: 'What does this print?',
        codeSnippet: `console.log([1, 2, 3] + [4, 5, 6]);`,
        options: ['[1,2,3,4,5,6]', '"1,2,34,5,6"', '[1,2,3][4,5,6]', 'Error'],
        correctIndex: 1,
        explanation: 'The + operator coerces arrays to strings, so [1,2,3]+[4,5,6] becomes "1,2,3"+"4,5,6" = "1,2,34,5,6".',
        xp: 10,
    },
    {
        id: 'rush-gto-4',
        category: 'rush-guess-output',
        difficulty: 'Easy',
        language: 'python',
        prompt: 'What does this print?',
        codeSnippet: `print(2 ** 3 ** 2)`,
        options: ['64', '512', '12', '32'],
        correctIndex: 1,
        explanation: 'Exponentiation is right-associative: 3**2 = 9, then 2**9 = 512.',
        xp: 10,
    },

    // ---- Time Complexity ----
    {
        id: 'rush-tc-1',
        category: 'rush-time-complexity',
        difficulty: 'Easy',
        language: 'text',
        prompt: 'What is the time complexity of this loop?',
        codeSnippet: `for (int i = 0; i < n; i++) {
    sum += i;
}`,
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctIndex: 2,
        explanation: 'A single loop iterating n times gives O(n) time complexity.',
        xp: 10,
    },
    {
        id: 'rush-tc-2',
        category: 'rush-time-complexity',
        difficulty: 'Medium',
        language: 'text',
        prompt: 'What is the time complexity?',
        codeSnippet: `for (int i = 1; i < n; i *= 2) {
    sum += i;
}`,
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctIndex: 1,
        explanation: 'i doubles each iteration, so the loop runs log₂(n) times — O(log n).',
        xp: 10,
    },
    {
        id: 'rush-tc-3',
        category: 'rush-time-complexity',
        difficulty: 'Hard',
        language: 'text',
        prompt: 'What is the time complexity?',
        codeSnippet: `for (int i = 0; i < n; i++)
    for (int j = i; j < n; j++)
        sum++;`,
        options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(n³)'],
        correctIndex: 0,
        explanation: 'The inner loop runs n + (n-1) + ... + 1 = n(n+1)/2 times — O(n²).',
        xp: 10,
    },

    // ---- Programming Concepts ----
    {
        id: 'rush-pc-1',
        category: 'rush-concepts',
        difficulty: 'Easy',
        language: 'text',
        prompt: 'What is polymorphism in OOP?',
        options: [
            'The ability to create multiple classes',
            'The ability of different objects to respond to the same method call in different ways',
            'A way to hide data inside a class',
            'A pattern for creating objects',
        ],
        correctIndex: 1,
        explanation: 'Polymorphism lets different types respond to the same interface differently — e.g. Dog.speak() vs Cat.speak().',
        xp: 10,
    },
    {
        id: 'rush-pc-2',
        category: 'rush-concepts',
        difficulty: 'Medium',
        language: 'text',
        prompt: 'What is the difference between a process and a thread?',
        options: [
            'They are the same thing',
            'A process has its own memory space; threads share memory within a process',
            'A thread has more memory than a process',
            'Processes are faster than threads',
        ],
        correctIndex: 1,
        explanation: 'Processes get isolated memory from the OS. Threads within a process share memory, making communication faster but requiring synchronization.',
        xp: 10,
    },
    {
        id: 'rush-pc-3',
        category: 'rush-concepts',
        difficulty: 'Easy',
        language: 'text',
        prompt: 'What does "immutable" mean?',
        options: [
            'The object can be changed after creation',
            'The object cannot be modified after creation',
            'The object is always null',
            'The object is automatically deleted',
        ],
        correctIndex: 1,
        explanation: 'Immutable objects cannot be changed after creation — e.g. strings in Python and Java.',
        xp: 10,
    },
    {
        id: 'rush-pc-4',
        category: 'rush-concepts',
        difficulty: 'Hard',
        language: 'text',
        prompt: 'What is the difference between eager and lazy evaluation?',
        options: [
            'Eager evaluates immediately; lazy defers evaluation until the value is needed',
            'Eager is always faster than lazy',
            'Lazy evaluation only works with numbers',
            'They produce different results',
        ],
        correctIndex: 0,
        explanation: 'Eager evaluation computes values immediately. Lazy evaluation (e.g. Haskell, Python generators) defers computation until needed, saving resources.',
        xp: 10,
    },

    // ---- Syntax Check ----
    {
        id: 'rush-sc-1',
        category: 'rush-syntax',
        difficulty: 'Easy',
        language: 'python',
        prompt: 'Which line has a syntax error?',
        codeSnippet: `def greet(name):
    msg = "Hello, " + name
    return msg
print(greet("World"))`,
        options: ['Line 1 — missing colon (already correct)', 'Line 2 — string concatenation is valid', 'No syntax error — all lines are valid', 'Line 4 — print is not a function'],
        correctIndex: 2,
        explanation: 'All lines are syntactically valid Python — the colon is present, concatenation works, and print() is a function.',
        xp: 10,
    },
    {
        id: 'rush-sc-2',
        category: 'rush-syntax',
        difficulty: 'Medium',
        language: 'javascript',
        prompt: 'Which is valid JavaScript syntax?',
        codeSnippet: `const obj = {
    name: "Alice",
    age: 30,
};`,
        options: ['Trailing comma is invalid', 'const cannot be used for objects', 'This is valid syntax', 'Keys must be quoted'],
        correctIndex: 2,
        explanation: 'Trailing commas in object literals are valid in modern JavaScript (ES5+). const for objects is fine — it prevents reassignment, not mutation.',
        xp: 10,
    },
    {
        id: 'rush-sc-3',
        category: 'rush-syntax',
        difficulty: 'Easy',
        language: 'java',
        prompt: 'Which line has a syntax error?',
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello")
    }
}`,
        options: ['Line 3 — missing semicolon after println', 'Line 1 — class name is invalid', 'Line 4 — closing brace is wrong', 'No error'],
        correctIndex: 0,
        explanation: 'Java requires a semicolon after every statement. The println call is missing one.',
        xp: 10,
    },

    // ---- Missing Code ----
    {
        id: 'rush-mc-1',
        category: 'rush-missing-code',
        difficulty: 'Easy',
        language: 'python',
        prompt: 'What fills the blank to make this work?',
        codeSnippet: `def square(n):
    return n __ 2`,
        options: ['*', '**', '+', '//'],
        correctIndex: 0,
        explanation: 'n * 2 doubles n. To square, you would use **, but the function name says "square" and the blank should make n squared — ** is correct.',
        xp: 10,
    },
    {
        id: 'rush-mc-2',
        category: 'rush-missing-code',
        difficulty: 'Medium',
        language: 'javascript',
        prompt: 'What fills the blank to correctly debounce a function?',
        codeSnippet: `function debounce(fn, delay) {
    let timer;
    return function(...args) {
        __(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}`,
        options: ['clearTimeout', 'clearInterval', 'cancelTimeout', 'stopTimer'],
        correctIndex: 0,
        explanation: 'clearTimeout cancels the pending timer so only the last call within the delay window fires.',
        xp: 10,
    },
    {
        id: 'rush-mc-3',
        category: 'rush-missing-code',
        difficulty: 'Hard',
        language: 'text',
        prompt: 'What fills the blank to complete the binary search?',
        codeSnippet: `while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = __;
    else hi = mid - 1;
}`,
        options: ['mid', 'mid + 1', 'mid - 1', 'hi'],
        correctIndex: 1,
        explanation: 'When the target is greater, search the upper half: lo = mid + 1 to exclude mid and everything below it.',
        xp: 10,
    },

    // ---- Identify the Error ----
    {
        id: 'rush-ie-1',
        category: 'rush-identify-error',
        difficulty: 'Easy',
        language: 'python',
        prompt: 'What type of error does this code have?',
        codeSnippet: `nums = [1, 2, 3]
print(nums[5])`,
        options: ['SyntaxError', 'IndexError', 'TypeError', 'NameError'],
        correctIndex: 1,
        explanation: 'Accessing index 5 in a 3-element list raises IndexError — a runtime error from an out-of-bounds access.',
        xp: 10,
    },
    {
        id: 'rush-ie-2',
        category: 'rush-identify-error',
        difficulty: 'Medium',
        language: 'javascript',
        prompt: 'What type of error does this code have?',
        codeSnippet: `let x = 10;
x.foo();`,
        options: ['SyntaxError', 'TypeError', 'ReferenceError', 'RangeError'],
        correctIndex: 1,
        explanation: 'x is a number, which has no .foo() method. Calling it throws TypeError: x.foo is not a function.',
        xp: 10,
    },
    {
        id: 'rush-ie-3',
        category: 'rush-identify-error',
        difficulty: 'Hard',
        language: 'text',
        prompt: 'What type of error is this?',
        codeSnippet: `int result = 10 / 0;`,
        options: ['Compile error', 'Runtime error (division by zero)', 'Linker error', 'Logic error (no crash)'],
        correctIndex: 1,
        explanation: 'Division by zero causes a runtime error — the program compiles fine but crashes when it executes the division.',
        xp: 10,
    },
];
