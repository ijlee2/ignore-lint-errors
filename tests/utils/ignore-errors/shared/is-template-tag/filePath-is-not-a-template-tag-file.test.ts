import { assert, test } from '@codemod-utils/tests';

import { isTemplateTag } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | is-template-tag > file is not a template tag file', function () {
  assert.strictEqual(isTemplateTag('app/components/hello.hbs'), false);
  assert.strictEqual(isTemplateTag('app/components/hello.js'), false);
  assert.strictEqual(isTemplateTag('app/components/hello.ts'), false);
});
