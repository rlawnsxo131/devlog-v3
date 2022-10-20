---
title: 블로그 개발 후기 3탄 - Next.js
description: Next.js 여러모로 마음에 든다.
tags:
  - Next.js
  - React.js
thumbnail: https://image-devlog.juntae.kim/post/image/png/NextJS.png
date: 2020-11-26
slug: blog-development-review-3
---

요세 정신이 없는 덕에 글이 좀 늦어졌습니다.
블로그 개발 후기 3탄 **Next.js** 에 관한 이야기 입니다.

제가 리액트를 사용하기 시작한건 2018 년 무렵이었고, 개인적으로 잘한다 할만한 수준이 아니라 생각합니다. 더불어 Next.js 는 이번이 처음으로 사용해보는 기술이었는데요. 제가 평소 크게 고려하지 않던 Next.js 를 이 블로그의 기술 스택으로 선택한 이유와 React.js 로 직접 SSR 을 구현할때의 차이점을 이야기 합니다.

# SSR 을 선택한 이유
제가 Next.js 를 선택한 거의 전부이자 하나인 이유는 바로 **Serverside Redering** 이었습니다. SSR 에 대한 개념은 요세 모르는 분들이 거의 없으실 것이란 생각에 아주 간단히 살펴보고 넘어가겠습니다.

사실 SSR 은 그다지 새로운 개념이 아닙니다. 지금에야 와서는 React, Angular, Vue, Svelte 등등의 CSR 위주의 프레임워크나 라이브러리가 대중화 되었지만 전통적인 웹페이지의 응답은 SSR 이 기본이었습니다.

> Client 요청 > Server 는 요청받은 데이터를 넣어, 응답할 HTML 을 만들어줌 > Client 로 전달

네 이게 전부입니다. 클라이언트가 서버로 요청을 주고, 서버사이드에서 각종 데이터를 처리해 가공한 HTML 을 만들어 Client 로 던져줍니다. 그덕에 기존의 웹사이트들은 페이지 이동시 깜빡임 현상이나, 불필요한 템플릿을 중복해서 로딩하는 등의 단점이 있었죠.

이외 기타 여러 부분들은 상당수의 사용자 경험을 해치는 요소였고, 보다 나은 사용자 경험을 제공함과 동시에 갈수록 복잡해지는 웹 어플리케이션을 효율적으로 개발하기 위한 기술들이 나옵니다.

이렇게 생겨나게 된 프레임워크 및 라이브러리들은 기본적으로 **CSR** 기반의 렌더링을 하며, **HistoryAPI** 기반의 페이지 전환, **VirtureDOM** 의 사용및 여타 효과적인 화면을 그리기 위한 방법들을 제시합니다.

비교적 최근 등장한 **Svelte** 라는 녀석은 빌드타임에 어플리케이션의 모든 동작을 정의한 뒤, 이를 기반으로 작동한다고 합니다. 그덕에 런타임시 오버헤드가 확연히 줄고, 속도도 빠르고 번들사이즈도 작고 뭐 새롭다는데 주제에 벗어나니 이건 일단 넘어갑니다.

사실, 현재 존재하는 웹 클라이언트용 프레임워크나 라이브러리들이 지원하는 기능의 상당부분은 과거에도 충분히 구현가능한 방법들이 있었으나 주가 되지 않았던 이유는 잘 모르겠네요.

위 내용만 보면 도대체 그렇게 사용자 경험을 신경쓰고, 유연한 화면구성, 렌더링 성능을 고려한 기술들 기반의 CSR 을 하지 뭣하러 SSR 을 하려고 기를 쓰냐 싶을 수 있습니다. 1분만 구글링을 해보면 답은 나옵니다. 그러니 제가 생각하는 굵직한 두가지만 살펴봅니다.

1. 더욱 빠른 초기 화면 렌더링
2. SEO 최적화

위 두가지는 요소는( 그중 **SEO 최적화** ) 제가 개인적으로 이블로그를 구현하며 SSR 을 고려한 거의 모든 이유에 해당합니다.

