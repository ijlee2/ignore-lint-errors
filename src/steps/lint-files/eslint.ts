import { execSync } from 'node:child_process';

import type { Options } from '../../types/index.js';
import { command } from '../../utils/linters/eslint.js';

export function runEslint(options: Options): void {
  const { projectRoot } = options;

  try {
    execSync(command, { cwd: projectRoot });
  } catch {
    // Do nothing
  }
}
