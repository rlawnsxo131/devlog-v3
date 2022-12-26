import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

import useRouteQuery from '@/hooks/useRouteQuery';
import { css } from '@/styles/_stitches.config';

/**
 * @TODO
 * 일단 임시방편임. 스크롤 처리 해야함.
 */
function AppMain({ children }: PropsWithChildren) {
  const { slug } = useRouteQuery();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (slug && containerRef.current) {
      containerRef.current.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [slug]);

  return (
    <main className={block()} ref={containerRef}>
      {children}
    </main>
  );
}

const block = css({
  flex: '1 1 100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflowY: 'auto',
  scrollBehavior: 'smooth',
});

export default AppMain;
