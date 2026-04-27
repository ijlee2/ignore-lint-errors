import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint | ignoreErrors > file has a global ignore', function () {
  const file = normalizeFile([
    `/* @ts-nocheck */`,
    `/* eslint-disable rule-1, rule-2 */`,
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 4,
      message:
        '@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return',
    },
    {
      line: 3,
      message: '@typescript-eslint/explicit-function-return-type',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `/* @ts-nocheck */`,
      `/* eslint-disable rule-1, rule-2 */`,
      `// eslint-disable-next-line @typescript-eslint/explicit-function-return-type`,
      `function add(vec) {`,
      `// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return`,
      `  return vec.x + vec.y;`,
      `}`,
    ]),
  );
});
