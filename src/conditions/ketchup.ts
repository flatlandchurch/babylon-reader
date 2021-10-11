import { Completion } from './types';
import utcToJSDate from './utils/utcToJSDate';

const ketchup = (days: Completion[]): boolean => {
  const dayMap = days.reduce((acc: { [key: string]: number }, day) => {
    const date = utcToJSDate(day.read);
    const key = `${date.getMonth() + 1}-${date.getDate()}`;
    acc[key] = !acc[key] ? 1 : acc[key] + 1;
    return acc;
  }, {});

  for (const day of Object.keys(dayMap)) {
    if (dayMap[day] > 1) return true;
  }

  return false;
};

export default ketchup;
