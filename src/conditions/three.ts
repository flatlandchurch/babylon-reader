import { DateTime } from 'luxon';
import sort from 'sort-on';
import { differenceInCalendarDays } from 'date-fns';

import { Completion } from './types';
import utcToJSDate from './utils/utcToJSDate';

const three = (days: Completion[]): boolean => {
  const sortedDays = sort(days, ['read']);

  for (let i = 0; i < sortedDays.length; i++) {
    if (i === 0 || i === 1) continue;

    const before = utcToJSDate(sortedDays[i - 2].read);
    const yesterday = utcToJSDate(sortedDays[i - 1].read);
    const today = utcToJSDate(sortedDays[i].read);

    if (
      differenceInCalendarDays(yesterday, before) === 1 &&
      differenceInCalendarDays(today, yesterday) === 1
    ) {
      return true;
    }
  }
  return false;
};

export default three;
