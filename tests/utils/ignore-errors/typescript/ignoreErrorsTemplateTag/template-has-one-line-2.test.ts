import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsTemplateTag } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrorsTemplateTag > template has one line (2)', function () {
  const file = normalizeFile([
    `// eslint-disable-next-line @typescript-eslint/explicit-function-return-type`,
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>`,
    `  {{! eslint-disable-next-line ember/template-no-implicit-this, no-undef }}`,
    `  {{add (hash x=1 y=2)}}`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsTemplateTag(file, [
    {
      line: 8,
      message: `Cannot find name 'x'.`,
    },
    {
      line: 2,
      message: `Parameter 'vec' implicitly has an 'any' type.`,
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `// @ts-expect-error: Parameter 'vec' implicitly has an 'any' type.`,
      `// eslint-disable-next-line @typescript-eslint/explicit-function-return-type`,
      `function add(vec) {`,
      `  return vec.x + vec.y;`,
      `}`,
      ``,
      `<template>`,
      `  {{! eslint-disable-next-line ember/template-no-implicit-this, no-undef }}`,
      `{{! @glint-expect-error: Cannot find name 'x'. }}`,
      `  {{add (hash x=1 y=2)}}`,
      `</template>`,
    ]),
  );
});
