import Link from 'next/link';
import type { MutableRefObject } from 'react';

import { css } from '@/styles/_stitches.config';
import { linkTagBaseStyle } from '@/styles/basicStyle';

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

export default PostCountTag;
