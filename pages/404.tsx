import { AppMainResponsiveBox } from '@/components/app';
import ErrorScreen from '@/components/error/ErrorScreen';
import FullHeightPageBox from '@/components/system/FullHeightPageBox';

interface Props {}

function NotFoundPage(props: Props) {
  return (
    <AppMainResponsiveBox>
      <FullHeightPageBox>
        <ErrorScreen type="NotFound" />
      </FullHeightPageBox>
    </AppMainResponsiveBox>
  );
}

export default NotFoundPage;
