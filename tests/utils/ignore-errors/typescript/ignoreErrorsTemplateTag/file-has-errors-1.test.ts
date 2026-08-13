import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsTemplateTag } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrorsTemplateTag > file has errors (1)', function () {
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
      message: `Argument of type 'void' is not assignable to parameter of type 'Element'.`,
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
      `{{! @glint-expect-error: Argument of type 'void' is not assignable to parameter of type 'Element'. }}`,
      `  <div data-test-hello ...attributes class={{local styles "message" "emphasize"}}>`,
      `    Hello Vite!`,
      `  </div>`,
      `</template>`,
    ]),
  );
});
