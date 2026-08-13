import type { LintError } from '../../../types/index.js';
import { getIgnoredRules } from './get-ignored-rules.js';

type Data = {
  blockComment?: boolean;
  ignoreDirective: string;
  lines: string[];
};

function append(ignoredRules: string[], message: string): string {
  return [...ignoredRules, ...message.split(', ')].sort().join(', ');
}

export function ignoreError(lintError: LintError, data: Data): void {
  // eslint-disable-next-line prefer-const
  let { line, message } = lintError;
  const { blockComment, ignoreDirective, lines } = data;

  const currentIndex = line - 1;
  const previousIndex = Math.max(currentIndex - 1, 0);

  const ignoredRules = getIgnoredRules(lines[previousIndex]!, {
    ignoreDirective,
  });

  if (ignoredRules.length > 0) {
    message = append(ignoredRules, message);
  }

  const comment = blockComment
    ? `/* ${ignoreDirective} ${message} */`
    : `// ${ignoreDirective} ${message}`;

  if (ignoredRules.length === 0) {
    lines.splice(currentIndex, 0, comment);
  } else {
    lines.splice(previousIndex, 1, comment);
  }
}
