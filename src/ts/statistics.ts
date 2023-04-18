function nPercentOfX(x: number, n: number): number {
  const result: number = (x / 100) * n;
  return result;
}

export function mean(values: number[]): number {
  if (values.length == 0) throw "Insert an array with at least one number.";
  const sum = values.reduce((acc, val) => acc + val, 0),
    result = sum / values.length;
  return result;
}

export function geometricMean(values: number[]): number {
  if (values.length == 0) throw "Insert an array with at least one number.";
  let product = 1,
    noNegatives = true,
    noPositives = true;
  for (let i = 0; i < values.length; i++) {
    if (values[i] < 0) {
      noNegatives = false;
      break;
    }
  }
  for (let i = 0; i < values.length; i++) {
    if (values[i] > 0) {
      noPositives = false;
      break;
    }
  }
  if (noNegatives && noPositives) {
    throw new Error("The values must be either all positive or all negative.");
  }
  for (let i = 0; i < values.length; i++) {
    product *= Math.abs(values[i]);
  }
  const result = noNegatives
      ? Math.pow(product,  1 / values.length)
      : -Math.pow(product,  1 / values.length);
  return result;
}

export function harmonicMean(values: number[]): number {
  if (values.length == 0) throw "Insert an array with at least one number.";
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] <= 0) {
      throw new Error("All values must be greater than zero.");
    }
    sum += 1 / values[i];
  }
  const result = values.length / sum;
  return result;
}

export function median(values: number[]): number {
  if (values.length == 0) throw "Insert an array with at least one number.";
  const sortedValues = values.sort((a, b) => a - b),
    length = sortedValues.length;
  if (length % 2) {
    return sortedValues[Math.floor(length / 2)];
  } else {
    return (sortedValues[length / 2 - 1] + sortedValues[length / 2]) / 2;
  }
}

export function mode(values: number[]): number[] {
  if (values.length == 0) throw "Insert an array with at least one number.";
  const sortedValues = values.sort((a, b) => a - b),
    frequency = [];
  let min = Number.MAX_SAFE_INTEGER,
    max = 0,
    result = [],
    frequencyLength = 0;
  frequency[frequencyLength++] = [sortedValues[0], 1];
  for (let i = 1; i < sortedValues.length; i++) {
    if (sortedValues[i] == frequency[frequencyLength - 1][0]) {
      frequency[frequencyLength - 1][1] += 1;
    } else {
      frequency[frequencyLength++] = [sortedValues[i], 1];
    }
  }
  for (let i = 0; i < frequencyLength; i++) {
    min = frequency[i][1] < min ? frequency[i][1] : min;
    max = frequency[i][1] > max ? frequency[i][1] : max;
  }
  if (min < max) {
    for (let i = 0; i < frequencyLength; i++) {
      if (frequency[i][1] == max) {
        result.push(frequency[i][0]);
      }
    }
  }
  return result;
}

export function range(values: number[]): number {
  if (values.length == 0) throw "Insert an array with at least one number.";
  const minValue = Math.min(...values),
    maxValue = Math.max(...values),
    result = maxValue - minValue;
  return result;
}

export function midrange(values: number[]): number {
  const result = range(values) / 2;
  return result;
}

export function variance(values: number[]): number {
  const mu = mean(values);
  let sum = 0;
  for (const value of values) {
    sum += (value - mu) ** 2;
  }
  const result = sum / values.length;
  return result;
}

export function standardDeviation(values: number[]): number {
  const result = Math.sqrt(variance(values));
  return result;
}

export function sampleVariance(values: number[]): number {
  const mu = mean(values);
  if (values.length == 1) throw "Sample size must be greater than 1";
  let sum = 0;
  for (const value of values) {
    sum += (value - mu) ** 2;
  }
  const result = sum / (values.length - 1);
  return result;
}

export function sampleStandardDeviation(values: number[]): number {
  const result = Math.sqrt(sampleVariance(values));
  return result;
}
