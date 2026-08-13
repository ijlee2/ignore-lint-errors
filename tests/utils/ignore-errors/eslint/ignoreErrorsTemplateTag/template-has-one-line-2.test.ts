import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsTemplateTag } from '../../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint | ignoreErrorsTemplateTag > template has one line (2)', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>`,
    `  {{! eslint-disable-next-line no-undef }}`,
    `  {{add (hash x=1 y=2)}}`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsTemplateTag(file, [
    {
      line: 7,
      message: 'ember/template-no-implicit-this',
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
      `<template>`,
      `{{! eslint-disable-next-line ember/template-no-implicit-this, no-undef }}`,
      `  {{add (hash x=1 y=2)}}`,
      `</template>`,
    ]),
  );
});
