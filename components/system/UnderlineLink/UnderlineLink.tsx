import Link from 'next/link';
import type { ReactNode } from 'react';
import { memo } from 'react';

import { css } from '@/styles/_stitches.config';
import { textUnderlineForHoverStyle } from '@/styles/basicStyle';

interface Props {
  href: string;
  children: ReactNode;
}

function UnderlineLink({ children, href }: Props) {
  return (
    <Link href={href}>
      <a className={block()}>{children}</a>
    </Link>
  );
}

const block = css({
  ...textUnderlineForHoverStyle,
});

export default memo(UnderlineLink);
