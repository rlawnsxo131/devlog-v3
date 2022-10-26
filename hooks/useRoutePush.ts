import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function useRoutePush() {
  const router = useRouter();

  return useCallback(
    (path: string) => {
      return router.push(path);
    },
    [router],
  );
}
