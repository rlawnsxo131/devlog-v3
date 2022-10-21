import { CountTag, Post } from '@/types';

export default function getUniqCountTagsFor(posts: Post[]) {
  const result = new Map<string, number>();
  const allTags = posts.map((post) => post.tags).flat();
  for (const tag of allTags) {
    if (result.has(tag)) {
      const prevCount = result.get(tag);
      result.set(tag, prevCount + 1);
      continue;
    }
    result.set(tag, 1);
  }

  return allTags.reduce<CountTag>((acc, tag) => {
    if (acc[tag]) {
      const prevCount = acc[tag];
      acc[tag] = prevCount + 1;
    } else {
      acc[tag] = 1;
    }
    return acc;
  }, {});
}
