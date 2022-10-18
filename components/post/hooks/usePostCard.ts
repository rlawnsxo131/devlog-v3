import { useState } from 'react';
import useToast from '@/hooks/useToast';
import { utils } from '@/lib';
import SharePostService from '@/services/SharePostService';

export default function usePostCard() {
  const { info } = useToast();
  const [isLoadingImageComplete, setIsLoadingImageComplete] = useState(false);

  const handleLoadingComplete = ({ naturalHeight, naturalWidth }) => {
    if (naturalHeight && naturalWidth) {
      setIsLoadingImageComplete(true);
    }
  };

  const handleCopyURLToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { title, description, slug } = e.currentTarget.dataset;
    const url = `${location.href}${slug}`;
    SharePostService.getInstance().excute(
      {
        title,
        text: description,
        url,
      },
      () => info('포스트 주소가 복사 되었습니다.'),
    );
  };

  return {
    isLoadingImageComplete,
    handleLoadingComplete,
    handleCopyURLToClipboard,
  };
}
