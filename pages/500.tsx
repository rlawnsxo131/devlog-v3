import { ErrorScreen } from '@/components/error';

interface Props {}

function InternalServerErrorPage(props: Props) {
  return <ErrorScreen type="InternalServerError" />;
}

export default InternalServerErrorPage;
