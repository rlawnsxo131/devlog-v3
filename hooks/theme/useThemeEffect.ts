import { useEffect } from 'react';
import { Storage } from '@/lib';
import { useGlobalContextDispatch } from '@/contexts/GlobalContext';
import constants from '@/constants';

export default function useThemeEffect() {
  const dispatch = useGlobalContextDispatch();

  useEffect(() => {
    const storageTheme = Storage.getItem(constants.THEME_KEY);
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
