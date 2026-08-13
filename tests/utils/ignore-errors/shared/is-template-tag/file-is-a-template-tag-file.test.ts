import { assert, test } from '@codemod-utils/tests';

import { isTemplateTag } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | is-template-tag > file is a template tag file', function () {
  assert.strictEqual(isTemplateTag('app/components/hello.gjs'), true);
  assert.strictEqual(isTemplateTag('app/components/hello.gts'), true);
});
