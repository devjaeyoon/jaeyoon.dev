export function parseDate(dateStr: string): Date {
  return new Date(dateStr.replace(/\./g, "-").replace(/\//g, "-"));
}
