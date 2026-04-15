import { assert, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject } from '../fixtures/my-v2-app/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v2-app.js';

test('index > my-v2-app', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assert.strictEqual(true, true);
});
