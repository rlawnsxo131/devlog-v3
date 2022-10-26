import { css } from '@/styles/_stitches.config';
import { linkTagBaseStyle } from '@/styles/basicStyle';
import Link from 'next/link';
import { CountTag } from '@/types';
import { utils } from '@/lib';

interface Props {
  countTag: CountTag;
  currentTag?: string;
}

function PostCountTags({ countTag, currentTag }: Props) {
  const entries = Object.entries(countTag);

  return (
    <div className={block()}>
      <Link href="/">
        <a
          className={anchor({
            variant: currentTag ? 'default' : 'active',
          })}
        >
          All
          <span>{entries.length}</span>
        </a>
      </Link>
      {entries.map(([tag, count]) => (
        <Link key={tag} href={`/posts/${tag}`}>
          <a
            className={anchor({
              variant: utils.getAnchorVariant(tag, currentTag),
            })}
          >
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
  alignItems: 'center',
  height: '3.25rem',
  overflowX: 'auto',
});

const anchor = css({
  ...linkTagBaseStyle,
  marginBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'space-between',
  borderWidth: '2px',
  borderStyle: 'solid',
  '& span': {
    color: '$cyan9',
    marginLeft: '0.35rem',
  },
  variants: {
    variant: {
      default: {
        borderColor: '$bg-content',
        '&:hover': {
          borderColor: '$bg-content-hover',
        },
      },
      active: {
        borderColor: '$cyan9',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default PostCountTags;
