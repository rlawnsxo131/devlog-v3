import { AppMainContentWrapper } from '@/components/app';
import { SEO } from '@/components/base';
import { InfoDescriptionSection } from '@/components/info';
import ContactLinks from '@/components/system/ContactLinks';

export default function InfoPage() {
  return (
    <>
      <SEO
        title="Info - DevLog"
        description="김준태 블로그(DevLog) - Info"
        type="blog"
      />
      <AppMainContentWrapper>
        <ContactLinks />
        <InfoDescriptionSection />
      </AppMainContentWrapper>
    </>
  );
}
