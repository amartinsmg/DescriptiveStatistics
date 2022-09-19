const { ok: assert } = require("assert"),
  { readFileSync } = require("fs"),
  { getArray } = require("../get_array");

function roundTo(num, decimalPlaces) {
  let base10 = 10 ** decimalPlaces,
    result = Math.round(num * base10) / base10;
  return result;
}

function arraysCmp(arr1, arr2) {
  const str1 = JSON.stringify(arr1),
    str2 = JSON.stringify(arr2);
  return str1 == str2;
}

void (async function () {
  const WasmBuffer = readFileSync(
      __dirname + "/../../build/assets/program.wasm"
    ),
    WasmModule = await WebAssembly.instantiate(WasmBuffer, {
      wasi_snapshot_preview1: {
        proc_exit: (code) => {
          if (code) throw `Exit code ${code}`;
        },
      },
    }),
    {
      memory,
      sort,
      mean,
      geometricMean,
      harmonicMean,
      median,
      mode,
      min,
      max,
      range,
      midrange,
      variance,
      standardDeviation,
      sampleVariance,
      sampleStandardDeviation,
    } = WasmModule.instance.exports,
    Arr = [10, 6.8, 7.48, 7.2, 6.72, 9.14, 9.54, 8.7, 10, 9.25, 8, 9],
    F64Arr = new Float64Array(memory.buffer, 0, Arr.length),
    NOfModes = new Uint32Array(memory.buffer, F64Arr.byteLength, 1),
    Args = [F64Arr.byteOffset, F64Arr.length];
  F64Arr.set(Arr);
  assert(
    arraysCmp(
      getArray(memory.buffer, sort(...Args), F64Arr.length),
      Arr.sort((a, b) => a - b)
    )
  );
  assert(roundTo(mean(...Args), 6) == 8.485833);
  assert(roundTo(geometricMean(...Args), 6) == 8.405238);
  assert(roundTo(harmonicMean(...Args), 6) == 8.3227);
  assert(median(...Args) == 8.85);
  assert(
    getArray(
      memory.buffer,
      mode(...Args, NOfModes.byteOffset),
      NOfModes[0]
    )[0] == 10 && NOfModes[0] == 1
  );
  assert(min(...Args) == 6.72);
  assert(max(...Args) == 10);
  assert(roundTo(range(...Args), 6) == 3.28);
  assert(roundTo(midrange(...Args), 6) == 1.64);
  assert(roundTo(variance(...Args), 6) == 1.323341);
  assert(roundTo(standardDeviation(...Args), 6) == 1.150366);
  assert(roundTo(sampleVariance(...Args), 6) == 1.443645);
  assert(roundTo(sampleStandardDeviation(...Args), 6) == 1.201518);

  console.log("Passed all tests successfuly!");
})();
