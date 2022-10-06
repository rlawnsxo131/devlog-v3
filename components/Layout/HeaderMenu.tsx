import { css } from '@/styles/_stitches.config';
import MenuIcon from '@/icons/MenuIcon';
import Link from 'next/link';
import useHeaderMenu from './hooks/useHeaderMenu';
import { buttonBasicStyle, buttonWithSVGBasicStyle } from '@/styles/basicStyle';
import transitions from '@/styles/transitions';

interface Props {}

function HeaderMenu(props: Props) {
  const {
    parentRef,
    navVisible,
    navClosed,
    navVariant,
    handleNavVisible,
    getRouteVariant,
  } = useHeaderMenu();

  return (
    <div className={block()} ref={parentRef}>
      <button className={button()} onClick={handleNavVisible}>
        <MenuIcon aria-label="menu-icon" />
      </button>
      {!navVisible && navClosed ? null : (
        <nav className={nav({ variant: navVariant })}>
          <ul className={ul()}>
            <li>
              <Link href={'/'}>
                <a className={anchor({ variant: getRouteVariant('/') })}>
                  포스트
                </a>
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
      )}
    </div>
  );
}

const block = css({
  position: 'relative',
});

const button = css({
  ...buttonBasicStyle,
  ...buttonWithSVGBasicStyle,
  padding: '0.5rem',
});

const nav = css({
  position: 'absolute',
  top: '3rem',
  right: '0',
  borderRadius: '0.25rem',
  transformOrigin: 'top',
  background: '$bg-nav',
  boxShadow: '$header-navigation',
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
  width: '15rem',
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
  padding: '0.75rem 0.25rem',
  fontSize: '1.125rem',
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

export default HeaderMenu;
