import { EOL } from 'node:os';

import { updateTemplates } from '@codemod-utils/ast-template-tag';

import type { LintError } from '../../types/index.js';
import { findTemplateTags, getIgnoredRules } from './shared/index.js';

type Data = {
  ignoreDirective: string;
  lines: string[];
};

function getComment(message: string, data: Data): string {
  const { ignoreDirective } = data;

  return `// ${ignoreDirective}: ${message}`;
}

function ignoreError(lintError: LintError, data: Data): void {
  const { line, message } = lintError;
  const { lines } = data;

  const currentIndex = line - 1;
  const previousIndex = Math.max(currentIndex - 1, 0);

  const ignoredRules = getIgnoredRules(lines[previousIndex]!, {
    ignoreDirective: 'eslint-disable-next-line',
  });

  const comment = getComment(message, data);

  if (ignoredRules.length === 0) {
    lines.splice(currentIndex, 0, comment);
  } else {
    lines.splice(previousIndex, 0, comment);
  }
}

const ignoreDirective = '@ts-expect-error';

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const lines = file.split(EOL);

  lintErrors.forEach((lintError) => {
    ignoreError(lintError, {
      ignoreDirective,
      lines,
    });
  });

  return lines.join(EOL);
}

// For fallback, ignore type checks in templates
export function ignoreErrorsFallback(
  file: string,
  lintErrors: LintError[],
): string {
  const lines = file.split(EOL);

  const templateTags = findTemplateTags(file);
  let hasErrorInTemplate = false;

  lintErrors.forEach((lintError) => {
    const { line } = lintError;

    const erroredInTemplate = templateTags.some(({ lineRange }) => {
      return lineRange.start <= line && line <= lineRange.end;
    });

    if (!erroredInTemplate) {
      ignoreError(lintError, {
        ignoreDirective,
        lines,
      });

      return;
    }

    hasErrorInTemplate = true;
  });

  let newFile = lines.join(EOL);

  if (hasErrorInTemplate) {
    newFile = updateTemplates(newFile, (code) => {
      const comment = '{{! @glint-nocheck }}';

      return [comment, code].join('');
    });
  }

  return newFile;
}

export function ignoreErrorsTemplateTag(
  file: string,
  lintErrors: LintError[],
): string {
  const lines = file.split(EOL);
  const templateTags = findTemplateTags(file);

  lintErrors.forEach((lintError) => {
    const { line, message } = lintError;

    const templateTagIndex = templateTags.findIndex(({ lineRange }) => {
      return lineRange.start <= line && line <= lineRange.end;
    });

    const erroredInTemplate = templateTagIndex >= 0;

    if (!erroredInTemplate) {
      ignoreError(lintError, {
        ignoreDirective,
        lines,
      });

      return;
    }

    const { contents, lineRange } = templateTags[templateTagIndex]!;

    const currentIndex = line - 1;
    const comment = `{{! @glint-expect-error: ${message} }}`;

    if (lineRange.start < lineRange.end) {
      lines.splice(currentIndex, 0, comment);

      return;
    }

    const newTemplate = lines[currentIndex]!.replace(
      /<template>(.+)<\/template>/,
      [`<template>${comment}`, `${contents}</template>`].join(EOL),
    );

    lines.splice(currentIndex, 1, newTemplate);
  });

  return lines.join(EOL);
}
