import { useEffect, useMemo, useState } from 'react';
import useRoutePathname from '@/hooks/useRoutePathname';
import useTransitionTimeoutEffect from '@/hooks/useTransitionTimeoutEffect';
import { headerNavigationClassName } from '@/styles/classNames';

export default function useHeaderMenu() {
  const routePathname = useRoutePathname();
  const [navVisible, setNavVisible] = useState(false);
  const navClosed = useTransitionTimeoutEffect({ visible: navVisible });

  const navVariant = useMemo<'enabled' | 'disabled'>(() => {
    return navVisible ? 'enabled' : 'disabled';
  }, [navVisible]);

  const handleNavVisible = () => {
    setNavVisible((prev) => !prev);
  };

  /**
   * get or generate value functions
   */
  const getRouteVariant = (path: string) => {
    return routePathname === path ? 'active' : 'default';
  };

  const generateNavigationClassName = (className?: string) => {
    if (className) {
      return `${className} ${headerNavigationClassName}`;
    }
    return headerNavigationClassName;
  };

  useEffect(() => {
    setNavVisible(false);
  }, [routePathname]);

  useEffect(() => {
    function onMouseOutsideClick(e) {
      const regex = new RegExp(headerNavigationClassName, 'g');
      const className = e.target.className;
      const svgBaseVal = className.baseVal;
      if (regex.test(className) || regex.test(svgBaseVal)) return;
      setNavVisible(false);
    }

    globalThis.addEventListener('click', onMouseOutsideClick);

    return () => {
      globalThis.removeEventListener('click', onMouseOutsideClick);
    };
  }, []);

  return {
    navVisible,
    navClosed,
    navVariant,
    handleNavVisible,
    getRouteVariant,
    generateNavigationClassName,
  };
}
