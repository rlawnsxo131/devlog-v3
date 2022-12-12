---
title: Goodbye Next.js, Hello React.js
description: Next.js 를 React.js 로 갈아 엎어보았다
tags:
  - NextJS
  - ReactJS
thumbnail: /images/post/thumbnail/next_react.jpeg
date: 2021-03-11
slug: good-bye-nextjs
---

# Table of Contents

# 글을 시작하며

안녕하세요 정말 오랜만에 글을 씁니다.
한동안 `Next.js` 로 작성되어 있던 제 블로그의 `Client` 기술 스펙을 변경했는데요.

이번엔 `SSR` 을 위해 **Next.js** 로 작성되어 있던 프로젝트를
`React + @loadable/component + Koa` 로 전환하며 느낀점들과 바꾼 이유에 대한 이야기를 할까 합니다.

Next.js 사용에 대한 후기가 궁금하시다면 [블로그 개발 후기 3탄:Next.js](https://devlog.juntae.kim/post/blog-development-review-3),
코드가 궁금하시다면 [이 링크](https://github.com/rlawnsxo131/devlog-client) 를 참고해 주세요.

현재 React.js 로 SSR 을 구현한 코드는 [이 링크](https://github.com/rlawnsxo131/devlog-client-v2)를 참조해 주세요.

# Next.js 를 버린 이유

혹시 [이전글](https://devlog.juntae.kim/post/blog-development-review-3) 을 보신다면 아시겠지만 저는 **Next.js** 가 상당히 좋은 기술이라 생각합니다.

그럼에도 불구하고 왜 번거로움을 감수하고
`React` + `@loadable/component` + `Koa` 로 직접 **SSR** 을 구현했을까요?
번거로운 작업이 꽤나 있다는걸 알면서도 바꾼 이유는 사실 개인적인 성향이 가장 많은 영향을 끼친것 같습니다. 저는 제가 작성하는 어플리케이션의 모든 부분을 직접 컨트롤 하는 것을 좋아합니다. 예를 들자면
**Create React App** 이란 명령어 한줄이면 리액트 프로젝트의 구조를 잡아주는 아주 편한 도구가 있음에도,
처음 리액트를 공부하던 시절 이후론 단 한번도 이 도구를 제 프로젝트에 사용한 적이 없는데요.

이유는 다음과 같습니다.

1. 그럴일이 없다면 좋겠지만 어플리케이션이 복잡해지고 고도화 되는 경우, 혹은 SSR 을 직접 구현해야 하는 경우 결국엔 이 설정파일을 까서 커스텀 해야하는 일이 생깁니다.이때 쉽게 만나는 문제가 있습니다. eject 이전엔 모든 의존성을 내가 알지 못한다는 사실입니다. yarn eject 이후 숨겨져있는 수많은 디펜던시들이 드러나게 되는데, build 파일을 만드는데 필요한 의존성이 대다수 포함되어 있습니다. 이말은 내가 프로젝트의 버전을 올리거나 어떤 작업을 할 때 문제가 생긴다면, 결국은 eject 를 해서 현재의 의존성을 알아야 하는 경우가 생기기 쉽다는 이야기 입니다.

2. 추상화가 많이 되어있습니다. 지금이야 CRA 를 써도 eject 이후 설정을 커스텀 하는데 큰 어려움을 겪진 않지만, 지금보다 bundler 에 익숙치 않았을 땐 설정을 파악하는데 한참 걸렸습니다. 이경우 차라리 제가 직접 설정한 파일을 읽는게 더 수월합니다.

3. 같은 코드로 작성한 어플리케이션을 Create React App 과 제가 직접 설정한 Webpack 환경에서 build 하고 bundle 사이즈를 비교해 본 결과 대부분의 경우 별 차이가 없었습니다. 어떨땐 직접 설정한 환경에서의 bundle 파일이 오히려 더 작은 경우도..

4. CRA 초기에만 해도 Sass 나 Typescript 등등 굉장히 많은 요소들의 추가사용을 위해 webpack을 커스텀 해야 했는데요, 지금은 알아서 해주는 부분이 많아진 만큼 굉장히 뚱뚱합니다. 즉 제게 필요없는 설정이 너무 많습니다.

5. 위 언급했듯 bundle 사이즈나 기타 결과물의 차이가 크게 없음에도, build 시간은 더 길어지는 경우가 종종 있습니다.

Next.js 를 버리고 직접 SSR 을 구현하려 마음을 먹은 이유도 비슷합니다.
SSR 시 제가 사용하는 서드파티 라이브러리 들의 특정 처리가 필요한 부분은 Next.js 를 쓰나, React 로 SSR 을 구현하나 어차피 똑같은 처리가 들어갑니다.

거기에 **SSR** 시 데이터에 대한 처리를 해주는 부분은 Next.js 에서 제공해 주는 **getInitialProps**,
**getStaticProps**, **getServerSideProps** 등을 사용해야 합니다.

뭐, 안쓰려고 마음먹고 커스텀한다거나 다른 방법으로 이부분을 처리하려 든다면 얼마든지 방식은 달라질 수 있겠지만 이경우 오히려 그냥 제공해 주는 옵션을 사용하는 것이 정신건강에 이롭단 생각입니다.

Next.js 가 제공해주는 편의성은 상당히 다양합니다.
**Serverless Framework** 로 SSR 을 한다던지 어떤 작업이 필요할 때 플랫폼 측에서 제공해주는 편리한 기능들이 많지만, 이걸 제가 파보지 않는 이상 매직박스 같다는 생각이 들더군요.

아울러 **CRA** 와 비슷하게 어플리케이션이 고도화 된다거나 복잡해진다면, 혹은 커스텀이 필요하다면?
그땐 **Next.js** 측에서 제공하는 Next.config.js 파일에 추가 설정을 작성하게 되는데 이게 제가 직접 **webpack** 의 config 파일 을 작성하는 것에 비해 크게 편하단 생각이 들지 않았습니다.

그래서 이럴바엔 차라리 어차피 안해본것도 아니고 그냥 내가 하자.
란 생각에 직접 SSR 을 구현하게 되었습니다. 이 과정에서 생긴 가장 큰 변화는 사실 **코드레벨**이 아닌,
`Production(AWS)` 배포시의 추가 고려 사항들이었는데요.

어떤 변화가 있었는지, 어떤 차이점이 있었는지 살펴보겠습니다.

# Serverless Framework

제 블로그는 `서버사이드 렌더링` 에 [Serverless Framework](https://www.serverless.com/) 을 사용하고 있습니다. 그리고 이를 위해 Next.js 측에서 제공해주는 Plugin 을 적용하고, next.config.js 에 몇몇 설정을 추가하는 방식을 따르고 있었죠.

하지만 이걸 Next.js 에서 벗어나 직접 구현하며 몇 가지의 작업을 추가로 더 해주게 되었는데요.
간단한 비교를 통해 어떤 추가 작업을 해야 하는지 살펴보겠습니다.

## Next.js

위와 같이 Next 진영에서 지원해주는 요소들을 이용해 Serverless Framwork 배포를 하는경우, 정적파일과 서버사이드 렌더링에 필요한 서버파일을 각각의 `s3` 버킷에 나누어주고, 추가로 SSR 시 필요한 `API Gateway` 역시 알아서 설정하고 만들어 줍니다.

조금더 정확히 말하자면 `Serverless Framework` 로 **BackEnd** 를 배포한다 가정시 내부적으론 `CloudFormation` 을 이용해 각종 설정을 자동으로 해주고, `API Gateway` 등의 기본 설정을 알아서 해주는 부분은 동일합니다. 그러나 **Next.js** 는 애초에 서버에 관한 어떤 작업이 없어도, **next.config.js** 와 **serverless.yml** 파일의 간단한 설정이면( 플러그인도 필요합니다 ) 이 모든 부분이 해결됩니다.

당연히 위에서 이루어지는 몇몇 사항을 직접 처리해 주어야 하는데요. 이어서 살펴보겠습니다.

## React.js + @loadable/component + Koa

일단 SSR 을 위한 설정이나 코드레벨 에서의 작업은 여기서 자세히 다루진 않겠습니다. 위 언급했듯, 우선은 `배포` 시 필요한 `클라이언트용 빌드` 와 `Serverless용 빌드` 가 필요합니다. 아울러 우리가 로컬에서 테스를 하기위한 `로컬 개발환경` 을 위한 설정도 필요하겠죠.

이 말인 즉슨 **어떤식으로 webpack.config 파일을 추상화 하던 배포및 테스트를 위한 네가지 방식의 bundler 설정이 필요하다** 는 의미가 됩니다. 저는 공통로직을 묶고, 파일 갯수를 줄이는 등의 작업을 하지 않고 보통 그냥 4가지의 설정 파일을 따로 만들어두고 사용하는데요. 이 경우 아래와 같은 설정 파일이 나옵니다.

- webpack.config.dev.js: 로컬 개발을 위한 설정
- webpack.config.prod.js : 클라이언트용 어플리케이션 빌드를 위한 설정
- webpack.config.server.js: SSR 역할을 해야하는 어플리케이션 로컬 빌드를 위한 설정
- webpack.config.serverless.js: serverless 환경에서 SSR 역할을 파일의 빌드를 위한 설정

각각의 로컬 테스트를 위해 작성한 방식을 포함하면 4가지가 나오지만 실상 프로덕션 배포시 저는 딱 두가지의 번들파일을 가지고 배포하게 되는데 순서는 다음과 같습니다.

> 클라이언트용 번들 빌드 > S3 로 업로드 > Serverless 용 번들 빌드와 동시에 배포

정적파일을 CloudFront 에 캐싱하는데 저는 이걸 S3 에 올리는 작업을 해주고, 첫 화면 진입시
SSR 역할을 할 번들파일을 Serverless Framework 를 이용해 생성과 배포를 함께합니다.

## SSR 을 어떤방식으로 처리할까?

Serverless Framework 을 사용한 SSR 진행시, 이것도 여러 방법이 있을텐데요.
제가 생각하기에 가장 간단한 방법은 아래와 같습니다.

### SSR 만을 처리하는 middleware 가 응답하도록 하기

람다를 사용하실때 자주 마주하게 되는 형태일 것이란 생각이 드는데요. **SSR** 만을 처리하는 **middleware** 를 작성해 html 과 statusCode 를 return 하면, 응답에 이 값을 넣어 던져줍니다.

```typescript
import { APIGatewayEvent } from 'aws-lambda';
import serverRender from './server/middleware/serverRender';
import qs from 'qs';

export const handler = async (event: APIGatewayEvent) => {
  const query = event.queryStringParameters
    ? qs.stringify(event.queryStringParameters)
    : '';
  const url = query ? event.path.concat('?', query) : event.path;

  try {
    const result = await serverRender({
      url,
    });
    if (!result) throw new Error('Result is null');

    const { html, statusCode } = result;

    return {
      statusCode: statusCode,
      headers: {
        'content-type': 'text/html; charset=utf-8;',
      },
      body: html,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: 'SSR has crashed',
        e,
      }),
    };
  }
};
```

어렵거나 복잡한 방식은 아닌듯 싶습니다. 서버를 배포할 땐 **Serverless-http** 를 이용한 방식을 사용했지만, **SSR** 만을 처리하는 람다에서는 굳이 그렇게 해야할 이유가 없다고 생각했습니다.

# 마치며

Next.js 를 사용해 서버사이드 렌더링을 구현하는 것 보다, 현재 제가 서버사이드 렌더링을 구현하는 방식이 분명 해주어야 하는 일이 더 많습니다. Next.js 가 알아서 해주던 일을 제가 직접 밖으로 끄집어내 작성한 것과 크게 다를바 없으니까요.

그러나 저는 추가로 진행하는 개인프로젝트 역시 SSR 이 필요하다면 직접 구현하는 방식을 많이 선택할 것 같습니다. 이유는 위에 설명했듯 섬세한 컨트롤이나 설정들을 직접 하는게 성미에 잘 맞습니다.

여러분이 SSR 을 구현하셔야 하는 일이 있다면 저는 우선적으로 Next.js 를 권하고 싶습니다. 아울러 제가 팀에서 SSR 을 구현해야 한다면 Next.js 를 우선적으로 고려할 것 같습니다. 다만 저와같이 모든 컨트롤을 직접 하고 싶다거나, 혹은 공부의 목적이 있어 서버사이드 렌더링을 직접 구현하고 싶다면 한번쯤 해보셔도 재미있을 것이란 생각이 드네요.

읽어주셔서 감사합니다.
