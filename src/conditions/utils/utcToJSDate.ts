import { DateTime } from 'luxon';

const utcToJSDate = (date: string) => {
  const utc = DateTime.fromISO(date, { zone: 'America/Chicago' });
  return new Date(utc.year, utc.month - 1, utc.day, utc.hour, utc.minute, 0);
};

export default utcToJSDate;
