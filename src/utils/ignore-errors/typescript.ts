import { EOL } from 'node:os';

import { updateTemplates } from '@codemod-utils/ast-template-tag';

import type { LintError } from '../../types/index.js';
import { findTemplateTags, getIgnoredRules } from './shared/index.js';

export function ignoreErrors(file: string, lintErrors: LintError[]): string {
  const lines = file.split(EOL);

  const templateTags = findTemplateTags(file);

  lintErrors.forEach(({ line, message }) => {
    const currentIndex = line - 1;
    const previousIndex = Math.max(currentIndex - 1, 0);

    const templateTagIndex = templateTags.findIndex(({ lineRange }) => {
      return lineRange.start <= line && line <= lineRange.end;
    });

    const erroredInTemplate = templateTagIndex >= 0;

    if (erroredInTemplate) {
      const ignoreDirective = `{{! @glint-expect-error: ${message} }}`;
      const { contents, lineRange } = templateTags[templateTagIndex]!;

      if (lineRange.start !== lineRange.end) {
        lines.splice(currentIndex, 0, ignoreDirective);

        return;
      }

      const newTemplate = lines[currentIndex]!.replace(
        /<template>(.+)<\/template>/,
        [`<template>${ignoreDirective}`, `${contents}</template>`].join(EOL),
      );

      lines.splice(currentIndex, 1, newTemplate);

      return;
    }

    const ignoreDirective = `// @ts-expect-error: ${message}`;

    const ignoredRules = getIgnoredRules(lines[previousIndex]!, {
      ignoreDirective: 'eslint-disable-next-line',
    });

    if (ignoredRules.length === 0) {
      lines.splice(currentIndex, 0, ignoreDirective);
    } else {
      lines.splice(previousIndex, 0, ignoreDirective);
    }
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

  lintErrors.forEach(({ line, message }) => {
    const currentIndex = line - 1;
    const previousIndex = Math.max(currentIndex - 1, 0);

    const erroredInTemplate = templateTags.some(({ lineRange }) => {
      return lineRange.start <= line && line <= lineRange.end;
    });

    if (erroredInTemplate) {
      hasErrorInTemplate = true;

      return;
    }

    const ignoreDirective = `// @ts-expect-error: ${message}`;

    const ignoredRules = getIgnoredRules(lines[previousIndex]!, {
      ignoreDirective: 'eslint-disable-next-line',
    });

    if (ignoredRules.length === 0) {
      lines.splice(currentIndex, 0, ignoreDirective);
    } else {
      lines.splice(previousIndex, 0, ignoreDirective);
    }
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
