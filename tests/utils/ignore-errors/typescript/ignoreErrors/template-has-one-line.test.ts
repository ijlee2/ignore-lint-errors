import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrors > template has one line', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>{{add (hash x=1 y=2)}}</template>`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 5,
      message: `Cannot find name 'hash'.`,
    },
    {
      line: 1,
      message: `Parameter 'vec' implicitly has an 'any' type.`,
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `// @ts-expect-error: Parameter 'vec' implicitly has an 'any' type.`,
      `function add(vec) {`,
      `  return vec.x + vec.y;`,
      `}`,
      ``,
      `{{! @glint-expect-error: Cannot find name 'hash'. }}`,
      `<template>{{add (hash x=1 y=2)}}</template>`,
    ]),
  );
});
