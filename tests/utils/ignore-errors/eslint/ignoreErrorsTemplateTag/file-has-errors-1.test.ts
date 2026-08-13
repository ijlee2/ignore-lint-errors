import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsTemplateTag } from '../../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint | ignoreErrorsTemplateTag > file has errors (1)', function () {
  const file = normalizeFile([
    `import { local } from 'embroider-css-modules';`,
    ``,
    `import styles from './hello.module.css';`,
    ``,
    `<template>`,
    `  <div data-test-hello ...attributes class={{local styles "message" "emphasize"}}>`,
    `    Hello Vite!`,
    `  </div>`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsTemplateTag(file, [
    {
      line: 6,
      message: 'ember/template-sort-invocations',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
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
    ]),
  );
});
