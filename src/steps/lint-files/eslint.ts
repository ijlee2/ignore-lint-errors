import { execSync } from 'node:child_process';

import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/eslint.js';

function getConcurrencyOption(options: Options): string {
  const { projectRoot } = options;
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

  return '--concurrency auto';
}

function getSrc(options: Options): string {
  const { src } = options;

  if (src === undefined) {
    return '.';
  }

  return src.map((token) => `"${token}"`).join(' ');
}

export function runEslint(options: Options): void {
  const { dependencies, projectRoot } = options;

  if (!dependencies.eslint) {
    return;
  }

  const command = [
    './node_modules/.bin/eslint',
    getSrc(options),
    getConcurrencyOption(options),
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
