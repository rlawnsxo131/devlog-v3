import { linkTagBaseStyle } from '@/styles/basicStyle';
import { css } from '@/styles/_stitches.config';
import { CountTag } from '@/types';
import Link from 'next/link';

interface Props {
  countTags: CountTag;
}

function PostCountTags({ countTags }: Props) {
  return (
    <div className={block()}>
      {Object.entries(countTags).map(([tag, count]) => (
        <Link key={tag} href={`/posts/${tag}`}>
          <a>
            {tag}
            <span>{count}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}

const block = css({
  display: 'flex',
  flexFlow: 'row wrap',
  marginBottom: '1rem',
  '& a': {
    ...linkTagBaseStyle,
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'space-between',
    '& span': {
      color: '$cyan9',
      marginLeft: '0.35rem',
    },
  },
});

export default PostCountTags;
