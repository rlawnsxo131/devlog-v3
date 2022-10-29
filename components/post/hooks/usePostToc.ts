import { useEffect, useState } from 'react';
import constants from '@/constants';
import { utils } from '@/lib';

interface Heading {
  id: string;
  text: string;
  level: number;
  yPosition: number;
  styleObj: Record<string, string>;
}

/**
 * @TODO intersectionObserver 없애고 그냥 scroll event 로 처리할지 고민해보기
 */
export default function usePostToc() {
  const [headings, setHeadings] = useState<Heading[] | null>(null);
  const [activeHeading, setActiveHeading] = useState('');

  const handleClickToc = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { id, yPosition } = e.currentTarget.dataset;
    setActiveHeading(id);
    window.location.hash = `#${id}`;
    window.scrollTo(0, parseInt(yPosition, 10));
  };

  useEffect(() => {
    let direction = '';
    let prevYposition = 0;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (window.scrollY === 0 && prevYposition === 0) {
            return;
          } else if (window.scrollY > prevYposition) {
            direction = 'down';
          } else {
            direction = 'up';
          }

          if (
            (direction === 'down' && !entry.isIntersecting) ||
            (direction === 'up' && entry.isIntersecting)
          ) {
            setActiveHeading(entry.target.id);
          }

          prevYposition = window.scrollY;
        });
      },
      { threshold: 0.9, rootMargin: '64px' },
    );

    const nodes = document.querySelectorAll(
      '.mdx-remote-wrapper h1, h2, h3, h4, h5',
    );
    const headings: Heading[] = [];
    const scrollTop = utils.getScrollTop();
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].tagName.match(/H([1-5])/)) {
        const textContent = nodes[i].textContent;
        if (textContent !== constants.MARKDOWN_TABLE_OF_CONTENTS) {
          intersectionObserver.observe(nodes[i]);
          const level = parseInt(nodes[i].tagName.replace('H', ''), 10);
          headings.push({
            id: nodes[i].id,
            text: nodes[i].textContent,
            level: level,
            yPosition: parseInt(
              `${nodes[i].getBoundingClientRect().top + scrollTop - 80}`,
              10,
            ),
            styleObj: {
              paddingLeft: `${(level - 1) * 1}rem`,
            },
          });
        }
      }
    }
    setHeadings(headings);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [setHeadings, setActiveHeading]);

  return {
    headings,
    activeHeading,
    handleClickToc,
  };
}
