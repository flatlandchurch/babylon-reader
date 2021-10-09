import test from 'ava';

import consistent from './consistent';

test('consistent - when at least three days occur in the same hour, return true', (t) => {
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

  t.is(consistent(days), true);
});

test('consistent - when there are no consistent times, return true', (t) => {
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
      read: '2021-10-06T04:51:19.684Z',
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

  t.is(consistent(days), false);
});
