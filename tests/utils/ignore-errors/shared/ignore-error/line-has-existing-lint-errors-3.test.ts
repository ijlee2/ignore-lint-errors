import { assert, test } from '@codemod-utils/tests';

import { ignoreError } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | ignore-error > line has existing lint errors (3)', function () {
  const lines = [
    `/* @ts-nocheck */`,
    `/* eslint-disable rule-1, rule-2 */`,
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ];

  const lintError = {
    line: 3,
    message: '@typescript-eslint/explicit-function-return-type',
  };

  ignoreError(lintError, {
    ignoreDirective: 'eslint-disable-next-line',
    lines,
  });

  assert.deepStrictEqual(lines, [
    `/* @ts-nocheck */`,
    `/* eslint-disable rule-1, rule-2 */`,
    `// eslint-disable-next-line @typescript-eslint/explicit-function-return-type`,
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);
});
