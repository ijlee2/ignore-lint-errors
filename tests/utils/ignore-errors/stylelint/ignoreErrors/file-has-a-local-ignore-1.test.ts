import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/stylelint.js';

test('utils | ignore-errors | stylelint | ignoreErrors > file has a local ignore (1)', function () {
  const file = normalizeFile([
    `.container {`,
    `  position: relative;`,
    `}`,
    ``,
    `/*  stylelint-disable-next-line rule-2,  rule-1  */`,
    `.container {`,
    `  /* stylelint-disable-next-line rule-3 */`,
    `  background-color: orange;`,
    `  overflow: visible !important;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 9,
      message: 'declaration-no-important',
    },
    {
      line: 8,
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
      `/* stylelint-disable-next-line no-duplicate-selectors, rule-1, rule-2 */`,
      `.container {`,
      `/* stylelint-disable-next-line color-named, rule-3 */`,
      `  background-color: orange;`,
      `/* stylelint-disable-next-line declaration-no-important */`,
      `  overflow: visible !important;`,
      `}`,
    ]),
  );
});
