import { css } from '@/styles/_stitches.config';
import InfoContactLinkSection from './components/InfoContactLinkSection';
import InfoDescriptionSection from './components/InfoDescriptionSection';

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
