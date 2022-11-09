import useRoutePush from '@/hooks/useRoutePush';

export default function useErrorGoHomeButton() {
  const push = useRoutePush();

  const handleClick = () => {
    push('/');
  };

  return {
    handleClick,
  };
}
