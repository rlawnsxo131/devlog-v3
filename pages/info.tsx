import { css } from '@/styles/_stitches.config';

export default function InfoPage() {
  return (
    <div className={block()}>
      <section className={section()}>
        <h3>Personal Development blog by John</h3>
        <pre>
          2018년 1월, 28살이 되던해 int 가 무엇인지 배운 늦깎이 개발자 입니다.
          {'\n\n'}
          Serverless 한 BackEnd Architecture 를 선호하고, FrontEnd 의 자연스런
          DataFlow 를 중요히 생각합니다.
        </pre>
      </section>
    </div>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
});

const section = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  background: '$bg-info-section',
  boxShadow: '$default',
  borderRadius: '4px',
  '& h3': {
    margin: '0 0 1.5rem 0',
    fontSize: '1.5rem',
  },
  '& pre': {
    margin: '0',
    display: 'flex',
    flexFlow: 'row wrap',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
    fontSize: '1.25rem',
  },
});
