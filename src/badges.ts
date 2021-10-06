import two from './conditions/two';

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
  genesis: {
    title: 'The End of the Beginning',
    description: 'You completed all the readings from Genesis.',
    image: '/badges/genesis.png',
    condition: (days) => days.find((d) => d.day === 5) && days.length >= 5,
  },
  week_one: {
    title: 'The Seventh Day',
    description: 'You completed a week of readings!',
    image: '',
    condition: (days) => days.find((d) => d.day === 7) && days.length >= 7,
  },
  exodus: {
    title: 'The Cloud of YHWH',
    description: 'You completed all the readings from Exodus.',
    image: '',
    condition: (days) => days.find((d) => d.day === 8) && days.length >= 8,
  },
  gross: {
    title: 'Gross!',
    description: 'You survived Priestly law, with animal sacrifices and everything.',
    image: '',
    hidden: true,
    condition: (days) => days.find((d) => d.day === 9) && days.length >= 9,
  },
  torah: {
    title: 'The Instructions of God',
    description:
      'You completed all the readings from the Torah, the first five books of the Bible.',
    image: '',
    condition: (days) => days.find((d) => d.day === 9) && days.length >= 9,
  },
  judges: {
    title: 'The Darkest Timeline',
    description: 'You completed all the readings for the book of Judges, and boy was it a doozy.',
    image: '',
    condition: (days) => days.find((d) => d.day === 11) && days.length >= 11,
  },
  week_two: {
    title: 'Fortnight',
    description: 'Wow! Look at how faithful you are. You completed two weeks of readings',
    image: '',
    condition: (days) => days.find((d) => d.day === 14) && days.length >= 14,
  },
  kings: {
    title: `All the King's Horses`,
    description: `Honestly, this one's a bit of a freebie. I was really committed to the pun for 1 Kings 10-12.`,
    image: '',
    hidden: true,
    condition: (days) => days.find((d) => d.day === 14) && days.length >= 14,
  },
  exile: {
    title: `By the Rivers of Babylon`,
    description: `You completed all the readings leading up to the Babylonian exile.`,
    image: '',
    condition: (days) => days.find((d) => d.day === 15) && days.length >= 15,
  },
  daniel: {
    title: 'The Faithful Jew',
    description: 'You read the whole book of Daniel',
    image: '',
    condition: () => {},
  },
  week_three: {
    title: 'Good Things Come in Threes',
    description: `You completed three weeks of reading. That's commendable!`,
    image: '',
    condition: () => {},
  },
  magi: {
    title: 'Gifts of the Magi',
    condition: () => {},
  },
  son_of_man: {
    title: 'Son of Man',
    condition: () => {},
  },
  week_four: {
    title: 'Four: One More',
    condition: () => {},
  },
  roman_exiles: {
    title: 'The People of God',
    condition: () => {},
  },
  holy: {
    title: 'Holy, Holy, Holy',
    condition: () => {},
  },
  babylon_fallen: {
    title: 'Fallen is Babylon',
    condition: () => {},
  },
  the_beginning: {
    title: 'The End and the Beginning',
    condition: () => {},
  },
  conqueror: {
    title: 'Conqueror',
    condition: () => {},
  },
  more_than_a_conqueror: {
    title: 'More than a Conqueror',
    hidden: true,
    condition: () => {},
  },
  catch_up: {
    title: 'Catch Up',
    hidden: true,
    condition: () => {},
  },
  skip_ahead: {
    title: 'Skip Ahead',
    hidden: true,
    condition: () => {},
  },
};

export default badges;
