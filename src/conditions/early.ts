import { DateTime } from 'luxon';

import { Completion } from './types';

const early = (days: Completion[]): boolean => {
  for (const day of days) {
    if (DateTime.fromISO(day.read, { zone: 'America/Chicago' }).hour < 6) return true;
  }

  return false;
};

export default early;
