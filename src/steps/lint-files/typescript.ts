import { execSync } from 'node:child_process';

import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/typescript.js';

export function runTypescript(options: Options): void {
  const { dependencies, projectRoot } = options;

  const command = dependencies.glint
    ? `./node_modules/.bin/ember-tsc > ${outputFilePath}`
    : `./node_modules/.bin/tsc > ${outputFilePath}`;

  try {
    execSync(command, { cwd: projectRoot });
  } catch {
    // Do nothing
  }
}
