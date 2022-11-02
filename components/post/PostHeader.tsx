import Link from 'next/link';

import { utils } from '@/lib';
import { css } from '@/styles/_stitches.config';
import { linkTagBaseStyle } from '@/styles/basicStyle';
import type { Post } from '@/types';

import Separator from '../system/Separator';

type Props = Pick<Post, 'title' | 'tags' | 'date'>;

function PostHeader({ title, tags, date }: Props) {
  return (
    <div className={block()}>
      <h1 className={titleStyle()}>{title}</h1>
      <div className={infoBlock()}>
        <p>By John</p>
        <Separator
          cssProps={{
            marginLeft: '0.5rem',
            marginRight: '0.5rem',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        />
        <time>{utils.formatDate(date)}</time>
      </div>
      <div className={tagsBlock()}>
        {tags.map((tag) => (
          <Link key={tag} href={`/posts/${tag}`}>
            <a>{tag}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
});

const titleStyle = css({
  margin: '0',
  display: 'flex',
  flexFlow: 'row wrap',
  fontSize: '1.875rem',
});

const infoBlock = css({
  display: 'flex',
  alignItems: 'center',
  marginTop: '2rem',
  color: '$text',
  '& p': {
    margin: '0',
    fontWeight: 'bold',
  },
});

const tagsBlock = css({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  marginTop: '2.25rem',
  '& a': {
    ...linkTagBaseStyle,
  },
});

export default PostHeader;
