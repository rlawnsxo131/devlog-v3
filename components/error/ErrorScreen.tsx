import { css } from '@/styles/_stitches.config';
import type { ErrorType } from '@/types';

import ErrorGoHomeButton from './ErrorGoHomeButton';
import ErrorScreenMutableContent from './ErrorScreenMutableContent';

interface Props {
  type: ErrorType;
}

function ErrorScreen({ type }: Props) {
  return (
    <div className={block()}>
      <ErrorScreenMutableContent type={type} />
      <div className="not-found-button-block">
        <ErrorGoHomeButton>홈으로</ErrorGoHomeButton>
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

export default ErrorScreen;
