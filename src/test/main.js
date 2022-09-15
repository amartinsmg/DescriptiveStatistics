const { ok: assert } = require("assert"),
  { readFileSync } = require("fs");

function roundTo(num, decimalPlaces) {
  let base10 = 10 ** decimalPlaces,
    result = Math.round(num * base10) / base10;
  return result;
}

void (async function () {
  const WasmBuffer = readFileSync(__dirname + "/../../build/assets/program.wasm"),
    WasmModule = await WebAssembly.instantiate(WasmBuffer, {
      wasi_snapshot_preview1: {
        proc_exit: (code) => {
          if (code) throw code;
        },
      },
    }),
    {
      memory,
      mean,
      geometricMean,
      harmonicMean,
      variance,
      standardDeviation,
      sampleVariance,
      sampleStandardDeviation,
    } = WasmModule.instance.exports,
    Arr = [6.72, 6.8, 7.2, 7.48, 8, 8.7, 9, 9.14, 9.25, 9.54, 9.99, 10],
    F64Arr = new Float64Array(memory.buffer, 0, 12),
    Args = [F64Arr.byteOffset, F64Arr.length];
  F64Arr.set(Arr);

  assert(roundTo(mean(...Args), 6) == 8.485);
  assert(roundTo(geometricMean(...Args), 6) == 8.404537);
  assert(roundTo(harmonicMean(...Args), 6) == 8.322122);
  assert(roundTo(variance(...Args), 6) == 1.320825);
  assert(roundTo(standardDeviation(...Args), 6) == 1.149272);
  assert(roundTo(sampleVariance(...Args), 6) == 1.4409);
  assert(roundTo(sampleStandardDeviation(...Args), 6) == 1.200375);

  console.log("Passed all tests successfuly");
})();
