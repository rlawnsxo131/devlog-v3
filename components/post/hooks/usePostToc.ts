import { useEffect, useState } from 'react';
import constants from '@/constants';
import { utils } from '@/lib';
import { throttle } from 'throttle-debounce';

interface Toc {
  id: string;
  text: string;
  level: number;
  yPosition: number;
  styleObj: Record<string, string>;
}

/**
 * InterSectionObserver 보다 이게 더 정확한듯
 */
export default function usePostToc() {
  const [tocs, setTocs] = useState<Toc[] | null>(null);
  const [activeTocId, setActiveTocId] = useState('');

  const handleClickToc = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { id } = e.currentTarget.dataset;
    setActiveTocId(id);
  };

  useEffect(() => {
    const nodes = document.querySelectorAll(
      '.mdx-remote-wrapper h1, h2, h3, h4, h5',
    );
    const tocs: Toc[] = [];
    const scrollTop = utils.getScrollTop();
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].tagName.match(/H([1-5])/)) {
        const textContent = nodes[i].textContent;
        if (
          textContent.replace(/(\s*)/g, '').toUpperCase() !==
          constants.MARKDOWN_TABLE_OF_CONTENTS
        ) {
          const level = parseInt(nodes[i].tagName.replace('H', ''), 10);
          tocs.push({
            id: nodes[i].id,
            text: nodes[i].textContent,
            level: level,
            yPosition: parseInt(
              `${nodes[i].getBoundingClientRect().top + scrollTop}`,
              10,
            ),
            styleObj: {
              paddingLeft: `${(level - 1) * 1}rem`,
            },
          });
        }
      }
    }
    setTocs(tocs);
  }, [setTocs]);

  useEffect(() => {
    const onScroll = throttle(50, () => {
      if (!tocs) return;
      const scrollTop = utils.getScrollTop();
      const currentToc = [...tocs].reverse().find((toc) => {
        return scrollTop >= toc.yPosition;
      });
      if (!currentToc) return;
      setActiveTocId(currentToc.id);
    });

    globalThis.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [tocs, setActiveTocId]);

  return {
    tocs,
    activeTocId,
    handleClickToc,
  };
}
