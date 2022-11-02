import { AppMainContentWrapper } from '@/components/app';
import { SEO } from '@/components/base';
import {
  InfoContactLinkSection,
  InfoDescriptionSection,
} from '@/components/info';

export default function InfoPage() {
  return (
    <>
      <SEO
        title="Info - DevLog"
        description="김준태 블로그(DevLog) - Info"
        type="blog"
      />
      <AppMainContentWrapper>
        <InfoContactLinkSection />
        <InfoDescriptionSection />
      </AppMainContentWrapper>
    </>
  );
}
