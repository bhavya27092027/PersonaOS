import type { Question } from '../types';

export const debugPyQuestions: Question[] = [
    {
        id: 'dbg-py-1',
        category: 'debug-py',
        difficulty: 'Easy',
        bugType: 'Syntax Error',
        language: 'python',
        prompt: 'What is the syntax error in this Python function?',
        codeSnippet: `def greet(name):
    message = "Hello, " + name
    return message`,
        options: [
            'Missing colon after the function signature — Python requires `:` after `def greet(name):`',
            '`return` is not a valid keyword outside a class',
            'Parameters must have type annotations like `name: str`',
            'Strings must use single quotes, not double quotes',
        ],
        correctIndex: 0,
        explanation:
            'Python uses indentation plus a colon to define a compound statement block. The `def` line ends with `(name)` and no colon, so the interpreter cannot tell where the body begins and raises `SyntaxError: expected \':\'.` before the code ever runs.',
        correctedCode: `def greet(name):
    message = "Hello, " + name
    return message`,
        bugLine: 1,
        whyThisHappens:
            'Python\u2019s grammar treats `def name(params):` as a single compound-statement header terminated by a colon. Without the colon, the parser sees `def greet(name)` followed by an indented line, which is not a valid continuation, so CPython\u2019s tokenizer raises `SyntaxError` at parse time \u2014 before any code executes.',
        bestPractice:
            'Configure a linter (flake8, ruff) and an IDE that highlights missing colons in real time. Run Python with `-W error` during development so structural mistakes surface immediately rather than accumulating.',
        xp: 10,
    },
    {
        id: 'dbg-py-2',
        category: 'debug-py',
        difficulty: 'Easy',
        bugType: 'Logical Error',
        language: 'python',
        prompt:
            'This should print only the even numbers from 1 to 10, but it prints the odd ones. What is the logical bug?',
        codeSnippet: `for i in range(1, 11):
    if i % 2 == 1:
        print(i)`,
        options: [
            'The condition `i % 2 == 1` selects odd numbers instead of evens; it should be `i % 2 == 0`',
            '`range(1, 11)` is invalid because the stop value is 11',
            '`print` must be capitalized as `Print`',
            'The loop variable `i` must be declared with `let` first',
        ],
        correctIndex: 0,
        explanation:
            'The intent is to print evens, but `i % 2 == 1` is true for every odd number (odd values leave a remainder of 1), so the loop prints 1, 3, 5, 7, 9 \u2014 exactly the wrong half. The correct test for evenness is `i % 2 == 0`.',
        correctedCode: `for i in range(1, 11):
    if i % 2 == 0:
        print(i)`,
        bugLine: 2,
        whyThisHappens:
            'The modulo operator `%` returns the remainder of integer division. Even numbers divide cleanly by 2 (remainder 0); odd numbers do not (remainder 1). Because the condition tests for remainder 1, it admits precisely the odd values and rejects the evens \u2014 the logical inverse of the stated goal.',
        bestPractice:
            'When a boolean predicate is the heart of your filter, read it back as plain English ("print when the remainder equals one") to confirm it matches intent. Add a unit test with mixed even/odd inputs; inverted conditions fail the very first assertion.',
        xp: 10,
    },
    {
        id: 'dbg-py-3',
        category: 'debug-py',
        difficulty: 'Easy',
        bugType: 'Off-By-One',
        language: 'python',
        prompt:
            'This should print every element of the list, but it skips the first one. What is the off-by-one bug?',
        codeSnippet: `fruits = ["apple", "banana", "cherry"]
for i in range(1, len(fruits)):
    print(fruits[i])`,
        options: [
            '`range(1, len(fruits))` starts at index 1, so `fruits[0]` is never printed; it should be `range(0, len(fruits))` or `range(len(fruits))`',
            'The list must be wrapped in `tuple(...)` before iterating',
            '`len(fruits)` returns the last index, not the count',
            'The loop should use `while` instead of `for`',
        ],
        correctIndex: 0,
        explanation:
            'Python lists are zero-indexed, so `fruits[0]` is "apple". Starting the range at 1 skips index 0 entirely and prints only "banana" and "cherry". Use `range(len(fruits))` (which starts at 0) to hit every element.',
        correctedCode: `fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(fruits[i])`,
        bugLine: 2,
        whyThisHappens:
            '`range(start, stop)` produces integers from `start` inclusive to `stop` exclusive. With `start = 1`, the sequence begins at 1, so index 0 is never generated. Because list indices are zero-based, index 0 is a real element, and omitting it is a classic off-by-one error.',
        bestPractice:
            'Prefer iterating directly over the iterable (`for fruit in fruits:`) when you do not need the index \u2014 it can never skip or overshoot. If you do need indices, default to `range(len(seq))` so the bounds are impossible to get wrong.',
        xp: 10,
    },
    {
        id: 'dbg-py-4',
        category: 'debug-py',
        difficulty: 'Medium',
        bugType: 'Runtime Error',
        language: 'python',
        prompt:
            'This function looks up a value in a dictionary, but it crashes for the given input. What runtime error does it raise?',
        codeSnippet: `def get_score(scores, name):
    return scores[name]

print(get_score({"alice": 90, "bob": 85}, "carol"))`,
        options: [
            '`KeyError: \'carol\'` \u2014 the key "carol" is not present in the dictionary',
            '`IndexError: dictionary index out of range`',
            '`TypeError: dict keys must be integers`',
            '`NameError: scores is not defined`',
        ],
        correctIndex: 0,
        explanation:
            'Dictionary access with `scores[name]` looks up an exact key. The key "carol" does not exist in `{"alice": 90, "bob": 85}`, so Python raises `KeyError: \'carol\'` at runtime \u2014 a different exception from the `IndexError` that lists raise for bad positions.',
        correctedCode: `def get_score(scores, name):
    return scores.get(name, 0)

print(get_score({"alice": 90, "bob": 85}, "carol"))`,
        bugLine: 2,
        whyThisHappens:
            'A dict is a hash table: `dict[key]` computes the hash of `key` and jumps to the matching bucket. If no entry with that hash exists, CPython raises `KeyError` immediately rather than returning a default. This differs from a list, where a bad position raises `IndexError`. The `.get(key, default)` method instead returns the default when the key is absent, making missing keys safe.',
        bestPractice:
            'Use `dict.get(key, default)` or `dict.setdefault` whenever a missing key is a legitimate case rather than a bug. When a missing key SHOULD be an error, catch `KeyError` explicitly and surface a clear, domain-specific message.',
        xp: 20,
    },
    {
        id: 'dbg-py-5',
        category: 'debug-py',
        difficulty: 'Medium',
        bugType: 'Wrong Condition',
        language: 'python',
        prompt:
            'This should print "Adult" for ages 18 and up, but an 18-year-old is labelled "Minor". What is the wrong condition?',
        codeSnippet: `age = 18
if age > 18:
    print("Adult")
else:
    print("Minor")`,
        options: [
            'The test should be `age >= 18` \u2014 `age > 18` excludes the boundary value 18 itself',
            '`print` cannot be called inside an `if` statement',
            'The `else` keyword is misspelled',
            '`age` must be converted to a float before comparing',
        ],
        correctIndex: 0,
        explanation:
            'The requirement is "18 and up", which is an inclusive boundary. `age > 18` is false for 18 (18 is not greater than 18), so the code falls through to `else` and prints "Minor". The correct comparison is `age >= 18`.',
        correctedCode: `age = 18
if age >= 18:
    print("Adult")
else:
    print("Minor")`,
        bugLine: 2,
        whyThisHappens:
            'The `>` operator is strict: it is true only when the left operand exceeds the right. At the exact boundary (18 == 18) it returns `False`, routing execution into the `else` branch. Inclusive thresholds require `>=`, which is true when the operands are equal OR the left is larger.',
        bestPractice:
            'Encode boundary requirements directly in the operator: "18 and up" maps to `>=`, "under 18" maps to `<`. Always include the boundary value in your test cases (here, test age 17, 18, and 19) so off-by-one comparisons fail loudly.',
        xp: 20,
    },
    {
        id: 'dbg-py-6',
        category: 'debug-py',
        difficulty: 'Hard',
        bugType: 'Infinite Loop',
        language: 'python',
        prompt:
            'This binary search works when the target is present, but loops forever when it is not. What is the bug?',
        codeSnippet: `def search(arr, target):
    lo = 0
    hi = len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid
        else:
            hi = mid - 1
    return -1`,
        options: [
            '`lo = mid` should be `lo = mid + 1`; otherwise the lower bound can stay at `mid` and the range never shrinks, so the loop never terminates',
            '`mid` should be `(lo + hi)` without the `// 2`',
            'The while condition should be `lo < hi`',
            'The array must be sorted in descending order for binary search',
        ],
        correctIndex: 0,
        explanation:
            'Binary search must discard the midpoint on every iteration. When `arr[mid] < target`, the target can only be above `mid`, so `lo` must move to `mid + 1`. Setting `lo = mid` can leave `lo` unchanged once `lo == mid`, so the range never empties and `lo <= hi` stays true forever \u2014 an infinite loop that never reaches `return -1`.',
        correctedCode: `def search(arr, target):
    lo = 0
    hi = len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
        bugLine: 8,
        whyThisHappens:
            'Each iteration of binary search is guaranteed to terminate only if the candidate interval strictly shrinks. When `lo == mid` (which happens once `lo` and `hi` converge), `lo = mid` is a no-op, so the interval, the midpoint, and the comparisons all repeat identically. The loop has no progress invariant and CPython happily re-executes the body forever. Using `lo = mid + 1` guarantees the lower bound advances past `mid`, so the interval loses at least one element each pass and `lo <= hi` eventually fails.',
        bestPractice:
            'Always narrow the search bounds past the midpoint \u2014 `lo = mid + 1` and `hi = mid - 1`. Prove to yourself that the interval shrinks every iteration; that proof IS the termination argument. For integer midpoints in large arrays use `mid = lo + (hi - lo) // 2` to avoid overflow as well.',
        xp: 30,
    },
    {
        id: 'dbg-py-7',
        category: 'debug-py',
        difficulty: 'Hard',
        bugType: 'Null Pointer',
        language: 'python',
        prompt:
            'This function should return the length of a user\u2019s name, but it crashes when the name field is missing. What is the bug?',
        codeSnippet: `def name_length(user):
    name = user.get("name")
    return len(name)

print(name_length({"email": "a@b.com"}))`,
        options: [
            '`user.get("name")` returns `None` when the key is absent, and `len(None)` raises `TypeError: object of type \'NoneType\' has no len()`',
            'The dictionary literal is missing a trailing comma',
            '`len()` only works on lists, not on strings',
            'The function must be decorated with `@staticmethod`',
        ],
        correctIndex: 0,
        explanation:
            '`dict.get(key)` returns `None` by default when the key is missing. The input has no "name" key, so `name` becomes `None`, and calling `len(None)` raises `TypeError: object of type \'NoneType\' has no len()`. This is Python\u2019s analogue of dereferencing a null pointer.',
        correctedCode: `def name_length(user):
    name = user.get("name", "")
    return len(name)

print(name_length({"email": "a@b.com"}))`,
        bugLine: 3,
        whyThisHappens:
            'Python has no null-dereference in the C sense, but `None` is a singleton of type `NoneType`, and `NoneType` does not define the `__len__` special method. `len(obj)` resolves to `obj.__len__()`; when that attribute lookup fails, CPython raises `TypeError`. The root cause is that `.get(key)` defaults to `None` for absent keys, silently introducing a value that most operations do not support.',
        bestPractice:
            'Provide an explicit default to `.get` so a missing key can never yield `None` (`user.get("name", "")`). For values that may legitimately be `None`, guard with `if name is not None:` or use a typed optional and check before operating on it.',
        xp: 30,
    },
    {
        id: 'dbg-py-8',
        category: 'debug-py',
        difficulty: 'Hard',
        bugType: 'Incorrect Loop',
        language: 'python',
        prompt:
            'This should remove every even number from the list, but some evens survive. What is the incorrect loop?',
        codeSnippet: `nums = [2, 4, 6, 8, 10]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)
print(nums)`,
        options: [
            'Mutating a list while iterating over it with `for n in nums` shifts elements left after a `remove`, so the iterator skips the element that moves into the just-removed slot \u2014 iterate over a copy or build a new list instead',
            'The `remove` method does not exist on Python lists',
            'The condition should be `n % 2 != 0`',
            'The list must be converted to a `set` before removing elements',
        ],
        correctIndex: 0,
        explanation:
            '`for n in nums` iterates over the list via an internal index that advances each step. When `nums.remove(n)` deletes the current element, every later element shifts one slot left, but the iterator\u2019s internal index still increments \u2014 so the element that slid into the current position is never visited. The result is `[4, 8]` instead of `[]`. The fix is to iterate over a copy (`for n in list(nums):` or a comprehension) so the loop source is not the object being mutated.',
        correctedCode: `nums = [2, 4, 6, 8, 10]
for n in list(nums):
    if n % 2 == 0:
        nums.remove(n)
print(nums)`,
        bugLine: 2,
        whyThisHappens:
            'A `for` loop over a list uses an internal counter: on each step it fetches `list[counter]` then increments `counter`. `list.remove(x)` finds the first equal element, deletes it, and shifts all following elements one index toward the front to keep the backing array contiguous. The deletion lowers every remaining index by one, but the loop counter still advances by one, so the element now sitting at the old index is skipped entirely. Iterating over a snapshot copy (`list(nums)`) decouples the iteration source from the mutation, so shifts in the original no longer corrupt the cursor.',
        bestPractice:
            'Never mutate a container while iterating over it directly. Prefer a list comprehension that builds a new list (`nums = [n for n in nums if n % 2 != 0]`), or iterate over a copy (`for n in list(nums):`). Both keep the iteration source stable while the original changes.',
        xp: 30,
    },
];
