import { format } from 'date-fns';

import constants from '@/constants';
import { Storage } from '@/lib';
import type { Theme } from '@/types';

export function setThemeForDocumentAndStorage(theme: Theme) {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    Storage.setItem(constants.THEME_KEY, 'light');
    return;
  }
  document.documentElement.classList.add('dark');
  Storage.setItem(constants.THEME_KEY, 'dark');
}

export function formatDate(date: string) {
  const d = new Date(date);
  return format(d, 'yyyy-MM-dd');
}

export function getAnchorVariant(standardValue: string, currentValue: string) {
  return standardValue === currentValue ? 'active' : 'default';
}
