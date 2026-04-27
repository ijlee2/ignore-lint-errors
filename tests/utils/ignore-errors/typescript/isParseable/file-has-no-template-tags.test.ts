import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { isParseable } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | isParseable > file has no template tags', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);

  assert.strictEqual(isParseable(file), true);
});
