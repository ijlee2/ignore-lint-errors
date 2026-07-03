import { execSync } from 'node:child_process';

import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/oxlint.js';

function getSrc(options: Options): string {
  const { src } = options;

  if (src === undefined) {
    return '';
  }

  return src.map((token) => `"${token}"`).join(' ');
}

export function runOxlint(options: Options): void {
  const { dependencies, projectRoot } = options;

  if (!dependencies.oxlint) {
    return;
  }

  const command = [
    './node_modules/.bin/oxlint',
    getSrc(options),
    '--format json',
    '--quiet',
    `> ${outputFilePath}`,
  ].join(' ');

  try {
    execSync(command, { cwd: projectRoot });
  } catch {
    // Do nothing
  }
}
