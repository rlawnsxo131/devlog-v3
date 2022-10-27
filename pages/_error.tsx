import { ErrorScreen } from '@/components/error';

interface Props {}

function ErrorPage(props: Props) {
  return <ErrorScreen type="InternalServerError" />;
}

export default ErrorPage;
