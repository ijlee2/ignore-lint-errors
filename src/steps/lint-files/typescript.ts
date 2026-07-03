import type { Options } from '../../types/index.js';
import { outputFilePath } from '../../utils/linters/typescript.js';

export function getCommandTypescript(options: Options): string | undefined {
  const { dependencies } = options;

  if (!dependencies.typescript) {
    return undefined;
  }

  if (dependencies.glint) {
    return `./node_modules/.bin/ember-tsc > ${outputFilePath}`;
  }

  return `./node_modules/.bin/tsc > ${outputFilePath}`;
}
