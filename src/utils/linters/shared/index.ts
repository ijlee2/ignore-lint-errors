import type {
  FilePathToData,
  FileWithErrors,
  LintError,
} from '../../../types/index.js';

export function getFilesWithErrors(
  filePathToData: FilePathToData,
): FileWithErrors[] {
  const filesWithErrors: FileWithErrors[] = [];

  filePathToData.forEach((data, filePath) => {
    const lintErrors: LintError[] = [];

    data.forEach((message, line) => {
      lintErrors.push({
        line,
        message,
      });
    });

    if (lintErrors.length === 0) {
      return;
    }

    lintErrors.sort((a, b) => {
      if (a.line < b.line) {
        return 1;
      }

      if (b.line < a.line) {
        return -1;
      }

      return 0;
    });

    filesWithErrors.push({
      filePath,
      lintErrors,
    });
  });

  return filesWithErrors;
}
