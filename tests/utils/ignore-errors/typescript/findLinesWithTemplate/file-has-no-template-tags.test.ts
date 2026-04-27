import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findLinesWithTemplate } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | findLinesWithTemplate > file has no template tags', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);

  assert.deepStrictEqual(findLinesWithTemplate(file), []);
});
