import type { Question } from '../types';

export const debugJsQuestions: Question[] = [
    {
        id: 'dbg-js-1',
        category: 'debug-js',
        difficulty: 'Easy',
        bugType: 'Syntax Error',
        language: 'javascript',
        prompt: 'What is the syntax error in this JavaScript code?',
        codeSnippet: `const user = {
  name: "Alice",
  age: 30
  email: "alice@example.com"
};

console.log(user.email);`,
        options: [
            'Missing comma after `age: 30` on line 3 — object properties must be separated by commas',
            'const cannot be used to declare objects',
            'Object keys must be wrapped in quotes',
            'console.log is not a valid function',
        ],
        correctIndex: 0,
        explanation: 'In JavaScript object literals, each property must be separated from the next by a comma. Line 3 (`age: 30`) is missing its trailing comma, so when the parser reaches `email` on the next line it sees an unexpected identifier and throws a SyntaxError before any code runs.',
        correctedCode: `const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

console.log(user.email);`,
        bugLine: 3,
        whyThisHappens: 'The JavaScript parser tokenizes source into an Abstract Syntax Tree in a single pass before execution. Without a comma between `age: 30` and `email: ...`, the parser sees the identifier `email` where it expected either a comma or a closing brace, so it reports an unexpected token and halts — this is a SyntaxError, which is thrown at parse time, not runtime.',
        bestPractice: 'Enable a linter (ESLint with the comma-style or comma-dangle rule) to catch missing commas automatically. In modern JS, trailing commas after the last property are allowed and recommended — they make diffs cleaner and prevent this exact error when adding a new property.',
        xp: 10,
    },
    {
        id: 'dbg-js-2',
        category: 'debug-js',
        difficulty: 'Easy',
        bugType: 'Wrong Condition',
        language: 'javascript',
        prompt: 'This function should return true for valid emails and false otherwise. What is the bug?',
        codeSnippet: `function isValidEmail(email) {
  return email.includes("@") && !email.includes(".");
}

console.log(isValidEmail("alice@example.com")); // Expected: true
console.log(isValidEmail("bob@site"));          // Expected: false`,
        options: [
            'The `!` before the dot check inverts the logic — valid emails (which contain a dot) return false, while invalid ones return true',
            'The includes() method does not exist on strings',
            'The function should use || instead of &&',
            'Email validation must always use a regex, includes() is invalid',
        ],
        correctIndex: 0,
        explanation: 'The intent is to return true when an email has both "@" AND ".". The bug is the `!` before the dot check: it inverts the result so that containing a dot makes the function return false. "alice@example.com" (has a dot) returns false, while "bob@site" (no dot) returns true — the exact opposite of the goal.',
        correctedCode: `function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

console.log(isValidEmail("alice@example.com")); // true
console.log(isValidEmail("bob@site"));          // false`,
        bugLine: 2,
        whyThisHappens: 'The logical NOT operator (!) coerces its operand to a boolean and inverts it. Due to operator precedence, `!email.includes(".")` is parsed as `!(email.includes("."))`, turning "contains a dot" into "does NOT contain a dot". Combined with &&, the whole expression returns true only when the string has @ but no dot — the opposite of valid email logic.',
        bestPractice: 'When a condition produces the opposite of the intended result, audit every negation operator. Write out the expected truth table for both valid and invalid inputs before coding the boolean expression — this catches inverted logic at design time.',
        xp: 10,
    },
    {
        id: 'dbg-js-3',
        category: 'debug-js',
        difficulty: 'Easy',
        bugType: 'Off-By-One',
        language: 'javascript',
        prompt: 'This should grab the first 3 items from the array, but it only returns 2. What is the off-by-one bug?',
        codeSnippet: `const items = [10, 20, 30, 40, 50];
const firstThree = items.slice(0, 2);
console.log(firstThree); // Expected: [10, 20, 30]`,
        options: [
            'The second argument should be 3 — slice\'s end index is exclusive, so slice(0, 2) returns indices 0 and 1 only',
            'The first argument should be 1, not 0',
            'slice mutates the original array, so items is now shorter',
            'slice does not exist on arrays, it should be splice',
        ],
        correctIndex: 0,
        explanation: 'Array.prototype.slice(start, end) includes the element at `start` but excludes the element at `end` — the end index is exclusive. So slice(0, 2) returns elements at indices 0 and 1, which is [10, 20]. To get three elements you need slice(0, 3).',
        correctedCode: `const items = [10, 20, 30, 40, 50];
const firstThree = items.slice(0, 3);
console.log(firstThree); // [10, 20, 30]`,
        bugLine: 2,
        whyThisHappens: 'JavaScript arrays use zero-based indexing, and slice() treats its second argument as an exclusive upper bound. This half-open interval convention [start, end) — start inclusive, end exclusive — is shared by substring, substr, and many array methods, so passing the desired count N as the end value gives only N-1 elements when start is 0.',
        bestPractice: 'Remember that JS range APIs use half-open intervals [start, end). When you want N elements starting at index i, use slice(i, i + N). Mentally translate "end index" as "stop before this index" to avoid off-by-one errors.',
        xp: 10,
    },
    {
        id: 'dbg-js-4',
        category: 'debug-js',
        difficulty: 'Medium',
        bugType: 'Logical Error',
        language: 'javascript',
        prompt: 'This async function fetches a user and is supposed to return their display name, but it always returns undefined. Why?',
        codeSnippet: `async function getDisplayName(userId) {
  const res = await fetch("/api/users/" + userId);
  const data = await res.json();

  data.profile.firstName + " " + data.profile.lastName;
}

console.log(await getDisplayName(42));`,
        options: [
            'The name expression is computed but never returned — a block-bodied function needs an explicit `return` to produce a value',
            'fetch() does not return a Promise, so await is invalid',
            'String concatenation with + does not work inside async functions',
            'The function must be declared with function, not async function',
        ],
        correctIndex: 0,
        explanation: 'In a function with a block body ({ ... }), an expression statement like `a + b;` is evaluated and then its result is discarded. Without a `return` keyword, the function completes with the value undefined. The display name is calculated but never sent back to the caller, so console.log prints undefined.',
        correctedCode: `async function getDisplayName(userId) {
  const res = await fetch("/api/users/" + userId);
  const data = await res.json();

  return data.profile.firstName + " " + data.profile.lastName;
}

console.log(await getDisplayName(42));`,
        bugLine: 5,
        whyThisHappens: 'A function body wrapped in braces requires an explicit return statement to produce a value; without it the function records a normal Completion with value undefined. Only arrow functions with a concise body (no braces) implicitly return the single expression. This is why developers accustomed to arrow-function shorthand often forget return in regular or block-bodied async functions.',
        bestPractice: 'Always end value-producing functions with an explicit return statement. If you prefer implicit returns, use a block-less arrow function: `(userId) => fetch(...).then(res => res.json()).then(d => d.profile.firstName + " " + d.profile.lastName)`. A linter rule like consistent-return can flag functions that sometimes return a value and sometimes do not.',
        xp: 20,
    },
    {
        id: 'dbg-js-5',
        category: 'debug-js',
        difficulty: 'Medium',
        bugType: 'Incorrect Loop',
        language: 'javascript',
        prompt: 'This should remove all zeros from the array, but with adjacent zeros it leaves one behind. What is the loop bug?',
        codeSnippet: `function removeZeros(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

console.log(removeZeros([0, 0, 1, 2])); // Expected: [1, 2], got: [0, 1, 2]`,
        options: [
            'After splice(i, 1) the array shifts left, so the next element moves into index i — but i then increments, skipping it. Iterate backwards or decrement i after splicing',
            'splice() does not remove elements, it only copies them',
            'The loop should use a while loop instead of for',
            'The comparison should be == not ===',
        ],
        correctIndex: 0,
        explanation: 'When splice(i, 1) removes the element at index i, every element after it shifts down by one index. But the for loop then increments i, so the element that slid into position i is never examined. With input [0, 0, 1, 2], the first 0 is removed (array becomes [0, 1, 2]), then i becomes 1 and skips right past the 0 that moved into index 0.',
        correctedCode: `function removeZeros(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === 0) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

console.log(removeZeros([0, 0, 1, 2])); // [1, 2]`,
        bugLine: 3,
        whyThisHappens: 'Array.prototype.splice mutates the array in place and re-indexes every element after the removed one, shifting them left by one. A forward for loop assumes indices are stable across iterations, so when the array contracts mid-iteration the loop counter advances past the newly shifted element, effectively skipping it. This is a classic mutation-during-iteration bug.',
        bestPractice: 'When removing elements from an array during iteration, iterate backwards (from length-1 down to 0) so shifting never affects unvisited indices. Alternatively, build a new array with filter() and avoid in-place mutation entirely — the functional approach eliminates this entire class of bug.',
        xp: 20,
    },
    {
        id: 'dbg-js-6',
        category: 'debug-js',
        difficulty: 'Hard',
        bugType: 'Infinite Loop',
        language: 'javascript',
        prompt: 'This loop is supposed to remove all empty strings from the array, but it freezes the page and never returns. Why does it loop forever?',
        codeSnippet: `function cleanList(words) {
  let i = 0;
  while (i < words.length) {
    if (words[i] === "") {
      words.splice(i, 0);
    } else {
      i++;
    }
  }
  return words;
}

console.log(cleanList(["a", "", "b"])); // Expected: ["a", "b"]`,
        options: [
            'splice(i, 0) removes zero elements, so the empty string is never deleted. Since it stays at index i and the else-branch is skipped, i never increments and the while condition is always true',
            'splice(i, 0) removes all elements at once, making the array empty',
            'The while condition should be i <= words.length',
            'The string "" is falsy, so === never matches it',
        ],
        correctIndex: 0,
        explanation: 'Array.prototype.splice(start, deleteCount) treats the second argument as the number of elements to remove. Passing 0 means "remove nothing", so the empty string is never deleted. Because it stays at words[i] and the if-branch keeps matching, the else-branch (i++) never executes — i is stuck and the while loop never terminates.',
        correctedCode: `function cleanList(words) {
  let i = 0;
  while (i < words.length) {
    if (words[i] === "") {
      words.splice(i, 1);
    } else {
      i++;
    }
  }
  return words;
}

console.log(cleanList(["a", "", "b"])); // ["a", "b"]`,
        bugLine: 5,
        whyThisHappens: 'The splice() signature is splice(start, deleteCount, ...itemsToAdd). A deleteCount of 0 is the idiomatic way to insert elements without removing any — so splice(i, 0) is a no-op removal. Because nothing is removed the empty string persists at index i, the if-condition keeps succeeding, the else (i++) is never reached, and the while condition (i < words.length) never becomes false. The loop has no progress guarantee and runs indefinitely.',
        bestPractice: 'Memorize the splice(start, deleteCount) signature: the second argument is how many elements to delete, not an index. When removing in place, prefer filter() for a pure replacement, or always decrement i (or iterate backwards) after a successful splice so you do not skip shifted elements or get stuck.',
        xp: 30,
    },
    {
        id: 'dbg-js-7',
        category: 'debug-js',
        difficulty: 'Hard',
        bugType: 'Null Pointer',
        language: 'javascript',
        prompt: 'This function reads a user\'s city, but it throws a runtime error for users who have no address on file. What is the bug?',
        codeSnippet: `function getUserCity(user) {
  return user.address.city;
}

const bob = { name: "Bob", address: null };
console.log(getUserCity(bob)); // Expected: "Unknown" or graceful handling`,
        options: [
            'user.address is null, and accessing .city on null throws "Cannot read properties of null (reading \'city\')". Use optional chaining (?.) or a null guard',
            'The function parameter should be typed as an object',
            'null is not a valid value in JavaScript objects',
            'The property should be user.address().city with parentheses',
        ],
        correctIndex: 0,
        explanation: 'When user.address is null, the expression user.address.city attempts to read the property `city` from null. JavaScript throws a TypeError: "Cannot read properties of null (reading \'city\')" at runtime. The fix is to guard against null before accessing nested properties — either with optional chaining (user.address?.city) or an explicit check.',
        correctedCode: `function getUserCity(user) {
  return user.address?.city ?? "Unknown";
}

const bob = { name: "Bob", address: null };
console.log(getUserCity(bob)); // "Unknown"`,
        bugLine: 2,
        whyThisHappens: 'JavaScript\'s property access algorithm first evaluates the base reference (user.address). If that base is null or undefined, the engine cannot look up any property on it — null and undefined have no internal [[Get]] handler — so it immediately throws a TypeError. Unlike Java or C# where this is a NullPointerException, JS calls it a TypeError, but the mechanism is the same: dereferencing a non-object reference.',
        bestPractice: 'Use optional chaining (?.) to safely navigate potentially null or undefined properties: user.address?.city returns undefined instead of throwing. Combine with the nullish coalescing operator (??) to provide a fallback: user.address?.city ?? "Unknown". Always validate external data shapes (e.g. API responses) before deep property access.',
        xp: 30,
    },
    {
        id: 'dbg-js-8',
        category: 'debug-js',
        difficulty: 'Hard',
        bugType: 'Runtime Error',
        language: 'javascript',
        prompt: 'This function parses a JSON string of usage stats and classifies each value as "high" or "low". It throws at runtime instead. What is the bug?',
        codeSnippet: `function summarizeStats(jsonStr) {
  const stats = JSON.parse(jsonStr);
  const summary = {};
  for (const [key, value] of stats) {
    summary[key] = value > 100 ? "high" : "low";
  }
  return summary;
}

console.log(summarizeStats('{"visits":250,"bounce":40,"signups":120}'));`,
        options: [
            'for...of iterates iterable values (arrays, strings, Maps, Sets), but a plain object is not iterable — use Object.entries() to get an iterable [key, value] array',
            'JSON.parse returns a string, not an object, so destructuring fails',
            'The JSON string must be wrapped in square brackets to be valid',
            'The ternary operator cannot be used inside a for...of loop',
        ],
        correctIndex: 0,
        explanation: 'for...of iterates over values that implement the iterable protocol — arrays, strings, Maps, Sets, etc. A plain object parsed from a JSON string like {"visits":250,...} is not iterable: it has no Symbol.iterator method. Attempting for...of on it throws "TypeError: stats is not iterable" at runtime. The fix is to call Object.entries(stats), which returns an iterable array of [key, value] pairs.',
        correctedCode: `function summarizeStats(jsonStr) {
  const stats = JSON.parse(jsonStr);
  const summary = {};
  for (const [key, value] of Object.entries(stats)) {
    summary[key] = value > 100 ? "high" : "low";
  }
  return summary;
}

console.log(summarizeStats('{"visits":250,"bounce":40,"signups":120}'));
// { visits: "high", bounce: "low", signups: "high" }`,
        bugLine: 4,
        whyThisHappens: 'Iteration in JavaScript is governed by the iterable protocol: a value is iterable only if it exposes a function at the well-known symbol Symbol.iterator. Arrays, strings, Maps, and Sets all implement this protocol; plain objects do not. JSON.parse on an object literal produces a plain object with no Symbol.iterator, so when for...of tries to obtain an iterator it gets undefined and throws a TypeError at runtime.',
        bestPractice: 'Use for...of for arrays and other iterables; use Object.entries(), Object.keys(), or Object.values() to get an iterable view of a plain object. When consuming JSON, check Array.isArray() to distinguish arrays from objects before choosing the iteration strategy. TypeScript can catch this at compile time by erroring on for...of over a non-iterable type.',
        xp: 30,
    },
];
