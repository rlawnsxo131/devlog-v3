import useTransitionTimeoutEffect from '@/hooks/useTransitionTimeoutEffect';
import { useRouter } from 'next/router';

interface UseHeaderMenuNavigation {
  visible: boolean;
}

export default function useHeaderMenuNavigation({
  visible,
}: UseHeaderMenuNavigation) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const getRouteVariant = (path: string) => {
    return currentRoute === path ? 'active' : 'default';
  };
  const closed = useTransitionTimeoutEffect({ visible });

  return {
    getRouteVariant,
    closed,
  };
}
