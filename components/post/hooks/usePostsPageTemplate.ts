import { useRef } from 'react';

import { SiteConfig } from '@/config';
import useToast from '@/hooks/useToast';
import { sharePost } from '@/lib/post';

export default function usePostsPageTemplate() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { info, error } = useToast();

  const handleCopyToClipboard = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const { title, description, slug } = e.currentTarget.dataset;
    const url = `${SiteConfig.url}/post/${slug}`;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      sharePost(
        {
          title,
          text: description,
          url,
        },
        () => {
          info('포스트 주소가 복사 되었습니다.');
        },
      ).catch((_) => {
        error('알 수 없는 에러가 발생했습니다.');
      });
    }, 250);
  };

  return {
    handleCopyToClipboard,
  };
}
