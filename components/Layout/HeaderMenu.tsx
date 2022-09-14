import { css } from '@/styles/_stitches.config';
import MenuIcon from '@/icons/MenuIcon';
import Link from 'next/link';
import useHeaderMenu from './hooks/useHeaderMenu';
import { buttonBasicStyle, buttonWithSVGBasicStyle } from '@/styles/basicStyle';
import transitions from '@/styles/transitions';

interface Props {}

function HeaderMenu(props: Props) {
  const {
    visible,
    closed,
    navVariant,
    onMenuButtonClick,
    getRouteVariant,
    generateNavigationClassName,
  } = useHeaderMenu();

  return (
    <div className={block()}>
      <button
        className={generateNavigationClassName(button())}
        onClick={onMenuButtonClick}
      >
        <MenuIcon className={generateNavigationClassName()} />
      </button>
      {!visible && closed ? null : (
        <nav
          className={generateNavigationClassName(
            nav({
              variant: navVariant,
            }),
          )}
        >
          <ul className={generateNavigationClassName(ul())}>
            <li className={generateNavigationClassName()}>
              <Link href={'/'}>
                <a
                  className={generateNavigationClassName(
                    anchor({ variant: getRouteVariant('/') }),
                  )}
                >
                  포스트
                </a>
              </Link>
            </li>
            <li className={generateNavigationClassName()}>
              <Link href={'/info'}>
                <a
                  className={generateNavigationClassName(
                    anchor({
                      variant: getRouteVariant('/info'),
                    }),
                  )}
                >
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
  color: '$gray12',
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
