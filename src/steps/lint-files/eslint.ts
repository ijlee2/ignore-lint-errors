import { execSync } from 'node:child_process';

import { findFiles } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/eslint.js';

function getConcurrencyOption(projectRoot: string): string {
  let isConcurrencySupported = true;

  try {
    const command = [
      './node_modules/.bin/eslint does-not-exist.js',
      '--concurrency off',
      '--no-error-on-unmatched-pattern',
      '2>/dev/null', // Suppress output to process.stderr
    ].join(' ');

    execSync(command, { cwd: projectRoot });
  } catch {
    isConcurrencySupported = false;
  }

  if (!isConcurrencySupported) {
    return '';
  }

  const filePaths = findFiles('**/*.{gjs,gts,js,ts}', {
    ignoreList: ['{dist,node_modules}/**/*', '**/*.d.ts'],
    projectRoot,
  });

  const concurrency = Math.max(Math.ceil(Math.log10(filePaths.length)), 1);

  return `--concurrency ${concurrency}`;
}

export function runEslint(options: Options): void {
  const { projectRoot } = options;

  const command = [
    './node_modules/.bin/eslint',
    getConcurrencyOption(projectRoot),
    '--format json',
    `--output-file ${outputFilePath}`,
    '--quiet',
  ].join(' ');

  try {
    execSync(command, { cwd: projectRoot });
  } catch {
    // Do nothing
  }
}
