import { AST } from '@codemod-utils/ast-javascript';

type Options = {
  ignoreDirective: string;
};

export function getIgnoredRules(
  lineOfCode: string,
  options: Options,
): string[] {
  const traverse = AST.traverse(true);
  let ignoredRules: string[] = [];

  try {
    traverse(lineOfCode, {
      visitComment(path) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const comment = (path.value.value as string).trim();

        if (comment.startsWith(options.ignoreDirective)) {
          ignoredRules = comment
            .replace(new RegExp(`^${options.ignoreDirective}\\s+`, 'g'), '')
            .split(',')
            .map((token: string) => token.trim());
        }

        return false;
      },
    });
  } catch {
    // Do nothing
  }

  return ignoredRules;
}
