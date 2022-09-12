import { classNames } from '@/constant';
import useRoutePathname from '@/hooks/useRoutePathname';
import { useCallback, useEffect, useState } from 'react';

export default function useHeaderMenu() {
  const routePathname = useRoutePathname();
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible((prev) => !prev);
  };

  const onMouseOutsideClick = useCallback((e) => {
    const regex = new RegExp(classNames.HeaderNavigationClassName, 'g');
    const className = e.target.className;
    const svgBaseVal = className.baseVal;
    if (regex.test(className) || regex.test(svgBaseVal)) return;
    setVisible(false);
  }, []);

  useEffect(() => {
    setVisible(false);
  }, [routePathname]);

  useEffect(() => {
    globalThis.addEventListener('click', onMouseOutsideClick);
    return () => {
      globalThis.removeEventListener('click', onMouseOutsideClick);
    };
  }, [onMouseOutsideClick]);

  return {
    visible,
    onClick,
  };
}
