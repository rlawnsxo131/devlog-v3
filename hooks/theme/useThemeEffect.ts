import { useEffect } from 'react';
import { keys } from '@/constant';
import { Storage } from '@/lib';
import useThemeStore from './_useThemeStore';
import shallow from 'zustand/shallow';

export default function useThemeEffect() {
  const { setDarkTheme, setLightTheme } = useThemeStore(
    (store) => ({
      setDarkTheme: store.setDarkTheme,
      setLightTheme: store.setLightTheme,
    }),
    shallow,
  );

  useEffect(() => {
    const storageTheme = Storage.getItem(keys.ThemeKey);
    if (storageTheme) {
      if (storageTheme === 'dark') {
        setDarkTheme();
      } else {
        setLightTheme();
      }
      return;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkTheme();
      return;
    }
    setLightTheme();
  }, [setDarkTheme, setLightTheme]);
}
