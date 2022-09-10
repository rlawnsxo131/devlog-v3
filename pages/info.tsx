import { css } from '@/styles/_stitches.config';

export default function InfoPage() {
  return (
    <div className={block()}>
      <section className={section()}>
        <h3>Personal Development blog by John</h3>
        <p>
          2018년 1월, 28살이 되던해 int 가 무엇인지 배운 웹개발자 입니다.
          {'\n\n'}Frontend 개발을 주로 합니다.{'\n'}필요에 따라 BackEnd API 를
          개발하거나 배포를 구성하기도 합니다.
          {'\n\n'}
          Serverless 한 BackEnd Architecture 를 선호하고,{'\n'}FrontEnd 의
          자연스런 DataFlow 를 중요히 생각합니다.
        </p>
      </section>
      <section className={section()}>
        <h3>DevLog Tech Stack</h3>
        <p>
          <strong>V2</strong>
          {'\n'}
          TypeScript, MariaDB, Docker, Serverless Framework, NodeJS, Koa,
          React.js, Webpack, React Router, Loadable Components, Unified,
          Emotion, GraphQL, EC2, S3, Route53, CloudFront, API Gateway, Lambda /
          Lambda@Edge{'\n\n'}
          <strong>V1</strong>
          {'\n'}TypeScript, MariaDB, Docker, Serverless Framework, NodeJS, Koa,
          Next.js, Styled components, GraphQL, EC2, S3, Route53, CloudFront, API
          Gateway, Lambda / Lambda@Edge
        </p>
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
  '& p': {
    margin: '0',
    display: 'flex',
    flexFlow: 'row wrap',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
    fontSize: '1.125rem',
  },
  '& + &': {
    marginTop: '1.5rem',
  },
});
