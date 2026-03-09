/**
  @brief Calculates the mean value of an array of numbers
  @param arr An array of numbers
  @returns The mean value of the array
*/

export function mean(arr: number[]): number {
  if (!arr.length) return NaN;
  const sum = arr.reduce((acc, n) => acc + n, 0),
    result = sum / arr.length;
  return result;
}

/**
  @brief Calculates the geometric mean of an array of numbers
  @param arr An array of numbers
  @returns The geometric mean of the array
 */

export function geometricMean(arr: number[]): number {
  if (!arr.length || !arr.every((n) => n >= 0)) return NaN;
  const somaLog = arr.reduce((acc, n) => acc + Math.log(n), 0),
    gMeanLog = somaLog / arr.length,
    result = Math.exp(gMeanLog);
  return result;
}

/**
  @brief Calculates the harmonic mean of an array of numbers
  @param arr An array of numbers
  @returns The harmonic mean of the array
*/

export function harmonicMean(arr: number[]): number {
  if (!arr.length || !arr.every((n) => n > 0)) return NaN;
  const sum = arr.reduce((acc, n) => acc + 1 / n, 0),
    result = arr.length / sum;
  return result;
}

/**
  @brief Calculates the median value of an array of numbers
  @param arr An array of numbers
  @returns The median value of the array
*/

export function median(arr: number[]): number {
  if (!arr.length) return NaN;
  const sortedArr = arr.sort((a, b) => a - b),
    mid = Math.floor(arr.length / 2),
    result =
      arr.length % 2 ? sortedArr[mid] : mean(sortedArr.slice(mid - 1, mid + 1));
  return result;
}

/**
 @brief Calculates the mode(s) of an array of numbers
 @param arr An array of numbers
 @returns An array of the mode(s) of the array
*/

export function mode(arr: number[]): number[] {
  if (!arr.length) return [];
  const Frequencies = new Map<number, number>(
      Array.from(new Set<number>(arr)).map((n) => [
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
  @brief Calculates the range of a given array of numbers.
  @param arr An array of numbers.
  @return The range of the given array.
*/

export function range(arr: number[]): number {
  const result = Math.max(...arr) - Math.min(...arr);
  return result;
}

/**
  @brief Calculates the midrange of a given array of numbers.
  @param arr An array of numbers.
  @return The midrange of the given array.
*/

export function midrange(arr: number[]): number {
  const result = range(arr) / 2;
  return result;
}

/**
  @brief Calculates the variance of a given array of numbers.
  @param arr An array of numbers.
  @return The variance of the given array.
*/

export function variance(arr: number[]): number {
  const meanVal = mean(arr),
    squaredDeviations = arr.map((n) => (n - meanVal) ** 2),
    result = mean(squaredDeviations);
  return result;
}

/**
  @brief Calculates the standard deviation of a given array of numbers.
  @param arr An array of numbers.
  @return The standard deviation of the given array.
*/

export function standardDeviation(arr: number[]): number {
  const result = Math.sqrt(variance(arr));
  return result;
}

/**
  @brief Calculates the sample variance of a given array of numbers.
  @param arr An array of numbers.
  @return The sample variance of the given array.
*/

export function sampleVariance(arr: number[]): number {
  if (arr.length <= 1) return NaN;
  const meanVal = mean(arr),
    squaredDeviations = arr.map((n) => (n - meanVal) ** 2),
    sum = squaredDeviations.reduce((acc, n) => acc + n, 0),
    result = sum / (arr.length - 1);
  return result;
}

/**
  @brief Calculates the sample standard deviation of a given array of numbers.
  @param arr An array of numbers.
  @return The sample standard deviation of the given array.
*/

export function sampleStandardDeviation(arr: number[]): number {
  const result = Math.sqrt(sampleVariance(arr));
  return result;
}
