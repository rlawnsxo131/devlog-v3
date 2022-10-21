import { useState } from 'react';

export default function useImageOnLoadingComplete() {
  const [isLoadingComplete, setIsLoadingImageComplete] = useState(false);

  const onLoadingComplete = ({ naturalHeight, naturalWidth }) => {
    if (naturalHeight && naturalWidth) {
      setIsLoadingImageComplete(true);
    }
  };

  return {
    isLoadingComplete,
    onLoadingComplete,
  };
}
