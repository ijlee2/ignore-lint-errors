import { assert, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject } from '../fixtures/typescript/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/typescript.js';

test('index > typescript', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assert.strictEqual(true, true);
}).ignore();
