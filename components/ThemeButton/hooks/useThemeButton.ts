import { useThemeActions, useThemeState } from '@/store/themeStore';

export default function useThemeButton() {
  const theme = useThemeState();
  const { setLightTheme, setDarkTheme } = useThemeActions();

  const onClick = () => {
    if (theme === 'light') {
      setDarkTheme();
      return;
    }
    setLightTheme();
  };

  return {
    theme,
    onClick,
  };
}
