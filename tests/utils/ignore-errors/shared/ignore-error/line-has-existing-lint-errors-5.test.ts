import { assert, test } from '@codemod-utils/tests';

import { ignoreError } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | ignore-error > line has existing lint errors (5)', function () {
  const lines = [
    `<template>`,
    `  {{!-- eslint-disable-next-line ember/rule-1, ember/rule-2 --}}`,
    `  <div data-test-hello ...attributes class="message">`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ];

  const lintError = {
    line: 3,
    message: 'ember/template-sort-invocations',
  };

  ignoreError(lintError, {
    commentStyle: 'template-inline',
    ignoreDirective: 'eslint-disable-next-line',
    lines,
  });

  assert.deepStrictEqual(lines, [
    `<template>`,
    `{{! eslint-disable-next-line ember/rule-1, ember/rule-2, ember/template-sort-invocations }}`,
    `  <div data-test-hello ...attributes class="message">`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ]);
});
