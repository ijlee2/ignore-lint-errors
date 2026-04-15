import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { parseOutputFile } from '../../../../src/utils/linters/typescript.js';

test('utils | linters | typescript > parseOutputFile', function () {
  let outputFile = '';
  let filesWithErrors = parseOutputFile(outputFile);

  assert.deepStrictEqual(filesWithErrors, []);

  outputFile = normalizeFile([
    `app/components/example-1.gts(430,13): error TS2554: Expected 0 arguments, but got 1.`,
    `app/components/example-2.gts(20,32): error TS7008: Member 'a' implicitly has an 'any' type.`,
    `app/components/example-2.gts(30,17): error TS2339: Property 'b' does not exist on type 'SomeType'.`,
    `app/components/example-2.gts(30,40): error TS2339: Property 'args' does not exist on type 'SomeType'.`,
    `app/components/example-2.gts(37,12): error TS2339: Property 'args' does not exist on type 'SomeType'.`,
    `app/components/example-2.gts(49,44): error TS2339: Property 'c' does not exist on type 'SomeType'.`,
    `app/components/example-2.gts(59,10): error TS2339: Property 'd' does not exist on type 'SomeType'.`,
    `app/components/example-2.gts(59,31): error TS2339: Property 'e' does not exist on type 'SomeType'.`,
    `app/components/example-2.gts(59,52): error TS2339: Property 'args' does not exist on type 'SomeType'.`,
    `app/components/example-2.gts(75,10): error TS2353: Object literal may only specify known properties, and 'f' does not exist in type 'NamedArgs<{}>'.`,
    `app/templates/example-3.gts(19,5): error TS2554: Expected 0 arguments, but got 1.`,
    `app/utils/example-4.ts(47,3): error TS2418: Type of computed property's value is '"a"', which is not assignable to type 'b'.`,
  ]);

  filesWithErrors = parseOutputFile(outputFile);

  assert.deepStrictEqual(filesWithErrors, [
    {
      filePath: 'app/components/example-1.gts',
      lintErrors: [
        {
          line: 430,
          message: 'Incorrect type',
        },
      ],
    },
    {
      filePath: 'app/components/example-2.gts',
      lintErrors: [
        {
          line: 75,
          message: 'Incorrect type',
        },
        {
          line: 59,
          message: 'Incorrect type',
        },
        {
          line: 49,
          message: 'Incorrect type',
        },
        {
          line: 37,
          message: 'Incorrect type',
        },
        {
          line: 30,
          message: 'Incorrect type',
        },
        {
          line: 20,
          message: 'Incorrect type',
        },
      ],
    },
    {
      filePath: 'app/templates/example-3.gts',
      lintErrors: [
        {
          line: 19,
          message: 'Incorrect type',
        },
      ],
    },
    {
      filePath: 'app/utils/example-4.ts',
      lintErrors: [
        {
          line: 47,
          message: 'Incorrect type',
        },
      ],
    },
  ]);
});
