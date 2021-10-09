import sort from 'sort-on';
import { differenceInCalendarDays } from 'date-fns';

import utcToJSDate from './utils/utcToJSDate';
import { Completion } from './types';

const consistent = (days: Completion[]): boolean => {
  const sortedDays = sort(days, ['day']);

  for (let i = 0; i < sortedDays.length; i++) {
    if (i < 3) continue;

    const last = utcToJSDate(sortedDays[i - 2].read);
    const prev = utcToJSDate(sortedDays[i - 1].read);
    const curr = utcToJSDate(sortedDays[i].read);

    if (differenceInCalendarDays(prev, last) !== 1 || differenceInCalendarDays(curr, prev) !== 1) {
      continue;
    }

    if (last.getHours() === prev.getHours() && prev.getHours() === curr.getHours()) {
      return true;
    }
  }

  return false;
};

export default consistent;
