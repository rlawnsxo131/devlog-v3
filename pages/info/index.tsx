import { AppMainContentBox } from '@/components/app';
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
      <AppMainContentBox>
        <ContactLinks />
        <InfoDescriptionSection />
      </AppMainContentBox>
    </>
  );
}
