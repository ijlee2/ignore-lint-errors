import { assert, test } from '@codemod-utils/tests';

import { parseOutputFile } from '../../../../src/utils/linters/eslint.js';

test('utils | lint-files | eslint > parseOutputFile', function () {
  let outputFile = '[]';
  let filesWithErrors = parseOutputFile(outputFile);

  assert.deepStrictEqual(filesWithErrors, []);

  outputFile = JSON.stringify([
    {
      filePath: '/<project-root>/app/components/example-1.gts',
      messages: [
        {
          ruleId: '@typescript-eslint/explicit-function-return-type',
          severity: 2,
          message: 'Missing return type on function.',
          line: 29,
          column: 3,
          nodeType: 'FunctionExpression',
          messageId: 'missingReturnType',
          endLine: 29,
          endColumn: 22,
        },
        {
          ruleId: '@typescript-eslint/no-unsafe-member-access',
          severity: 2,
          message:
            'Unsafe member access .id on a type that cannot be resolved.',
          line: 30,
          column: 28,
          nodeType: 'Identifier',
          messageId: 'errorMemberExpression',
          endLine: 30,
          endColumn: 30,
        },
        {
          ruleId: '@typescript-eslint/no-unsafe-member-access',
          severity: 2,
          message:
            'Unsafe member access .name on a type that cannot be resolved.',
          line: 30,
          column: 45,
          nodeType: 'Identifier',
          messageId: 'errorMemberExpression',
          endLine: 30,
          endColumn: 50,
        },
        {
          ruleId: '@typescript-eslint/no-unsafe-return',
          severity: 2,
          message: 'Unsafe return of a value of type `any`.',
          line: 36,
          column: 5,
          nodeType: 'ReturnStatement',
          messageId: 'unsafeReturn',
          endLine: 38,
          endColumn: 7,
        },
        {
          ruleId: '@typescript-eslint/no-unsafe-call',
          severity: 2,
          message: 'Unsafe call of an `any` typed value.',
          line: 36,
          column: 12,
          nodeType: 'MemberExpression',
          messageId: 'unsafeCall',
          endLine: 36,
          endColumn: 50,
        },
        {
          ruleId: '@typescript-eslint/no-unsafe-member-access',
          severity: 2,
          message: 'Unsafe member access .toLocalTime on an `any` value.',
          line: 36,
          column: 39,
          nodeType: 'Identifier',
          messageId: 'unsafeMemberExpression',
          endLine: 36,
          endColumn: 50,
        },
      ],
      suppressedMessages: [],
      errorCount: 6,
      fatalErrorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      source: '',
      usedDeprecatedRules: [],
    },
    {
      filePath: '/<project-root>/app/components/example-2.gts',
      messages: [
        {
          ruleId: 'ember/no-computed-properties-in-native-classes',
          severity: 2,
          message:
            "Don't use computed properties with native classes. Use getters or @tracked properties instead.",
          line: 2,
          column: 1,
          nodeType: 'ImportDeclaration',
          endLine: 2,
          endColumn: 42,
        },
        {
          ruleId: 'ember/use-brace-expansion',
          severity: 2,
          message: 'Use brace expansion',
          line: 45,
          column: 5,
          nodeType: 'CallExpression',
          endLine: 46,
          endColumn: 45,
        },
        {
          ruleId: '@typescript-eslint/no-unsafe-assignment',
          severity: 2,
          message: 'Unsafe assignment of an `any` value.',
          line: 58,
          column: 13,
          nodeType: 'VariableDeclarator',
          messageId: 'anyAssignment',
          endLine: 63,
          endColumn: 10,
        },
        {
          ruleId: '@typescript-eslint/no-unsafe-call',
          severity: 2,
          message: 'Unsafe call of an `any` typed value.',
          line: 59,
          column: 9,
          nodeType: 'MemberExpression',
          messageId: 'unsafeCall',
          endLine: 59,
          endColumn: 55,
        },
        {
          ruleId: '@typescript-eslint/no-unsafe-member-access',
          severity: 2,
          message: 'Unsafe member access .filterByDate on an `any` value.',
          line: 59,
          column: 25,
          nodeType: 'Identifier',
          messageId: 'unsafeMemberExpression',
          endLine: 59,
          endColumn: 55,
        },
      ],
      suppressedMessages: [],
      errorCount: 5,
      fatalErrorCount: 0,
      warningCount: 0,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      source: '',
      usedDeprecatedRules: [],
    },
  ]);

  filesWithErrors = parseOutputFile(outputFile);

  assert.deepStrictEqual(filesWithErrors, [
    {
      absoluteFilePath: '/<project-root>/app/components/example-1.gts',
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
      absoluteFilePath: '/<project-root>/app/components/example-2.gts',
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
