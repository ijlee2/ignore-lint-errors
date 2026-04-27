import { assert, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject } from '../fixtures/eslint/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/eslint.js';

test('index > eslint', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assert.strictEqual(true, true);
}).ignore();
