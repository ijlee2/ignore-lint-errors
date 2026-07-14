import { assert, test } from '@codemod-utils/tests';

import { getCommandStylelint } from '../../../../../src/steps/lint-files/index.js';
import { options } from '../../../../helpers/shared-test-setups/stylelint.js';

test('steps | lint-files | get-command > stylelint (option src)', function () {
  assert.strictEqual(
    getCommandStylelint({
      ...options,
      src: [
        'app/components/example-1.module.css',
        'app/templates/example-2.module.css',
      ],
    }),
    './node_modules/.bin/stylelint "app/components/example-1.module.css" "app/templates/example-2.module.css" --formatter json --output-file .ignore-lint-errors/stylelint.txt --quiet 2>/dev/null',
  );
});
