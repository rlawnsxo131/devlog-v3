import { css } from '@/styles/_stitches.config';

import usePostComments from './hooks/usePostComments';

interface Props {}

function PostComments(props: Props) {
  const { ref } = usePostComments();

  return <div className={block()} ref={ref}></div>;
}

const block = css({
  marginTop: '2.25rem',
  '& .utterances': {
    width: '100%',
  },
});

export default PostComments;
