import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { areTemplateTagsValid } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | areTemplateTagsValid > file is parseable (4)', function () {
  const file = normalizeFile([
    `import { local } from 'embroider-css-modules';`,
    ``,
    `import styles from './hello.module.css';`,
    ``,
    `<template>`,
    `// eslint-disable-next-line ember/template-sort-invocations`,
    `  <div data-test-hello ...attributes class={{local styles "message" "emphasize"}}>`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ]);

  assert.strictEqual(areTemplateTagsValid(file), true);
});
