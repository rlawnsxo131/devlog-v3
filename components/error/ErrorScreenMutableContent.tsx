import { ErrorType } from '@/types';
import {
  InternalServerErrorBackground,
  NotFoundBackground,
} from '../img/background';

interface Props {
  type: ErrorType;
}

function ErrorScreenMutableContent({ type }: Props) {
  if (type === 'NotFound') {
    return (
      <>
        <NotFoundBackground />
        <h1>404 Not Found !</h1>
      </>
    );
  }
  return (
    <>
      <InternalServerErrorBackground />
      <h1>Internal Server Error !</h1>
    </>
  );
}

export default ErrorScreenMutableContent;
