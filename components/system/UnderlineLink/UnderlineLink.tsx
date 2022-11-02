import Link from 'next/link';
import { memo } from 'react';

import { css } from '@/styles/_stitches.config';
import { textUnderlineForHoverStyle } from '@/styles/basicStyle';

interface Props {
  href: string;
  children: React.ReactNode;
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
