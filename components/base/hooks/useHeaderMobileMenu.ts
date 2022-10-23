import { useEffect, useMemo, useRef, useState } from 'react';
import useTransitionTimeoutEffect from '@/hooks/useTransitionTimeoutEffect';
import useRoutePathname from '@/hooks/useRoutePathname';

export default function useHeaderMenu() {
  const routePathname = useRoutePathname();
  const parentRef = useRef<HTMLDivElement>(null);
  const [navVisible, setNavVisible] = useState(false);
  const navClosed = useTransitionTimeoutEffect({ visible: navVisible });

  const navVariant = useMemo<'enabled' | 'disabled'>(() => {
    return navVisible ? 'enabled' : 'disabled';
  }, [navVisible]);

  const handleNavVisible = () => {
    setNavVisible((prev) => !prev);
  };

  useEffect(() => {
    setNavVisible(false);
  }, [routePathname]);

  useEffect(() => {
    function listener(e: React.BaseSyntheticEvent | MouseEvent | TouchEvent) {
      if (!parentRef.current) return;
      if (!parentRef.current.contains(e.target)) {
        setNavVisible(false);
      }
    }

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [parentRef]);

  return {
    parentRef,
    navVisible,
    navClosed,
    navVariant,
    handleNavVisible,
    routePathname,
  };
}
