import { assert, test } from '@codemod-utils/tests';

import { findTemplateTags } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | find-template-tags > file is empty', function () {
  const file = '';

  assert.deepStrictEqual(findTemplateTags(file), []);
});
