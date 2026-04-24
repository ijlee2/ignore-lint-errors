import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../src/utils/ignore-errors/eslint.js';

test('utils | ignore-errors | eslint > ignoreErrors', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);

  const lintErrors = [
    {
      line: 2,
      message:
        '@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return',
    },
    {
      line: 1,
      message: '@typescript-eslint/explicit-function-return-type',
    },
  ];

  assert.strictEqual(
    ignoreErrors(file, lintErrors),
    normalizeFile([
      `// eslint-disable-next-line @typescript-eslint/explicit-function-return-type`,
      `function add(vec) {`,
      `// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return`,
      `  return vec.x + vec.y;`,
      `}`,
    ]),
  );
});
