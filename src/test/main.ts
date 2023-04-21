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
} from "../statistics";

/**
  Throws an error if the condition is false
  @param condition - A boolean expression to be evaluated
  @throws - Error if the condition is false 
 */

function assert(condition: any) {
  if (!condition) throw new Error("Assertion failed");
}

/**
  Rounds a number to a specified number of decimal places
  @param num - The number to be rounded
  @param decimalPlaces - The number of decimal places to round to
  @return - The rounded number
 */

function roundTo(num: number, decimalPlaces: number): number {
  let base10 = 10 ** decimalPlaces,
    result = Math.round(num * base10) / base10;
  return result;
}

/**
  This function runs some tests to assert that the functions produce expected results.
  The tests pass if all four assertions succeed. If any of the assertions fail, an error will be thrown.
  Finally, a success message is logged to the console.
 */

void (function () {
  const Arr = [10, 6.8, 7.48, 7.2, 6.72, 9.14, 9.54, 8.7, 10, 9.25, 8, 9];
  assert(roundTo(mean(Arr), 6) == 8.485833);
  assert(roundTo(geometricMean(Arr), 6) == 8.405238);
  assert(roundTo(harmonicMean(Arr), 6) == 8.3227);
  assert(median(Arr) == 8.85);
  assert(JSON.stringify(mode(Arr)) == JSON.stringify([10]));
  assert(roundTo(range(Arr), 6) == 3.28);
  assert(roundTo(midrange(Arr), 6) == 1.64);
  assert(roundTo(variance(Arr), 6) == 1.323341);
  assert(roundTo(standardDeviation(Arr), 6) == 1.150366);
  assert(roundTo(sampleVariance(Arr), 6) == 1.443645);
  assert(roundTo(sampleStandardDeviation(Arr), 6) == 1.201518);
  console.log("Passed all tests successfuly!");
})();
