import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/oxlint.js';

test('utils | ignore-errors | oxlint | ignoreErrors > file has errors', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 2,
      message: 'no-unsafe-member-access, no-unsafe-return',
    },
    {
      line: 1,
      message: 'explicit-function-return-type',
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `// oxlint-disable-next-line explicit-function-return-type`,
      `function add(vec) {`,
      `// oxlint-disable-next-line no-unsafe-member-access, no-unsafe-return`,
      `  return vec.x + vec.y;`,
      `}`,
    ]),
  );
});
