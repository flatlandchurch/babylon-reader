const cheerio = require('cheerio');

const mapFiles = require('./mapFiles');

const P_START = { type: 'paragraph_start' };
const P_END = { type: 'paragraph_end' };
const L_BREAK = { type: 'line_break' };
const CONTINUE = { type: 'continue' };
const BREAK = { type: 'break' };

// This way of approaching this comes straight
// from Josh Duff (https://github.com/TehShrike/world-english-bible/blob/master/parse-html.js)
const paragraphs = ['p', 'pi', 'nb'];
const lines = ['li', 'li1', 'li2', 'mi', 'm', 'q1', 'q2'];
const breaks = ['b'];
const headers = ['d'];
const textSelector = [...paragraphs, ...lines, ...breaks, ...headers]
  .map((c) => `div.chapter > .${c}`)
  .join(', ');

const map = (res, cb) => {
  const out = [];
  res.each((i, el) => out.push(cb(el)));
  return out;
};

const flatten = (acc, val) => (Array.isArray(val) ? [...acc, ...val] : [...acc, val]);

const parseHTML = (str) => {
  const $ = cheerio.load(str);

  return map($(textSelector), (el) => {
    const cx = el.attribs.class;
    if (breaks.includes(cx)) {
      return BREAK;
    }

    if (headers.includes(cx)) {
      return {
        type: 'header',
        value: $(el).text().trim(),
      };
    }

    const isParagraph = paragraphs.includes(cx);
    const text = map($(el).contents(), (child) => {
      const type = isParagraph ? 'paragraph_text' : 'line_text';

      if (child.type === 'tag' && child.attribs.class.includes('verse')) {
        return map($(child).contents(), (c) => {
          if (c.type === 'tag' && c.name === 'span' && c.attribs.class === 'label') {
            return {
              type: `verse_number`,
              value: parseInt($(c).text().trim(), 10),
            };
          }

          if (c.type === 'tag' && c.name === 'span' && c.attribs.class === 'content') {
            return {
              type,
              value: $(c)
                .text()
                .trim()
                .split('\n')
                .map((t) => t.trim())
                .join(' '),
            };
          }

          if (c.type === 'tag' && c.name === 'span' && c.attribs.class === 'nd') {
            return {
              type: 'divine_name_text',
              value: 'Lord',
            };
          }
        });
      }

      return null;
    })
      .reduce(flatten, [])
      .filter((t) => t);

    const start = cx === 'nb' ? CONTINUE : P_START;
    return isParagraph ? [start, ...text, P_END] : [...text, L_BREAK];
  }).reduce(flatten, []);
};

(async () => {
  await mapFiles('html', 'html', 'intermediate', 'json', parseHTML, true, (f) =>
    JSON.stringify(f, null, 2),
  );
})();
