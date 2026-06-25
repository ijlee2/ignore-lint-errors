import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/oxlint.js';

test('utils | ignore-errors | oxlint | ignoreErrors > file has a global ignore', function () {
  const file = normalizeFile([
    `/* @ts-nocheck */`,
    `/* oxlint-disable rule-1, rule-2 */`,
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 4,
      message: 'no-unsafe-member-access, no-unsafe-return',
    },
    {
      line: 3,
      message: 'explicit-function-return-type',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `/* @ts-nocheck */`,
      `/* oxlint-disable rule-1, rule-2 */`,
      `// oxlint-disable-next-line explicit-function-return-type`,
      `function add(vec) {`,
      `// oxlint-disable-next-line no-unsafe-member-access, no-unsafe-return`,
      `  return vec.x + vec.y;`,
      `}`,
    ]),
  );
});
