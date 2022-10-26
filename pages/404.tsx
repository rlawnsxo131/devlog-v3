import { css } from '@/styles/_stitches.config';
import { NotFoundBackground } from '@/components/img/background';
import Button from '@/components/system/Button';
import useRoutePush from '@/hooks/useRoutePush';

interface Props {}

function NotFoundPage(props: Props) {
  const push = useRoutePush();
  const handleClick = () => {
    push('/');
  };

  return (
    <div className={block()}>
      <NotFoundBackground />
      <h1>404 Not Found !</h1>
      <div className="not-found-button-block">
        <Button variant={{ size: 'large' }} onClick={handleClick}>
          홈으로
        </Button>
      </div>
    </div>
  );
}

const block = css({
  height: 'calc(100% - 6.225rem)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& svg': {
    width: '20rem',
    height: 'auto',
  },
  '& h1': {
    padding: '0 1rem',
    margin: '2rem 0 0 0',
    whiteSpace: 'pre',
    textAlign: 'center',
    lineHeight: '1.5',
    fontSize: '2.5rem',
    fontWeight: '500',
  },
  '& .not-found-button-block': {
    marginTop: '2rem',
  },
});

export default NotFoundPage;
