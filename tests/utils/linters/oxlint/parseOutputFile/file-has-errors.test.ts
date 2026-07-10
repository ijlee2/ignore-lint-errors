import { assert, test } from '@codemod-utils/tests';

import { parseOutputFile } from '../../../../../src/utils/linters/oxlint.js';

test('utils | linters | oxlint | parseOutputFile > file has errors', function () {
  const outputFile = JSON.stringify({
    diagnostics: [
      {
        message:
          'Expected a semicolon or an implicit semicolon after a statement, but found none',
        severity: 'error',
        causes: [],
        help: 'Try inserting a semicolon here',
        filename: 'test-bug.ts',
        labels: [{ span: { offset: 5, length: 0, line: 1, column: 6 } }],
        related: [],
      },
      {
        message: 'Unsafe assignment of an any value.',
        code: 'typescript(no-unsafe-assignment)',
        severity: 'error',
        causes: [],
        url: 'https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-assignment.html',
        filename: 'src/utils/update-tests/insert-template-tag.ts',
        labels: [{ span: { offset: 2215, length: 44, line: 93, column: 17 } }],
        related: [],
      },
      {
        message: 'Unsafe member access .parent on an `any` value.',
        code: 'typescript(no-unsafe-member-access)',
        severity: 'error',
        causes: [],
        url: 'https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-member-access.html',
        filename: 'src/utils/update-tests/insert-template-tag.ts',
        labels: [{ span: { offset: 2246, length: 6, line: 93, column: 48 } }],
        related: [],
      },
      {
        message: 'Unexpected console statement.',
        code: 'eslint(no-console)',
        severity: 'error',
        causes: [],
        url: 'https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-console.html',
        help: 'Delete this console statement.',
        filename: 'src/index.ts',
        labels: [{ span: { offset: 425, length: 11, line: 18, column: 5 } }],
        related: [],
      },
      {
        message: 'Unexpected console statement.',
        code: 'eslint(no-console)',
        severity: 'error',
        causes: [],
        url: 'https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-console.html',
        help: 'Delete this console statement.',
        filename: 'src/index.ts',
        labels: [{ span: { offset: 476, length: 11, line: 19, column: 5 } }],
        related: [],
      },
    ],
  });

  const filesWithErrors = parseOutputFile(outputFile);

  assert.deepStrictEqual(filesWithErrors, [
    {
      filePath: 'src/utils/update-tests/insert-template-tag.ts',
      lintErrors: [
        {
          line: 93,
          message: 'no-unsafe-assignment, no-unsafe-member-access',
        },
      ],
    },
    {
      filePath: 'src/index.ts',
      lintErrors: [
        {
          line: 19,
          message: 'no-console',
        },
        {
          line: 18,
          message: 'no-console',
        },
      ],
    },
  ]);
});
