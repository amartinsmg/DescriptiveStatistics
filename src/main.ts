require("./main.css");

type func1 = (pointer: number, length: number) => number;
type func2 = (pointer: number, length: number, nOfModes: number) => number;

interface WasmInstaceExports {
  memory: WebAssembly.Memory;
  sort: func1;
  mean: func1;
  geometricMean: func1;
  harmonicMean: func1;
  median: func1;
  mode: func2;
  min: func1;
  max: func1;
  range: func1;
  midrange: func1;
  variance: func1;
  standardDeviation: func1;
  sampleVariance: func1;
  sampleStandardDeviation: func1;
}

interface Utils {
  getArray: (
    buffer: ArrayBuffer,
    byteOffset: number,
    length: number
  ) => number[];
}

const { getArray }: Utils = require("./utils");

async function main() {
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

  try {
    const WasmBuffer = await fetch("./assets/program.wasm"),
      WasmModule = await WebAssembly.instantiateStreaming(WasmBuffer, {
        wasi_snapshot_preview1: {
          proc_exit: (code: number) => {
            if (code) throw `Exit code ${code}`;
          },
        },
        env: {
          power: (x: number, n: number) => x ** n,
        },
      }),
      {
        memory,
        sort,
        mean,
        variance,
        geometricMean,
        harmonicMean,
        median,
        mode,
        min,
        max,
        range,
        midrange,
        standardDeviation,
        sampleVariance,
        sampleStandardDeviation,
      }: WasmInstaceExports = WasmModule.instance.exports as any;

    Form.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        const { isInteger } = Number,
          StrNumbers = NumbersInput.value.split(/\s*,\s*/),
          Numbers = StrNumbers.map((s) => parseFloat(s)).filter(
            (n) => !isNaN(n)
          ),
          NumbersArr = new Float64Array(memory.buffer, 0, Numbers.length),
          NOfModes = new Uint32Array(memory.buffer, NumbersArr.byteLength),
          SAMPLE = SampleRadio.checked,
          NO_ZEROS = !Numbers.includes(0),
          NO_NEGATIVES = Numbers.filter((n) => n < 0).length == 0,
          NO_POSITIVES = Numbers.filter((n) => n > 0).length == 0;
        NumbersArr.set(Numbers);
        const Args: [number, number] = [
            NumbersArr.byteOffset,
            NumbersArr.length,
          ],
          SortedArr = getArray(memory.buffer, sort(...Args), NumbersArr.length),
          ARITHMETIC_MEAN = mean(...Args),
          GEOMETRIC_MEAN =
            NO_NEGATIVES || NO_POSITIVES ? geometricMean(...Args) : NaN,
          HARMONIC_MEAN =
            NO_ZEROS && NO_NEGATIVES ? harmonicMean(...Args) : NaN,
          MEDIAN = median(...Args),
          Mode = getArray(
            memory.buffer,
            mode(...Args, NOfModes.byteOffset),
            NOfModes[0]
          ),
          MIN = min(...Args),
          MAX = max(...Args),
          RANGE = range(...Args),
          MIDRANGE = midrange(...Args),
          VARIANCE = SAMPLE ? sampleVariance(...Args) : variance(...Args),
          STANDARD_DEVIATION = SAMPLE
            ? sampleStandardDeviation(...Args)
            : standardDeviation(...Args);
        OutEl.classList.remove("d-none");
        ErrFeedbackDiv.textContent = "";
        DataSetDiv.textContent = SortedArr.join(", ");
        CoutDiv.textContent = SortedArr.length.toString();
        ArithmeticMeanDiv.textContent = isFinite(GEOMETRIC_MEAN)
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
  } catch (err) {
    OutEl.classList.add("d-none");
    ErrFeedbackDiv.textContent =
      err instanceof Error ? err.message : String(err);
  }
}

main();
