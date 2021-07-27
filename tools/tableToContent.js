const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const flatten = require('just-flatten');
const yml = require('yaml');

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

const WEEKDAY_ABBREVIATIONS = {
  Mon: 'Monday',
  Tues: 'Tuesday',
  Wed: 'Wednesday',
  Thurs: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

const BOOK_MAP = {
  Genesis: 'GEN',
  Exodus: 'EXO',
  Leviticus: 'LEV',
  Deuteronomy: 'DEU',
  Judges: 'JUD',
  '1 Samuel': '1SA',
  '1 Kings': '1KI',
  '2 Kings': '2KI',
  Isaiah: 'ISA',
  Ezekiel: 'EZE',
  Daniel: 'DAN',
  Matthew: 'MAT',
  Mark: 'MRK',
  Acts: 'ACT',
  Romans: 'ROM',
  '1 Peter': '1PE',
  Revelation: 'REV',
};

const parseReferences = (ref) => {
  const regexpr = /^(([12]\s)?([A-Za-z]+))\s(.*)$/;
  const [, book, , , chapters] = regexpr.exec(ref);
  const abbrv = BOOK_MAP[book];

  return chapters
    .split(',')
    .map((c) => c.trim())
    .reduce((acc, c) => {
      if (!c.includes('-')) return [...acc, c];

      const [start, end] = c.split('-');
      const itemCount = parseInt(end, 10) - parseInt(start, 10) + 1;
      return [
        ...acc,
        ...Array(itemCount)
          .fill(null)
          .map((_, idx) => idx + parseInt(start, 10)),
      ];
    }, [])
    .map((c) => `${abbrv}.${c}`);
};

const tableToContent = (table) => {
  const [, , ...rows] = table.trim().split('\n');
  return rows.map((row) => {
    const [day, chapters, weekday, themes, who, notes] = row
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((col) => col.trim());

    return {
      filename: `day-${day.toString().padStart(2, '0')}.md`,
      day: parseInt(day, 10),
      weekday: WEEKDAY_ABBREVIATIONS[weekday],
      week: Math.floor(parseInt(day, 10) / 7) + 1,
      themes: themes.split(',').map((t) => t.trim()),
      babylons: who.split(',').map((t) => t.trim()),
      chapters: flatten(chapters.split(';').map((t) => parseReferences(t.trim()))),
    };
  });
};

(async () => {
  const file = (await read(path.join(__dirname, '../data/table.md'))).toString();
  const outFiles = tableToContent(file);
  await Promise.all(
    outFiles.map((f) => {
      const { filename, ...fm } = f;
      return write(
        path.join(__dirname, '../data/content', filename),
        `---\n${yml.stringify(fm).trim()}\n---`,
      );
    }),
  );
})();
