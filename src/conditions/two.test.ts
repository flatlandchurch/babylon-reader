import test from 'ava';

import two from './two';
import { Completion } from './types';

test('two - returns true when there are two completions a day apart', (t) => {
  const completions = [{ read: '2020-01-01T05:00:00Z' }, { read: '2020-01-02T05:00:00Z' }];
  t.is(two(completions as Completion[]), true);
});

test('two - returns false when there are no two completions a day apart', (t) => {
  const completions = [{ read: '2020-01-01T03:00:00Z' }, { read: '2020-01-02T06:00:00Z' }];
  t.is(two(completions as Completion[]), false);
});
