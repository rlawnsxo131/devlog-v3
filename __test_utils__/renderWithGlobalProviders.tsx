import { render, renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';

import { GlobalContextProvider } from '@/contexts/GlobalContext';

function GlobalHocWrapper({ children }: PropsWithChildren): JSX.Element {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
}

export function renderWithGlobalHoc(ui: React.ReactElement) {
  return render(ui, { wrapper: GlobalHocWrapper });
}

export function renderHookWithGlobalProvider<T>(hook: () => T) {
  return renderHook(() => hook(), { wrapper: GlobalHocWrapper });
}
