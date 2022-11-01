/**
 * @TODO lambda 로 처리할까 이 스크립트를 돌릴까 고민해보자
 */
import fs from 'fs';
import { sync } from 'glob';

const OUT_FILE_PATH = `${process.cwd()}/out`;

function removeHtmlPrefix() {
  const filePath = sync(`${OUT_FILE_PATH}/**/*.html*`).reverse();
  for (const path of filePath) {
    if (path.endsWith('index.html')) {
      const pureFilename = path.split('.html')[0];
      fs.renameSync(path, pureFilename);
    }
  }
}

removeHtmlPrefix();
