import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsTemplateTag } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrorsTemplateTag > file has no errors (1)', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `function add(x, y) {`,
    `  return x + y;`,
    `}`,
  ]);

  const newFile = ignoreErrorsTemplateTag(file, []);

  assert.strictEqual(newFile, file);
});
