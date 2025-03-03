import { DateTime } from "luxon";

// Define a default format (you can update this globally)
const DEFAULT_FORMAT = "yyyy-MM-dd HH:mm"; // e.g., "2024-03-01 14:30"

export function formatDate(
  date: string | Date | null | undefined,
  format: string = DEFAULT_FORMAT
): string {
  if (!date) return "N/A"; 

  return DateTime.fromJSDate(new Date(date)).toFormat(format);
}

// Example: Format to a readable UI format like "March 1, 2024"
export function formatFriendlyDate(date: string | Date | null | undefined): string {
  return formatDate(date, "MMMM d, yyyy"); // e.g., "March 1, 2024"
}

// Example: Format with time (12-hour format)
export function formatWithTime(date: string | Date | null | undefined): string {
  return formatDate(date, "MMMM d, yyyy h:mm a"); // e.g., "March 1, 2024 2:30 PM"
}
