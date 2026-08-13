import { AST } from '@codemod-utils/ast-template';

// In *.{gjs,gts} files, an ignore directive in <template> is a Handlebars comment
export function getIgnoredRulesInTemplate(
  lineOfCode: string,
  options: {
    ignoreDirective: string;
  },
): string[] {
  let ignoredRules: string[] = [];

  try {
    AST.traverse(lineOfCode, {
      MustacheCommentStatement(node) {
        const comment = node.value.trim();

        if (!comment.startsWith(options.ignoreDirective)) {
          return;
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
      },
    });
  } catch {
    // Do nothing
  }

  return ignoredRules;
}
