import transitions from '@/styles/transitions';
import { css } from '@/styles/_stitches.config';
import Link from 'next/link';
import useHeaderMenuNavigation from './hooks/useHeaderMenuNavigation';

interface Props {
  visible: boolean;
}

function HeaderMenuNavigation({ visible }: Props) {
  const { closed, navVariant, getRouteVariant } = useHeaderMenuNavigation({
    visible,
  });

  if (!visible && closed) return null;

  return (
    <nav
      className={nav({
        variant: navVariant,
      })}
    >
      <ul className={ul()}>
        <li>
          <Link href={'/'}>
            <a className={anchor({ variant: getRouteVariant('/') })}>새글</a>
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

const nav = css({
  position: 'absolute',
  top: '3rem',
  right: '0',
  borderRadius: '0.25rem',
  transformOrigin: 'top',
  background: '$bg-nav',
  boxShadow: '$headerNavigation',
  variants: {
    variant: {
      enabled: {
        animation: `${transitions.scaleUp} 0.25s forwards ease-in-out`,
      },
      disabled: {
        animation: `${transitions.scaleDown} 0.25s forwards ease-in-out`,
      },
    },
  },
  defaultVariants: {
    variant: 'disabled',
  },
});

const ul = css({
  listStyle: 'none',
  width: '10rem',
  margin: '0',
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  '& li': {
    display: 'flex',
    flexDirection: 'column',
    '&:first-of-type': {
      borderTopLeftRadius: '0.25rem',
      borderTopRightRadius: '0.25rem',
    },
    '&:last-of-type': {
      borderBottomLeftRadius: '0.25rem',
      borderBottomRightRadius: '0.25rem',
    },
    '&:hover': {
      background: '$bg-hover',
    },
  },
});

const anchor = css({
  textAlign: 'center',
  color: '$gray12',
  padding: '0.75rem 0.25rem',
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

export default HeaderMenuNavigation;
