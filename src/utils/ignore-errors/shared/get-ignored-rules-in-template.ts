import { AST } from '@codemod-utils/ast-template';

type Data = {
  ignoreDirective: string;
};

export function getIgnoredRulesInTemplate(
  lineOfCode: string,
  data: Data,
): string[] {
  const { ignoreDirective } = data;

  let ignoredRules: string[] = [];

  try {
    AST.traverse(lineOfCode, {
      MustacheCommentStatement(node) {
        const comment = node.value.trim();

        if (!comment.startsWith(ignoreDirective)) {
          return;
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
      },
    });
  } catch {
    // Do nothing
  }

  return ignoredRules;
}
