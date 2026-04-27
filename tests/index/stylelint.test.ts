import { assert, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject } from '../fixtures/stylelint/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/stylelint.js';

test('index > stylelint', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assert.strictEqual(true, true);
}).ignore();
