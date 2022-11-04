import { css } from '@/styles/_stitches.config';

interface Props {}

function AppCopyright(props: Props) {
  return <div className={block()}>Juntae(john) Kim · © 2020 · DevLog</div>;
}

const block = css({
  alignSelf: 'flex-end',
  color: '$text-sub',
  fontSize: '1rem',
  textAlign: 'center',
  padding: '1.5rem 0',
});

export default AppCopyright;
