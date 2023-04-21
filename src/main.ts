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
} from "./statistics";

// This is the main function that handles the form submit event to perform statistical calculations on the set of numerical data based on user input.

function main() {
  const Form = document.querySelector("#input-form") as HTMLFormElement,
    NumbersInput = document.querySelector(
      "#numbers-input"
    ) as HTMLTextAreaElement,
    SampleRadio = document.querySelector(
      "#sample-pop-sample"
    ) as HTMLInputElement,
    ErrFeedbackDiv = document.querySelector("#err-feedback") as HTMLElement,
    OutEl = document.querySelector("#out") as HTMLElement,
    DataSetDiv = document.querySelector("#data-set") as HTMLElement,
    CoutDiv = document.querySelector("#cout") as HTMLElement,
    ArithmeticMeanDiv = document.querySelector(
      "#arithmetic-mean"
    ) as HTMLElement,
    HarmonicMeanDiv = document.querySelector("#harmonic-mean") as HTMLElement,
    GeometricMeanDiv = document.querySelector("#geometric-mean") as HTMLElement,
    MedianDiv = document.querySelector("#median") as HTMLElement,
    ModeDiv = document.querySelector("#mode") as HTMLElement,
    MinDiv = document.querySelector("#min") as HTMLElement,
    MaxDiv = document.querySelector("#max") as HTMLElement,
    RangeDiv = document.querySelector("#range") as HTMLElement,
    MidrangeDiv = document.querySelector("#midrange") as HTMLElement,
    ArithmeticVarianceDiv = document.querySelector("#variance") as HTMLElement,
    ArithmeticSDDiv = document.querySelector(
      "#standard-deviation"
    ) as HTMLElement;

  /**
    This function handles the form submit event.
    @param e - The event object.
  */
  Form.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const { isInteger } = Number,
        StrNumbers = NumbersInput.value.split(/\s*,\s*/),
        Numbers = StrNumbers.map((s) => parseFloat(s)).filter((n) => !isNaN(n)),
        SAMPLE = SampleRadio.checked,
        NO_ZEROS = !Numbers.includes(0),
        NO_NEGATIVE_VALUES = Numbers.every((a) => a >= 0),
        NO_POSITIVE_VALUES = Numbers.every((a) => a <= 0),
        SortedArr = Numbers.sort((a, b) => a - b),
        ARITHMETIC_MEAN = mean(Numbers),
        GEOMETRIC_MEAN =
          NO_NEGATIVE_VALUES || NO_POSITIVE_VALUES
            ? geometricMean(Numbers)
            : NaN,
        HARMONIC_MEAN =
          NO_ZEROS && NO_NEGATIVE_VALUES ? harmonicMean(Numbers) : NaN,
        MEDIAN = median(Numbers),
        Mode = mode(Numbers),
        MIN = Math.min(...Numbers),
        MAX = Math.max(...Numbers),
        RANGE = range(Numbers),
        MIDRANGE = midrange(Numbers),
        VARIANCE = SAMPLE ? sampleVariance(Numbers) : variance(Numbers),
        STANDARD_DEVIATION = SAMPLE
          ? sampleStandardDeviation(Numbers)
          : standardDeviation(Numbers);
      OutEl.classList.remove("d-none");
      ErrFeedbackDiv.textContent = "";
      DataSetDiv.textContent = SortedArr.join(", ");
      CoutDiv.textContent = SortedArr.length.toString();
      ArithmeticMeanDiv.textContent = isFinite(ARITHMETIC_MEAN)
        ? isInteger(ARITHMETIC_MEAN * 1e6)
          ? ARITHMETIC_MEAN.toString()
          : ARITHMETIC_MEAN.toFixed(6)
        : "-";
      GeometricMeanDiv.textContent =
        isFinite(GEOMETRIC_MEAN) && !isNaN(GEOMETRIC_MEAN)
          ? isInteger(GEOMETRIC_MEAN * 1e6)
            ? GEOMETRIC_MEAN.toString()
            : GEOMETRIC_MEAN.toFixed(6)
          : "-";
      HarmonicMeanDiv.textContent = !isNaN(HARMONIC_MEAN)
        ? isInteger(HARMONIC_MEAN * 1e6)
          ? HARMONIC_MEAN.toString()
          : HARMONIC_MEAN.toFixed(6)
        : "-";
      MedianDiv.textContent = MEDIAN.toString();
      ModeDiv.textContent = Mode.join(", ");
      MinDiv.textContent = MIN.toString();
      MaxDiv.textContent = MAX.toString();
      RangeDiv.textContent = isInteger(RANGE * 1e6)
        ? RANGE.toString()
        : RANGE.toFixed(6);
      MidrangeDiv.textContent = isInteger(MIDRANGE * 1e6)
        ? MIDRANGE.toString()
        : MIDRANGE.toFixed(6);
      ArithmeticVarianceDiv.textContent = isFinite(VARIANCE)
        ? isInteger(VARIANCE * 1e6)
          ? VARIANCE.toString()
          : VARIANCE.toFixed(6)
        : "-";
      ArithmeticSDDiv.textContent = isFinite(STANDARD_DEVIATION)
        ? isInteger(STANDARD_DEVIATION * 1e6)
          ? STANDARD_DEVIATION.toString()
          : STANDARD_DEVIATION.toFixed(6)
        : "-";
    } catch (err) {
      OutEl.classList.add("d-none");
      ErrFeedbackDiv.textContent =
        err instanceof Error ? err.message : String(err);
    }
  });
}

// Execute the main function on page load.

window.addEventListener("load", main);
