#!/bin/bash

([ -d build ] || mkdir build) && ([ -d build/assets ] || mkdir build/assets)

wat2wasm -o build/assets/program.wasm src/program.wat
