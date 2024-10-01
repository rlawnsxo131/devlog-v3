import frontMatter from 'front-matter';
import fs from 'fs';
import { sync } from 'glob';

import type { FrontMatter, Post } from '@/types';

const POST_PATH = `${process.cwd()}/__devlog_posts__`;

export default async function getAllPosts() {
  const filePath = sync(`${POST_PATH}/**/*.md*`).reverse();

  return filePath
    .reduce<Post[]>((acc, path) => {
      const file = fs.readFileSync(path, { encoding: 'utf8' });
      const { attributes, body } = frontMatter<FrontMatter>(file);
      if (attributes.published) {
        const post: Post = {
          title: attributes.title,
          body,
          description: attributes.description,
          tags: attributes.tags.slice(0, 3),
          date: new Date(attributes.date).toISOString().substring(0, 19),
          thumbnail: attributes.thumbnail,
          slug: attributes.slug,
        };
        acc.push(post);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
}
