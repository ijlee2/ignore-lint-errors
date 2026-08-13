import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsInTemplateTags } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrorsInTemplateTags > file has no errors (2)', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>`,
    `  {{add (hash x=1 y=2)}}`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsInTemplateTags(file, []);

  assert.strictEqual(newFile, file);
});
