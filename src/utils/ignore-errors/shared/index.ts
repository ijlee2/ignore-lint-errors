import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';
import { AST as ASTTemplate } from '@codemod-utils/ast-template';
import { findTemplateTags as upstreamFindTemplateTags } from '@codemod-utils/ast-template-tag';

type TemplateTag = {
  contents: string;
  lineRange: {
    end: number;
    start: number;
  };
};

export function areTemplateTagsValid(file: string): boolean {
  let isValid = true;

  try {
    const templateTags = upstreamFindTemplateTags(file);

    templateTags.forEach(({ contents }) => {
      ASTTemplate.traverse(contents);
    });
  } catch {
    isValid = false;
  }

  return isValid;
}

export function findTemplateTags(file: string): TemplateTag[] {
  function getLOC(file: string): number {
    const matches = file.match(/\r?\n/g);

    return (matches ?? []).length;
  }

  const templateTags = upstreamFindTemplateTags(file);

  return templateTags.map((templateTag) => {
    const { contents, range } = templateTag;

    const lineStart = getLOC(file.substring(0, range.startChar)) + 1;
    const lineEnd = getLOC(file.substring(0, range.endChar)) + 1;

    const lineRange = {
      end: lineEnd,
      start: lineStart,
    };

    return {
      contents,
      lineRange,
    };
  });
}

export function getIgnoredRules(
  lineOfCode: string,
  options: {
    ignoreDirective: string;
  },
): string[] {
  let ignoredRules: string[] = [];

  try {
    ASTJavaScript.traverse(lineOfCode, {
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
