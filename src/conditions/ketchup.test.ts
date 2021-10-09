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

  t.is(ketchup(days), false);
});
