import sort from 'sort-on';

import { Completion } from '../types';

const findInRange = (start: number, end: number, days: Completion[]): boolean => {
  const range = Array(end - start + 1)
    .fill(0)
    .map((_, idx) => idx + start);
  const sortedDays = sort(days, ['day']);

  for (let i = 0; i < range.length; i++) {
    if (!sortedDays.find(({ day }) => day === range[i])) {
      return false;
    }
  }

  return true;
};

export default findInRange;
