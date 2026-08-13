import { EOL } from 'node:os';

import type { LintError } from '../../types/index.js';
import { ignoreError } from './shared/index.js';

const ignoreDirective = 'oxlint-disable-next-line';

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const lines = file.split(EOL);

  lintErrors.forEach((lintError) => {
    ignoreError(lintError, {
      ignoreDirective,
      lines,
    });
  });

  return lines.join(EOL);
}
