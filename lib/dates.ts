import { CalendarDate, type DateValue, getLocalTimeZone } from "@internationalized/date";

/** Calendar date of a JS Date in the local time zone (time is dropped). */
export function toCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

/** Local midnight of a picker value. */
export function fromDateValue(value: DateValue): Date {
  return value.toDate(getLocalTimeZone());
}

/** Maps `Date | null | undefined` to a picker value, keeping `undefined` (uncontrolled) as is. */
export function toPickerValue(date: Date | null | undefined) {
  if (date === undefined) {
    return undefined;
  }

  return date === null ? null : toCalendarDate(date);
}

export type DateRange = { start: Date; end: Date };

/** Range variant of `toPickerValue`. */
export function toPickerRange(range: DateRange | null | undefined) {
  if (range === undefined) {
    return undefined;
  }

  return range === null
    ? null
    : { start: toCalendarDate(range.start), end: toCalendarDate(range.end) };
}

export function fromPickerRange(
  range: { start: DateValue; end: DateValue } | null,
): DateRange | null {
  return range ? { start: fromDateValue(range.start), end: fromDateValue(range.end) } : null;
}
