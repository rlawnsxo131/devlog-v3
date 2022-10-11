import fs from 'fs';
import { sync } from 'glob';
import frontMatter from 'front-matter';
import { FrontMatter, Post } from '@/types';

const POST_PATH = `${process.cwd()}/content`;

export async function getAllPosts() {
  const files = sync(`${POST_PATH}/**/*.md*`).reverse();
  const posts = files
    .reduce<Post[]>((acc, path) => {
      const file = fs.readFileSync(path, { encoding: 'utf8' });
      const { attributes, body } = frontMatter<FrontMatter>(file);

      if (attributes.published) {
        const post: Post = {
          title: attributes.title,
          body,
          previewDescription: body.slice(0, 200),
          tags: attributes.tags,
          date: new Date(attributes.date).toISOString().substring(0, 19),
          thumbnail: attributes.thumbnail,
          url_slug: attributes.url_slug,
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

  return posts;
}
