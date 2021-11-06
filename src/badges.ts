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
    description: 'You read consistently every day this week!',
    hidden: true,
    image: '/badges/perfect_week_1.png',
    condition: (days) => perfectInRange(1, 7, days), // TODO: recalc this
  },
  exodus: {
    title: 'The Cloud of YHWH',
    description: 'You completed all the readings from Exodus.',
    image: '/badges/cloud.png',
    condition: (days) => findInRange(6, 8, days),
  },
  gross: {
    title: 'Gross!',
    description: 'You survived Priestly law, with animal sacrifices and everything.',
    image: '/badges/gross.png',
    hidden: true,
    condition: (days) => days.find((d) => d.day === 9),
  },
  torah: {
    title: 'The Instructions of God',
    description:
      'You completed all the readings from the Torah – the first five books of the Bible.',
    image: '/badges/torah.png',
    condition: (days) => findInRange(1, 9, days),
  },
  judges: {
    title: 'The Darkest Timeline',
    description: 'You completed all the readings for the book of Judges, and boy was it a doozy.',
    image: '/badges/darkest_timeline.png',
    condition: (days) => findInRange(10, 11, days),
  },
  week_two: {
    title: 'Fortnight',
    description: 'Wow! Look at how faithful you are. You completed two weeks of readings',
    image: '/badges/fortnight.png',
    condition: (days) => findInRange(8, 14, days),
  },
  perfect_week_two: {
    title: 'Perfect Week II',
    description: 'You read consistently every day this week!',
    hidden: true,
    image: '/badges/perfect_week_2.png',
    condition: (days) => perfectInRange(8, 14, days),
  },
  kings: {
    title: `All the King's Horses`,
    description: `Honestly, this one's a bit of a freebie. I was really committed to the pun for 1 Kings 10-12.`,
    image: '/badges/kings.png',
    hidden: true,
    condition: (days) => days.find((d) => d.day === 14),
  },
  exile: {
    title: `By the Rivers of Babylon`,
    description: `You completed all the readings leading up to the Babylonian exile.`,
    image: '/badges/exile.png',
    condition: (days) => findInRange(1, 15, days),
  },
  like_son_of_man: {
    title: 'One Like a Son of Man',
    description: `You read one of Matt's favorite chapters in the Hebrew Bible.`,
    image: '/badges/son_of_man.png',
    hidden: true,
    condition: (days) => days.find((d) => d.day === 19),
  },
  daniel: {
    title: 'The Faithful Jew',
    description: 'You read the whole book of Daniel',
    image: '/badges/faithful_jew.png',
    condition: (days) => findInRange(17, 21, days),
  },
  week_three: {
    title: 'Good Things Come in Threes',
    description: `You completed three weeks of reading. That's commendable! I'm so proud of you, keep it up!`,
    image: '/badges/week_3.png',
    condition: (days) => findInRange(15, 21, days),
  },
  perfect_week_three: {
    title: 'Perfect Week III',
    description: 'You read consistently every day this week!',
    hidden: true,
    image: '/badges/perfect_week_3.png',
    condition: (days) => perfectInRange(15, 21, days),
  },
  magi: {
    title: 'Gifts of the Magi',
    description: 'Complete the reading of Matthew 2',
    image: '/badges/magi.png',
    condition: (days) => days.find((d) => d.day === 22),
  },
  son_of_man: {
    title: 'Son of Man',
    description: 'You saw the Son of Man lifted up, and witnessed his glorious resurrection.',
    image: '/badges/son_of_man_lifted.png',
    condition: (days) => findInRange(23, 26, days),
  },
  week_four: {
    title: 'Four: One More',
    description: `Incredible! You completed four weeks of reading. Look how far you've come! Only one more week to go.`,
    image: '/badges/week_4.png',
    condition: (days) => findInRange(22, 28, days),
  },
  perfect_week_four: {
    title: 'Perfect Week IV',
    description: 'You read consistently every day this week!',
    hidden: true,
    image: '/badges/perfect_week_4.png',
    condition: (days) => perfectInRange(22, 28, days),
  },
  roman_exiles: {
    title: 'The People of God',
    description: `You've learned what it looks like to live as the people of God in whatever Babylon you find yourself.`,
    image: '/badges/people_of_god.png',
    condition: (days) => findInRange(27, 29, days),
  },
  holy: {
    title: 'Holy, Holy, Holy',
    description: `You've read one of the most beautiful hymns in the book of Revelation.`,
    image: '/badges/holy.png',
    condition: (days) => days.find((d) => d.day === 30),
  },
  advent: {
    title: 'Advent',
    description: `You've read one of the most beautiful, artistic tellings of the incarnation and God's delivering his people.`,
    image: '/badges/advent.png',
    condition: (days) => days.find((d) => d.day === 32),
  },
  fallen_babylon: {
    title: 'Fallen is Babylon',
    description:
      'You witnessed the final defeat of the human project of evil. The story is almost over.',
    image: '/badges/fallen_babylon.png',
    condition: (days) => findInRange(33, 34, days),
  },
  the_beginning: {
    title: 'The End and the Beginning',
    description:
      'The story is at its end, but in another way, this is just the beginning of a life-long relationship with the story of the Bible.',
    image: '/badges/the_end.png',
    condition: (days) => days.find((d) => d.day === 35),
  },
  week_five: {
    title: `High Five`,
    description: 'You completed week 5 of readings.',
    image: '/badges/week_5.png',
    condition: (days) => findInRange(29, 35, days),
  },
  perfect_week_five: {
    title: 'Perfect Week V',
    description: 'You read consistently every day this week!',
    hidden: true,
    image: '/badges/perfect_week_5.png',
    condition: (days) => perfectInRange(29, 35, days),
  },
  conqueror: {
    title: 'Conqueror',
    description:
      'We do not conquer through violence or warfare, but through the blood of the Lamb and the word of our testimony.',
    image: '/badges/conqueror.png',
    condition: (days) => findInRange(1, 35, days),
  },
  more_than_a_conqueror: {
    title: 'More than a Conqueror',
    description:
      'You have faithfully read every day of the reading challenge. Incredible job. I am so proud of you!',
    image: '/badges/white_stone.png',
    hidden: true,
    condition: (days) => perfectInRange(1, 35, days),
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
