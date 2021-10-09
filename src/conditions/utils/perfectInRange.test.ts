import test from 'ava';

import perfectInRange from './perfectInRange';

test('perfectInRange - when all days in range are less than 2 days apart, return true', (t) => {
  const days = [
    {
      read: '2021-10-04T02:16:46.441Z',
      day: 1,
    },
    {
      read: '2021-10-05T03:11:23.773Z',
      day: 2,
    },
    {
      read: '2021-10-06T03:51:19.684Z',
      day: 3,
    },
    {
      read: '2021-10-07T03:44:39.109Z',
      day: 4,
    },
    {
      read: '2021-10-08T03:40:40.199Z',
      day: 5,
    },
  ];

  t.is(perfectInRange(1, 5, days), true);
});

test('perfectInRange - when a day in range is more than 1 day apart, return false', (t) => {
  const days = [
    {
      read: '2021-10-04T02:16:46.441Z',
      day: 1,
    },
    {
      read: '2021-10-05T03:11:23.773Z',
      day: 2,
    },
    {
      read: '2021-10-06T03:51:19.684Z',
      day: 3,
    },
    {
      read: '2021-10-07T08:44:39.109Z',
      day: 4,
    },
    {
      read: '2021-10-08T03:40:40.199Z',
      day: 5,
    },
  ];

  t.is(perfectInRange(1, 5, days), false);
});
