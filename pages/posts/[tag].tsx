import { PostCard, PostCardGirdLayout, PostCountTags } from '@/components/post';
import { getAllPosts } from '@/lib';
import { getUniqCountTagObjFor } from '@/lib';
import { css } from '@/styles/_stitches.config';
import { CountTag, Post } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
  currentTag: string;
  countTagObj: CountTag;
  posts: Post[];
}

export default function PostsOfTagPage({
  currentTag,
  countTagObj,
  posts,
}: Props) {
  return (
    <div className={block()}>
      <PostCountTags countTagObj={countTagObj} currentTag={currentTag} />
      <PostCardGirdLayout>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </PostCardGirdLayout>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
});

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const countTags = getUniqCountTagObjFor(posts);
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
  const countTagObj = getUniqCountTagObjFor(allPosts);
  const posts = allPosts.filter((posts) => posts.tags.includes(tag as string));

  return {
    props: {
      countTagObj,
      posts,
      currentTag: tag,
    },
  };
};
