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
    DataSetDiv = document.querySelector("#data-set") as HTMLElement,
    ArithmeticMeanDiv = document.querySelector(
      "#arithmetic-mean"
    ) as HTMLElement,
    ErrFeedbackDiv = document.querySelector("#err-feedback") as HTMLElement,
    OutGroupDivs = document.querySelectorAll(
      ".out-group"
    ) as NodeListOf<HTMLElement>,
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
          SAMPLE = SampleRadio.checked;
        NumbersArr.set(Numbers);
        const Args: [number, number] = [
            NumbersArr.byteOffset,
            NumbersArr.length,
          ],
          SortedArr = getArray(
            memory.buffer,
            sort(NumbersArr.byteOffset, NumbersArr.length),
            NumbersArr.length
          ),
          ARITHMETIC_MEAN = mean(...Args),
          GEOMETRIC_MEAN = geometricMean(...Args),
          HARMONIC_MEAN = harmonicMean(...Args),
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
        OutGroupDivs.forEach((el) => el.classList.remove("d-none"));
        ErrFeedbackDiv.textContent = "";
        DataSetDiv.textContent = SortedArr.join(", ");
        ArithmeticMeanDiv.textContent = isInteger(ARITHMETIC_MEAN * 1e6)
          ? ARITHMETIC_MEAN.toString()
          : ARITHMETIC_MEAN.toFixed(6);
        GeometricMeanDiv.textContent = isInteger(GEOMETRIC_MEAN * 1e6)
          ? GEOMETRIC_MEAN.toString()
          : GEOMETRIC_MEAN.toFixed(6);
        HarmonicMeanDiv.textContent = isInteger(HARMONIC_MEAN * 1e6)
          ? HARMONIC_MEAN.toString()
          : HARMONIC_MEAN.toFixed(6);
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
        ArithmeticVarianceDiv.textContent = isInteger(VARIANCE * 1e6)
          ? VARIANCE.toString()
          : VARIANCE.toFixed(6);
        ArithmeticSDDiv.textContent = isInteger(STANDARD_DEVIATION * 1e6)
          ? STANDARD_DEVIATION.toString()
          : STANDARD_DEVIATION.toFixed(6);
      } catch (err) {
        OutGroupDivs.forEach((el) => el.classList.add("d-none"));
        ErrFeedbackDiv.textContent =
          err instanceof Error ? err.message : String(err);
      }
    });
  } catch (err) {
    OutGroupDivs.forEach((el) => el.classList.add("d-none"));
    ErrFeedbackDiv.textContent =
      err instanceof Error ? err.message : String(err);
  }
}

main();
