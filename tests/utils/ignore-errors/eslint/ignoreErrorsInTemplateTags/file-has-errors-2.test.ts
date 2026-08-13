import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsInTemplateTags } from '../../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint | ignoreErrorsInTemplateTags > file has errors (2)', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>`,
    `  <div data-test-hello ...attributes class="message">`,
    `    {{add (hash x=1 y=2)}}`,
    `  </div>`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsInTemplateTags(file, [
    {
      line: 7,
      message: 'ember/no-implicit-this',
    },
    {
      line: 6,
      message: 'ember/template-sort-invocations',
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
      `{{!-- eslint-disable-next-line ember/template-sort-invocations --}}`,
      `  <div data-test-hello ...attributes class="message">`,
      `{{!-- eslint-disable-next-line ember/no-implicit-this --}}`,
      `    {{add (hash x=1 y=2)}}`,
      `  </div>`,
      `</template>`,
    ]),
  );
});
