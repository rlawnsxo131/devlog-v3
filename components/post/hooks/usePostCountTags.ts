import type { MutableRefObject } from 'react';
import { useRef } from 'react';

export default function usePostCountTags() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToCenter = (tagRef: MutableRefObject<HTMLAnchorElement>) => {
    const { offsetWidth: tagWith } = tagRef.current;
    const { scrollLeft, offsetWidth: containerWidth } = containerRef.current;
    const tagLeft = tagRef.current.getBoundingClientRect().left;
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const refineLeft = tagLeft - containerLeft;
    const targetScollX =
      scrollLeft + refineLeft - containerWidth / 2 + tagWith / 2;

    containerRef.current.scroll({
      left: targetScollX,
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    containerRef,
    scrollToCenter,
  };
}
