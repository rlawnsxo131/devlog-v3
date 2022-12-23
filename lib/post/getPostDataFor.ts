import type { LinkedPost, Post } from '@/types';

export default async function getPostDataFor(posts: Post[], slug: string) {
  return posts.reduce<{
    post: Post | null;
    linkedPost: LinkedPost | null;
  }>(
    (acc, post, idx, posts) => {
      if (post.slug === slug) {
        acc.post = post;
        acc.linkedPost = {
          prevPost: posts[idx + 1] ?? null,
          nextPost: posts[idx - 1] ?? null,
        };
      }
      return acc;
    },
    {
      post: null,
      linkedPost: null,
    },
  );
}
