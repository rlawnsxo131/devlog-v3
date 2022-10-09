import fs from 'fs';
import { sync } from 'glob';
import frontMatter from 'front-matter';
import { FrontMatter } from '@/types/variables';

const DIR_REPLACE_STRING = '/content';
const POST_PATH = `${process.cwd()}${DIR_REPLACE_STRING}`;

export function getAllPosts() {
  const files = sync(`${POST_PATH}/**/*.md*`).reverse();
  const posts = files.reduce((acc, path) => {
    const file = fs.readFileSync(path, { encoding: 'utf8' });
    const { attributes, body } = frontMatter<FrontMatter>(file);
    console.log('attributes: ', attributes);
    console.log('body: ', body);
    return acc;
  }, []);
  console.log(files);

  return files.toString();
}
