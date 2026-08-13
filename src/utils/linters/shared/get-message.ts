export function getMessage(rules: string[]): string {
  return Array.from(new Set(rules.sort())).join(', ');
}
