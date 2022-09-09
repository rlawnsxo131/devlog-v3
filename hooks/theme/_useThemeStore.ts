import { useEffect } from 'react';
import create from 'zustand';
import { Storage, utils } from '@/lib';
import { keys } from 'constant';

interface UseThemeStore {
  theme: Theme;
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

const useThemeStore = create<UseThemeStore>((set) => ({
  theme: 'light',
  setLightTheme: () => {
    set({ theme: 'light' });
    utils.setThemeForDocumentAndStorage('light');
  },
  setDarkTheme: () => {
    set({ theme: 'dark' });
    utils.setThemeForDocumentAndStorage('dark');
  },
}));

export default useThemeStore;
