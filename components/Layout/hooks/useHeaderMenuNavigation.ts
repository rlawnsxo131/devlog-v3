import { useMemo } from 'react';
import useRoutePathname from '@/hooks/useRoutePathname';
import useTransitionTimeoutEffect from '@/hooks/useTransitionTimeoutEffect';

interface Params {
  visible: boolean;
}

export default function useHeaderMenuNavigation({ visible }: Params) {
  const routePathname = useRoutePathname();
  const closed = useTransitionTimeoutEffect({ visible });

  const navVariant = useMemo<'enabled' | 'disabled'>(() => {
    return visible ? 'enabled' : 'disabled';
  }, [visible]);

  const getRouteVariant = (path: string) => {
    return routePathname === path ? 'active' : 'default';
  };

  return {
    closed,
    navVariant,
    getRouteVariant,
  };
}
