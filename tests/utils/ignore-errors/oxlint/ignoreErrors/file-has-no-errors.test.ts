import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/oxlint.js';

test('utils | ignore-errors | oxlint | ignoreErrors > file has no errors', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, []);

  assert.strictEqual(newFile, file);
});
