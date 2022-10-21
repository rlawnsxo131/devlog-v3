import { useEffect, useState } from 'react';

interface UseIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

export default function useIntersectionObserver({
  root,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
}: UseIntersectionObserverProps) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { root, rootMargin, threshold },
    );
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
}

/**
 * const onIntersect: IntersectionObserverCallback = ([
    { isIntersecting, target },
   ]) => {
     console.log(`감지결과 : ${isIntersecting}`);
   };
 */
