import { CountTag, Post } from '@/types';

interface Props {
  posts: Post[];
  countTags: CountTag;
}

export default function PostsWithTagPage(props: Props) {
  return <div>posts with tag page</div>;
}
