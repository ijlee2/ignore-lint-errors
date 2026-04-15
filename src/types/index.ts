type CodemodOptions = {
  linter: Linter;
  projectRoot: string;
};

type Dependencies = {
  eslint: boolean;
  glint: boolean;
  typescript: boolean;
};

type Linter = 'eslint' | 'typescript';

type Options = {
  dependencies: Dependencies;
  linter: Linter;
  projectRoot: string;
};

export type { CodemodOptions, Dependencies, Linter, Options };
