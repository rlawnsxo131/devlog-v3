import { useCallback } from 'react';
import { useThemeActions, useThemeState } from '@/store/themeStore';

export default function useThemeButton() {
  const theme = useThemeState();
  const { setLightTheme, setDarkTheme } = useThemeActions();

  const onClick = useCallback(() => {
    if (theme === 'light') {
      setDarkTheme();
      return;
    }
    setLightTheme();
  }, [theme, setLightTheme, setDarkTheme]);

  return {
    theme,
    onClick,
  };
}
