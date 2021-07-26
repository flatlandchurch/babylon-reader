const prettier = require('prettier');

const mapFiles = require('./mapFiles');

const parse = (arr) => {
  const bytes = [];
  let i = 0;
  while (i < arr.length) {
    if (arr.length > i + 1) {
      const b = ((255 & arr[i + 1]) >> 5) | ((255 & arr[i + 1]) << 3);
      bytes.push(b);
    }
    const b = ((255 & arr[i]) >> 5) | ((255 & arr[i]) << 3);
    bytes.push(b);
    i += 2;
  }
  return (
    bytes
      .map((x) => String.fromCharCode(x & 0xff))
      .join('')
      // TODO: actually solve this
      .replace(/[^\u0000-\u007F]/g, '&nbsp;')
      .replace(/&nbsp;&nbsp;&nbsp;/g, `"`)
  );
};

(async () => {
  await mapFiles('raw', 'yves', 'html', 'html', parse, false, (i) =>
    prettier.format(i, { parser: 'html' }),
  );
})();
