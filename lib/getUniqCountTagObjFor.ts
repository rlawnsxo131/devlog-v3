import { CountTag, Post } from '@/types';

export default function getUniqCountTagObjFor(posts: Post[]) {
  return posts
    .map((post) => post.tags)
    .flat()
    .reduce<CountTag>((acc, tag) => {
      if (acc[tag]) {
        const prevCount = acc[tag];
        acc[tag] = prevCount + 1;
      } else {
        acc[tag] = 1;
      }
      return acc;
    }, {});
}
