import useThemeStore from './_useThemeStore';
import shallow from 'zustand/shallow';

export default function useThemeActions() {
  const { setLightTheme, setDarkTheme } = useThemeStore(
    (store) => ({
      setLightTheme: store.setLightTheme,
      setDarkTheme: store.setDarkTheme,
    }),
    shallow,
  );

  return {
    setLightTheme,
    setDarkTheme,
  };
}
