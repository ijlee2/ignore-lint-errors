import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsTemplateTag } from '../../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint | ignoreErrorsTemplateTag > file has a local ignore (2)', function () {
  const file = normalizeFile([
    `<template>`,
    `  {{!-- eslint-disable-next-line ember/template-sort-invocations --}}`,
    `  <div data-test-hello ...attributes class="message">`,
    `    {{add (hash x=1 y=2)}}`,
    `  </div>`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsTemplateTag(file, [
    {
      line: 3,
      message: 'ember/no-implicit-this',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `<template>`,
      `{{!-- eslint-disable-next-line ember/no-implicit-this, ember/template-sort-invocations --}}`,
      `  <div data-test-hello ...attributes class="message">`,
      `    {{add (hash x=1 y=2)}}`,
      `  </div>`,
      `</template>`,
    ]),
  );
});
