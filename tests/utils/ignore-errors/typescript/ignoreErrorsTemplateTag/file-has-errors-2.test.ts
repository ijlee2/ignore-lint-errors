import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsTemplateTag } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrorsTemplateTag > file has errors (2)', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `<template>`,
    `  <div data-test-output ...attributes class="sum">`,
    `    {{add (hash x=1 y=2)}}`,
    `  </div>`,
    `</template>`,
  ]);

  const newFile = ignoreErrorsTemplateTag(file, [
    {
      line: 7,
      message: `Cannot find name 'x'.`,
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `function add(vec) {`,
      `  return vec.x + vec.y;`,
      `}`,
      ``,
      `<template>`,
      `  <div data-test-output ...attributes class="sum">`,
      `{{! @glint-expect-error: Cannot find name 'x'. }}`,
      `    {{add (hash x=1 y=2)}}`,
      `  </div>`,
      `</template>`,
    ]),
  );
});
