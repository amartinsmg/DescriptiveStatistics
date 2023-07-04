/**
  @brief Calculates the mean value of an array of numbers
  @param arr An array of numbers
  @throws If the input array is empty
  @returns The mean value of the array
*/

export function mean(arr: number[]): number {
  if (!arr.length) throw new Error("Insert an array with at least one number.");
  const SUM = arr.reduce((acc, n) => acc + n, 0),
    RESULT = SUM / arr.length;
  return RESULT;
}

/**
  @brief Calculates the geometric mean of an array of numbers
  @param arr An array of numbers
  @throws If the input array is empty or if it contains both positive and negative values
  @returns The geometric mean of the array
 */

export function geometricMean(arr: number[]): number {
  if (!arr.length) throw new Error("Insert an array with at least one number.");
  if (arr.filter((n) => n > 0).length && arr.filter((n) => n < 0).length)
    throw new Error("The values must be either all positive or all negative.");
  const PRODUCT = arr.reduce((acc, n) => acc * n, 1),
    RESULT = PRODUCT ** (1 / arr.length);
  return RESULT;
}

/**
  @brief Calculates the harmonic mean of an array of numbers
  @param arr An array of numbers
  @throws If the input array is empty or if it contains zero values
  @returns The harmonic mean of the array
*/

export function harmonicMean(arr: number[]): number {
  if (!arr.length) throw new Error("Insert an array with at least one number.");
  if (arr.filter((n) => n <= 0).length)
    throw new Error("All values must be greater than zero.");
  const SUM = arr.reduce((acc, n) => acc + 1 / n, 0),
    RESULT = arr.length / SUM;
  return RESULT;
}

/**
  @brief Calculates the median value of an array of numbers
  @param arr An array of numbers
  @throws If the input array is empty
  @returns The median value of the array
*/

export function median(arr: number[]): number {
  if (!arr.length) throw new Error("Insert an array with at least one number.");
  const SortedArr = arr.sort((a, b) => a - b),
    RESULT =
      arr.length % 2
        ? SortedArr[arr.length / 2]
        : mean(SortedArr.slice(arr.length / 2 - 1, arr.length / 2 + 1));
  return RESULT;
}

/**
 @brief Calculates the mode(s) of an array of numbers
 @param arr An array of numbers
 @throws If the input array is empty
 @returns An array of the mode(s) of the array
*/

export function mode(arr: number[]): number[] {
  if (!arr.length) throw new Error("Insert an array with at least one number.");
  const Frequencies = new Map<number, number>(
      Array.from(new Set<number>(arr)).map((n) => [
        n,
        arr.filter((x) => x === n).length,
      ])
    ),
    MAX = Math.max(...Frequencies.values()),
    MIN = Math.min(...Frequencies.values()),
    Result =
      MAX > MIN
        ? Array.from(
            new Map(
              Array.from(Frequencies.entries()).filter(
                ([, frequency]) => frequency == MAX
              )
            ).keys()
          )
        : [];
  return Result;
}

/**
  @brief Calculates the range of a given array of numbers.
  @param arr An array of numbers.
  @throws Error if the array is empty.
  @return The range of the given array.
*/

export function range(arr: number[]): number {
  const RESULT = Math.max(...arr) - Math.min(...arr);
  return RESULT;
}

/**
  @brief Calculates the midrange of a given array of numbers.
  @param arr An array of numbers.
  @throws Error if the array is empty.
  @return The midrange of the given array.
*/

export function midrange(arr: number[]): number {
  const RESULT = range(arr) / 2;
  return RESULT;
}

/**
  @brief Calculates the variance of a given array of numbers.
  @param arr An array of numbers.
  @throws Error if the array is empty.
  @return The variance of the given array.
*/

export function variance(arr: number[]): number {
  const MEAN = mean(arr),
    SquaredDeviationsFromMEan = arr.map((n) => (n - MEAN) ** 2),
    RESULT = mean(SquaredDeviationsFromMEan);
  return RESULT;
}

/**
  @brief Calculates the standard deviation of a given array of numbers.
  @param arr An array of numbers.
  @throws Error if the array is empty.
  @return The standard deviation of the given array.
*/

export function standardDeviation(arr: number[]): number {
  const RESULT = Math.sqrt(variance(arr));
  return RESULT;
}

/**
  @brief Calculates the sample variance of a given array of numbers.
  @param arr An array of numbers.
  @throws Error if the array is empty.
  @return The sample variance of the given array.
*/

export function sampleVariance(arr: number[]): number {
  const MEAN = mean(arr),
    SquaredDeviationsFromMEan = arr.map((n) => (n - MEAN) ** 2),
    SUM = SquaredDeviationsFromMEan.reduce((acc, n) => acc + n, 0),
    RESULT = SUM / (arr.length - 1);
  return RESULT;
}

/**
  @brief Calculates the sample standard deviation of a given array of numbers.
  @param arr An array of numbers.
  @throws Error if the array is empty.
  @return The sample standard deviation of the given array.
*/

export function sampleStandardDeviation(arr: number[]): number {
  const RESULT = Math.sqrt(sampleVariance(arr));
  return RESULT;
}
