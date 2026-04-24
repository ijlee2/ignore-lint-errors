import { EOL } from 'node:os';

import type { LintError } from '../../types/index.js';

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const lines = file.split(EOL);

  lintErrors.forEach(({ line, message }) => {
    const ignoreDirective = `// eslint-disable-next-line ${message}`;

    lines.splice(line - 1, 0, ignoreDirective);
  });

  return lines.join(EOL);
}
