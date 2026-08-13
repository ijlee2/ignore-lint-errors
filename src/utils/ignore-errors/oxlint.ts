import { EOL } from 'node:os';

import type { LintError } from '../../types/index.js';
import { getIgnoredRules } from './shared/index.js';

const ignoreDirective = 'oxlint-disable-next-line';

function append(ignoredRules: string[], message: string): string {
  return [...ignoredRules, ...message.split(', ')].sort().join(', ');
}

function ignoreError(lintError: LintError, lines: string[]): void {
  const { line, message } = lintError;

  const currentIndex = line - 1;
  const previousIndex = Math.max(currentIndex - 1, 0);

  const ignoredRules = getIgnoredRules(lines[previousIndex]!, {
    ignoreDirective,
  });

  if (ignoredRules.length === 0) {
    lines.splice(currentIndex, 0, `// ${ignoreDirective} ${message}`);
  } else {
    const newMessage = append(ignoredRules, message);

    lines.splice(previousIndex, 1, `// ${ignoreDirective} ${newMessage}`);
  }
}

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const lines = file.split(EOL);

  lintErrors.forEach((lintError) => {
    ignoreError(lintError, lines);
  });

  return lines.join(EOL);
}
