import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsFallback } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrorsFallback > file has errors (1)', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `function add(x, y) {`,
    `  return x + y;`,
    `}`,
  ]);

  const newFile = ignoreErrorsFallback(file, [
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
