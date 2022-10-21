import { useEffect } from 'react';
import { keys } from '@/constants';
import { Storage } from '@/lib';
import { useGlobalContextDispatch } from '@/contexts/GlobalContext';

export default function useThemeEffect() {
  const dispatch = useGlobalContextDispatch();

  useEffect(() => {
    const storageTheme = Storage.getItem(keys.ThemeKey);
    if (storageTheme) {
      if (storageTheme === 'dark') {
        dispatch({
          type: 'SET_DARK_THEME',
        });
      } else {
        dispatch({
          type: 'SET_LIGHT_THEME',
        });
      }
      return;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch({
        type: 'SET_DARK_THEME',
      });
      return;
    }
    dispatch({
      type: 'SET_LIGHT_THEME',
    });
  }, [dispatch]);
}
