import useTransitionTimeoutEffect from '@/hooks/useTransitionTimeoutEffect';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface UseHeaderMenuNavigation {
  visible: boolean;
}

export default function useHeaderMenuNavigation({
  visible,
}: UseHeaderMenuNavigation) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const closed = useTransitionTimeoutEffect({ visible });

  const navVariant = useMemo<'enabled' | 'disabled'>(() => {
    return visible ? 'enabled' : 'disabled';
  }, [visible]);

  const getRouteVariant = (path: string) => {
    return currentRoute === path ? 'active' : 'default';
  };

  return {
    closed,
    navVariant,
    getRouteVariant,
  };
}
