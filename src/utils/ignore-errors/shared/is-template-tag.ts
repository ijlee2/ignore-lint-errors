export function isTemplateTag(filePath: string): boolean {
  return filePath.endsWith('.gjs') || filePath.endsWith('.gts');
}
