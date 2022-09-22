function getArray(buffer, byteOffset, length) {
  const F64Arr = new Float64Array(buffer, byteOffset, length),
    Arr = Array.from(F64Arr);
  return Arr;
}

module.exports = { getArray };
