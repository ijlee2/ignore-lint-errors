import { assert, test } from '@codemod-utils/tests';

import { isTemplateTagFile } from '../../../../../src/utils/ignore-errors/shared/index.js';

test('utils | ignore-errors | shared | is-template-tag-file > filePath is not a template tag file', function () {
  assert.strictEqual(isTemplateTagFile('app/components/hello.js'), false);
  assert.strictEqual(isTemplateTagFile('app/components/hello.ts'), false);
  assert.strictEqual(isTemplateTagFile('app/components/hello.hbs'), false);
  assert.strictEqual(
    isTemplateTagFile('app/components/hello.module.css'),
    false,
  );
});
