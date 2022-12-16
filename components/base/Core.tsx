import type { PropsWithChildren } from 'react';

import useThemeEffect from '@/hooks/theme/useThemeEffect';
import useUnhandledRejectionEffect from '@/hooks/useUnhandledRejectionEffect';

function Core({ children }: PropsWithChildren) {
  useThemeEffect();
  useUnhandledRejectionEffect();

  return <>{children}</>;
}

export default Core;
