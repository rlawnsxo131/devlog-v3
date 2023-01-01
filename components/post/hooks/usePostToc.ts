import type { MouseEvent } from 'react';
import { useDeferredValue, useEffect, useState } from 'react';

import constants from '@/constants';
import useRoutePathname from '@/hooks/useRoutePathname';
import useRouteQuery from '@/hooks/useRouteQuery';

interface Toc {
  id: string;
  text: string;
  level: number;
  styleObj: Record<string, string>;
}

export default function usePostToc() {
  const { slug } = useRouteQuery();
  const [tocs, setTocs] = useState<Toc[] | null>(null);
  const [activeTocId, setActiveTocId] = useState('');
  const deferrdActiveTocId = useDeferredValue(activeTocId);

  const handleTocClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const { id } = e.currentTarget.dataset;
    if (!id) return;
    setActiveTocId(id);
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      const activeToc = entries.find((entry) => entry.isIntersecting);
      if (!activeToc) return;
      setActiveTocId(activeToc.target.id);
    });

    const nodes = document.querySelectorAll(
      '.mdx-remote-wrapper h1, h2, h3, h4, h5',
    );
    const tocs: Toc[] = [];
    nodes.forEach((node) => {
      if (!node.tagName.match(/H([1-5])/)) return;
      if (!node.textContent) return;

      const textContent = node.textContent;
      const upperCaseTextContent = textContent
        .replace(/(\s*)/g, '')
        .toUpperCase();

      if (upperCaseTextContent !== constants.MARKDOWN_TABLE_OF_CONTENTS) {
        intersectionObserver.observe(node);
        const level = parseInt(node.tagName.replace('H', ''), 10);
        tocs.push({
          id: node.id,
          text: textContent,
          level: level,
          styleObj: {
            paddingLeft: `${(level - 1) * 1}rem`,
          },
        });
      }
    });
    setTocs(tocs);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [setTocs, setActiveTocId, slug]);

  return {
    tocs,
    deferrdActiveTocId,
    handleTocClick,
  };
}
