import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { ignoreErrorsInTemplateTags } from '../../../../../src/utils/ignore-errors/typescript.js';

test('utils | ignore-errors | typescript | ignoreErrorsInTemplateTags > template has one line (2)', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
    ``,
    `const MyComponent = <template>{{add (hash x=1 y=2)}}</template>;`,
  ]);

  const newFile = ignoreErrorsInTemplateTags(file, [
    {
      line: 5,
      message: `Cannot find name 'hash'.`,
    },
    {
      line: 1,
      message: `Parameter 'vec' implicitly has an 'any' type.`,
    },
  ]);

  assert.strictEqual(
    newFile,
    normalizeFile([
      `// @ts-expect-error: Parameter 'vec' implicitly has an 'any' type.`,
      `function add(vec) {`,
      `  return vec.x + vec.y;`,
      `}`,
      ``,
      `const MyComponent = <template>{{! @glint-expect-error: Cannot find name 'hash'. }}`,
      `{{add (hash x=1 y=2)}}</template>;`,
    ]),
  );
});
