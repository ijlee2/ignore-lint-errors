import { assert, test } from '@codemod-utils/tests';

import type { FilePathToData } from '../../../../../src/types/index.js';
import { getFilesWithErrors } from '../../../../../src/utils/linters/shared/index.js';

test('utils | linters | shared | getFilesWithErrors > filePathToData is not empty', function () {
  const filePathToData: FilePathToData = new Map([
    [
      'app/components/example-1.gts',
      new Map([
        [29, '@typescript-eslint/explicit-function-return-type'],
        [30, '@typescript-eslint/no-unsafe-member-access'],
        [
          36,
          '@typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return',
        ],
      ]),
    ],
    [
      'app/components/example-2.gts',
      new Map([
        [2, 'ember/no-computed-properties-in-native-classes'],
        [45, 'ember/use-brace-expansion'],
        [58, '@typescript-eslint/no-unsafe-assignment'],
        [
          59,
          '@typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access',
        ],
      ]),
    ],
  ]);

  const filesWithErrors = getFilesWithErrors(filePathToData);

  assert.deepStrictEqual(filesWithErrors, [
    {
      filePath: 'app/components/example-1.gts',
      lintErrors: [
        {
          line: 36,
          message:
            '@typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return',
        },
        {
          line: 30,
          message: '@typescript-eslint/no-unsafe-member-access',
        },
        {
          line: 29,
          message: '@typescript-eslint/explicit-function-return-type',
        },
      ],
    },
    {
      filePath: 'app/components/example-2.gts',
      lintErrors: [
        {
          line: 59,
          message:
            '@typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access',
        },
        {
          line: 58,
          message: '@typescript-eslint/no-unsafe-assignment',
        },
        {
          line: 45,
          message: 'ember/use-brace-expansion',
        },
        {
          line: 2,
          message: 'ember/no-computed-properties-in-native-classes',
        },
      ],
    },
  ]);
});
