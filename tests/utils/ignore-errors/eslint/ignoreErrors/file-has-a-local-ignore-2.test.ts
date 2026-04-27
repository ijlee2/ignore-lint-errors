import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint | ignoreErrors > file has a local ignore (2)', function () {
  const file = normalizeFile([
    `/* eslint-disable-next-line rule-2, rule-1 */`,
    `function add(vec) {`,
    `  //  eslint-disable-next-line  rule-3,  rule-4`,
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
      line: 2,
      message: '@typescript-eslint/explicit-function-return-type',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, rule-1, rule-2`,
      `function add(vec) {`,
      `// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, rule-3, rule-4`,
      `  return vec.x + vec.y;`,
      `}`,
    ]),
  );
});
