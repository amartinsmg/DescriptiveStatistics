/**
 * Calculates the mean value of an array of numbers
 * @param arr An array of numbers
 * @returns The mean value of the array
*/

export function mean(arr) {
  if (!arr.length) return NaN;
  const sum = arr.reduce((acc, n) => acc + n, 0),
    result = sum / arr.length;
  return result;
}

/**
 * Calculates the geometric mean of an array of numbers
 * @param arr An array of numbers
 * @returns The geometric mean of the array
 */

export function geometricMean(arr) {
  if (!arr.length || !arr.every((n) => n >= 0)) return NaN;
  const somaLog = arr.reduce((acc, n) => acc + Math.log(n), 0),
    gMeanLog = somaLog / arr.length,
    result = Math.exp(gMeanLog);
  return result;
}

/**
 * Calculates the harmonic mean of an array of numbers
 * @param arr An array of numbers
 * @returns The harmonic mean of the array
*/

export function harmonicMean(arr) {
  if (!arr.length || !arr.every((n) => n > 0)) return NaN;
  const sum = arr.reduce((acc, n) => acc + 1 / n, 0),
    result = arr.length / sum;
  return result;
}

/**
 * Calculates the median value of an array of numbers
 * @param arr An array of numbers
 * @returns The median value of the array
*/

export function median(arr) {
  if (!arr.length) return NaN;
  const sortedArr = arr.sort((a, b) => a - b),
    mid = Math.floor(arr.length / 2),
    result =
      arr.length % 2 ? sortedArr[mid] : mean(sortedArr.slice(mid - 1, mid + 1));
  return result;
}

/**
 * Calculates the mode(s) of an array of numbers
 * @param arr An array of numbers
 * @returns An array of the mode(s) of the array
*/

export function mode(arr) {
  if (!arr.length) return [];
  const Frequencies = new Map(
      Array.from(new Set(arr)).map((n) => [
        n,
        arr.filter((x) => x === n).length,
      ]),
    ),
    max = Math.max(...Frequencies.values()),
    min = Math.min(...Frequencies.values()),
    result =
      max > min
        ? Array.from(
            new Map(
              Array.from(Frequencies.entries()).filter(
                ([, frequency]) => frequency == max,
              ),
            ).keys(),
          )
        : [];
  return result;
}

/**
 * Calculates the range of a given array of numbers.
 * @param arr An array of numbers.
 * @return The range of the given array.
*/

export function range(arr) {
  const result = Math.max(...arr) - Math.min(...arr);
  return result;
}

/**
 * Calculates the midrange of a given array of numbers.
 * @param arr An array of numbers.
 * @return The midrange of the given array.
*/

export function midrange(arr) {
  const result = range(arr) / 2;
  return result;
}

/**
 * Calculates the variance of a given array of numbers.
 * @param arr An array of numbers.
 * @return The variance of the given array.
*/

export function variance(arr) {
  const meanVal = mean(arr),
    squaredDeviations = arr.map((n) => (n - meanVal) ** 2),
    result = mean(squaredDeviations);
  return result;
}

/**
 * Calculates the standard deviation of a given array of numbers.
 * @param arr An array of numbers.
 * @return The standard deviation of the given array.
*/

export function standardDeviation(arr) {
  const result = Math.sqrt(variance(arr));
  return result;
}

/**
 * Calculates the sample variance of a given array of numbers.
 * @param arr An array of numbers.
 * @return The sample variance of the given array.
*/

export function sampleVariance(arr) {
  if (arr.length <= 1) return NaN;
  const meanVal = mean(arr),
    squaredDeviations = arr.map((n) => (n - meanVal) ** 2),
    sum = squaredDeviations.reduce((acc, n) => acc + n, 0),
    result = sum / (arr.length - 1);
  return result;
}

/**
 * Calculates the sample standard deviation of a given array of numbers.
 * @param arr An array of numbers.
 * @return The sample standard deviation of the given array.
*/

export function sampleStandardDeviation(arr) {
  const result = Math.sqrt(sampleVariance(arr));
  return result;
}
