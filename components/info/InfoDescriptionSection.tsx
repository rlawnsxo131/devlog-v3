import { css } from '@/styles/_stitches.config';
import { textUnderlineForHoverBasicStyle } from '@/styles/basicStyle';

interface Props {}

function InfoDescriptionSection(props: Props) {
  return (
    <>
      <section className={section()}>
        이 블로그에 쓰인 글과 생각은, 유효한 기간이 있습니다.
      </section>
      <section className={section()}>
        <div className={titleBlock()}>
          <h3>Experience</h3>
        </div>
        <ul className={listBlock()}>
          <li>
            <a
              rel="noopener noreferrer"
              href="https://www.kakaopay.com/"
              target="_blank"
            >
              카카오페이
            </a>
            웹 프론트엔드 개발자 ( 2023.06 ~ )
          </li>
          <li>
            <a
              rel="noopener noreferrer"
              href="https://www.11stcorp.com"
              target="_blank"
            >
              11번가
            </a>
            웹 프론트엔드 개발자 ( 2022.10 ~ 2023.06 )
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
        <div className={descriptionBlock()}>
          <section className={descriptionItem()}>
            <h4>Current</h4>
            <p>
              Yarn Berry, TypeScript, Next.js, Stitches, Unified, S3, Route53,
              CloudFront, Lambda@Edge
            </p>
          </section>
          <section className={descriptionItem()}>
            <h4>V2</h4>
            <p>
              TypeScript, MariaDB, Docker, Serverless Framework, NodeJS, Koa,
              React.js, Webpack, React Router, Loadable Components, Unified,
              Emotion, GraphQL, EC2, S3, Route53, CloudFront, API Gateway,
              Lambda/Lambda@Edge
            </p>
          </section>
          <section className={descriptionItem()}>
            <h4>V1</h4>
            <p>
              TypeScript, MariaDB, Docker, Serverless Framework, NodeJS, Koa,
              Next.js, Styled components, GraphQL, EC2, S3, Route53, CloudFront,
              API Gateway, Lambda / Lambda@Edge
            </p>
          </section>
        </div>
      </section>
    </>
  );
}

const section = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  marginTop: '1.5rem',
  background: '$bg-content-sub2',
  boxShadow: '$default1',
  borderRadius: '4px',
  color: '$text',
});

const listBlock = css({
  margin: '0 0 0 1.125rem',
  padding: '0',
  '& li + li': {
    marginTop: '0.725rem',
  },
  '& a': {
    ...textUnderlineForHoverBasicStyle,
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
  display: 'flex',
  flexDirection: 'column',
});

const descriptionItem = css({
  display: 'flex',
  flexDirection: 'column',
  lineHeight: '1.5',
  '& h4': {
    margin: '0',
    fontSize: '1.125rem',
    fontWeight: '500',
  },
  '& p': {
    margin: '0',
    fontSize: '1rem',
  },
  '& + &': {
    marginTop: '1.5rem',
  },
});

export default InfoDescriptionSection;
