import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/stylelint.js';

test('utils | ignore-errors | stylelint | ignoreErrors > file has errors', function () {
  const file = normalizeFile([
    `.container {`,
    `  position: relative;`,
    `}`,
    ``,
    `.container {`,
    `  background-color: #a3b4c2;`,
    `  overflow: visible !important;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 7,
      message: 'declaration-no-important',
    },
    {
      line: 6,
      message: 'color-no-hex',
    },
    {
      line: 5,
      message: 'no-duplicate-selectors',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `.container {`,
      `  position: relative;`,
      `}`,
      ``,
      `/* stylelint-disable-next-line no-duplicate-selectors */`,
      `.container {`,
      `/* stylelint-disable-next-line color-no-hex */`,
      `  background-color: #a3b4c2;`,
      `/* stylelint-disable-next-line declaration-no-important */`,
      `  overflow: visible !important;`,
      `}`,
    ]),
  );
});
