import type { LintError } from '../../../types/index.js';
import { getIgnoredRules } from './get-ignored-rules.js';
import { getIgnoredRulesInTemplate } from './get-ignored-rules-in-template.js';

type Data = {
  commentStyle: 'javascript-block' | 'javascript-inline' | 'template-inline';
  ignoreDirective: string;
  lines: string[];
};

function append(ignoredRules: string[], message: string): string {
  return [...ignoredRules, ...message.split(', ')].sort().join(', ');
}

function createComment(message: string, data: Data): string {
  const { commentStyle, ignoreDirective } = data;

  switch (commentStyle) {
    case 'javascript-block': {
      return `/* ${ignoreDirective} ${message} */`;
    }

    case 'javascript-inline': {
      return `// ${ignoreDirective} ${message}`;
    }

    case 'template-inline': {
      return `{{! ${ignoreDirective} ${message} }}`;
    }
  }
}

export function ignoreError(lintError: LintError, data: Data): void {
  // eslint-disable-next-line prefer-const
  let { line, message } = lintError;
  const { commentStyle, ignoreDirective, lines } = data;

  const currentIndex = line - 1;
  const previousIndex = Math.max(currentIndex - 1, 0);

  const ignoredRules =
    commentStyle === 'template-inline'
      ? getIgnoredRulesInTemplate(lines[previousIndex]!, { ignoreDirective })
      : getIgnoredRules(lines[previousIndex]!, { ignoreDirective });

  if (ignoredRules.length > 0) {
    message = append(ignoredRules, message);
  }

  const comment = createComment(message, data);

  if (ignoredRules.length === 0) {
    lines.splice(currentIndex, 0, comment);
  } else {
    lines.splice(previousIndex, 1, comment);
  }
}
