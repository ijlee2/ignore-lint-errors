import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsFallback } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrorsFallback > file has no errors', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>`,
    `  {{add (hash x=1 y=2)}}`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsFallback(file, []);

  assert.strictEqual(newFile, file);
});
