import { assert, test } from '@codemod-utils/tests';

import { isTemplateTagFile } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | is-template-tag-file > filePath is a template tag file', function () {
  assert.strictEqual(isTemplateTagFile('app/components/hello.gjs'), true);
  assert.strictEqual(isTemplateTagFile('app/components/hello.gts'), true);
});
