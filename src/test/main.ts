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
} from "../ts/statistics";

function assert(condition: any, message?: string) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

function roundTo(num: number, decimalPlaces: number): number {
  let base10 = 10 ** decimalPlaces,
    result = Math.round(num * base10) / base10;
  return result;
}

void (function () {
  const Arr = [10, 6.8, 7.48, 7.2, 6.72, 9.14, 9.54, 8.7, 10, 9.25, 8, 9];
  assert(roundTo(mean(Arr), 6) == 8.485833);
  assert(roundTo(geometricMean(Arr), 6) == 8.405238);
  assert(roundTo(harmonicMean(Arr), 6) == 8.3227);
  assert(median(Arr) == 8.85);
  assert(mode(Arr)[0] == 10);
  assert(roundTo(range(Arr), 6) == 3.28);
  assert(roundTo(midrange(Arr), 6) == 1.64);
  assert(roundTo(variance(Arr), 6) == 1.323341);
  assert(roundTo(standardDeviation(Arr), 6) == 1.150366);
  assert(roundTo(sampleVariance(Arr), 6) == 1.443645);
  assert(roundTo(sampleStandardDeviation(Arr), 6) == 1.201518);
  console.log("Passed all tests successfuly!");
})();
