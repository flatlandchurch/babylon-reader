import sort from 'sort-on';
import { differenceInCalendarDays } from 'date-fns';
import { DateTime } from 'luxon';

import { Completion } from './types';

const two = (days: Completion[]): boolean => {
  const sortedDays = sort(days, ['read']);

  for (let i = 0; i < sortedDays.length; i++) {
    if (i === 0) continue;
    const prevUTC = DateTime.fromISO(sortedDays[i - 1].read, { zone: 'America/Chicago' });
    const prevDate = new Date(
      prevUTC.year,
      prevUTC.month - 1,
      prevUTC.day,
      prevUTC.hour,
      prevUTC.minute,
      0,
    );
    const currUTC = DateTime.fromISO(sortedDays[i].read, { zone: 'America/Chicago' });
    const currDate = new Date(
      currUTC.year,
      currUTC.month - 1,
      currUTC.day,
      currUTC.hour,
      currUTC.minute,
      0,
    );

    if (differenceInCalendarDays(currDate, prevDate) === 1) {
      return true;
    }
  }

  return false;
};

export default two;
