import { FullHeightPageBox } from '@/components/base';
import { ErrorScreen } from '@/components/error';

interface Props {}

function ErrorPage(props: Props) {
  return (
    <FullHeightPageBox>
      <ErrorScreen type="Unknown" />
    </FullHeightPageBox>
  );
}

export default ErrorPage;
