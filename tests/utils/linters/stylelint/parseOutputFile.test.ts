import { join, sep } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { parseOutputFile } from '../../../../src/utils/linters/stylelint.js';

test('utils | linters | stylelint > parseOutputFile', function () {
  const projectRoot = join(process.cwd(), 'tmp/my-v2-app').replaceAll(sep, '/');

  let outputFile = '[]';
  let filesWithErrors = parseOutputFile(outputFile, projectRoot);

  assert.deepStrictEqual(filesWithErrors, []);

  outputFile = JSON.stringify([
    {
      source: `${projectRoot}/app/assets/app.css`,
      deprecations: [],
      invalidOptionWarnings: [],
      parseErrors: [],
      errored: true,
      warnings: [
        {
          line: 11697,
          column: 21,
          endLine: 11697,
          endColumn: 28,
          rule: 'color-no-hex',
          severity: 'error',
          text: 'Unexpected hex color "#a3b4c2" (color-no-hex)',
        },
        {
          line: 3392,
          column: 3,
          endLine: 3392,
          endColumn: 14,
          rule: 'declaration-block-no-duplicate-properties',
          severity: 'error',
          text: 'Unexpected duplicate "user-select" (declaration-block-no-duplicate-properties)',
        },
        {
          line: 3392,
          column: 16,
          endLine: 3392,
          endColumn: 25,
          rule: 'declaration-property-value-no-unknown',
          severity: 'error',
          text: 'Unexpected unknown value "-moz-none" for property "user-select" (declaration-property-value-no-unknown)',
        },
        {
          line: 14848,
          column: 1,
          endLine: 14849,
          endColumn: 64,
          rule: 'no-descending-specificity',
          severity: 'error',
          text: 'Expected selector ".demo-small\n  .calendar to come before selector ".demo-medium.my-calendar\n  .calendar, at line 13782 (no-descending-specificity)',
        },
        {
          line: 14848,
          column: 1,
          endLine: 14849,
          endColumn: 64,
          rule: 'no-duplicate-selectors',
          severity: 'error',
          text: 'Unexpected duplicate selector ".demo\n  .calendar, first used at line 14512 (no-duplicate-selectors)',
        },
      ],
    },
    {
      source: `${projectRoot}/app/components/example-1.module.css`,
      deprecations: [],
      invalidOptionWarnings: [],
      parseErrors: [],
      errored: false,
      warnings: [],
    },
    {
      source: `${projectRoot}/app/components/example-2.module.css`,
      deprecations: [],
      invalidOptionWarnings: [],
      parseErrors: [],
      errored: true,
      warnings: [
        {
          line: 138,
          column: 68,
          endLine: 138,
          endColumn: 78,
          rule: 'declaration-no-important',
          severity: 'error',
          text: 'Unexpected !important (declaration-no-important)',
        },
      ],
    },
  ]);

  filesWithErrors = parseOutputFile(outputFile, projectRoot);

  assert.deepStrictEqual(filesWithErrors, [
    {
      filePath: 'app/assets/app.css',
      lintErrors: [
        {
          line: 14848,
          message: 'no-descending-specificity, no-duplicate-selectors',
        },
        {
          line: 11697,
          message: 'color-no-hex',
        },
        {
          line: 3392,
          message:
            'declaration-block-no-duplicate-properties, declaration-property-value-no-unknown',
        },
      ],
    },
    {
      filePath: 'app/components/example-2.module.css',
      lintErrors: [
        {
          line: 138,
          message: 'declaration-no-important',
        },
      ],
    },
  ]);
});
