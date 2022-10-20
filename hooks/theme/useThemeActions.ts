import { useGlobalContextDispatch } from 'contexts/GlobalContext';
import { useMemo } from 'react';

export default function useThemeActions() {
  const dispatch = useGlobalContextDispatch();

  return useMemo(
    () => ({
      setLightTheme() {
        dispatch({
          type: 'SET_LIGHT_THEME',
        });
      },
      setDarkTheme() {
        dispatch({
          type: 'SET_DARK_THEME',
        });
      },
    }),
    [dispatch],
  );
}
