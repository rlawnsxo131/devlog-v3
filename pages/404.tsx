import ErrorScreen from '@/components/error/ErrorScreen';

interface Props {}

function NotFoundPage(props: Props) {
  return <ErrorScreen type="NotFound" />;
}

export default NotFoundPage;
