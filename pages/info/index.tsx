import {
  InfoContactLinkSection,
  InfoDescriptionSection,
} from '@/components/info';
import { AppMainContentLayout } from '@/components/app';

export default function InfoPage() {
  return (
    <AppMainContentLayout>
      <InfoContactLinkSection />
      <InfoDescriptionSection />
    </AppMainContentLayout>
  );
}
