export function parseDate(dateStr: string): Date {
  return new Date(dateStr.replace(/\./g, "-").replace(/\//g, "-"));
}

export function formatDisplayDate(dateStr: string): string {
  return dateStr;
}