만약 사이즈가 큰 WebApp 의 경우 당연히 어플리케이션이 번들링된 파일의 크기가 커지게 되고, 이런 형태의 WebApp 을 별다른 처리없이 한방에 불러오려고 한다면 당연히 초기 화면 진입시 비교적 긴 시간이 소요되어 좋지못한 사용자 경험을 주게 될 것입니다.

그러나, 제 블로그는 애초에 사이즈가 크지 않은 어플리케이션 인지라 CSR 기반에 조금더 나아가 **code splitting** 처리만 해주어도 충분히 빠른 초기 렌더링이 가능한 스펙이었고, 이것만 생각한다면 딱히 SSR 을 구현하지 않았을 것입니다.

그러나 제가 만든 이녀석은 이름부터 DevLog. 즉 블로그인 이상 불특정 다수의 검색에도 노출이 잘 되어야 했습니다. 그럼 당연히 검색엔진에 노출이 잘 되어야 할텐데, 제일 중요한 구글은 우리 검색엔진은 CSR 기반의 페이지도 잘 긁어간다 라고 이야기 하지만... 기타 여러 자료나 통계에 따르면 아직은 SSR 을 구현해 놓은 웹페이지의 노출률이 훨씬 높더군요.

그래서 결국은 SEO 최적화를 위해 SSR 구현과, Sitemap, RSS 등을 제출하는 작업이 필요했고, 제 블로그의 글을 좀더 많은 분들이 읽었으면 하는 바램으로 SSR 구현을 선택했습니다.

# 왜 하필 Next.js 였나
기존에 리액트를 공부하고, 리액트를 사용한 프로젝트를 진행하며 **React + loadable-components** 기반으로 직접 SSR 을 구현한 경험이 이미 있었습니다. 그러나 해보신 분들은 알겠지만 SSR 장인이 아닌이상 구현시 생각보다 많은 삽질을 경험하게 됩니다.

Server 용 빌드와 Client 용 빌드를 나누어야 하며, 이에 따라오는 각각의 bundler 설정들을 따로 작성하고, Redux, Apollo 를 사용한다거나 각종 서드파티 라이브러리를 사용하는 부분에서 window 객체라도 사용한다 치면 이를 일일이 처리해주어야 합니다.

이런 사항들은 제가 블로그를 빠르게 오픈하는데에 있어 방해요소란 생각이 들었고, 기존에 Next.js 가 어떤 개념의 기술인지 정도는 알고 있었던 만큼 신속히 방향을 돌렸습니다.

이미 상당한 레퍼런스가 존재하고, 이름만 대면 알만한 대기업들이 사용하는 기술이기에 걱정없이 문서를 참고해 바로 프로젝트를 만들었는데요. 개인적으론 장점이 더 많았으며, 구조나 개발하는 입장에서는 취향에 따라 약간의 호불호가 갈릴 것이다란 생각이 들었습니다. 프로젝트의 구조만 놓고 본다면 저는 제가 직접 환경을 구축해 개발하는 리액트 프로젝트가 더 맘에 드네요.

그럼 비교 시작합니다.

# React 기반이라지만 그래도 Framework 
Next.js 는 스스로를 Framework 이라 소개합니다. 큰 불편함이나 이질적인 부분이 많진 않지만, Framework 인 만큼 Next.js 에서 명시한 방법에 따라 프로젝트를 작성해야 하는 부분들이 종종 있습니다. 사실 개인적으로 이게 너무 불편하다 할만한 부분은 그닥 없었기에, 라우팅과 웹팩 설정 정도의 가벼운 비교만 해보겠습니다.

