import { css } from '@/styles/_stitches.config';

interface Props {
  children: React.ReactNode;
}

function FullHeightPageBox({ children }: Props) {
  return <div className={block()}>{children}</div>;
}

const block = css({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default FullHeightPageBox;
