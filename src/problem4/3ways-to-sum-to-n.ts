/**
 * Solution 1: Using a for loop
 * Time Complextity: O(n)
 * Space Complexity: O(1)
 */
const firstWayToSumToN = (n: number): number => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

/**
 * Solution 2: Using Gauss formula
 * Time Complextity: O(1)
 * Space Complexity: O(1)
 */
const secondWayToSumToN = (n: number): number => {
  return (n * (n + 1)) / 2;
};

/**
 * Solution 3: Using recursion
 * Time Complextity: O(n)
 * Space Complexity: O(n)
 */
const thirdWayToSumToN = (n: number): number => {
  if (n === 0) {
    return 0;
  }
  return n + thirdWayToSumToN(n - 1);
};
