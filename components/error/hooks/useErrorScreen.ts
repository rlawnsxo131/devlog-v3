import { useMemo } from 'react';

import useRoutePush from '@/hooks/useRoutePush';

interface UseErrorScreenParams {
  onResolveError?: () => void;
}

export default function useErrorScreen({
  onResolveError,
}: UseErrorScreenParams) {
  const push = useRoutePush();

  const buttonText = useMemo(() => {
    if (onResolveError) return '새로고침';
    return '홈으로';
  }, [onResolveError]);

  const handleResolveError = () => {
    if (onResolveError) {
      onResolveError();
      return;
    }
    push('/');
  };

  return {
    buttonText,
    handleResolveError,
  };
}
