import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/oxlint.js';

test('utils | ignore-errors | oxlint | ignoreErrors > file has a local ignore (1)', function () {
  const file = normalizeFile([
    `// oxlint-disable-next-line rule-2, rule-1`,
    `function add(vec) {`,
    `  // @ts-expect-error: Incorrect type`,
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
      `  // @ts-expect-error: Incorrect type`,
      `// oxlint-disable-next-line no-unsafe-member-access, no-unsafe-return`,
      `  return vec.x + vec.y;`,
      `}`,
    ]),
  );
});
