import { optimizeImage } from '@/lib/utils';
import { css } from '@/styles/_stitches.config';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: Post;
}

function PostCard({ post }: Props) {
  return (
    <article className={block()}>
      <div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </div>
      <div className={thumbnailBlock()}>
        <Link href={`/post/${post.slug}`}>
          <a>
            <Image
              className={image()}
              src={optimizeImage(post.thumbnail, 320)}
              alt="post-thumbnail"
              width="200"
              height="134"
            />
          </a>
        </Link>
      </div>
    </article>
  );
}

const block = css({
  //   position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const thumbnailBlock = css({
  position: 'relative',
});

const image = css({
  //   position: 'absolute',
  //   display: 'block',
  //   top: '0',
  //   left: '0',
  //   width: '100%',
  //   height: '100%',
  //   objectFit: 'contain',
});

export default PostCard;
