import { useRouter } from 'next/router';
import { useEffect } from 'react';

import constants from '@/constants';
import { gTag } from '@/lib';

export default function useGTagEffect() {
  const router = useRouter();

  useEffect(() => {
    if (!constants.IS_PRODUCTION) return;
    const handleRouteChange = (url: string) => {
      gTag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}
