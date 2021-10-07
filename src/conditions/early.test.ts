import test from 'ava';

import early from './early';
import { Completion } from './types';

test('early - a set of days with at least one time before 6 AM Central returns true', (t) => {
  const data = [
    { read: '2020-01-01T11:00:00Z' },
    { read: '2020-01-01T12:00:00Z' },
    { read: '2020-01-01T13:00:00Z' },
    { read: '2020-01-01T14:00:00Z' },
  ];

  t.is(early(data as Completion[]), true);
});

test('early - a set of days with no times before 6 AM Central returns false', (t) => {
  const data = [
    { read: '2020-01-01T12:00:00Z' },
    { read: '2020-01-01T13:00:00Z' },
    { read: '2020-01-01T14:00:00Z' },
    { read: '2020-01-01T18:00:00Z' },
    { read: '2020-01-01T23:00:00Z' },
  ];

  t.is(early(data as Completion[]), false);
});
