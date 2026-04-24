import { execSync } from 'node:child_process';

import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/stylelint.js';

export function runStylelint(options: Options): void {
  const { projectRoot } = options;

  const command = [
    './node_modules/.bin/stylelint "**/*.css"',
    '--allow-empty-input',
    '--formatter json',
    `--output-file ${outputFilePath}`,
    '--quiet',
    '2>/dev/null', // Suppress output to process.stderr
  ].join(' ');

  try {
    execSync(command, { cwd: projectRoot });
  } catch {
    // Do nothing
  }
}
