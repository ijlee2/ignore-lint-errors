import { assert, test } from '@codemod-utils/tests';

import { ignoreError } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | ignore-error > blockComment is true', function () {
  const lines = [
    `/* @ts-nocheck */`,
    `/* eslint-disable rule-1, rule-2 */`,
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ];

  const lintError = {
    line: 4,
    message:
      '@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return',
  };

  ignoreError(lintError, {
    blockComment: true,
    ignoreDirective: 'eslint-disable-next-line',
    lines,
  });

  assert.deepStrictEqual(lines, [
    `/* @ts-nocheck */`,
    `/* eslint-disable rule-1, rule-2 */`,
    `function add(vec) {`,
    `/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);
});
