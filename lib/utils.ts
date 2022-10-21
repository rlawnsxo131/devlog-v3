import { keys } from '@/constants';
import { Storage } from '@/lib';
import { Theme } from '@/types';
import { format } from 'date-fns';

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

export default function formatDate(date: string) {
  const d = new Date(date);
  return format(d, 'yyyy-MM-dd');
}
