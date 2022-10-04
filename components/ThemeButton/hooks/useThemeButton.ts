import useThemeState from '@/hooks/theme/useThemeState';
import useThemeActions from '@/hooks/theme/useThemeActions';

export default function useThemeButton() {
  const theme = useThemeState();
  const { setLightTheme, setDarkTheme } = useThemeActions();

  const handleTheme = () => {
    if (theme === 'light') {
      setDarkTheme();
      return;
    }
    setLightTheme();
  };

  return {
    theme,
    handleTheme,
  };
}
