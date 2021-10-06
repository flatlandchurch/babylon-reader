import test from 'ava';

import findInRange from './findInRange';
import { Completion } from '../types';

test(`findInRange - when days doesn't reach end, return false`, (t) => {
  const days = [{ day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }];
  t.is(findInRange(1, 5, days as Completion[]), false);
});

test(`findInRange - when days skip a member of range, return false`, (t) => {
  const days = [{ day: 1 }, { day: 2 }, { day: 4 }, { day: 5 }];
  t.is(findInRange(1, 5, days as Completion[]), false);
});

test(`findInRange - when days skip from start to end but missing range, return false`, (t) => {
  const days = [{ day: 1 }, { day: 5 }];
  t.is(findInRange(1, 5, days as Completion[]), false);
});

test('findInRange - when days in range, return true', (t) => {
  const days = [{ day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }];
  t.is(findInRange(1, 5, days as Completion[]), true);
});

test('findInRange - when days in range out of order, return true', (t) => {
  const days = [{ day: 1 }, { day: 3 }, { day: 2 }, { day: 5 }, { day: 4 }];
  t.is(findInRange(1, 5, days as Completion[]), true);
});

test('findInRange - when range exists within set, return true', (t) => {
  const days = [
    { day: 8 },
    { day: 9 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 17 },
    { day: 18 },
  ];
  t.is(findInRange(12, 15, days as Completion[]), true);
});
