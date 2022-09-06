import useTransitionTimeoutEffect from '@/hooks/useTransitionTimeoutEffect';
import transitions from '@/styles/transitions';
import { css } from '@/styles/_stitches.config';
import Link from 'next/link';

interface Props {
  visible: boolean;
}

function HeaderMenuNavigation({ visible }: Props) {
  const closed = useTransitionTimeoutEffect({ visible });

  if (!visible && closed) return null;

  return (
    <nav
      className={nav({
        variant: visible ? 'enabled' : 'disabled',
      })}
    >
      <ul className={ul()}>
        <li>
          <Link href={'/'}>
            <a>새글</a>
          </Link>
        </li>
        <li>
          <Link href={'/info'}>소개</Link>
        </li>
      </ul>
    </nav>
  );
}

const nav = css({
  position: 'absolute',
  top: '3rem',
  right: '0',
  padding: '0.25rem 0',
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
  justifyContent: 'center',
  '& li': {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem 0.25rem',
  },
});

export default HeaderMenuNavigation;
