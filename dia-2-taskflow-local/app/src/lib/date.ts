export const isoDate = (date = new Date()) => date.toISOString().slice(0, 10);

export function startOfWeek(input = new Date()) {
  const date = new Date(input);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfWeek(input = new Date()) {
  const date = startOfWeek(input);
  date.setDate(date.getDate() + 6);
  return date;
}

export function startOfMonth(input = new Date()) {
  const date = new Date(input);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfMonth(input = new Date()) {
  const date = startOfMonth(input);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date;
}

export function addDays(input: Date, days: number) {
  const date = new Date(input);
  date.setDate(date.getDate() + days);
  return date;
}

export function inRange(value: string, start?: string, end?: string) {
  return (!start || value >= start) && (!end || value <= end);
}