## Routing
저는 보통 React 로 클라이언트 라우팅을 할 때 [react-router](https://reactrouter.com) 를 사용합니다. 코드는아래와 같습니다.
사실 Next.js 의 Routing 도 상당히 직관적이며, 잘 설계되어 있다는 생각이 들어 딱히 장단점을 나누기는 애매한듯 싶습니다. 그냥 형태의 차이만 보고 넘어갑시다.
저는 개인적으로 react-router 의 형태가 좀 더 맘에 드네요. 아래는 **react-router** 의 라우팅 방식입니다. 6 버전에서는 뭐가 좀 달라진 것 같던데 아직 써보지 않아서 5버전을 기준으로 살펴봅니다.

```tsx
// react-router
function App(props: AppProps) {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/info" component={InfoPage} />
      <Route component={NotFoundPage} />
    </Switch>
  ); 
}

export default App;
```

이번엔 **Next.js** 입니다. Next.js 의 라우팅은 프로젝트 파일의 경로와도 밀접한 연관이 있습니다.
예를들어 `"/"` 과 같은 루트경로는 `pages/index.(jsx|tsx)` 경로에 있는 컴포넌트에 매핑됩니다. `"/post/특정태그"` 와 같은 경로는 `pages/post/[tag].(jsx|tsx)` 의 경로에 있는 컴포넌트와 매핑됩니다.

추가로 **해당 경로의 라우팅이 활성화 된 상태**를 표현하기 위해 react-router 에서는 **activeClass** 나 **activeStyle** 을 명시해주는 반면 Next.js 에는 딱히 그런 기능이 없어보여, 아래와 같이 스타일링한 컴포넌트를 작성해 처리해 주었습니다. 이부분은 다른 좋은 방법이나 기능이 있다면 저도 알고싶네요.
(사실 직접 SSR 을 구현한 client 를 다시 작성할 예정이라 딱히 방법을 찾아보지 않았습니다..)

```tsx
// next.js router
import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useRouter } from 'next/dist/client/router';
import media from '../../lib/styles/media'; 

type NavigationProps = {};

function Navigation(props: NavigationProps) {
  const router = useRouter();
  const routerValue = router.pathname.split('/')[1];
  
  return (
    <Block>
      <Link href="/">
        <CustomAnchor className={!routerValue.length ? 'active' : ''}>
          New
        </CustomAnchor>
      </Link>
      {/* ... */}
    </Block>
  ); 
}

const Block = styled.nav`
  ${media.xsmall} {
    display: none;
  }
  ${media.medium} {
    display: flex;
    flex-flow: row wrap;
    .active {
      color: ${palette.pink5};     
    }
  }
 `;
const CustomAnchor = styled.a`
  display: flex;
  flex-flow: row wrap;
  padding: 0.25rem 0.7rem 0.25rem 0.7rem;
  color: ${palette.gray9};
  &:hover {
    cursor: pointer;
  }
  & + & {
    margin-left: 1.5rem;
  }
`;

export default Navigation;
```

react-router 를 사용해 서버사이드 렌더링을 해야 할 때는 경로를 받아 **StaticRouter** 에 넣어주는 별도의 처리가 필요했는데, Next.js 는 SSR 을 알아서 처리해주는 프레임워크인 만큼 그럴 필요가 없는 부분은 편했습니다. 아래 코드를 첨부합니다.

```tsx
const extractor = new ChunkExtractor({
    statsFile,
    publicPath: process.env.REACT_APP_PUBLIC_URL,
  });
const helmetContext = {} as FilledContext;
const Root = (
  <ChunkExtractorManager extractor={extractor}>
    <HelmetProvider context={helmetContext}>
      <StyleSheetManager sheet={sheet.instance}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <StaticRouter location={url} context={context}>
              <App />
            </StaticRouter>
          </ApolloProvider>
        </Provider>
      </StyleSheetManager>
    </HelmetProvider>
  </ChunkExtractorManager>
);
```

다만 라우팅 처리와 동시에 어떤 특정 값을 넘길때는 정해진 형태로 명시해야 해서 그게 좀 불편했네요. 이런 부분의 Interface 는 React-router 의 형태가 조금더 편하다고 느꼈습니다.

```tsx
// react-router

// 이런 형태라면
<Route path="/post/:id" component={PostDetailPage} /> 

// 해당 경로에서 :id 로 넘어온 값을 아래와 같이 사용하게 됩니다.
const { id } = useParams();
```

```tsx
// next.js routing
/*
next.js 의 다이나믹 라우팅으로 매핑되는 이외의 값을 queryString 으로 넘기고 싶을땐
아래와 같이 합니다.
path - https://MyURL/post/제목입니다?id=1
*/
const handlePostDetail = useCallback(() => {
  router.push({
    pathname: `/post/${post.post_header}`,
    query: { id: post.id },
  });
}, []);
```

개인적으로 라우팅 부분에서 크게 불편한 부분은 없었던것 같아 딱히 할 이야기가 많지는 않네요.

## Config ( webpack.config.js  &&  next.config.js )
Javascript 혹은 Typescript 관련 개발을 하며 누구나 한번쯤은 **bundler** 설정을 건드리게 될것입니다.
**Next.js** 는 커스텀한 bundler 설정을 원하는 사용자들을 위해 **next.config.js** 라는 형식의 파일을 제공합니다.

아래는 제 프로젝트의 next.config.js 파일인데요 .env 를 사용하여 env 변수를 사용하고 싶거나, 혹은 정적파일을 따로 제공하고 싶은 public 한 경로가 있다면 아래와 같이 명시해 주면 됩니다. 비교적 간단한 설정이지만 주석을 참고하셔서 보시면 도움이 될 것 같습니다.

```javascript
// next.config.js
const path = require('path');
const { config } = require('dotenv');

// dotenv 변수를 아래 커스텀 설정에서 사용하려고 미리 env 변수를 적용
config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
  )
});
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  // 전역적으로 사용할 env 변수
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL,
    PUBLIC_IMAGE_URL: process.env.PUBLIC_IMAGE_URL,
    DEVLOG_SERVICE_URL: process.env.DEVLOG_SERVICE_URL
  },
  // server, serverless 등 어느 환경을 타겟으로 빌드할지
  target: process.env.BUILD_TARGET,
  // 정적파일을 제공할 경로, 내 경우엔 cloudfront CDN 주소
  assetPrefix: prod ? process.env.PUBLIC_URL : '',
  compress: true,
  // 여긴 커스텀하고 싶은 webpack config
  webpack: (config) => {
    return {
      ...config,
      devtool: prod ? 'hidden-source-map' : 'eval'
    };
  }
};
```

웹팩의 경우엔 워낙 레퍼런스가 많고, 추상화를 어떻게 하냐에 따라서 설정 방식이 다양하므로 제가 개발용 설정으로 자주 사용하는 아주 가벼운 예시만 살펴보겠습니다.

```javascript
const path = require('path');
const paths = require('./paths');
const initializeConfig = require('./env');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = () => {
  const clientEnv = initializeConfig({ target: 'web' });
  const { REACT_APP_NODE_ENV, REACT_APP_PUBLIC_URL } = process.env;
  return {
    mode: REACT_APP_NODE_ENV,
    entry: paths.entryPath,
    output: {
      path: paths.devBuildPath,
      publicPath: REACT_APP_PUBLIC_URL,
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js',
    },
    target: 'web',
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.(bmp|gif|png|jpe?g|svg)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'static/media',
            name: '[name].[contenthash:8].[ext]',
            esModule: false,
          },
        },
        {
          test: /\.(bmp|gif|png|jpe?g|svg)$/i,
          loader: 'url-loader',
          options: {
            outputPath: 'static/media',
            name: '[name].[contenthash:8].[ext]',
            limit: 10000,
          },
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      fallback: {
        path: false,
      },
    },
    optimization: {
      minimize: false,
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(paths.publicPath, 'index.html'),
        templateParameters: {
          env: {
            REACT_APP_NODE_ENV,
            REACT_APP_PUBLIC_URL,
          },
        },
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: REACT_APP_PUBLIC_URL,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            (fileName) => !fileName.endsWith('.map'),
          );
          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new webpack.DefinePlugin(clientEnv),
      new webpack.HotModuleReplacementPlugin(),
      REACT_APP_NODE_ENV === 'production' &&
        new LoadablePlugin({
          filename: 'loadable-stats.json',
          writeToDisk: true,
        }),
    ].filter(Boolean),
    cache: {
      type: 'memory',
    },
    devServer: {
      // host: '',
      publicPath: '/',
      port: 8080,
      open: true,
      overlay: true,
      historyApiFallback: true,
      stats: 'errors-warnings',
    },
    stats: {
      builtAt: true,
      children: true,
      entrypoints: true,
      hash: true,
      modules: true,
      version: true,
      publicPath: true,
      warningsFilter: [/exceed/, /performance/],
      // excludeAssets: [/\.(map|txt|html|jpg|png)$/, /\.json$/],
    },
  };
};
```

개인적으로 **create-react-app** 이란 도구는 제가 직접 작성한 설정이 아닌데다 추상화가 워낙 많이 되어 있어 선호하지 않는 편이고, webpack.config.dev.js, webpack.config.prod.js, webpack.config.server.js 등으로 용도에 따른 Config File 을 직접 작성하여 사용하는 것을 선호합니다.

> React 개발시 직접 webpack 설정을 하시려는 분들을 위해 제가 처음 웹팩설정을 커스텀 하기 시작했을 무렵 참고 했던 글과, 최근 제 webpack 설정을 조금더 고도화 하는데 도움을 준 링크를 하단 **Ref** 에 남기겠습니다.

이 외에도 직접 프로젝트 진행시 여러가지 사소한 차이점이나 레퍼런스를 뒤져봐야 하는 사항들이 있지만, 이 글은 Next.js 나 Webapck 을 집중적으로 다루기 위한 글이 아니므로 이정도만 비교하고 넘어가겠습니다.

# 그래서 Next.js 는 Serverside Rendering 이 뭐가 더 편해지는데?
Next.js 를 사용한다 해도 Redux 나 Apollo 등의 기술들을 함께 사용하여 SSR 을 구현하기 위해서는 별도의 작업이 필요합니다. (**Apollo** 관련 코드는 하단 **Ref**에 제가 커스텀한 코드의 **github 링크**를 남겨두겠습니다. **공식 깃헙 example** 을 참고하셔도 좋겠네요.) 

아울러 제 프로젝트는 GraphQL 기반의 ApolloServer 와 ApolloClient 를 사용해 작성되었기 때문에 RSS, Sitemap 제공을 위한 부분을 제외하고는 Next.js 에서 제공하는 **getStaticProps**, **getServerSideProps** 등의 기능을 사용하지 않았습니다.

그러나 레퍼런스를 읽다보면 아니 이런것까지 알아서 해줘? 라는 부분들이 눈에 들어오실 겁니다. 괜히 우스갯 소리로 기업들을 꼬시고자 만든 프레임워크라고 부르는게 아니더군요. 그중 제가 가장 매력적으로 느껴졌던 부분 몇가지를 살펴보겠습니다.

## Code Splitting 과 SSR 의 자동화
위에서 꾸준히 언급해온 것과 같이 일단 이 두가지를 자동으로 해준다는 점이 굉장히 큽니다. 사실 코드 스플리팅의 경우는 **CSR** 만 진행할 경우 **React.lazy** 를 사용하면 굉장히 간단합니다. 아래와 같이 말이죠.

```tsx
// client side rendering code splitting

import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundary from './components/error/ErrorBoundary';

// 이렇게나 간단히 끝이 납니다.
const HomePage = React.lazy(() => import('./pages/HomePage'));

type AppProps = {};
const { Suspense } = React;
function App(props: AppProps) {
  return (
    <ErrorBoundary>
      <Layout>
        {/* 서스펜스는 필요합니다. */}
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
```

그러나 아쉽게도 **React.lazy** 는 현시점 서버사이드 렌더링을 지원하지 않습니다. 그래서 보통은 가장 유명한 [@loadable-component](https://github.com/gregberge/loadable-components#readme) 를 사용합니다.
사용시 일반적으로 아래와 같은 형식으로 코드를 작성하게 되는데 이외 약간의 추가설정이 필요하긴 하지만,
너무 좋은 관련글들이 많아 설명은 생략하겠습니다.
```tsx
// server side rendering code splitting

// index.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/client';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  loadableReady(() => {
    ReactDOM.hydrate(
      <ApolloProvider client={client}>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </ApolloProvider>,
      document.getElementById('root')
    );
  }); 
} else {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>,
    document.getElementById('root')
  ); 
}

// App.tsx
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component'
import PageTemplate from './components/PageTemplate';

const MainPage = loadable(( ) => import('./pages/MainPage'));

type AppProps = {};
function App(props: AppProps) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </div>
  );
}
export default App;
```

**SSR** 의 경우는 생각보다 해줄일이 생각보다 많습니다. 이에 비하면 코드 스플리팅은 비교적 굉장히 간단한 편이지요. 이걸 설명하자면 글이 너무 길어질 것 같아 간단히 코드만 남기겠습니다. 전체 코드는 첨부하려니 너무 길어서 비교적 간단한 서버응답에 관련한 직접적인 코드는 생략하고, 리턴해줄 화면을 만들어 주는 부분의 코드만 첨부합니다. 이런느낌의 형태가 필요하다. 복잡하다. 정도만 말씀드리고 싶네요.

```tsx
import * as React from 'react';
import path from 'path';
import fetch from 'node-fetch';
import ReactDOMServer from 'react-dom/server';
import {
  ApolloClient,
  ApolloError,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../../modules';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ErrorEnum, setError } from '../../modules/error';
import App from '../../App';
import Html from './Html';
import { FilledContext, HelmetProvider } from 'react-helmet-async';

const statsFile = path.resolve(__dirname, '../client/loadable-stats.json');

type ServerRenderParams = {
  url: string;
};

async function serverRender({ url }: ServerRenderParams) {
  if (/^\/(api|graphql)/.test(url)) {
    return null;
  }
  const store = configureStore({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [],
        },
      }),
    ],
  });
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${process.env.REACT_APP_API_URI}/graphql`,
      fetch: fetch as any,
      credentials: 'include',
    }),
    cache: new InMemoryCache(),
  });
  const context = {
    statusCode: 200,
  };
  const sheet = new ServerStyleSheet();
  const extractor = new ChunkExtractor({
    statsFile,
    publicPath: process.env.REACT_APP_PUBLIC_URL,
  });
  const helmetContext = {} as FilledContext;
  const Root = (
    <ChunkExtractorManager extractor={extractor}>
      <HelmetProvider context={helmetContext}>
        <StyleSheetManager sheet={sheet.instance}>
          <Provider store={store}>
            <ApolloProvider client={client}>
              <StaticRouter location={url} context={context}>
                <App />
              </StaticRouter>
            </ApolloProvider>
          </Provider>
        </StyleSheetManager>
      </HelmetProvider>
    </ChunkExtractorManager>
  );
  try {
    await getDataFromTree(Root);
  } catch (e) {
    console.log('Apollo Error! Rendering result anyways');
    if (e instanceof ApolloError) {
      const notFound = e.graphQLErrors.some(
        (ge) => (ge.extensions as any)?.code === 'NOT_FOUND',
      );
      if (notFound)
        store.dispatch(
          setError({
            errorType: ErrorEnum.NOT_FOUND,
          }),
        );
    }
    console.log(e.name);
    console.log(e.message);
    console.log(JSON.stringify(e));
  }

  const content = ReactDOMServer.renderToString(Root);
  const initialState = client.extract();
  const styledElement = sheet.getStyleElement();
  const html = (
    <Html
      content={content}
      apolloState={initialState}
      reduxState={store.getState()}
      extractor={extractor}
      styledElement={styledElement}
      helmet={helmetContext.helmet}
    />
  );

  const pageHtml = `<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(
    html,
  )}`;

  return { html: pageHtml, statusCode: context.statusCode };
}

