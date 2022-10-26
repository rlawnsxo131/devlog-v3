import { css } from '@/styles/_stitches.config';
import usePostToc from './hooks/usePostToc';

interface Props {}

function PostToc(props: Props) {
  const { headings, activeHeading, handleActiveHeading } = usePostToc();

  return (
    <div className={block()}>
      <ul className={list()}>
        {headings.map((v) => (
          <li key={v.id}>
            <a
              href={`#${v.id}`}
              style={v.styleObj}
              className={activeHeading === v.id ? 'active' : ''}
              data-id={v.id}
              onClick={handleActiveHeading}
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
      width: '15rem',
      display: 'flex',
      flexDirection: 'column',
    },
  },
});

const list = css({
  listStyle: 'none',
  position: 'fixed',
  marginLeft: '3rem',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.875rem',
  borderLeft: '2px solid $bg-content',
  '& a': {
    display: 'flex',
    flexFlow: 'row wrap',
    color: '$text-sub',
    transition: '0.125s all ease-in',
    '&.active': {
      transform: 'scale(1.05)',
      color: '$text',
    },
  },
  '& li + li': {
    marginTop: '0.5rem',
  },
});

export default PostToc;
