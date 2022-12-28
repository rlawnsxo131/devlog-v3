import type { ImageProps } from 'next/image';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';

export default function useNextImageLoading() {
  const [isLoadingComplete, setIsLoadingImageComplete] = useState(false);

  const onLoadingComplete: ImageProps['onLoadingComplete'] = (_) => {
    setIsLoadingImageComplete(true);
  };

  const onError = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsLoadingImageComplete(true);
  };

  return {
    isLoadingComplete,
    onLoadingComplete,
    onError,
  };
}
