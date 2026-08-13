import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  ignoreDirective: string;
};

export function getIgnoredRules(lineOfCode: string, data: Data): string[] {
  const { ignoreDirective } = data;

  let ignoredRules: string[] = [];

  try {
    AST.traverse(lineOfCode, {
      visitComment(path) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const comment = (path.value.value as string).trim();

        if (!comment.startsWith(ignoreDirective)) {
          return false;
        }

        ignoredRules = comment
          .replace(new RegExp(`^${ignoreDirective}\\s*`, 'g'), '')
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
