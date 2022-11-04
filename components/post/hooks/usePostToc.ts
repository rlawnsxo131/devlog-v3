import { useDeferredValue, useEffect, useState } from 'react';

import constants from '@/constants';

interface Toc {
  id: string;
  text: string;
  level: number;
  styleObj: Record<string, string>;
}

export default function usePostToc() {
  const [tocs, setTocs] = useState<Toc[] | null>(null);
  const [activeTocId, setActiveTocId] = useState('');
  const deferrdActiveTocId = useDeferredValue(activeTocId);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { id } = e.currentTarget.dataset;
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
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].tagName.match(/H([1-5])/)) {
        const textContent = nodes[i].textContent;
        if (
          textContent.replace(/(\s*)/g, '').toUpperCase() !==
          constants.MARKDOWN_TABLE_OF_CONTENTS
        ) {
          intersectionObserver.observe(nodes[i]);
          const level = parseInt(nodes[i].tagName.replace('H', ''), 10);
          tocs.push({
            id: nodes[i].id,
            text: nodes[i].textContent,
            level: level,
            styleObj: {
              paddingLeft: `${(level - 1) * 1}rem`,
            },
          });
        }
      }
    }
    setTocs(tocs);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [setTocs, setActiveTocId]);

  return {
    tocs,
    deferrdActiveTocId,
    handleTocClick,
  };
}
