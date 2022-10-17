import { css } from '@/styles/_stitches.config';
import Link from 'next/link';
import useHeaderMenuRoute from './hooks/useHeaderMenuRoute';

interface Props {}

function HeaderWebMenu(props: Props) {
  const { getRouteVariant } = useHeaderMenuRoute();

  return (
    <nav className={block()}>
      <ul className={ul()}>
        <li>
          <Link href={'/'}>
            <a className={anchor({ variant: getRouteVariant('/') })}>포스트</a>
          </Link>
        </li>
        <li>
          <Link href={'/tag'}>
            <a className={anchor({ variant: getRouteVariant('/tag') })}>태그</a>
          </Link>
        </li>
        <li>
          <Link href={'/info'}>
            <a className={anchor({ variant: getRouteVariant('/info') })}>
              소개
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const block = css({
  display: 'none',
  '@xs4': {
    display: 'flex',
    alignItems: 'center',
  },
});

const ul = css({
  listStyle: 'none',
  margin: '0',
  padding: '0 2rem',
  display: 'flex',
  'li + li': {
    marginLeft: '2rem',
  },
});

const anchor = css({
  textAlign: 'center',
  padding: '0.75rem 0.25rem',
  fontSize: '1rem',
  variants: {
    variant: {
      default: {
        color: '$text',
      },
      active: {
        color: '$text-anchor-active',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default HeaderWebMenu;