import { css } from '@/styles/_stitches.config';
import formatDate, { optimizeImage } from '@/lib/utils';
import Image from 'next/image';
import useImageOnLoadingComplete from '@/hooks/useImageOnLoadingComplete';
import PostDetailImageSkeleton from './PostDetailImageSkeleton';
import Link from 'next/link';
import Separator from '../system/Separator';

interface Props {
  children: React.ReactNode;
  title: string;
  tags: string[];
  thumbnail: string;
  date: string;
}

function PostDetailTemplate({ children, title, tags, thumbnail, date }: Props) {
  const { isLoadingComplete, onLoadingComplete } = useImageOnLoadingComplete();

  return (
    <div className={block()}>
      <div className={headerBlock()}>
        <h1 className={titleStyle()}>{title}</h1>
        <div className={info()}>
          <p>By John</p>
          <Separator
            cssProps={{
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          />
          <time>{formatDate(date)}</time>
        </div>
        <div className={postTagsBlock()}>
          {tags.map((tag) => (
            <Link key={tag} href={`/posts/${tag}`}>
              <a>{tag}</a>
            </Link>
          ))}
        </div>
        <div className={imageBlock()}>
          <Image
            src={optimizeImage(thumbnail, 768)}
            alt="post-thumbnail"
            layout="fill"
            loading="lazy"
            onLoadingComplete={onLoadingComplete}
          />
          {!isLoadingComplete && <PostDetailImageSkeleton />}
        </div>
      </div>
      <div className={bodyBlock()}>{children}</div>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
});

const headerBlock = css({
  display: 'flex',
  flexDirection: 'column',
});

const titleStyle = css({
  fontSize: '1.875rem',
  margin: '1.25rem 0 0 0',
  display: 'flex',
  flexFlow: 'row wrap',
});

const info = css({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1.25rem',
  color: '$text',
  p: {
    margin: '0',
    fontWeight: 'bold',
  },
});

const postTagsBlock = css({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  marginTop: '1.25rem',
  '& a': {
    padding: '0.25rem 1rem',
    background: '$bg-content',
    color: '$text',
    borderRadius: '0.3rem',
    '& + &': {
      marginLeft: '0.5rem',
    },
    '&:hover': {
      background: '$bg-content-hover',
    },
  },
});

const imageBlock = css({
  width: '100%',
  marginTop: '1.25rem',
  span: {
    position: 'unset !important',
  },
  '& img': {
    width: '100% !important',
    height: 'auto !important',
    position: 'relative !important',
    borderRadius: '0.5rem',
    objectFit: 'contain',
  },
});

const bodyBlock = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1.25rem',
});

export default PostDetailTemplate;
