import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/oxlint.js';

test('utils | ignore-errors | oxlint | ignoreErrors > file has a local ignore (2)', function () {
  const file = normalizeFile([
    `/* oxlint-disable-next-line rule-2, rule-1 */`,
    `function add(vec) {`,
    `  //  oxlint-disable-next-line  rule-3,  rule-4`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 4,
      message: 'no-unsafe-member-access, no-unsafe-return',
    },
    {
      line: 2,
      message: 'explicit-function-return-type',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `// oxlint-disable-next-line explicit-function-return-type, rule-1, rule-2`,
      `function add(vec) {`,
      `// oxlint-disable-next-line no-unsafe-member-access, no-unsafe-return, rule-3, rule-4`,
      `  return vec.x + vec.y;`,
      `}`,
    ]),
  );
});
