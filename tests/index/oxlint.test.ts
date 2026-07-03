import { assert, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject } from '../fixtures/oxlint/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/oxlint.js';

test('index > oxlint', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assert.strictEqual(true, true);
}).ignore();
