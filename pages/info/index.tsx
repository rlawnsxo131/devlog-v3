import {
  InfoContactLinkSection,
  InfoDescriptionSection,
} from '@/components/info';
import { css } from '@/styles/_stitches.config';

export default function InfoPage() {
  return (
    <div className={block()}>
      <InfoContactLinkSection />
      <InfoDescriptionSection />
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
});
