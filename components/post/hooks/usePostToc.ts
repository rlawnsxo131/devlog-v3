import constants from '@/constants';
import { useEffect, useState } from 'react';

export default function usePostToc() {
  const [headings, setHeadings] = useState<
    {
      id: string;
      text: string;
      level: number;
      styleObj: Record<string, string>;
    }[]
  >([]);
  const [activeHeading, setActiveHeading] = useState<string>('');

  const handleActiveHeading = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { id } = e.currentTarget.dataset;
    setActiveHeading(id);
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
      { threshold: 1, rootMargin: '60px 0px 0px 0px' },
    );

    const nodes = document.querySelectorAll(
      '.mdx-remote-wrapper h1, h2, h3, h4, h5',
    );
    nodes.forEach((el) => {
      if (el.tagName.match(/H([1-5])/)) {
        const textContent = el.textContent;
        if (textContent !== constants.MARKDOWN_TABLE_OF_CONTENTS) {
          intersectionObserver.observe(el);
          const level = parseInt(el.tagName.replace('H', ''), 10);
          setHeadings((prev) => [
            ...prev,
            {
              id: el.id,
              text: el.textContent,
              level: level,
              styleObj: {
                paddingLeft: `${(level - 1) * 1}rem`,
              },
            },
          ]);
        }
      }
    });

    return () => {
      setHeadings([]);
      intersectionObserver.disconnect();
    };
  }, [setHeadings]);

  return {
    headings,
    activeHeading,
    handleActiveHeading,
  };
}
