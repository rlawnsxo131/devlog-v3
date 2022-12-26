import { AppMainContentBox, AppMainResponsiveBox } from '@/components/app';
import { ContactLinks, SEO } from '@/components/base';
import { InfoDescriptionSection } from '@/components/info';

export default function InfoPage() {
  return (
    <>
      <SEO
        title="Info - DevLog"
        description="김준태 블로그(DevLog) - Info"
        type="blog"
      />
      <AppMainResponsiveBox>
        <AppMainContentBox>
          <ContactLinks />
          <InfoDescriptionSection />
        </AppMainContentBox>
      </AppMainResponsiveBox>
    </>
  );
}
