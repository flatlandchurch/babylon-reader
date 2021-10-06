import test from 'ava';

import three from './three';
import { Completion } from './types';

test('three - returns true when there are three completions a day apart', (t) => {
  const completions = [
    { read: '2020-01-01T06:00:00Z' },
    { read: '2020-01-02T06:00:00Z' },
    { read: '2020-01-03T13:00:00Z' },
  ];
  t.is(three(completions as Completion[]), true);
});

test('three - returns false when there are no three completions a day apart', (t) => {
  const completions = [
    { read: '2020-01-01T12:00:00Z' },
    { read: '2020-01-02T04:00:00Z' },
    { read: '2020-01-03T06:00:00Z' },
  ];
  t.is(three(completions as Completion[]), false);
});
