import fs from 'fs';
import { FrontMatter, Post } from '@/types';
import { sync } from 'glob';
import frontMatter from 'front-matter';

export default class GetAllPostService {
  private readonly postPath = `${process.cwd()}/__devlog_posts__`;
  private static instance: GetAllPostService;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  public async excute() {
    const filePath = this.getFilePath();
    return this.getPostsWithSortFor(filePath);
  }

  private getFilePath() {
    return sync(`${this.postPath}/**/*.md*`).reverse();
  }

  private getPostsWithSortFor(filePath: string[]) {
    return filePath
      .reduce<Post[]>((acc, path) => {
        const file = fs.readFileSync(path, { encoding: 'utf8' });
        const { attributes, body } = frontMatter<FrontMatter>(file);
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
}