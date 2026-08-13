import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsTemplateTag } from '../../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint | ignoreErrorsTemplateTag > file has a local ignore (1)', function () {
  const file = normalizeFile([
    `// eslint-disable-next-line rule-2, rule-1`,
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>`,
    `  {{add (hash x=1 y=2)}}`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsTemplateTag(file, [
    {
      line: 2,
      message: '@typescript-eslint/explicit-function-return-type',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, rule-1, rule-2`,
      `function add(vec) {`,
      `  return vec.x + vec.y;`,
      `}`,
      ``,
      `<template>`,
      `  {{add (hash x=1 y=2)}}`,
      `</template>`,
    ]),
  );
});
