type CodemodOptions = {
  linter: Linter;
  projectRoot: string;
};

type Dependencies = {
  eslint: boolean;
  glint: boolean;
  stylelint: boolean;
  typescript: boolean;
};

type FileWithErrors = {
  filePath: string;
  lintErrors: LintError[];
};

type FilePathToData = Map<string, Map<number, string>>;

type Linter = 'eslint' | 'stylelint' | 'typescript';

type LintError = {
  line: number;
  message: string;
};

type Options = {
  dependencies: Dependencies;
  linter: Linter;
  projectRoot: string;
};

export type {
  CodemodOptions,
  Dependencies,
  FilePathToData,
  FileWithErrors,
  Linter,
  LintError,
  Options,
};
