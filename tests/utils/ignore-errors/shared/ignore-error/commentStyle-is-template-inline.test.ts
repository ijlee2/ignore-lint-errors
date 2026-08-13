import { assert, test } from '@codemod-utils/tests';

import { ignoreError } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | ignore-error > commentStyle is template-inline', function () {
  const lines = [
    `<template>`,
    `  <div data-test-hello ...attributes class="message">`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ];

  const lintError = {
    line: 2,
    message: 'ember/template-sort-invocations',
  };

  ignoreError(lintError, {
    commentStyle: 'template-inline',
    ignoreDirective: 'eslint-disable-next-line',
    lines,
  });

  assert.deepStrictEqual(lines, [
    `<template>`,
    `{{! eslint-disable-next-line ember/template-sort-invocations }}`,
    `  <div data-test-hello ...attributes class="message">`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ]);
});
