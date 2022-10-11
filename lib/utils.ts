import { keys } from '@/constants';
import { Storage } from '@/lib';
import { Theme } from '@/types';

export function setThemeForDocumentAndStorage(theme: Theme) {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    Storage.setItem(keys.ThemeKey, 'light');
    return;
  }
  document.documentElement.classList.add('dark');
  Storage.setItem(keys.ThemeKey, 'dark');
}
