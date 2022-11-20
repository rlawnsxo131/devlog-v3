import type { ImageProps } from 'next/image';
import { useState } from 'react';

export default function useImageOnLoadingComplete() {
  const [isLoadingComplete, setIsLoadingImageComplete] = useState(false);

  const onLoadingComplete: ImageProps['onLoadingComplete'] = (_) => {
    setIsLoadingImageComplete(true);
  };

  return {
    isLoadingComplete,
    onLoadingComplete,
  };
}
