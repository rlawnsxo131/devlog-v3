import Link from 'next/link';
import type { MutableRefObject } from 'react';

import { css } from '@/styles/_stitches.config';
import {
  contentHoverBorderAndBackgroundBasicStyle,
  linkTagBasicStyle,
} from '@/styles/basicStyle';

import usePostCountTag from './hooks/usePostCountTag';

interface Props {
  title: string;
  path: string;
  count: number;
  isActive: boolean;
  scrollToCenter: (ref: MutableRefObject<HTMLAnchorElement | null>) => void;
}

function PostCountTag({ title, path, count, isActive, scrollToCenter }: Props) {
  const variant = isActive ? 'active' : 'default';
  const { tagRef } = usePostCountTag({
    isActive,
    scrollToCenter,
  });

  return (
    <Link href={path}>
      <a ref={tagRef} className={anchor({ variant })}>
        {title}
        <span>{count}</span>
      </a>
    </Link>
  );
}

const anchor = css({
  ...linkTagBasicStyle,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'space-between',
  '& span': {
    color: '$cyan9',
    marginLeft: '0.35rem',
  },
  variants: {
    variant: {
      default: {
        ...contentHoverBorderAndBackgroundBasicStyle,
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

export default PostCountTag;
