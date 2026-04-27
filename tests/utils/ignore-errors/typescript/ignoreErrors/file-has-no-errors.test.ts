import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrors > file has no errors', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>`,
    `  {{add (hash x=1 y=2)}}`,
    `</template>`,
  ]);

  const newFile = ignoreErrors(file, []);

  assert.strictEqual(newFile, file);
});
