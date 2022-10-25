import {
  InfoContactLinkSection,
  InfoDescriptionSection,
} from '@/components/info';
import { AppMainContentWrapper } from '@/components/app';

export default function InfoPage() {
  return (
    <AppMainContentWrapper>
      <InfoContactLinkSection />
      <InfoDescriptionSection />
    </AppMainContentWrapper>
  );
}
