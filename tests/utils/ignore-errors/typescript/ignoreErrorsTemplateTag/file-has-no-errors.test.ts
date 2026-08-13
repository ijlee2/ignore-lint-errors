import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsTemplateTag } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrorsTemplateTag > file has no errors', function () {
  const file = normalizeFile([
    `type Vector = {`,
    `  x: number;`,
    `  y: number;`,
    `};`,
    ``,
    `function add(vec): number {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>`,
    `  {{add (hash x=1 y=2)}}`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsTemplateTag(file, []);

  assert.strictEqual(newFile, file);
});
