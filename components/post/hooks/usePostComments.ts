import { useEffect } from 'react';

import constants from '@/constants';
import useThemeState from '@/hooks/theme/useThemeState';
import useRefEffect from '@/hooks/useRefEffect';
import useRouteQuery from '@/hooks/useRouteQuery';
import { Storage } from '@/lib';

export default function usePostComments() {
  const { slug } = useRouteQuery();
  const theme = useThemeState() === 'dark' ? 'github-dark' : 'github-light';

  const ref = useRefEffect(
    (div: HTMLDivElement) => {
      if (document.querySelector('.utterances')) {
        div.replaceChildren();
      }

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
      div.appendChild(scriptElem);
    },
    [slug],
  );

  useEffect(() => {
    const iframe =
      document.querySelector<HTMLIFrameElement>('.utterances-frame');

    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      {
        type: 'set-theme',
        theme,
      },
      'https://utteranc.es',
    );
  }, [theme]);

  return {
    ref,
  };
}
