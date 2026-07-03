import { execSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import type { Options } from '../types/index.js';
import {
  getCommandEslint,
  getCommandOxlint,
  getCommandStylelint,
  getCommandTypescript,
} from './lint-files/index.js';

export function lintFiles(options: Options): void {
  const { linter, projectRoot } = options;

  if (!existsSync(join(projectRoot, '.ignore-lint-errors'))) {
    mkdirSync(join(projectRoot, '.ignore-lint-errors'));
  }

  let command: string | undefined;

  switch (linter) {
    case 'eslint': {
      command = getCommandEslint(options);
      break;
    }

    case 'oxlint': {
      command = getCommandOxlint(options);
      break;
    }

    case 'stylelint': {
      command = getCommandStylelint(options);
      break;
    }

    case 'typescript': {
      command = getCommandTypescript(options);
      break;
    }
  }

  if (command === undefined) {
    return;
  }

  try {
    execSync(command, { cwd: projectRoot });
  } catch {
    // Do nothing
  }
}
