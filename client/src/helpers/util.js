import { format, isValid } from 'date-fns';

export function formatDate(data) {
  const date = new Date(data);

  if (!isValid(date)) return data;

  return format(date, 'd MMMM yyyy');
}

export function isEmpty(str) {
  return str?.trim() === '';
}

export function trimObjProps(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [key, val.trim()])
  );
}
