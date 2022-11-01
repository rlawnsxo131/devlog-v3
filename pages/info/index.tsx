import {
  InfoContactLinkSection,
  InfoDescriptionSection,
} from '@/components/info';
import { AppMainContentWrapper } from '@/components/app';
import { SEO } from '@/components/base';

export default function InfoPage() {
  return (
    <>
      <SEO
        title="Info - DevLog"
        description="김준태 블로그(DevLog) - 소개 페이지"
      />
      <AppMainContentWrapper>
        <InfoContactLinkSection />
        <InfoDescriptionSection />
      </AppMainContentWrapper>
    </>
  );
}
