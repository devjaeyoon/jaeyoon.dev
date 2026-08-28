import { z } from "astro/zod";

const POST_DATE_PATTERN = /^(?!0000)\d{4}\.(?:0[1-9]|1[0-2])\.(?:0[1-9]|[12]\d|3[01])$/;

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function isValidPostDate(dateStr: string): boolean {
  if (dateStr.length !== 10 || !POST_DATE_PATTERN.test(dateStr)) {
    return false;
  }

  const [year, month, day] = dateStr.split(".").map(Number);
  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return day <= daysInMonth[month - 1];
}

export const postDateSchema = z
  .string()
  .refine(isValidPostDate, "Date must be a valid calendar date in YYYY.MM.DD format");

export function parsePostDate(dateStr: string): Date {
  const result = postDateSchema.safeParse(dateStr);

  if (!result.success) {
    throw new RangeError(`Invalid post date: ${dateStr}`);
  }

  const [year, month, day] = result.data.split(".").map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(0, 0, 0, 0);

  return date;
}

export function toHtmlDateTime(dateStr: string): string {
  parsePostDate(dateStr);

  return dateStr.replaceAll(".", "-");
}

export function comparePostDatesDescending(left: string, right: string): number {
  return parsePostDate(right).getTime() - parsePostDate(left).getTime();
}
