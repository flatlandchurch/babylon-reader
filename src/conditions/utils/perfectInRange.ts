import { Completion } from '../types';
import sort from 'sort-on';
import utcToJSDate from './utcToJSDate';
import { differenceInCalendarDays } from 'date-fns';

const perfectInRange = (start: number, end: number, days: Completion[]): boolean => {
  const range = Array(end - start + 1)
    .fill(0)
    .map((_, idx) => idx + start);

  const sortedDays = sort(days, ['day']);

  for (let i = 0; i < range.length; i++) {
    if (i === 0) {
      if (sortedDays.find(({ day }) => day === range[i])) {
        continue;
      } else {
        return false;
      }
    }

    if (sortedDays.find(({ day }) => day === range[i])) {
      const prev = utcToJSDate(sortedDays[i - 1].read);
      const curr = utcToJSDate(sortedDays[i].read);

      if (differenceInCalendarDays(curr, prev) > 1) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};

export default perfectInRange;
