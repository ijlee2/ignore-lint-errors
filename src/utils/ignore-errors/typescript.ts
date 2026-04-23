import { AST } from '@codemod-utils/ast-template';
import { findTemplateTags } from '@codemod-utils/ast-template-tag';

export function findLinesWithTemplate(file: string): [number, number][] {
  function getLOC(file: string): number {
    const matches = file.match(/\r?\n/g);

    return (matches ?? []).length;
  }

  const templateTags = findTemplateTags(file);
  const linesWithTemplate: [number, number][] = [];

  templateTags.forEach((templateTag) => {
    const { range } = templateTag;

    const lineStart = getLOC(file.substring(0, range.startChar)) + 1;
    const lineEnd = getLOC(file.substring(0, range.endChar)) + 1;

    linesWithTemplate.push([lineStart, lineEnd]);
  });

  return linesWithTemplate;
}

export function isParseable(file: string): boolean {
  const traverse = AST.traverse();
  let isParseable = true;

  function parseTemplate(template: string): void {
    try {
      traverse(template);
    } catch {
      isParseable = false;
    }
  }

  const templateTags = findTemplateTags(file);

  templateTags.forEach((templateTag) => {
    parseTemplate(templateTag.contents);
  });

  return isParseable;
}
