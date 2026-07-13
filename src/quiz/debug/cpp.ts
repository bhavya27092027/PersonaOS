import type { Question } from '../types';

export const debugCppQuestions: Question[] = [
    {
        id: 'dbg-cpp-1',
        category: 'debug-cpp',
        difficulty: 'Easy',
        bugType: 'Syntax Error',
        language: 'cpp',
        prompt: 'What is the syntax error in this code?',
        codeSnippet: `#include <iostream>
int main() {
    int x = 5
    std::cout << x;
    return 0;
}`,
        options: [
            'Missing semicolon after int x = 5',
            'Missing #include <vector>',
            'main should return void',
            'cout is not a valid identifier',
        ],
        correctIndex: 0,
        explanation:
            'Every statement in C++ must end with a semicolon. The line `int x = 5` is missing one, so the compiler reports an expected `;` and flags the error on the following line — a classic case where the diagnostic points past the real mistake.',
        correctedCode: `#include <iostream>
int main() {
    int x = 5;
    std::cout << x;
    return 0;
}`,
        bugLine: 3,
        whyThisHappens:
            'The C++ lexer uses the semicolon to delimit statements. Without it, the parser treats the next token (`std`) as a continuation of the declaration, producing an error at an unexpected location rather than at the missing semicolon itself.',
        bestPractice:
            'Compile with -Wall -Wextra and use a formatter or linter; missing semicolons are caught instantly, and modern editors highlight them live.',
        xp: 10,
    },
    {
        id: 'dbg-cpp-2',
        category: 'debug-cpp',
        difficulty: 'Easy',
        bugType: 'Off-By-One',
        language: 'cpp',
        prompt: 'This function should print array elements 0..n-1. What is wrong?',
        codeSnippet: `void printArr(int arr[], int n) {
    for (int i = 0; i <= n; i++) {
        std::cout << arr[i] << " ";
    }
}`,
        options: [
            'The loop condition should be i < n, not i <= n',
            'The loop should start at i = 1',
            'cout cannot print integers without a cast',
            'The array parameter must be const',
        ],
        correctIndex: 0,
        explanation:
            'Valid indices for an array of size n are 0..n-1. Using `i <= n` reads `arr[n]`, one position past the end — an out-of-bounds access and undefined behavior.',
        correctedCode: `void printArr(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        std::cout << arr[i] << " ";
    }
}`,
        bugLine: 2,
        whyThisHappens:
            'C++ does not bounds-check array or pointer access; the standard only requires that the memory be valid. Reading past the end reads whatever happens to follow the array on the stack or heap, which is undefined behavior that may appear to work, print garbage, or crash.',
        bestPractice:
            'Prefer `std::vector` with `at()` for bounds-checked access, or use range-based for loops. When using raw arrays, always test with `< n`, never `<= n`.',
        xp: 10,
    },
    {
        id: 'dbg-cpp-3',
        category: 'debug-cpp',
        difficulty: 'Easy',
        bugType: 'Logical Error',
        language: 'cpp',
        prompt: 'This function should return the maximum of two numbers. What is the bug?',
        codeSnippet: `int maxVal(int a, int b) {
    if (a > b)
        return b;
    else
        return a;
}`,
        options: [
            'The return values are swapped — it returns b when a is larger and a when b is larger',
            'The comparison should use == instead of >',
            'The function must take pointers to its arguments',
            'The else branch is unreachable',
        ],
        correctIndex: 0,
        explanation:
            'The logic is inverted. When `a > b`, the larger value is `a`, but the code returns `b`. The else returns `a` precisely when `b` is the larger one. Both branches return the smaller value.',
        correctedCode: `int maxVal(int a, int b) {
    if (a > b)
        return a;
    else
        return b;
}`,
        bugLine: 3,
        whyThisHappens:
            'C++ executes exactly what you write — there is no runtime check that a return value matches the function\'s intent. A condition and its consequence that are individually correct can still combine into the wrong result when the mapping between them is reversed.',
        bestPractice:
            'Use `std::max(a, b)` from `<algorithm>` instead of hand-rolling comparisons. For custom logic, write a quick unit test covering both branches — inverted logic fails the moment you assert `maxVal(3, 7) == 7`.',
        xp: 10,
    },
    {
        id: 'dbg-cpp-4',
        category: 'debug-cpp',
        difficulty: 'Medium',
        bugType: 'Null Pointer',
        language: 'cpp',
        prompt: 'What runtime error will this code produce?',
        codeSnippet: `#include <iostream>
int main() {
    int* p = nullptr;
    *p = 42;
    std::cout << *p;
    return 0;
}`,
        options: [
            'Dereferencing a null pointer — *p = 42 writes through address 0, which is undefined behavior',
            'p must be declared as int instead of int*',
            'nullptr is not a valid keyword in C++',
            'The program leaks memory because p is never freed',
        ],
        correctIndex: 0,
        explanation:
            '`p` is initialized to `nullptr` (address 0) and never made to point at valid storage. Writing `*p = 42` dereferences that null address, which is undefined behavior and typically crashes with a segmentation fault.',
        correctedCode: `#include <iostream>
int main() {
    int* p = new int;
    *p = 42;
    std::cout << *p;
    delete p;
    return 0;
}`,
        bugLine: 4,
        whyThisHappens:
            'A null pointer holds the sentinel value 0, which the OS maps to an unmapped, protected page. The CPU raises a fault on any load or store through it, and the C++ standard declares any dereference of null undefined behavior — no diagnostic required.',
        bestPractice:
            'Always initialize pointers to a valid object (`new`, the address of a live variable, or a smart pointer) rather than leaving them null, and check `if (p != nullptr)` before dereferencing. Prefer `std::unique_ptr` / `std::shared_ptr` so ownership and validity are expressed in the type system.',
        xp: 20,
    },
    {
        id: 'dbg-cpp-5',
        category: 'debug-cpp',
        difficulty: 'Medium',
        bugType: 'Runtime Error',
        language: 'cpp',
        prompt: 'What runtime error will this code produce?',
        codeSnippet: `int* getPtr() {
    int x = 10;
    return &x;
}
int main() {
    int* p = getPtr();
    std::cout << *p;
    return 0;
}`,
        options: [
            'Dangling pointer — x is destroyed when getPtr returns, so *p reads freed stack memory',
            'Stack overflow from unbounded recursion',
            'Division by zero when computing &x',
            'Memory leak because x is never deleted',
        ],
        correctIndex: 0,
        explanation:
            '`x` is an automatic (stack) variable whose lifetime ends when `getPtr` returns and its stack frame is popped. Returning `&x` yields a dangling pointer, and dereferencing `*p` in `main` reads memory that is no longer valid — undefined behavior that may print garbage or crash.',
        correctedCode: `int* getPtr() {
    int* x = new int(10);
    return x;
}
int main() {
    int* p = getPtr();
    std::cout << *p;
    delete p;
    return 0;
}`,
        bugLine: 3,
        whyThisHappens:
            'Stack variables live only for the duration of their enclosing block. Once the function returns, that stack memory is reclaimed and reused by subsequent calls, so the address still exists but no longer holds a valid `int`. The standard makes any access through it undefined behavior.',
        bestPractice:
            'Never return a pointer or reference to a local variable. Return by value, allocate on the free store (with a smart pointer), or accept an output parameter. Compilers warn with `-Wreturn-stack-address`; enable it.',
        xp: 20,
    },
    {
        id: 'dbg-cpp-6',
        category: 'debug-cpp',
        difficulty: 'Hard',
        bugType: 'Infinite Loop',
        language: 'cpp',
        prompt: 'Why does this countdown loop never terminate?',
        codeSnippet: `#include <iostream>
int main() {
    for (unsigned int i = 10; i >= 0; i--) {
        std::cout << i << " ";
    }
    return 0;
}`,
        options: [
            'unsigned int can never be negative, so i >= 0 is always true — decrementing 0 wraps to UINT_MAX',
            'std::cout buffers output and stalls the loop',
            'The i-- operator is undefined for unsigned types',
            'return 0 makes the loop body unreachable',
        ],
        correctIndex: 0,
        explanation:
            'An `unsigned int` is, by definition, always greater than or equal to 0, so `i >= 0` can never be false. When `i` reaches 0 and is decremented, unsigned arithmetic wraps around to `UINT_MAX` (e.g., 4294967295), and the loop runs forever printing enormous values.',
        correctedCode: `#include <iostream>
int main() {
    for (int i = 10; i >= 0; i--) {
        std::cout << i << " ";
    }
    return 0;
}`,
        bugLine: 3,
        whyThisHappens:
            'C++ unsigned integer arithmetic is defined to wrap modulo 2^N; it never underflows below zero. Because the type cannot represent a negative value, the comparison `i >= 0` is a tautology the compiler can even warn about (`-Wtype-limits`), yet the loop condition is always satisfied.',
        bestPractice:
            'Use a signed type (`int`) when a loop counter must cross zero, or restructure as `for (unsigned i = 10; i-- > 0; )` to count down safely. Enable `-Wextra -Wtype-limits` to catch always-true comparisons on unsigned types.',
        xp: 30,
    },
    {
        id: 'dbg-cpp-7',
        category: 'debug-cpp',
        difficulty: 'Hard',
        bugType: 'Wrong Condition',
        language: 'cpp',
        prompt: 'Why does this program always print Option One regardless of user input?',
        codeSnippet: `#include <iostream>
int main() {
    int choice;
    std::cout << "Enter 1 or 2: ";
    std::cin >> choice;
    if (choice = 1) {
        std::cout << "Option One";
    } else {
        std::cout << "Other Option";
    }
    return 0;
}`,
        options: [
            'The condition uses = (assignment) instead of == (equality), so it always assigns 1 and is always true',
            'std::cin cannot read into an int variable',
            'The if statement must be followed by a while loop',
            'Option One should be printed in the else branch',
        ],
        correctIndex: 0,
        explanation:
            '`choice = 1` is an assignment, not a comparison: it sets `choice` to 1 and the whole expression evaluates to 1, which is truthy. The `if` therefore always succeeds and "Option One" prints no matter what the user enters. The intended test is `choice == 1`.',
        correctedCode: `#include <iostream>
int main() {
    int choice;
    std::cout << "Enter 1 or 2: ";
    std::cin >> choice;
    if (choice == 1) {
        std::cout << "Option One";
    } else {
        std::cout << "Other Option";
    }
    return 0;
}`,
        bugLine: 6,
        whyThisHappens:
            'In C++ every assignment is itself an expression whose value is the assigned value. `if (choice = 1)` assigns 1 and then tests that value, and any non-zero integer is `true`. Because the bug is syntactically valid, it compiles — ideally with a `-Wparentheses` warning suggesting `==`.',
        bestPractice:
            'Compile with `-Wall -Wextra -Wparentheses` so accidental assignments in conditions are flagged. Some teams write comparisons as `if (1 == choice)` (Yoda style) so a typo becomes a compile error, though modern compiler warnings make this less necessary.',
        xp: 30,
    },
    {
        id: 'dbg-cpp-8',
        category: 'debug-cpp',
        difficulty: 'Hard',
        bugType: 'Incorrect Loop',
        language: 'cpp',
        prompt: 'This loop should remove every even number from the vector. Why are some evens left behind?',
        codeSnippet: `#include <iostream>
#include <vector>
int main() {
    std::vector<int> v = {2, 4, 6, 8, 10};
    size_t i = 0;
    while (i < v.size()) {
        if (v[i] % 2 == 0) {
            v.erase(v.begin() + i);
        }
        i++;
    }
    for (int n : v) std::cout << n << " ";
    return 0;
}`,
        options: [
            'i++ runs after every erase, so the element that shifts into the erased slot is skipped',
            'v.erase invalidates all other elements and must be followed by a break',
            'The modulo operator % does not work on vector elements',
            'size_t cannot be compared with v.size() which returns int',
        ],
        correctIndex: 0,
        explanation:
            'After `v.erase(v.begin() + i)`, every element past `i` shifts left by one, so the next unexamined element lands at index `i`. But the unconditional `i++` then advances past it, skipping that element. With {2,4,6,8,10} the code leaves {4,8} instead of an empty vector.',
        correctedCode: `#include <iostream>
#include <vector>
int main() {
    std::vector<int> v = {2, 4, 6, 8, 10};
    size_t i = 0;
    while (i < v.size()) {
        if (v[i] % 2 == 0) {
            v.erase(v.begin() + i);
        } else {
            i++;
        }
    }
    for (int n : v) std::cout << n << " ";
    return 0;
}`,
        bugLine: 10,
        whyThisHappens:
            '`std::vector::erase` moves subsequent elements down to fill the gap and shrinks the size, but it does not — and cannot — adjust your loop index. The index and the container are independent, so incrementing unconditionally after an erase advances past the element that just slid into the current position.',
        bestPractice:
            'When erasing by index, only advance the index when no erase occurred (use an `else`), or use the iterator idiom `it = v.erase(it);` which returns a valid iterator to the next element. Better still, use the erase-remove idiom: `v.erase(std::remove_if(v.begin(), v.end(), isEven), v.end());`.',
        xp: 30,
    },
];
