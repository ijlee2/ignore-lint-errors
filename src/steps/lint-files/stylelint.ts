import { execSync } from 'node:child_process';

import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/stylelint.js';

function getSrc(options: Options): string {
  const { src } = options;

  if (src === undefined) {
    return '**/*.css';
  }

  return src.map((token) => `"${token}"`).join(' ');
}

export function runStylelint(options: Options): void {
  const { projectRoot } = options;

  const command = [
    './node_modules/.bin/stylelint',
    getSrc(options),
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
