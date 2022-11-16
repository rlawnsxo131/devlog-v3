import useThemeEffect from '@/hooks/theme/useThemeEffect';
import useUnhandledRejectionEffect from '@/hooks/useUnhandledRejectionEffect';

interface Props {
  children: React.ReactNode;
}

function Core({ children }: Props) {
  useThemeEffect();
  useUnhandledRejectionEffect();

  return <>{children}</>;
}

export default Core;
