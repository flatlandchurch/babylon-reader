const { spawn } = require('child_process');
const globby = require('globby');
const path = require('path');

const mv = (args, cwd) =>
  new Promise((resolve) => {
    const out = {
      stdout: [],
      stderr: [],
      code: 0,
    };

    const move = spawn('mv', args, {
      cwd,
    });

    move.stdout.on('data', (data) => {
      out.stdout.push(data.toString());
    });

    move.stderr.on('data', (data) => {
      out.stderr.push(data.toString());
    });
    move.on('close', (code) => {
      out.code = code;
      resolve(out);
    });
  });

const rename = async (book, version) => {
  const workdir = path.join(__dirname, '../data/raw');
  const regexpr = /^[12]?[a-z]{3,4}\.[\d]+\.[a-z]{3,4}\.yves/;

  const paths = (
    await globby('*.yves', {
      cwd: workdir,
    })
  ).filter((p) => !regexpr.test(p));

  await Promise.all(
    paths.map((p) => {
      const [chapter] = p.split('.');
      const nextFile = `${book}.${chapter}.${version}.yves`;
      return mv([p, nextFile], workdir);
    }),
  );
};

const [book, version] = process.argv.slice(2);

(async () => {
  if (!book && !version) {
    console.error('Book and Version necessary');
    process.exit(1);
  }
  await rename(book, version);
})();
