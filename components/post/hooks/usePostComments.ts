import { useEffect, useRef } from 'react';

import constants from '@/constants';
import useThemeState from '@/hooks/theme/useThemeState';
import { Storage } from '@/lib';

export default function usePostComments() {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useThemeState() === 'dark' ? 'github-dark' : 'github-light';

  useEffect(() => {
    if (!ref.current) return;
    const theme =
      Storage.getItem(constants.THEME_KEY) === 'dark'
        ? 'github-dark'
        : 'github-light';
    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://utteranc.es/client.js';
    scriptElem.async = true;
    scriptElem.setAttribute('repo', 'rlawnsxo131/devlog-v3');
    scriptElem.setAttribute('issue-term', 'pathname');
    scriptElem.setAttribute('theme', theme);
    scriptElem.setAttribute('label', 'Comment');
    scriptElem.crossOrigin = 'anonymous';
    ref.current.appendChild(scriptElem);

    return () => {
      ref.current = null;
    };
  }, []);

  useEffect(() => {
    if (!document.querySelector('.utterances-frame')) return;

    const iframe =
      document.querySelector<HTMLIFrameElement>('.utterances-frame');

    if (iframe) {
      const message = {
        type: 'set-theme',
        theme: theme,
      };
      iframe.contentWindow?.postMessage(message, 'https://utteranc.es');
    }
  }, [theme]);

  return {
    ref,
  };
}
