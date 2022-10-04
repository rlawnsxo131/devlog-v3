import { useEffect, useMemo, useRef, useState } from 'react';
import useRoutePathname from '@/hooks/useRoutePathname';
import useTransitionTimeoutEffect from '@/hooks/useTransitionTimeoutEffect';

export default function useHeaderMenu() {
  const routePathname = useRoutePathname();
  const parentsRef = useRef<HTMLDivElement>(null);
  const [navVisible, setNavVisible] = useState(false);
  const navClosed = useTransitionTimeoutEffect({ visible: navVisible });

  const navVariant = useMemo<'enabled' | 'disabled'>(() => {
    return navVisible ? 'enabled' : 'disabled';
  }, [navVisible]);

  const handleNavVisible = () => {
    setNavVisible((prev) => !prev);
  };

  const getRouteVariant = (path: string) => {
    return routePathname === path ? 'active' : 'default';
  };

  useEffect(() => {
    setNavVisible(false);
  }, [routePathname]);

  useEffect(() => {
    function onMouseOutsideClick(e: React.BaseSyntheticEvent | MouseEvent) {
      if (parentsRef.current && !parentsRef.current.contains(e.target)) {
        setNavVisible(false);
      }
    }

    globalThis.addEventListener('click', onMouseOutsideClick, true);

    return () => {
      globalThis.removeEventListener('click', onMouseOutsideClick, true);
    };
  }, [parentsRef]);

  return {
    parentsRef,
    navVisible,
    navClosed,
    navVariant,
    handleNavVisible,
    getRouteVariant,
  };
}
