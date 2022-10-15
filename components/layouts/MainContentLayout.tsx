import { css } from '@/styles/_stitches.config';

interface Props {
  children: React.ReactNode;
}

function MainContentLayout({ children }: Props) {
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
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '768px',
});

export default MainContentLayout;
