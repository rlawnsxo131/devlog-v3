import Link from 'next/link';

import useRoutePathname from '@/hooks/useRoutePathname';
import { utils } from '@/lib';
import { css } from '@/styles/_stitches.config';

import { HomeIcon, InfoIcon, TagIcon } from '../img/icons';
import useGetPostRouteVariant from './hooks/useGetPostRouteVariant';

interface Props {}

function FooterMobileMenu(props: Props) {
  const routePathname = useRoutePathname();
  const postPathVariant = useGetPostRouteVariant(routePathname);

  return (
    <div className={block()}>
      <Link href="/">
        <a
          className={anchor({
            variant: postPathVariant,
          })}
        >
          <HomeIcon />
        </a>
      </Link>
      <Link href="/tags">
        <a
          className={anchor({
            variant: utils.getAnchorVariant('/tags', routePathname),
          })}
        >
          <TagIcon />
        </a>
      </Link>
      <Link href="/info">
        <a
          className={anchor({
            variant: utils.getAnchorVariant('/info', routePathname),
          })}
        >
          <InfoIcon />
        </a>
      </Link>
    </div>
  );
}

const block = css({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  background: '$bg',
  borderTop: '1px solid $border',
  '@xs4': {
    display: 'none',
  },
});

const anchor = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '3.5rem',
  padding: '0 1.5rem',
  '& svg': {
    width: '32px',
    height: '32px',
  },
  variants: {
    variant: {
      default: {
        '& svg': {
          fill: '$gray9',
        },
      },
      active: {
        fill: '$cyan9',
      },
    },
  },
});

export default FooterMobileMenu;
