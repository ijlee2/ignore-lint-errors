#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runCodemod } from '../src/index.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = 'ignore-lint-errors';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('linter', {
    choices: ['eslint'] as const,
    describe: 'Linter to run',
    type: 'string',
  })
  .option('root', {
    describe: 'Where to run the codemod',
    type: 'string',
  })
  .demandOption(['linter'])
  .parseSync();

const codemodOptions: CodemodOptions = {
  linter: argv['linter'],
  projectRoot: argv['root'] ?? process.cwd(),
};

runCodemod(codemodOptions);
