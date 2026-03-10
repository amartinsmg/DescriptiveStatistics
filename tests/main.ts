import {
  mean,
  geometricMean,
  harmonicMean,
  median,
  mode,
  range,
  midrange,
  variance,
  standardDeviation,
  sampleVariance,
  sampleStandardDeviation,
} from "../src/ts/statistics";

/**
 * Rounds a number to a specified number of decimal places
 * @param num The number to be rounded
 * @param decimalPlaces The number of decimal places to round to
 * @return The rounded number
 */

function roundTo(num: number, decimalPlaces: number): number {
  let base10 = 10 ** decimalPlaces,
    result = Math.round(num * base10) / base10;
  return result;
}

/**
 * Assert that two numbers are equal within a precision of 6 decimal places.
 * @param actual - The numerical value produced by the system.
 * @param expected - The reference value to compare against.
 * @remarks
 * The function uses `roundTo(n, 6)` to mitigate floating-point precision issues
 * before performing the equality check.
 * @throws {Error} If the rounded `actual` value does not strictly equal `expected`.
 */

function assertSameValue(actual: number, expected: number) {
  const condition = roundTo(actual, 6) === expected;
  if (!condition)
    throw new Error(`Test failed: Expected: ${expected}, received: ${actual}`);
}

/**
 * Asserts that two arrays are equal by comparing their JSON string representations.
 * @param actual - The numerical array produced by the system.
 * @param expected - The reference array to compare against.
 * @throws {Error} If the `actual` array does not strictly equal `expected`.
 */

function arrayCmp(actual: number[], expected: number[]) {
  const actualStr = JSON.stringify(actual),
    expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr)
    throw new Error(
      `Test failed: Expected: ${expectedStr}, received: ${actualStr}`,
    );
}

/**
  This function runs some tests to assert that the functions produce expected results.
  The tests pass if all eleven assertions succeed. If any of the assertions fail, an error will be thrown.
  Finally, a success message is logged to the console.
 */

void (function () {
  const Arr = [10, 6.8, 7.48, 7.2, 6.72, 9.14, 9.54, 8.7, 10, 9.25, 8, 9];
  try {
    assertSameValue(mean(Arr), 8.485833);
    assertSameValue(geometricMean(Arr), 8.405238);
    assertSameValue(harmonicMean(Arr), 8.3227);
    assertSameValue(median(Arr), 8.85);
    assertSameValue(range(Arr), 3.28);
    assertSameValue(midrange(Arr), 1.64);
    assertSameValue(variance(Arr), 1.323341);
    assertSameValue(standardDeviation(Arr), 1.150366);
    assertSameValue(sampleVariance(Arr), 1.443645);
    assertSameValue(sampleStandardDeviation(Arr), 1.201518);
    arrayCmp(mode(Arr), [10]);
    console.log("Passed all tests successfuly!");
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else console.log(e);
  }
})();
