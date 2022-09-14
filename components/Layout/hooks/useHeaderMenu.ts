import { useEffect, useMemo, useState } from 'react';
import useRoutePathname from '@/hooks/useRoutePathname';
import useTransitionTimeoutEffect from '@/hooks/useTransitionTimeoutEffect';
import { headerNavigationClassName } from '@/styles/classNames';

export default function useHeaderMenu() {
  const routePathname = useRoutePathname();
  const [visible, setVisible] = useState(false);
  const closed = useTransitionTimeoutEffect({ visible });

  const navVariant = useMemo<'enabled' | 'disabled'>(() => {
    return visible ? 'enabled' : 'disabled';
  }, [visible]);

  const onMenuButtonClick = () => {
    setVisible((prev) => !prev);
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
    setVisible(false);
  }, [routePathname]);

  useEffect(() => {
    function onMouseOutsideClick(e) {
      const regex = new RegExp(headerNavigationClassName, 'g');
      const className = e.target.className;
      const svgBaseVal = className.baseVal;
      if (regex.test(className) || regex.test(svgBaseVal)) return;
      setVisible(false);
    }

    globalThis.addEventListener('click', onMouseOutsideClick);
    return () => {
      globalThis.removeEventListener('click', onMouseOutsideClick);
    };
  }, []);

  return {
    visible,
    closed,
    navVariant,
    onMenuButtonClick,
    getRouteVariant,
    generateNavigationClassName,
  };
}
