export function mean(values: number[]): number {
  if (values.length == 0) throw new Error("Insert an array with at least one number.");
  const SUM = values.reduce((acc, val) => acc + val, 0),
    RESULT = SUM / values.length;
  return RESULT;
}

export function geometricMean(values: number[]): number {
  if (values.length == 0) throw new Error("Insert an array with at least one number.");
  const PRODUCT = values.reduce((acc, val) => acc * Math.abs(val), 1),
    NO_NEGATIVE_VALUES = values.every((a) => a >= 0),
    NO_POSITIVE_VALUES = values.every((a) => a <= 0);
  if (!NO_NEGATIVE_VALUES && NO_POSITIVE_VALUES) {
    throw new Error("The values must be either all positive or all negative.");
  }
  const RESULT = NO_NEGATIVE_VALUES
    ? Math.pow(PRODUCT, 1 / values.length)
    : -Math.pow(PRODUCT, 1 / values.length);
  return RESULT;
}

export function harmonicMean(values: number[]): number {
  if (values.length == 0) throw new Error("Insert an array with at least one number.");
  const SOME_ZEROS = values.includes(0);
  if (SOME_ZEROS) throw new Error("All values must be greater than zero.");
  const SUM = values.reduce((acc, val) => acc + 1 / val, 0),
    RESULT = values.length / SUM;
  return RESULT;
}

export function median(values: number[]): number {
  if (values.length == 0) throw new Error("Insert an array with at least one number.");
  const SortedValues = values.sort((a, b) => a - b);
  if (SortedValues.length % 2) {
    return SortedValues[Math.floor(SortedValues.length / 2)];
  } else {
    return (
      (SortedValues[SortedValues.length / 2 - 1] +
        SortedValues[SortedValues.length / 2]) /
      2
    );
  }
}

export function mode(values: number[]): number[] {
  if (values.length == 0) throw new Error("Insert an array with at least one number.");
  const Frequencies: Map<number, number> = new Map(
    Array.from(new Set(values)).map((num) => [num, 0])
  );
  values.forEach((num) =>
    Frequencies.set(num, (Frequencies.get(num) ?? 0) + 1)
  );
  const MAX = Math.max(...Frequencies.values()),
    MIN = Math.min(...Frequencies.values()),
    RESULT: number[] = [];
  if (MIN < MAX) {
    Array.from(Frequencies).forEach(([num, frequency]) =>
      frequency == MAX ? RESULT.push(num) : void 0
    );
  }
  return RESULT;
}

export function range(values: number[]): number {
  if (values.length == 0) throw new Error("Insert an array with at least one number.");
  const MIN_VALUE = Math.min(...values),
    MAX_VALUE = Math.max(...values),
    RESULT = MAX_VALUE - MIN_VALUE;
  return RESULT;
}

export function midrange(values: number[]): number {
  const RESULT = range(values) / 2;
  return RESULT;
}

export function variance(values: number[]): number {
  const MU = mean(values),
    SUM = values.reduce((acc, val) => acc + (val - MU) ** 2, 0),
    RESULT = SUM / values.length;
  return RESULT;
}

export function standardDeviation(values: number[]): number {
  const RESULT = Math.sqrt(variance(values));
  return RESULT;
}

export function sampleVariance(values: number[]): number {
  const MU = mean(values),
    SUM = values.reduce((acc, val) => acc + (val - MU) ** 2, 0),
    RESULT = SUM / (values.length - 1);
  return RESULT;
}

export function sampleStandardDeviation(values: number[]): number {
  const RESULT = Math.sqrt(sampleVariance(values));
  return RESULT;
}