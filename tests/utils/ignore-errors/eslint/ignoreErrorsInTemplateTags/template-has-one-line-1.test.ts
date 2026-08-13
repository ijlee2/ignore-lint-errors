import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsInTemplateTags } from '../../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint | ignoreErrorsInTemplateTags > template has one line (1)', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>{{add (hash x=1 y=2)}}</template>`,
  ]);

  const newFile = ignoreErrorsInTemplateTags(file, [
    {
      line: 5,
      message: 'ember/no-implicit-this',
    },
    {
      line: 1,
      message: '@typescript-eslint/explicit-function-return-type',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `// eslint-disable-next-line @typescript-eslint/explicit-function-return-type`,
      `function add(vec) {`,
      `  return vec.x + vec.y;`,
      `}`,
      ``,
      `<template>{{!-- eslint-disable-next-line ember/no-implicit-this --}}`,
      `{{add (hash x=1 y=2)}}</template>`,
    ]),
  );
});
