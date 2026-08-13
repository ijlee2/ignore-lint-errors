import { assert, test } from '@codemod-utils/tests';

import { ignoreError } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | ignore-error > templateComment is true', function () {
  const lines = [
    `<template>`,
    `  {{!-- eslint-disable-next-line rule-1, rule-2 --}}`,
    `  <div data-test-hello ...attributes class="message">`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ];

  ignoreError(
    {
      line: 3,
      message: 'ember/template-sort-invocations',
    },
    {
      ignoreDirective: 'eslint-disable-next-line',
      lines,
      templateComment: true,
    },
  );

  ignoreError(
    {
      line: 4,
      message: 'ember/no-implicit-this',
    },
    {
      ignoreDirective: 'eslint-disable-next-line',
      lines,
      templateComment: true,
    },
  );

  assert.deepStrictEqual(lines, [
    `<template>`,
    `{{!-- eslint-disable-next-line ember/template-sort-invocations, rule-1, rule-2 --}}`,
    `  <div data-test-hello ...attributes class="message">`,
    `{{!-- eslint-disable-next-line ember/no-implicit-this --}}`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ]);
});
