//@ts-ignore
import "./css/style.css";
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
} from "./js/statistics";

function getStr(num) {
  if (isFinite(num) && !isNaN(num)) return num.toString();
  else return "-";
}

// This is the main function that handles the form submit event to perform statistical calculations on the set of numerical data based on user input.

function main() {
  const form = document.querySelector("#input-form"),
    datasetInput = document.querySelector(
      "#dataset-input",
    ),
    sampleRatio = document.querySelector(
      "#sample-pop-sample",
    ),
    errFeedbackDiv = document.querySelector("#err-feedback"),
    outElement = document.querySelector("#out"),
    sortedDtsDiv = document.querySelector("#sorted-dataset"),
    coutDiv = document.querySelector("#cout"),
    minDiv = document.querySelector("#min"),
    maxDiv = document.querySelector("#max"),
    rangeDiv = document.querySelector("#range"),
    midrangeDiv = document.querySelector("#midrange"),
    arithmeticMeanDiv = document.querySelector(
      "#arithmetic-mean",
    ),
    medianDiv = document.querySelector("#median"),
    modeDiv = document.querySelector("#mode"),
    arithmeticVarianceDiv = document.querySelector("#variance"),
    arithmeticStdDevDiv = document.querySelector(
      "#standard-deviation",
    ),
    harmonicMeanDiv = document.querySelector("#harmonic-mean"),
    geometricMeanDiv = document.querySelector("#geometric-mean");

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
