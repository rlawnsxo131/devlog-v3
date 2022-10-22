import {
  PostCard,
  PostCardGirdTemplate,
  PostCountTags,
} from '@/components/post';
import { getAllPosts } from '@/lib';
import getUniqCountTagsFor from '@/lib/getUniqCountTagsFor';
import { css } from '@/styles/_stitches.config';
import { CountTag, Post } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
  posts: Post[];
  countTags: CountTag;
}

export default function PostsOfTagPage({ posts, countTags }: Props) {
  return (
    <div className={block()}>
      <PostCountTags countTags={countTags} />
      <PostCardGirdTemplate>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </PostCardGirdTemplate>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
});

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const countTags = getUniqCountTagsFor(posts);
  const paths = Object.keys(countTags).map((tag) => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tag } = params;
  const allPosts = await getAllPosts();
  const countTags = getUniqCountTagsFor(allPosts);
  const posts = allPosts.filter((posts) => posts.tags.includes(tag as string));

  return {
    props: {
      posts,
      countTags,
    },
  };
};
