import useRoutePush from '@/hooks/useRoutePush';

export default function useGoHomeButton() {
  const push = useRoutePush();

  const handleClick = () => {
    push('/');
  };

  return {
    handleClick,
  };
}
