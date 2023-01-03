import type { BaseSyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

import useRefEffect from '@/hooks/useRefEffect';
import useRoutePathname from '@/hooks/useRoutePathname';
import useTransitionTimeoutEffect from '@/hooks/useTransitionTimeoutEffect';

export default function useHeaderMenu() {
  const routePathname = useRoutePathname();
  const [navVisible, setNavVisible] = useState(false);
  const navClosed = useTransitionTimeoutEffect({ visible: navVisible });
  const navVariant = useMemo<'enabled' | 'disabled'>(() => {
    return navVisible ? 'enabled' : 'disabled';
  }, [navVisible]);

  const parentRef = useRefEffect(
    (div: HTMLDivElement) => {
      const handler = (e: BaseSyntheticEvent | MouseEvent | TouchEvent) => {
        if (div.contains(e.target)) return;
        setNavVisible(false);
      };

      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);

      return () => {
        document.removeEventListener('mousedown', handler);
        document.removeEventListener('touchstart', handler);
      };
    },
    [setNavVisible],
  );

  const handleNavVisible = () => {
    setNavVisible((prev) => !prev);
  };

  useEffect(() => {
    setNavVisible(false);
  }, [routePathname]);

  return {
    parentRef,
    navVisible,
    navClosed,
    navVariant,
    handleNavVisible,
    routePathname,
  };
}
