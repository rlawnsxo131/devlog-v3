import { AppMainResponsiveBox } from '@/components/app';
import { ErrorScreen } from '@/components/error';
import FullHeightPageBox from '@/components/system/FullHeightPageBox';

interface Props {}

function ErrorPage(props: Props) {
  return (
    <AppMainResponsiveBox>
      <FullHeightPageBox>
        <ErrorScreen type="Unknown" />;
      </FullHeightPageBox>
    </AppMainResponsiveBox>
  );
}

export default ErrorPage;
