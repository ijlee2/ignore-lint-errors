import { relative, sep } from 'node:path';

export function getRelativePath(
  absoluteFilePath: string,
  projectRoot: string,
): string {
  return relative(projectRoot, absoluteFilePath).replaceAll(sep, '/');
}
