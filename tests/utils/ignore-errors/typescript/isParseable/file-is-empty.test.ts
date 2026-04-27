import { assert, test } from '@codemod-utils/tests';

import { isParseable } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | isParseable > file is empty', function () {
  const file = '';

  assert.strictEqual(isParseable(file), true);
});
