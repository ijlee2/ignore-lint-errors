import { findTemplateTags as upstreamFindTemplateTags } from '@codemod-utils/ast-template-tag';

type TemplateTag = {
  contents: string;
  lineRange: {
    end: number;
    start: number;
  };
};

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
