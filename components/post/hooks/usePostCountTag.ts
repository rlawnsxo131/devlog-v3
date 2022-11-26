import type { MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';

interface UsePostCountTagParams {
  isActive: boolean;
  scrollToCenter: (ref: MutableRefObject<HTMLAnchorElement | null>) => void;
}

export default function usePostCountTag({
  isActive,
  scrollToCenter,
}: UsePostCountTagParams) {
  const tagRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (isActive) {
      scrollToCenter(tagRef);
    }
  }, [isActive, tagRef, scrollToCenter]);

  return {
    tagRef,
  };
}
