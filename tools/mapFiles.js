const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const globby = require('globby');

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

const mapFiles = async (
  src,
  srcType,
  dest,
  destType,
  cb,
  stringify = true,
  formatter = (i) => i,
) => {
  const paths = await globby(`*.${srcType}`, {
    cwd: path.join(__dirname, `../data/${src}`),
  });
  await Promise.all(
    paths.map(async (p) => {
      const file = await read(path.join(__dirname, `../data/${src}`, p));
      const content = stringify ? file.toString() : file;
      const out = cb(content);
      const [book, chapter, version] = p.split('.');
      await write(
        path.join(__dirname, `../data/${dest}`, `${book}.${chapter}.${version}.${destType}`),
        formatter(out),
      );
    }),
  );
};

module.exports = mapFiles;
