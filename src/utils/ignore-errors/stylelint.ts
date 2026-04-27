import { EOL } from 'node:os';

import type { LintError } from '../../types/index.js';
import { getIgnoredRules } from './shared/index.js';

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const lines = file.split(EOL);
  const ignoreDirective = 'stylelint-disable-next-line';

  lintErrors.forEach(({ line, message }) => {
    const currentIndex = line - 1;
    const previousIndex = Math.max(currentIndex - 1, 0);

    const ignoredRules = getIgnoredRules(lines[previousIndex]!, {
      ignoreDirective,
    });

    if (ignoredRules.length === 0) {
      lines.splice(currentIndex, 0, `/* ${ignoreDirective} ${message} */`);
    } else {
      const newMessage = [...ignoredRules, ...message.split(', ')]
        .sort()
        .join(', ');

      lines.splice(previousIndex, 1, `/* ${ignoreDirective} ${newMessage} */`);
    }
  });

  return lines.join(EOL);
}
