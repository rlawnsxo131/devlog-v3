import { textUnderlineForHoverStyle } from '@/styles/basicStyle';
import { css } from '@/styles/_stitches.config';

interface Props {}

function InfoDescriptionSection(props: Props) {
  return (
    <>
      <section className={section()}>
        <div className={titleBlock()}>
          <h3>Info</h3>
        </div>
        <ul className={listBlock()}>
          <li>
            <a
              rel="noopener noreferrer"
              href="https://www.11stcorp.com/company"
              target="_blank"
            >
              11번가
            </a>
            웹 프론트엔드 개발자 ( 2022.10 ~)
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              href="https://cleaninglab.co.kr/"
              target="_blank"
            >
              생활연구소
            </a>
            웹 풀스택 개발자 ( 2019.04 ~ 2022.10 )
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              href="https://itcampus.hankyung.com/"
              target="_blank"
            >
              한경닷컴 it 교육센터
            </a>
            자바기반 웹 풀스택 개발자 양성과정 수료 ( 2018.01 ~ 2018.06 )
          </li>
          <li>강동대학교 텍스타일디자인 학과 졸업 ( 2010 ~ 2015 )</li>
        </ul>
      </section>
      <section className={section()}>
        <div className={titleBlock()}>
          <h3>DevLog Tech Stack</h3>
        </div>
        <p className={descriptionBlock()}>
          <h4>V2</h4>
          {'\n'}
          TypeScript, MariaDB, Docker, Serverless Framework, NodeJS, Koa,
          React.js, Webpack, React Router, Loadable Components, Unified,
          Emotion, GraphQL, EC2, S3, Route53, CloudFront, API Gateway, Lambda /
          Lambda@Edge{'\n\n'}
          <h4>V1</h4>
          {'\n'}
          TypeScript, MariaDB, Docker, Serverless Framework, NodeJS, Koa,
          Next.js, Styled components, GraphQL, EC2, S3, Route53, CloudFront, API
          Gateway, Lambda / Lambda@Edge
        </p>
      </section>
    </>
  );
}

const section = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  background: '$bg-info-section',
  boxShadow: '$default1',
  borderRadius: '4px',
  color: '$text',
  '& + &': {
    marginTop: '1.5rem',
  },
});

const listBlock = css({
  margin: '0 0 0 1.125rem',
  padding: '0',
  '& li + li': {
    marginTop: '0.725rem',
  },
  '& a': {
    ...textUnderlineForHoverStyle,
    margin: '0 0.25rem 0 0',
  },
});

const titleBlock = css({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: '1rem',
  '& h3': {
    margin: '0',
    fontSize: '1.5rem',
    fontWeight: '500',
  },
});

const descriptionBlock = css({
  margin: '0',
  display: 'flex',
  flexFlow: 'row wrap',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap',
  fontSize: '1.125rem',
  '& h4': {
    margin: '0',
    fontWeight: '500',
  },
});

export default InfoDescriptionSection;
