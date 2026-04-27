import { EOL } from 'node:os';

import { AST } from '@codemod-utils/ast-javascript';

import type { LintError } from '../../types/index.js';

function getIgnoredRules(lineOfCode: string): string[] {
  const traverse = AST.traverse(true);
  let ignoredRules: string[] = [];

  try {
    traverse(lineOfCode, {
      visitComment(node) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const comment = (node.value.value as string).trim();

        if (comment.startsWith('eslint-disable-next-line')) {
          ignoredRules = comment
            .replace(/^eslint-disable-next-line\s+/, '')
            .split(',')
            .map((token) => token.trim());
        }

        return false;
      },
    });
  } catch {
    // Do nothing
  }

  return ignoredRules;
}

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const lines = file.split(EOL);

  lintErrors.forEach(({ line, message }) => {
    const currentIndex = line - 1;
    const previousIndex = Math.max(currentIndex - 1, 0);

    const ignoredRules = getIgnoredRules(lines[previousIndex]!);

    if (ignoredRules.length === 0) {
      const ignoreDirective = `// eslint-disable-next-line ${message}`;

      lines.splice(currentIndex, 0, ignoreDirective);
    } else {
      const newMessage = [...ignoredRules, ...message.split(', ')]
        .sort()
        .join(', ');

      const ignoreDirective = `// eslint-disable-next-line ${newMessage}`;

      lines.splice(previousIndex, 1, ignoreDirective);
    }
  });

  return lines.join(EOL);
}
