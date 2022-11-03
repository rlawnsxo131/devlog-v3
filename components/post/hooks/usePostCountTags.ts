import type { MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';

export default function usePostCountTags() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToCenter = useCallback(
    (tabRef: MutableRefObject<HTMLAnchorElement>) => {
      const { offsetWidth: tagWith } = tabRef.current;
      const { scrollLeft, offsetWidth: containerWidth } = containerRef.current;
      const tabLeft = tabRef.current.getBoundingClientRect().left;
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const refineLeft = tabLeft - containerLeft;
      const targetScollX =
        scrollLeft + refineLeft - containerWidth / 2 + tagWith / 2;

      containerRef.current.scroll({
        left: targetScollX,
        top: 0,
        behavior: 'smooth',
      });
    },
    [containerRef],
  );

  return {
    containerRef,
    scrollToCenter,
  };
}
