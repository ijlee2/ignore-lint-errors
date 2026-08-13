import { AST } from '@codemod-utils/ast-javascript';

export function getIgnoredRules(
  lineOfCode: string,
  options: {
    ignoreDirective: string;
  },
): string[] {
  let ignoredRules: string[] = [];

  try {
    AST.traverse(lineOfCode, {
      visitComment(path) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const comment = (path.value.value as string).trim();

        if (!comment.startsWith(options.ignoreDirective)) {
          return false;
        }

        ignoredRules = comment
          .replace(new RegExp(`^${options.ignoreDirective}\\s*`, 'g'), '')
          .split(',')
          .reduce<string[]>((accumulator, token) => {
            const rule = token.trim();

            if (rule) {
              accumulator.push(rule);
            }

            return accumulator;
          }, []);

        return false;
      },
    });
  } catch {
    // Do nothing
  }

  return ignoredRules;
}
