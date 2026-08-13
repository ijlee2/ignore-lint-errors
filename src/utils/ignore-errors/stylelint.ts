import { EOL } from 'node:os';

import type { LintError } from '../../types/index.js';
import { ignoreError } from './shared/index.js';

const ignoreDirective = 'stylelint-disable-next-line';

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const lines = file.split(EOL);

  lintErrors.forEach((lintError) => {
    ignoreError(lintError, {
      blockComment: true,
      ignoreDirective,
      lines,
    });
  });

  return lines.join(EOL);
}
