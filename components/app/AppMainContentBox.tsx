import { css } from '@/styles/_stitches.config';

interface Props {
  children: React.ReactNode;
}

function AppMainContentBox({ children }: Props) {
  return (
    <div className={block()}>
      <section className={section()}>{children}</section>
    </div>
  );
}

const block = css({
  display: 'flex',
  justifyContent: 'center',
});

const section = css({
  position: 'relative',
  width: '100%',
  maxWidth: '768px',
  display: 'flex',
  flexDirection: 'column',
});

export default AppMainContentBox;
