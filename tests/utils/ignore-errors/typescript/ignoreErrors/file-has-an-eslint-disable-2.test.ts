import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrors > file has an eslint-disable (2)', function () {
  const file = normalizeFile([
    `/* eslint-disable @typescript-eslint/no-unsafe-return */`,
    `/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars */`,
    `function add(vec) {`,
    `  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `/* eslint-disable @typescript-eslint/explicit-function-return-type */`,
    `function add(x, y) {`,
    `  return x + y;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 9,
      message: `Duplicate function implementation. Parameter 'x' implicitly has an 'any' type. Parameter 'y' implicitly has an 'any' type.`,
    },
    {
      line: 3,
      message: `Duplicate function implementation. Parameter 'vec' implicitly has an 'any' type.`,
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `/* eslint-disable @typescript-eslint/no-unsafe-return */`,
      `/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars */`,
      `// @ts-expect-error: Duplicate function implementation. Parameter 'vec' implicitly has an 'any' type.`,
      `function add(vec) {`,
      `  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access`,
      `  return vec.x + vec.y;`,
      `}`,
      ``,
      `/* eslint-disable @typescript-eslint/explicit-function-return-type */`,
      `// @ts-expect-error: Duplicate function implementation. Parameter 'x' implicitly has an 'any' type. Parameter 'y' implicitly has an 'any' type.`,
      `function add(x, y) {`,
      `  return x + y;`,
      `}`,
    ]),
  );
});
