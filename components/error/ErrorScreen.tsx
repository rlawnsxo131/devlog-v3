import useRoutePush from '@/hooks/useRoutePush';
import { css } from '@/styles/_stitches.config';
import type { ErrorType } from '@/types';

import ErrorResolveButton from './ErrorResolveButton';
import ErrorScreenMutableContent from './ErrorScreenMutableContent';
import useErrorScreen from './hooks/useErrorScreen';

interface Props {
  type: ErrorType;
  onResolveErrorAndRefresh?: () => void;
}

function ErrorScreen({ type, onResolveErrorAndRefresh }: Props) {
  const { buttonText, handleResolveErrorAndRefresh } = useErrorScreen({
    onResolveErrorAndRefresh,
  });

  return (
    <div className={block()}>
      <ErrorScreenMutableContent type={type} />
      <div className="err-screen-button-block">
        <ErrorResolveButton onClick={handleResolveErrorAndRefresh}>
          {buttonText}
        </ErrorResolveButton>
      </div>
    </div>
  );
}

const block = css({
  display: 'flex',
  flex: '1 1 100%',
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
    fontSize: '1.825rem',
    fontWeight: '500',
  },
  '& .err-screen-button-block': {
    marginTop: '2rem',
  },
});

export default ErrorScreen;
