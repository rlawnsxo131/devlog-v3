import type { ImageProps } from 'next/image';
import { useCallback, useState } from 'react';

export default function useImageOnLoadingComplete() {
  const [isLoadingComplete, setIsLoadingImageComplete] = useState(false);

  const onLoadingComplete: ImageProps['onLoadingComplete'] = useCallback(
    (_) => {
      setIsLoadingImageComplete(true);
    },
    [setIsLoadingImageComplete],
  );

  return {
    isLoadingComplete,
    onLoadingComplete,
  };
}
