import two from './conditions/two';
import findInRange from './conditions/utils/findInRange';
import three from './conditions/three';
import early from './conditions/early';
import consistent from './conditions/consistent';
import ketchup from './conditions/ketchup';
import perfectInRange from './conditions/utils/perfectInRange';

const badges = {
  start: {
    title: 'So It Begins',
    description: `You completed your first day of reading. You've taken your first step into a larger world.`,
    image: '/badges/start.png',
    condition: (days) => days.find((d) => d.day === 1),
  },
  two: {
    title: 'Two in a Row',
    description: `You've successfully completed a reading for two days in a row. Keep up the momentum.`,
    image: '/badges/two.png',
    condition: two,
    hidden: true,
  },
  three: {
    title: 'Three in a Row',
    description: `You've successfully completed a reading for three days in a row. You're doing awesome!`,
    image: '/badges/three.png',
    condition: three,
    hidden: true,
  },
  early: {
    title: 'I Rise Early',
    description: `You've done a day's reading before 6AM.`,
    image: '/badges/early.png',
    condition: early,
    hidden: true,
  },
  genesis: {
    title: 'The End of the Beginning',
    description: 'You completed all the readings from Genesis.',
    image: '/badges/genesis.png',
    condition: (days) => findInRange(1, 5, days),
  },
  week_one: {
    title: 'The Seventh Day',
    description: 'You completed a week of readings!',
    image: '/badges/seven.png',
    condition: (days) => findInRange(1, 7, days),
  },
  perfect_week_one: {
    title: 'Perfect Week I',
    hidden: true,
    image: '/badges/perfect_week_1.png',
    condition: (days) => perfectInRange(1, 7, days),
  },
  exodus: {
    title: 'The Cloud of YHWH',
    description: 'You completed all the readings from Exodus.',
    image: '',
    condition: (days) => findInRange(6, 8, days),
  },
  gross: {
    title: 'Gross!',
    description: 'You survived Priestly law, with animal sacrifices and everything.',
    image: '',
    hidden: true,
    condition: (days) => days.find((d) => d.day === 9),
  },
  torah: {
    title: 'The Instructions of God',
    description:
      'You completed all the readings from the Torah, the first five books of the Bible.',
    image: '',
    condition: (days) => findInRange(1, 9, days),
  },
  judges: {
    title: 'The Darkest Timeline',
    description: 'You completed all the readings for the book of Judges, and boy was it a doozy.',
    image: '',
    condition: (days) => findInRange(10, 11, days),
  },
  week_two: {
    title: 'Fortnight',
    description: 'Wow! Look at how faithful you are. You completed two weeks of readings',
    image: '',
    condition: (days) => findInRange(8, 14, days),
  },
  perfect_week_two: {
    title: 'Perfect Week II',
    hidden: true,
    image: '/badges/perfect_week_2.png',
    condition: (days) => perfectInRange(8, 14, days),
  },
  kings: {
    title: `All the King's Horses`,
    description: `Honestly, this one's a bit of a freebie. I was really committed to the pun for 1 Kings 10-12.`,
    image: '',
    hidden: true,
    condition: (days) => days.find((d) => d.day === 14),
  },
  exile: {
    title: `By the Rivers of Babylon`,
    description: `You completed all the readings leading up to the Babylonian exile.`,
    image: '',
    condition: (days) => findInRange(1, 15, days),
  },
  daniel: {
    title: 'The Faithful Jew',
    description: 'You read the whole book of Daniel',
    image: '',
    condition: (days) => findInRange(17, 21, days),
  },
  week_three: {
    title: 'Good Things Come in Threes',
    description: `You completed three weeks of reading. That's commendable!`,
    image: '',
    condition: (days) => findInRange(15, 21, days),
  },
  perfect_week_three: {
    title: 'Perfect Week III',
    hidden: true,
    image: '/badges/perfect_week_3.png',
    condition: (days) => perfectInRange(15, 21, days),
  },
  magi: {
    title: 'Gifts of the Magi',
    condition: (days) => days.find((d) => d.day === 22),
  },
  son_of_man: {
    title: 'Son of Man',
    condition: (days) => findInRange(23, 26, days),
  },
  week_four: {
    title: 'Four: One More',
    description: `Incredible! You completed four weeks of reading. Look how far you've come! Only one more week to go.`,
    condition: (days) => findInRange(22, 28, days),
  },
  perfect_week_four: {
    title: 'Perfect Week IV',
    hidden: true,
    image: '/badges/perfect_week_4.png',
    condition: (days) => perfectInRange(22, 28, days),
  },
  roman_exiles: {
    title: 'The People of God',
    condition: (days) => findInRange(27, 29, days),
  },
  holy: {
    title: 'Holy, Holy, Holy',
    condition: (days) => days.find((d) => d.day === 30),
  },
  advent: {
    title: 'Advent',
    condition: (days) => days.find((d) => d.day === 32),
  },
  babylon_fallen: {
    title: 'Fallen is Babylon',
    condition: (days) => findInRange(33, 34, days),
  },
  the_beginning: {
    title: 'The End and the Beginning',
    condition: (days) => days.find((d) => d.day === 35),
  },
  skip_end: {
    title: 'Skip to the End',
    description: 'Read the final reading with at least one previous reading still unread.',
    hidden: true,
    condition: (days) => days.find((d) => d.day === 35) && !findInRange(1, 35, days), // TODO: this is technically impermanent
  },
  week_five: {
    title: `High Five`,
    condition: (days) => findInRange(29, 35, days),
  },
  perfect_week_five: {
    title: 'Perfect Week V',
    hidden: true,
    image: '/badges/perfect_week_5.png',
    condition: (days) => perfectInRange(22, 28, days),
  },
  conqueror: {
    title: 'Conqueror',
    condition: (days) => findInRange(1, 35, days),
  },
  more_than_a_conqueror: {
    title: 'More than a Conqueror',
    hidden: true,
    condition: (days) => perfectInRange(1, 35, days),
  },
  overcomer: {
    title: '',
    hidden: true,
    condition: () => {},
  },
  catch_up: {
    title: 'Ketch Up',
    description: `Complete at least two readings on the same day. It's okay if you're a little behind, we still believe in you.`,
    image: '/badges/ketchup.png',
    hidden: true,
    condition: ketchup,
  },
  skip_ahead: {
    title: 'Skip Ahead',
    hidden: true,
    condition: () => {},
  },
  consistent: {
    title: 'Consistent',
    description: 'Read at least three days in a row at the same hour each day.',
    image: '/badges/consistent.png',
    hidden: true,
    condition: consistent,
  },
};

// TODO: Add perfect weeks

export default badges;
