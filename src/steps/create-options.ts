import { readPackageJson } from '@codemod-utils/package-json';

import type { CodemodOptions, Dependencies, Options } from '../types/index.js';

function findDependencies(projectRoot: string): Dependencies {
  const packageJson = readPackageJson({ projectRoot });

  const projectDependencies = new Set<string>([
    ...Object.keys(packageJson['dependencies'] ?? {}),
    ...Object.keys(packageJson['devDependencies'] ?? {}),
  ]);

  return {
    eslint: projectDependencies.has('eslint'),
    glint: projectDependencies.has('@glint/ember-tsc'),
    stylelint: projectDependencies.has('stylelint'),
    typescript: projectDependencies.has('typescript'),
  };
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { linter, projectRoot } = codemodOptions;

  return {
    dependencies: findDependencies(projectRoot),
    linter,
    projectRoot,
  };
}
