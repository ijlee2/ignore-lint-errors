import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { areTemplateTagsValid } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | areTemplateTagsValid > file has no template tags', function () {
  const file = normalizeFile([
    `function add(vec) {`,
    `  return vec.x + vec.y;`,
    `}`,
  ]);

  assert.strictEqual(areTemplateTagsValid(file), true);
});
