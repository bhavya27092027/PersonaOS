import type { Question } from '../types';

export const debugJavaQuestions: Question[] = [
    {
        id: 'dbg-java-1',
        category: 'debug-java',
        difficulty: 'Easy',
        bugType: 'Syntax Error',
        language: 'java',
        prompt: 'What is the syntax error in this Java program?',
        codeSnippet: `public class Sum {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        int total = 0
        for (int i = 0; i < nums.length; i++) {
            total += nums[i];
        }
        System.out.println("Total: " + total);
    }
}`,
        options: [
            'Missing semicolon after `int total = 0`',
            'The array initializer is missing the keyword `new`',
            '`main` must be declared `private`',
            '`System.out.println` cannot concatenate a String and an int',
        ],
        correctIndex: 0,
        explanation:
            'Java requires a semicolon at the end of every statement. The declaration `int total = 0` is missing its semicolon, so the compiler reports an expected `;` and refuses to compile the file.',
        correctedCode: `public class Sum {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        int total = 0;
        for (int i = 0; i < nums.length; i++) {
            total += nums[i];
        }
        System.out.println("Total: " + total);
    }
}`,
        bugLine: 4,
        whyThisHappens:
            "Java's grammar treats `int total = 0` as an incomplete statement until it sees a terminating semicolon. Without one, the parser tries to continue the statement onto the next line (`for ...`), which is not a valid continuation, so the compiler emits a syntax error and halts.",
        bestPractice:
            'Use an IDE or linter that flags missing semicolons in real time, and compile frequently so syntax errors are caught immediately instead of accumulating.',
        xp: 10,
    },
    {
        id: 'dbg-java-2',
        category: 'debug-java',
        difficulty: 'Easy',
        bugType: 'Off-By-One',
        language: 'java',
        prompt: 'This loop should print every element of the array. What is the off-by-one bug?',
        codeSnippet: `public class Printer {
    public static void main(String[] args) {
        int[] data = {10, 20, 30, 40, 50};
        for (int i = 0; i <= data.length; i++) {
            System.out.println(data[i]);
        }
    }
}`,
        options: [
            'The condition should be `i < data.length`, not `i <= data.length` — `data.length` is one past the last valid index',
            'The loop should start at `i = 1`',
            'The array must be declared with `new int[5]`',
            '`System.out.println` cannot print array elements',
        ],
        correctIndex: 0,
        explanation:
            'An array of length 5 has valid indices 0 through 4. The condition `i <= data.length` lets `i` reach 5, so `data[5]` is accessed — one past the end — which throws `ArrayIndexOutOfBoundsException` at runtime.',
        correctedCode: `public class Printer {
    public static void main(String[] args) {
        int[] data = {10, 20, 30, 40, 50};
        for (int i = 0; i < data.length; i++) {
            System.out.println(data[i]);
        }
    }
}`,
        bugLine: 4,
        whyThisHappens:
            'In Java, arrays are fixed-size and the JVM checks every access against `array.length`. Because indices are zero-based, the last valid index is `length - 1`; accessing index `length` is out of bounds, so the JVM throws `ArrayIndexOutOfBoundsException`.',
        bestPractice:
            'Prefer the enhanced for loop (`for (int x : data)`) when you do not need the index — it can never run past the end. Otherwise, always use `i < array.length` as the loop bound.',
        xp: 10,
    },
    {
        id: 'dbg-java-3',
        category: 'debug-java',
        difficulty: 'Easy',
        bugType: 'Null Pointer',
        language: 'java',
        prompt: 'What happens when this program runs?',
        codeSnippet: `public class Greeter {
    public static void main(String[] args) {
        String name = null;
        System.out.println(name.length());
    }
}`,
        options: [
            'A `NullPointerException` is thrown because `name` is `null` and `length()` is called on it',
            'It prints `0` because a null String has length zero',
            'It prints `null`',
            'A `ClassCastException` is thrown',
        ],
        correctIndex: 0,
        explanation:
            'The variable `name` is explicitly set to `null`. Calling `name.length()` dereferences a null reference, so the JVM throws a `NullPointerException` at runtime.',
        correctedCode: `public class Greeter {
    public static void main(String[] args) {
        String name = null;
        if (name != null) {
            System.out.println(name.length());
        }
    }
}`,
        bugLine: 4,
        whyThisHappens:
            'A reference variable holding `null` points to no object on the heap. When you call an instance method on it, the JVM has no object to dispatch the call to and throws `NullPointerException` — this is a runtime check, not a compile-time one, because the compiler only knows the variable\u2019s declared type, not its value.',
        bestPractice:
            'Check for `null` before calling methods on a reference (`if (name != null) ...`), or use `Optional<String>` / `Objects.requireNonNull` to make nullability explicit and fail fast with a clear message.',
        xp: 10,
    },
    {
        id: 'dbg-java-4',
        category: 'debug-java',
        difficulty: 'Medium',
        bugType: 'Runtime Error',
        language: 'java',
        prompt: 'What runtime exception does this program throw?',
        codeSnippet: `public class Divider {
    public static int average(int total, int count) {
        return total / count;
    }
    public static void main(String[] args) {
        int sum = 100;
        int n = 0;
        System.out.println("Average: " + average(sum, n));
    }
}`,
        options: [
            '`ArithmeticException` — integer division by zero is not allowed in Java',
            '`NullPointerException` — `count` is null',
            '`ArrayIndexOutOfBoundsException` — the array is empty',
            '`StackOverflowError` — the method calls itself',
        ],
        correctIndex: 0,
        explanation:
            'When `count` is 0, the expression `total / count` performs integer division by zero. Java throws an `ArithmeticException` ("/ by zero") at runtime because the result is mathematically undefined.',
        correctedCode: `public class Divider {
    public static int average(int total, int count) {
        if (count == 0) {
            return 0;
        }
        return total / count;
    }
    public static void main(String[] args) {
        int sum = 100;
        int n = 0;
        System.out.println("Average: " + average(sum, n));
    }
}`,
        bugLine: 3,
        whyThisHappens:
            'For integer types (`int`, `long`), Java has no special "infinity" value, so dividing by zero cannot produce a result and the JVM throws `ArithmeticException`. Floating-point division by zero is different — it yields `Infinity` or `NaN` per the IEEE 754 standard.',
        bestPractice:
            'Always guard divisors: check `if (count == 0)` and return a safe default (or throw a descriptive `IllegalArgumentException`) before dividing.',
        xp: 20,
    },
    {
        id: 'dbg-java-5',
        category: 'debug-java',
        difficulty: 'Medium',
        bugType: 'Logical Error',
        language: 'java',
        prompt:
            'This method should return the largest value in the array. Why does it return `0` for the given input?',
        codeSnippet: `public class Finder {
    public static int max(int[] nums) {
        int max = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > max) {
                max = nums[i];
            }
        }
        return max;
    }
    public static void main(String[] args) {
        int[] temps = {-5, -2, -8, -1};
        System.out.println(max(temps));
    }
}`,
        options: [
            '`max` is initialized to `0` instead of `nums[0]`, so an all-negative array never updates it and it returns `0` (a value not even in the array)',
            'The loop should start at `i = 1`',
            'The comparison should be `nums[i] < max`',
            '`max` must be declared as a `double`',
        ],
        correctIndex: 0,
        explanation:
            'Because `max` starts at `0` and every element of `{-5, -2, -8, -1}` is negative, the condition `nums[i] > max` is never true, so `max` is never updated. The method returns `0` — a value larger than every element and not present in the array.',
        correctedCode: `public class Finder {
    public static int max(int[] nums) {
        int max = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > max) {
                max = nums[i];
            }
        }
        return max;
    }
    public static void main(String[] args) {
        int[] temps = {-5, -2, -8, -1};
        System.out.println(max(temps));
    }
}`,
        bugLine: 3,
        whyThisHappens:
            'The accumulator is seeded with `0`, an arbitrary sentinel that is larger than all real inputs, so the "greater than" comparison can never fire. The algorithm only works when the seed is an actual element of the data (or the smallest representable value).',
        bestPractice:
            'Seed min/max accumulators with the first element (`nums[0]`) and start the loop at index 1, or use `Integer.MIN_VALUE` / `Integer.MAX_VALUE` so the initial value can never dominate the real data.',
        xp: 20,
    },
    {
        id: 'dbg-java-6',
        category: 'debug-java',
        difficulty: 'Hard',
        bugType: 'Infinite Loop',
        language: 'java',
        prompt:
            'When the target is not in the array, this binary search never returns. What is the bug?',
        codeSnippet: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return -1;
    }
}`,
        options: [
            '`lo = mid` should be `lo = mid + 1` so the lower bound moves past `mid`; otherwise the range can never shrink to empty and the loop runs forever',
            '`mid` should be `(lo + hi)` instead of `(lo + hi) / 2`',
            'The while condition should be `lo < hi`',
            'The array must be sorted in descending order',
        ],
        correctIndex: 0,
        explanation:
            'When `arr[mid] < target`, the search must discard `mid` and everything below it. Setting `lo = mid` keeps the lower bound at `mid`, so once `lo` and `hi` converge to the same index the midpoint never changes and `lo <= hi` stays true forever — an infinite loop.',
        correctedCode: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return -1;
    }
}`,
        bugLine: 10,
        whyThisHappens:
            'Binary search relies on each iteration removing at least one element from the candidate range. `lo = mid` can leave `lo` unchanged (when `lo == mid`), so the range stops shrinking and the condition `lo <= hi` never becomes false. The JVM then re-executes the body with the same `mid` indefinitely.',
        bestPractice:
            'Always narrow the bounds past the midpoint — `lo = mid + 1` and `hi = mid - 1`. This guarantees the range shrinks every iteration, which is the formal termination condition for binary search.',
        xp: 30,
    },
    {
        id: 'dbg-java-7',
        category: 'debug-java',
        difficulty: 'Hard',
        bugType: 'Wrong Condition',
        language: 'java',
        prompt:
            'This method should collect only the even numbers, but it returns the odd ones. What is the wrong condition?',
        codeSnippet: `import java.util.ArrayList;

public class Filter {
    public static ArrayList<Integer> evens(ArrayList<Integer> nums) {
        ArrayList<Integer> result = new ArrayList<>();
        for (int n : nums) {
            if (n % 2 != 0) {
                result.add(n);
            }
        }
        return result;
    }
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(1);
        nums.add(2);
        nums.add(3);
        nums.add(4);
        System.out.println(evens(nums));
    }
}`,
        options: [
            'The condition should be `n % 2 == 0`, not `n % 2 != 0` — the test is inverted',
            'The loop should use a traditional `for` loop with an index',
            '`result` should be declared `ArrayList<String>`',
            'The method should return `nums` directly',
        ],
        correctIndex: 0,
        explanation:
            '`n % 2 != 0` is true for odd numbers (they leave a remainder of 1 or -1). The method therefore adds every odd value to `result` and skips the evens. The correct test for evenness is `n % 2 == 0`.',
        correctedCode: `import java.util.ArrayList;

public class Filter {
    public static ArrayList<Integer> evens(ArrayList<Integer> nums) {
        ArrayList<Integer> result = new ArrayList<>();
        for (int n : nums) {
            if (n % 2 == 0) {
                result.add(n);
            }
        }
        return result;
    }
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(1);
        nums.add(2);
        nums.add(3);
        nums.add(4);
        System.out.println(evens(nums));
    }
}`,
        bugLine: 7,
        whyThisHappens:
            'The remainder operator `%` yields the leftover after division. Even numbers divide cleanly by 2 (remainder 0); odd numbers do not (remainder \u00b11). The condition uses `!= 0`, which selects exactly the numbers that are NOT divisible by 2 — the logical opposite of the intent.',
        bestPractice:
            'When a boolean check is the core of your logic, re-read it as plain English ("add when the remainder is not zero") to confirm it matches the intent. Unit tests with both even and odd inputs catch inverted conditions immediately.',
        xp: 30,
    },
    {
        id: 'dbg-java-8',
        category: 'debug-java',
        difficulty: 'Hard',
        bugType: 'Incorrect Loop',
        language: 'java',
        prompt:
            'This loop should remove every even number from the list, but some evens remain. What is the incorrect loop?',
        codeSnippet: `import java.util.ArrayList;

public class Cleanup {
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(2);
        nums.add(4);
        nums.add(6);
        nums.add(8);
        for (int i = 0; i < nums.size(); i++) {
            if (nums.get(i) % 2 == 0) {
                nums.remove(i);
            }
        }
        System.out.println(nums);
    }
}`,
        options: [
            'Iterating forward with an index while calling `remove(i)` shifts the remaining elements left, so `i++` skips the element that moves into position `i` — iterate backwards instead',
            'The list should be a plain array, not an `ArrayList`',
            'The condition should be `i <= nums.size()`',
            '`nums.get(i)` should be `nums[i]`',
        ],
        correctIndex: 0,
        explanation:
            'When `remove(i)` deletes an element, every element after it shifts one position left, but the loop then does `i++`, skipping the element that just moved into index `i`. So roughly half the evens survive. Iterating backwards (`for (int i = nums.size() - 1; i >= 0; i--)`) avoids the shift because removed elements are always behind the cursor.',
        correctedCode: `import java.util.ArrayList;

public class Cleanup {
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(2);
        nums.add(4);
        nums.add(6);
        nums.add(8);
        for (int i = nums.size() - 1; i >= 0; i--) {
            if (nums.get(i) % 2 == 0) {
                nums.remove(i);
            }
        }
        System.out.println(nums);
    }
}`,
        bugLine: 10,
        whyThisHappens:
            '`ArrayList` is backed by a contiguous array; `remove(i)` copies all subsequent elements one slot toward the front to close the gap. Because the index cursor still advances with `i++`, the shifted element at position `i` is never examined. Backwards iteration sidesteps this because the gap closes behind the cursor, not ahead of it.',
        bestPractice:
            'When removing items from a collection while iterating, either iterate backwards by index, use an explicit `Iterator` with `iterator.remove()`, or call `list.removeIf(n -> n % 2 == 0)` which handles the shifting correctly for you.',
        xp: 30,
    },
];
