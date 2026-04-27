import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/stylelint.js';

test('utils | ignore-errors | stylelint | ignoreErrors > file has a local ignore (2)', function () {
  const file = normalizeFile([
    `.container {`,
    `  position: relative;`,
    `}`,
    ``,
    `/* stylelint-disable-line */`,
    `.container { /*  stylelint-disable-line rule-2,  rule-1  */`,
    `  background-color: orange; /* stylelint-disable-line rule-3 */`,
    `  overflow: visible !important;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 8,
      message: 'declaration-no-important',
    },
    {
      line: 7,
      message: 'color-named',
    },
    {
      line: 6,
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
      `/* stylelint-disable-line */`,
      `/* stylelint-disable-next-line no-duplicate-selectors */`,
      `.container { /*  stylelint-disable-line rule-2,  rule-1  */`,
      `/* stylelint-disable-next-line color-named */`,
      `  background-color: orange; /* stylelint-disable-line rule-3 */`,
      `/* stylelint-disable-next-line declaration-no-important */`,
      `  overflow: visible !important;`,
      `}`,
    ]),
  );
});
