import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsInTemplateTags } from '../../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint | ignoreErrorsInTemplateTags > file has no errors', function () {
  const file = normalizeFile([
    `import { local } from 'embroider-css-modules';`,
    ``,
    `import styles from './hello.module.css';`,
    ``,
    `<template>`,
    `  <div data-test-hello ...attributes class={{local styles "message"}}>`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsInTemplateTags(file, []);

  assert.strictEqual(newFile, file);
});
