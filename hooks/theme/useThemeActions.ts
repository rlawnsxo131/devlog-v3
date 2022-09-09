import useThemeStore from './_useThemeStore';

export default function useThemeActions() {
  const { setLightTheme, setDarkTheme } = useThemeStore((store) => store);

  return {
    setLightTheme,
    setDarkTheme,
  };
}
