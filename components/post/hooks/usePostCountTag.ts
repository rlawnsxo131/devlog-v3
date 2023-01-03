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
    if (!isActive) return;
    if (!tagRef.current) return;
    scrollToCenter(tagRef);
  }, [isActive, scrollToCenter, tagRef]);

  return {
    tagRef,
  };
}
