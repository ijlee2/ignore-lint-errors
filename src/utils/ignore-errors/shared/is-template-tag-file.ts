export function isTemplateTagFile(filePath: string): boolean {
  return filePath.endsWith('.gjs') || filePath.endsWith('.gts');
}
