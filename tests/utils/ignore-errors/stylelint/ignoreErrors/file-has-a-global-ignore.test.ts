import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/stylelint.js';

test('utils | ignore-errors | stylelint | ignoreErrors > file has a global ignore', function () {
  const file = normalizeFile([
    `.container {`,
    `  position: relative;`,
    `}`,
    ``,
    `/* stylelint-disable rule-2, rule-1 */`,
    `.container {`,
    `  /* stylelint-disable rule-3 */`,
    `  background-color: orange;`,
    `  /* stylelint-enable rule-3 */`,
    `  overflow: visible !important;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 10,
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
      `/* stylelint-disable rule-2, rule-1 */`,
      `/* stylelint-disable-next-line no-duplicate-selectors */`,
      `.container {`,
      `  /* stylelint-disable rule-3 */`,
      `/* stylelint-disable-next-line color-named */`,
      `  background-color: orange;`,
      `  /* stylelint-enable rule-3 */`,
      `/* stylelint-disable-next-line declaration-no-important */`,
      `  overflow: visible !important;`,
      `}`,
    ]),
  );
});