export default serverRender;
```

보시면 막상 얼마안되는 코드같지만 저 코드를 작성하기 위해서 저는 수많은 시행착오가 필요했습니다. 구글에 돌아다니는 많은 글과 github 의 온갖 예제코드를 뒤져봤네요. 이런 귀찮은 작업을 알아서 해준다니 정말 편한 기술이란 생각이 듭니다. 그러나! 이게 끝이 아닙니다.
**Serverless Framework** 를 이용한 배포시 이를 편리하게 해주는 플러그인까지 만들어 주었습니다.

## Serverless Framwork 을 사용한 배포의 편리함
Next.js 를 만든 이 고마운 팀원분들은 많은 이들이 원하는 기능을 바로 알아차렸습니다.
이걸 **Serverless Framework** 로 배포해 서비스 하고자 하거나, 혹은 이미 서비스중인 기업 또는 사용자 들이 많다는 사실입니다. 그래서 아예 Next.js 전용 Serverless 플러그인을 만들어줌과 동시에, 서버리스용 어플리케이션 번들용 설정을 내장시켜 버렸죠.

덕분에 **next.config.js** 파일과 **serverless.yml** 파일에 간단한 명시만으로 서버리스 어플리케이션 배포가 가능합니다.

```javascript
// next.config.js
module.exports = {   // 여기 명시해주세요
  target: 'serverless',
  assetPrefix: prod ? process.env.PUBLIC_URL : '',
  compress: true,
  webpack: (config) => {
    return {
      ...config,
      devtool: prod ? 'hidden-source-map' : 'eval'
    };
  }
};
```

```yml
# serverless.yml
service: devlog-client

provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region: ap-northeast-2

plugins:
  - serverless-dotenv-plugin
  - serverless-nextjs-plugin

custom:
  name: devlog-client
  serverless-nextjs:
    assetsBucketName: "devlog-client-${env:NODE_ENV}"
    cloudFront: true

package:
  # exclude everything
  # page handlers are automatically included by the plugin
  exclude:
    - ./**
```

세상에나. 이렇게나 간단히 서버리스 어플리케이션을 배포할 수있다니 이거 정말 매력적이지 않나요?

# 결론
사실 이번 글은 이 기술의 장단점을 언급한다기 보다는 차이점에 관한 내용이 조금 더 많은것 같습니다. 왜냐, 저는 사용후 상당히 괜찮은 기술이란 생각이 들었거든요. 구조는 직접 구축해서 개발한 리액트 어플리케이션이 더 맘에 들긴합니다.

하지만, 저한테 실무에서 '새로운 프로젝트를 진행해야 하는데 리액트로 서버사이드 렌더링 구현이 필요하다' 란 요구사항이 온다면 주저없이 Next.js 를 선택할 것 같네요. 다른것보다 굉장히 많은 시간이 절약될 것을 알기때문이죠.. 외에도 많은 장점이 있고, 기술적으로나 구조적으로나 크게 나무랄곳 없는 좋은 기술이란 생각이 듭니다.

여러분이 새로운 어플리케이션을 리액트로 작성해야 한다면. 그런데 서버사이드 렌더링이 필요하다면. 서버사이드 렌더링을 직접 구현할때의 복잡함과 피로도가 부담되신다면 **Next.js** 를 선택하는건 어떨까요?

# Ref
[Next.js 공식 홈페이지](https://nextjs.org/)
[Next.js Apollo Client 설정 내 깃헙](https://github.com/rlawnsxo131/devlog-client/blob/master/graphql/apollo.tsx)
[[번역] 깊이 있는 리액트 개발 환경 구축하기](https://sujinlee.me/webpack-react-tutorial/)
[Typescript React 개발 환경 직접 만들기](https://velog.io/@jhj46456/Typescript-React-개발-환경-직접-만들기)