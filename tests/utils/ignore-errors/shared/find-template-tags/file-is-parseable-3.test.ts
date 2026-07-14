import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findTemplateTags } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | findTemplateTags > file is parseable (3)', function () {
  const file = normalizeFile([
    `import { local } from 'embroider-css-modules';`,
    ``,
    `import styles from './hello.module.css';`,
    ``,
    `<template>`,
    `{{!-- eslint-disable-next-line ember/template-sort-invocations --}}`,
    `  <div data-test-hello ...attributes class={{local styles "message" "emphasize"}}>`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ]);

  const lineRanges = findTemplateTags(file).map(({ lineRange }) => lineRange);

  assert.deepStrictEqual(lineRanges, [
    {
      end: 10,
      start: 5,
    },
  ]);
});
