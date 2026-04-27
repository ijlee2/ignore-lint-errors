import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrors } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrors > file has errors (1)', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `function add(x, y) {`,
    `  return x + y;`,
    `}`,
  ]);

  const newFile = ignoreErrors(file, [
    {
      line: 5,
      message: `Duplicate function implementation. Parameter 'x' implicitly has an 'any' type. Parameter 'y' implicitly has an 'any' type.`,
    },
    {
      line: 1,
      message: `Duplicate function implementation. Parameter 'vec' implicitly has an 'any' type.`,
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `// @ts-expect-error: Duplicate function implementation. Parameter 'vec' implicitly has an 'any' type.`,
      `function add(vec) {`,
      `  return vec.x + vec.y;`,
      `}`,
      ``,
      `// @ts-expect-error: Duplicate function implementation. Parameter 'x' implicitly has an 'any' type. Parameter 'y' implicitly has an 'any' type.`,
      `function add(x, y) {`,
      `  return x + y;`,
      `}`,
    ]),
  );
});
