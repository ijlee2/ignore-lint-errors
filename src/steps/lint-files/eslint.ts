import { execSync } from 'node:child_process';

import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/eslint.js';

export function runEslint(options: Options): void {
  const { projectRoot } = options;

  const command = [
    './node_modules/.bin/eslint',
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
