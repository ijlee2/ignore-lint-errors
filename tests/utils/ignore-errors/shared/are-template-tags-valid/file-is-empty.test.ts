import { assert, test } from '@codemod-utils/tests';

import { areTemplateTagsValid } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | are-template-tags-valid > file is empty', function () {
  const file = '';

  assert.strictEqual(areTemplateTagsValid(file), true);
});
