import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/stylelint.js';

test('utils | ignore-errors | stylelint | ignoreErrors > file has no errors', function () {
  const file = normalizeFile([
    `.container {`,
    `  position: relative;`,
    `}`,
    ``,
    `.container {`,
    `  background-color: orange;`,
    `  overflow: visible !important;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, []);

  assert.strictEqual(newFile, file);
});
