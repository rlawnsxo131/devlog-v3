import { useEffect, useMemo } from 'react';
import create from 'zustand';
import { Storage } from '@/lib';
import { keys } from '@/constants';
import { setThemeForDocumentAndStorage } from '@/lib/utils';

interface UseThemeStore {
  theme: Theme;
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

const useThemeStore = create<UseThemeStore>((set) => ({
  theme: 'light',
  setLightTheme: () => {
    set({ theme: 'light' });
    setThemeForDocumentAndStorage('light');
  },
  setDarkTheme: () => {
    set({ theme: 'dark' });
    setThemeForDocumentAndStorage('dark');
  },
}));

export function useThemeState() {
  return useThemeStore((store) => store.theme);
}

export function useThemeActions() {
  const { setLightTheme, setDarkTheme } = useThemeStore((store) => store);

  return useMemo(
    () => ({
      setLightTheme,
      setDarkTheme,
    }),
    [setLightTheme, setDarkTheme],
  );
}

export function useThemeEffect() {
  const { setDarkTheme } = useThemeStore((store) => store);

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
