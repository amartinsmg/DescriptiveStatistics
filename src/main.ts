import "./main.css";
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
} from "./ts/statistics";

function getStr(num: number): string {
  if (isFinite(num) && !isNaN(num)) return num.toString();
  else return "-";
}

// This is the main function that handles the form submit event to perform statistical calculations on the set of numerical data based on user input.

function main() {
  const form = document.querySelector("#input-form") as HTMLFormElement,
    datasetInput = document.querySelector(
      "#dataset-input",
    ) as HTMLTextAreaElement,
    sampleRatio = document.querySelector(
      "#sample-pop-sample",
    ) as HTMLInputElement,
    errFeedbackDiv = document.querySelector("#err-feedback") as HTMLElement,
    outElement = document.querySelector("#out") as HTMLElement,
    sortedDtsDiv = document.querySelector("#sorted-dataset") as HTMLElement,
    coutDiv = document.querySelector("#cout") as HTMLElement,
    minDiv = document.querySelector("#min") as HTMLElement,
    maxDiv = document.querySelector("#max") as HTMLElement,
    rangeDiv = document.querySelector("#range") as HTMLElement,
    midrangeDiv = document.querySelector("#midrange") as HTMLElement,
    arithmeticMeanDiv = document.querySelector(
      "#arithmetic-mean",
    ) as HTMLElement,
    medianDiv = document.querySelector("#median") as HTMLElement,
    modeDiv = document.querySelector("#mode") as HTMLElement,
    arithmeticVarianceDiv = document.querySelector("#variance") as HTMLElement,
    arithmeticStdDevDiv = document.querySelector(
      "#standard-deviation",
    ) as HTMLElement,
    harmonicMeanDiv = document.querySelector("#harmonic-mean") as HTMLElement,
    geometricMeanDiv = document.querySelector("#geometric-mean") as HTMLElement;

  /**
   * Heandles the form submit event.
   * @param e - The event object.
  */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const strDataset = datasetInput.value.split(/\s*(,|;)\s*/),
        numDataset = strDataset
          .map((s) => parseFloat(s))
          .filter((n) => !isNaN(n)),
        sample = sampleRatio.checked,
        SortedArr = numDataset.sort((a, b) => a - b),
        arithmeticMean = mean(numDataset),
        geomMean = geometricMean(numDataset),
        harmMean = harmonicMean(numDataset),
        medianVal = median(numDataset),
        modeArr = mode(numDataset),
        min = Math.min(...numDataset),
        max = Math.max(...numDataset),
        rangeVal = range(numDataset),
        midrangeVal = midrange(numDataset),
        varianceVal = sample
          ? sampleVariance(numDataset)
          : variance(numDataset),
        stdDev = sample
          ? sampleStandardDeviation(numDataset)
          : standardDeviation(numDataset);
      outElement.classList.remove("d-none");
      errFeedbackDiv.textContent = "";
      sortedDtsDiv.textContent = SortedArr.join(", ");
      coutDiv.textContent = SortedArr.length.toString();
      minDiv.textContent = getStr(min);
      maxDiv.textContent = getStr(max);
      rangeDiv.textContent = getStr(rangeVal);
      midrangeDiv.textContent = getStr(midrangeVal);
      arithmeticMeanDiv.textContent = getStr(arithmeticMean);
      medianDiv.textContent = getStr(medianVal);
      modeDiv.textContent = modeArr.length ? modeArr.join(", ") : "-";
      arithmeticStdDevDiv.textContent = getStr(stdDev);
      arithmeticVarianceDiv.textContent = getStr(varianceVal);
      geometricMeanDiv.textContent = getStr(geomMean);
      harmonicMeanDiv.textContent = getStr(harmMean);
    } catch (err) {
      outElement.classList.add("d-none");
      errFeedbackDiv.textContent =
        err instanceof Error ? err.message : String(err);
    }
  });
}

// Execute the main function on page load.

window.addEventListener("load", main);
