import useToast from '@/hooks/useToast';
import { sharePost } from '@/lib';

export default function usePostCard() {
  const { info } = useToast();

  const handleCopyURLToClipboard = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const { title, description, slug } = e.currentTarget.dataset;
    const url = `${location.href}${slug}`;
    await sharePost(
      {
        title,
        text: description,
        url,
      },
      () => info('포스트 주소가 복사 되었습니다.'),
    );
  };

  return {
    handleCopyURLToClipboard,
  };
}
