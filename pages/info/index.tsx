import {
  InfoContactLinkSection,
  InfoDescriptionSection,
} from '@/components/info';
import { MainContentLayout } from '@/components/layouts';

export default function InfoPage() {
  return (
    <MainContentLayout>
      <InfoContactLinkSection />
      <InfoDescriptionSection />
    </MainContentLayout>
  );
}
