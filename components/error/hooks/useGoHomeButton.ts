import useRoutePush from '@/hooks/useRoutePush';
import { useCallback } from 'react';

export default function useGoHomeButton() {
  const push = useRoutePush();

  const handleClick = () => {
    push('/');
  };

  return {
    handleClick,
  };
}
