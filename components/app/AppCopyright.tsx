import { css } from '@/styles/_stitches.config';

interface Props {}

function AppCopyright(props: Props) {
  return <div className={block()}>Juntae(john) Kim · © 2020 · DevLog</div>;
}

const block = css({
  marginTop: '3rem',
  padding: '1.5rem 0',
  fontSize: '1rem',
  color: '$text-sub',
  textAlign: 'center',
});

export default AppCopyright;
