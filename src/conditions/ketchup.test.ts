import test from 'ava';
import ketchup from './ketchup';

test('ketchup - when two readings are done on the same day, return true', (t) => {
  const days = [
    {
      read: '2021-10-04T02:16:46.432Z',
      day: 1,
    },
    {
      read: '2021-10-06T19:42:35.901Z',
      day: 2,
    },
    {
      read: '2021-10-06T19:45:42.455Z',
      day: 3,
    },
  ];

  t.is(ketchup(days), true);
});

test('ketchup - when no readings are done on the same day, return false', (t) => {
  const days = [
    {
      read: '2021-10-04T01:41:28.194Z',
      day: 1,
    },
    {
      read: '2021-10-04T05:21:44.107Z',
      day: 2,
    },
    {
      read: '2021-10-05T23:29:34.685Z',
      day: 3,
    },
    {
      read: '2021-10-06T16:17:01.038Z',
      day: 4,
    },
    {
      read: '2021-10-07T07:02:47.479Z',
      day: 5,
    },
    {
      read: '2021-10-08T10:29:37.705Z',
      day: 6,
    },
    {
      read: '2021-10-09T06:17:25.687Z',
      day: 7,
    },
    {
      read: '2021-10-10T09:29:20.178Z',
      day: 8,
    },
  ];

  t.is(ketchup(days), false);
});
