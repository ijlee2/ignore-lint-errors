import { EOL } from 'node:os';

import type { LintError } from '../../types/index.js';
import { findTemplateTags, ignoreError } from './shared/index.js';

const ignoreDirective = 'eslint-disable-next-line';

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const lines = file.split(EOL);

  lintErrors.forEach((lintError) => {
    ignoreError(lintError, {
      commentStyle: 'javascript-inline',
      ignoreDirective,
      lines,
    });
  });

  return lines.join(EOL);
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
        commentStyle: 'javascript-inline',
        ignoreDirective,
        lines,
      });

      return;
    }

    const { contents, lineRange } = templateTags[templateTagIndex]!;

    if (lineRange.start === lineRange.end) {
      const currentIndex = line - 1;
      const comment = `{{!-- ${ignoreDirective} ${message} --}}`;

      const newTemplate = lines[currentIndex]!.replace(
        /<template>(.+)<\/template>/,
        [`<template>${comment}`, `${contents}</template>`].join(EOL),
      );

      lines.splice(currentIndex, 1, newTemplate);

      return;
    }

    ignoreError(lintError, {
      commentStyle: 'template-inline',
      ignoreDirective,
      lines,
    });
  });

  return lines.join(EOL);
}
