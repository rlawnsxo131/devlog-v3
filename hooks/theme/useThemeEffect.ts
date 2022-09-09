import { useEffect } from 'react';
import { keys } from '@/constant';
import { Storage } from '@/lib';
import useThemeStore from './_useThemeStore';

export default function useThemeEffect() {
  const setDarkTheme = useThemeStore((store) => store.setDarkTheme);

  useEffect(() => {
    const storageTheme = Storage.getItem(keys.ThemeKey);
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (systemPrefersDark || storageTheme === 'dark') {
      setDarkTheme();
    }
  }, [setDarkTheme]);
}
