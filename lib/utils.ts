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

export function optimizeImage(url: string, width?: number) {
  if (!url.includes('image-devlog.juntae.kim')) return url;
  if (url.includes('.svg')) return url;

  // cloudfront
  let replaced = url.replace(
    'http://image-devlog.juntae.kim',
    'https://image-devlog.juntae.kim',
  );

  if (!width) {
    return replaced;
  }

  return replaced.concat(`?w=${width}`);
}
