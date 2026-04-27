import { EOL } from 'node:os';

import { AST } from '@codemod-utils/ast-template';
import {
  findTemplateTags,
  updateTemplates,
} from '@codemod-utils/ast-template-tag';

import type { LintError } from '../../types/index.js';

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

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const linesWithTemplate = findLinesWithTemplate(file);
  const lines = file.split(EOL);

  lintErrors.forEach(({ line, message }) => {
    const erroredInTemplate = linesWithTemplate.some(([lineStart, lineEnd]) => {
      return lineStart <= line && line <= lineEnd;
    });

    const ignoreDirective = erroredInTemplate
      ? `{{! @glint-expect-error: ${message} }}`
      : `// @ts-expect-error: ${message}`;

    lines.splice(line - 1, 0, ignoreDirective);
  });

  return lines.join(EOL);
}

// For fallback, ignore type checks in templates
export function ignoreErrorsFallback(
  file: string,
  lintErrors: LintError[],
): string {
  const linesWithTemplate = findLinesWithTemplate(file);
  const lines = file.split(EOL);

  let hasErrorInTemplate = false;

  lintErrors.forEach(({ line, message }) => {
    const erroredInTemplate = linesWithTemplate.some(([lineStart, lineEnd]) => {
      return lineStart <= line && line <= lineEnd;
    });

    if (erroredInTemplate) {
      hasErrorInTemplate = true;
      return;
    }

    const ignoreDirective = `// @ts-expect-error: ${message}`;

    lines.splice(line - 1, 0, ignoreDirective);
  });

  let newFile = lines.join(EOL);

  if (hasErrorInTemplate) {
    newFile = updateTemplates(newFile, (code) => {
      const ignoreDirective = '{{! @glint-nocheck }}';

      return [ignoreDirective, code].join('');
    });
  }

  return newFile;
}

export function isParseable(file: string): boolean {
  const traverse = AST.traverse();
  let isParseable = true;

  try {
    const templateTags = findTemplateTags(file);

    templateTags.forEach((templateTag) => {
      traverse(templateTag.contents);
    });
  } catch {
    isParseable = false;
  }

  return isParseable;
}
