import { utils } from '@/lib';
import { css } from '@/styles/_stitches.config';

import usePostToc from './hooks/usePostToc';

interface Props {}

function PostToc(props: Props) {
  const { tocs, deferrdActiveTocId, handleTocClick } = usePostToc();

  if (!tocs?.length) return null;

  return (
    <div className={block()}>
      <ul className={list()}>
        {tocs?.map((v) => (
          <li key={v.id}>
            <a
              href={`#${v.id}`}
              style={v.styleObj}
              className={tocAnchor({
                variant: utils.getAnchorVariant(v.id, deferrdActiveTocId),
              })}
              data-id={v.id}
              onClick={handleTocClick}
            >
              {v.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const block = css({
  display: 'none',
  mediaQuery: {
    minWidth: 1350,
    styles: {
      position: 'absolute',
      top: '6rem',
      left: '100%',
      marginRight: '5rem',
      display: 'flex',
      flexDirection: 'column',
    },
  },
});

const list = css({
  listStyle: 'none',
  position: 'fixed',
  width: '15rem',
  marginLeft: '3rem',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.875rem',
  borderLeft: '2px solid $bg-content',
  '& li + li': {
    marginTop: '0.5rem',
  },
});

const tocAnchor = css({
  display: 'flex',
  flexFlow: 'row wrap',
  color: '$text-sub',
  transition: 'all 0.125s ease-in',
  variants: {
    variant: {
      default: {
        color: '$text-sub',
      },
      active: {
        transform: 'scale(1.05)',
        color: '$text',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default PostToc;
