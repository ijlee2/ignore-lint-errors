type CodemodOptions = {
  linter: Linter;
  projectRoot: string;
  src: string[] | undefined;
};

type Dependencies = {
  eslint: boolean;
  glint: boolean;
  oxlint: boolean;
  stylelint: boolean;
  typescript: boolean;
};

type FileWithErrors = {
  filePath: string;
  lintErrors: LintError[];
};

type FilePathToData = Map<string, Map<number, string>>;

type Linter = 'eslint' | 'oxlint' | 'stylelint' | 'typescript';

type LintError = {
  line: number;
  message: string;
};

type Options = {
  dependencies: Dependencies;
  linter: Linter;
  projectRoot: string;
  src: string[] | undefined;
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
