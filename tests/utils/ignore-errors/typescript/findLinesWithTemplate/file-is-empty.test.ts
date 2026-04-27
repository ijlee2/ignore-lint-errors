import { assert, test } from '@codemod-utils/tests';

import { findLinesWithTemplate } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | findLinesWithTemplate > file is empty', function () {
  const file = '';

  assert.deepStrictEqual(findLinesWithTemplate(file), []);
});
