import useThemeEffect from '@/hooks/theme/useThemeEffect';

interface Props {
  children: React.ReactNode;
}

function Core({ children }: Props) {
  useThemeEffect();

  return <>{children}</>;
}

export default Core;
