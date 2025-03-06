import { DateTime } from "luxon";

const DEFAULT_FORMAT = "yyyy-MM-dd HH:mm"; //  "2024-03-01 14:30"

export function formatDate(
  date: string | Date | null | undefined,
  format: string = DEFAULT_FORMAT
): string {
  if (!date) return "N/A"; 

  return DateTime.fromJSDate(new Date(date)).toFormat(format);
}

export function formatFriendlyDate(date: string | Date | null | undefined): string {
  return formatDate(date, "MMMM d, yyyy"); // "March 1, 2024"
}

export function formatWithTime(date: string | Date | null | undefined): string {
  return formatDate(date, "MMMM d, yyyy h:mm a"); //  "March 1, 2024 2:30 PM"
}
