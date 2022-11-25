import { useMemo } from 'react';

import useRoutePush from '@/hooks/useRoutePush';

interface UseErrorScreenParams {
  onResolveErrorAndRefresh?: () => void;
}

export default function useErrorScreen({
  onResolveErrorAndRefresh,
}: UseErrorScreenParams) {
  const push = useRoutePush();
  const buttonText = onResolveErrorAndRefresh ? '새로고침' : '홈으로';

  const handleResolveError = () => {
    if (onResolveErrorAndRefresh) {
      onResolveErrorAndRefresh();
      return;
    }
    push('/');
  };

  return {
    buttonText,
    handleResolveError,
  };
}
