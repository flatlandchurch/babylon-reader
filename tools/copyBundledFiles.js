const cpy = require('cpy');
const mkdir = require('make-dir');
const path = require('path');
const { execSync } = require('child_process');

(async () => {
  const dir = path.join(__dirname, '../', 'public/data');
  await mkdir(dir);
  await cpy('data/final/**', 'public/data');
  await cpy('data/plan.json', 'public/data');

  const res = execSync('ls public/data').toString();
  const fileCpyCount = res.split('\n').length;

  console.log(`📑 ${fileCpyCount} files copied into public/data`);
})();
