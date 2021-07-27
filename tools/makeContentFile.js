const yml = require('yaml');
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

const jsonify = (file) => {
  const [fm, body] = file
    .replace(/^---/, '')
    .split('---')
    .map((t) => t.trim());

  return {
    ...yml.parse(fm),
    content: body, // todo: snarkdown
  };
};

(async () => {
  const paths = await globby('*.md', {
    cwd: path.join(__dirname, '../data/content'),
  });
  const out = (
    await Promise.all(
      paths.map(async (p) => await read(path.join(__dirname, '../data/content', p))),
    )
  ).map((f) => jsonify(f.toString()));
  await write(path.join(__dirname, '../data/plan.json'), JSON.stringify(out));
})();
