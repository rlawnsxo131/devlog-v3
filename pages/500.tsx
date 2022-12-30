import { AppMainResponsiveBox } from '@/components/app';
import { ErrorScreen } from '@/components/error';
import FullHeightPageBox from '@/components/system/FullHeightPageBox';

interface Props {}

function InternalServerErrorPage(props: Props) {
  return (
    <AppMainResponsiveBox>
      <FullHeightPageBox>
        <ErrorScreen type="InternalServerError" />
      </FullHeightPageBox>
    </AppMainResponsiveBox>
  );
}

export default InternalServerErrorPage;
