---
title: 모노레포를 마주하며 2 - monorepo 세팅
description: yarn berry workspace + storybook(vite) + next.js + esbuild 를 이용한 monorepo 세팅
tags:
  - Monorepo
  - Vite
  - esbuild
thumbnail: https://image-devlog.juntae.kim/john/john_home_cherry_blossom_2.jpeg
date: 2022-12-10
slug: as-I-face-the-monorepo-2
---

# Table of Contents

# 글을 시작하며

이 글은 [모노레포를 마주하며 1 - 의사결정과 컴포넌트 설계](https://devlog.juntae.kim/post/as-I-face-the-monorepo-1) 에서 이어집니다.

```
프로젝트 설정 과정만 보고 싶다면 위 글은 읽지 않으셔도 됩니다.
```

안녕하세요. 이번엔 직접 `monorepo` 프로젝트를 세팅해 보겠습니다.  
코드를 작성한지는 1 ~ 2주 정도 된것 같은데, 글 두개를 함께 블로그에 올리려다 보니 시간이 조금 지체되었습니다.

예제는 **mac book** + **vscode** 를 기준으로 진행합니다. 기왕에 하는거, 제가 요즘 관심갖고 있거나 잘 모르는 녀석들로 세팅해 보고싶었습니다. `yarn berry worksapce` + `typescript` + `storybook(vite)` + `next.js` 를 이용해 monorepo 프로젝트를 세팅합니다. 공통으로 사용할 컴포넌트는 `esbuild` 로 빌드합니다. 글을 읽기 귀찮으신 분들을 위해 전체 `소스코드`를 미리 첨부합니다. 아래 링크를 참고해 주세요.

- [전체코드](https://github.com/rlawnsxo131/yarn-berry-monorepo-esbuild)

# 프로젝트 생성및 초기화

yarn 은 설치되어 있다고 가정하고 진행합니다.

- 버전을 berry 로 설정하시고, 프로젝트를 init 해 주세요.

```shell
$ yarn set version berry
$ mkdir monorepo-example
$ cd monorepo-example
$ yarn init
```

- Extensions 에서 ZipFS 를 설치하고, 프로젝트의 root 에서 typescript 를 설치합니다.
- 그리고 이 프로젝트의 sdk 를 set 해주세요.

저는 vscode 를 사용하지만 아닌경우 명령어만 바꾸어 주면 됩니다. 아래 링크를 참고하세요.

- [https://yarnpkg.com/getting-started/editor-sdks](https://yarnpkg.com/getting-started/editor-sdks)

> 지금 내가 사용하는 에디터의 typescript 버전과 다운받는 typescript **버전을 맞춰주세요.**  
> 문제가 생기지 않을수도 있지만, vscode 의 ts 버전과 sdk 의 ts 버전이 달라서 온통 빨간줄이 그어지는 현상을  
> 마주할 수 있습니다. 이게 진짜 중간에 겪으면 문제 찾는다고 엄한데 살피다 시간 다 날립니다.

```shell
$ yarn add --dev typescript
$ yarn dlx @yarnpkg/sdks vscode
```

이렇게 프로젝트 sdk 설정을 하면 typescript 버전을 이 workspace 버전으로 사용할꺼냐 라는 질문을 합니다.
만약 안나온다면 `command` + `shift` + `p` 를 입력하시고 `Select Typescript Version` 으로 설정하시면 됩니다.

- workspace 버전을 선택해 주세요.

여기까지 진행하셨다면, 프로젝트는 다음과 같은 모습을 지니게 됩니다.

```
|---.vscode
|---.yarn
|---package.json
|---pnp.cjs
|---.pnp.loader.mjs
|---tsconfig.json
|---yarn.lock
```

# workspace 설정

- `package.json` 에 workspace 를 사용하기 위한 내용을 적어 주세요.

storybook(vite)를 사용하는 프로젝트와, Next를 사용하는 프로젝트를 설정할텐데요, 이 예시에서는 packages 아래 있는프로젝트들을 workspace 로 사용합니다. 와일드 카드(\*) 로 적어도 되긴 하는데 저는그냥 명시적으로 적어 주겠습니다.

```json
// package.json
{
  "name": "yarn-berry-monorepo-esbuild",
  "packageManager": "yarn@3.3.0",
  "workspaces": ["packages/coreui", "packages/webapp"]
  { ... }
}
```

- 이제 package.json 에 명시한 디렉터리를 만들어 줍니다.

```shell
$ mkdir packages
$ mkdir packages/coreui
$ mkdir packages/webapp
```

- 그리고 아래 명령을 입력해 보세요.

```shell
$ yarn workspaces list
```

이 명령은 프로젝트에 모든 workspace 목록을 출력하는 명령어 인데요, 지금은 아무것도 없다고 나올겁니다.
yarn workspace 는 workspace 로 사용하겠다고 명시한 디렉터리에 package.json 이 없으면 인식하지 못합니다.

- workspace 로 사용하겠다고 명시한 파일에 가서 `yarn init` 을 해주세요.
- 그리고 `yarn workspaces` list 명령어를 다시 실행해 봅니다.

```shell
$ yarn init # coreui, webapp 각각 실행해 주세요
$ yarn workspaces list # 이제 리스트를 잘 출력합니다.
➤ YN0000: .
➤ YN0000: packages/coreui
➤ YN0000: packages/webapp
➤ YN0000: Done in 0s 2ms
```

여기까지 진행하셨으면, 프로젝트는 아래와 같은 모습이 됩니다.

```
|---.vscode
|---.yarn
|---packages
    |---coreui // 여기가 storybook(vite) + esbuild 프로젝트가 될거고,
    |---webapp // 여기가 Next 프로젝트가 될겁니다
|---package.json
|---pnp.cjs
|---.pnp.loader.mjs
|---tsconfig.json
|---yarn.lock
```

여기서 우리는 root 에 있는 tsconfig.json file 을 tsconfig.base.json 파일로 이름을 변경 할텐데요. 공통이 되는 설정을 root 에 두고 각 프로젝트에서 extends 해 사용하기 위함입니다. 이름을 변경하고, 아래 내용을 입력해 주세요. 물론 당연히 저와 다른 설정을 사용하고 싶으시다면 바꾸면 되겠죠?

- tsconfig.json 파일의 이름을 tsconfig.base.json 으로 변경하고, 기존 설정을 아래처럼 바꾸어 주세요.

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": false,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true
  }
}
```

이번에는 `package.json` 에 `script` 를 추가 하겠습니다. 앞으로의 작업을 편하게 하기 위함인데요. yarn workspace 는 특정 작업영역에 있는 명령을 root 에서 실행할 수 있는 명령어를 제공합니다.

- 아래 두가지 스크립트를 추가해 주세요.

```json
// package.json
{ ... }
"scripts": {
  "coreui": "yarn workspace @packages/coreui",
  "webapp": "yarn workspace @packages/webapp"
},
{ ... }
```

위 스크립트에 각각 `@packages/coreui`/`@packages/webapp` 라고 적힌 부분이 workspace 에 해당하는 프로젝트중 하나를 특정하기 위함인데요. 이부분은 **coreui** 와 **webapp** 프로젝트의 `package.json` 내부 `name` 값과 일치해야 합니다.

- coreui 와 webapp 의 package.json 에 있는 name 을 수정해 주세요.

```json
// coreui/package.json
{
  "name": "@packages/coreui",
}

// webapp/package.json
{
  "name": "@packages/webapp",
}
```

이제부터 모든 작업은 root 에서 지금 package.json 에작성한 스크립트를 사용하여 진행 하겠습니다. 참고로, workspace 내 유일한 이름을 가진 스크립트가 존재한다면 프로젝트 이름을 특정하지 않아도 잘 돌아갑니다. 하지만 권장드리고 싶진 않습니다. 프로젝트가 복잡해 진다면 혼돈의 도가니가 올 가능성이 있기 때문입니다.

# storybook(vite) + esbuild 설정

저는 여기서 `storybook + vite` 삽질을 제일 많이 했는데요. 해결은 막상 하고보니 굉장히 간단했으나, 이렇게 하는거 맞아? 란 생각에 시간을 많이 사용하였습니다. 아직까지는 `vite` 를 사용할때 여기저기서 터지는 사례가 종종 들리네요. 하지만 vite 라는 도구는 참 매력적인듯 싶습니다. 이 예제는 `coreui` 에 공통으로 사용할 컴포넌트를 모아 라이브러리 처럼 build 할텐데요. 빌드엔 `esbuild` 와 `tsc` 를 사용합니다. esbuild 는 빨라서 좋은데, 제가 좋아하는 golang 으로 작성되어서 더 맘에듭니다.

- `coreui` 프로젝트를 `vite` 프로젝트로 `init` 해 주세요.
- 여기서 템플릿은 `react` 를 선택합니다.

```shell
$ dlx sb init --builder @storybook/builder-vite
$ 템플릿은 리액트 선택
```

스토리북 프로젝트의 initialize 가 완료된다면 package.json 에 있는 storybook 스크립트를 실행해 보세요.

```shell
$ yarn coreui storybook
```

지금은 vite 에 대한 의존성이 없다는 에러가 날 것입니다.

- vite 를 devDependencies 로 설치해 주세요.
- 그리고 다시 storybook 스크립트를 실행해 보겠습니다.

```shell
$ yarn coreui add --dev vite
$ yarn coreui storybook
```

제가 코드를 작성한 시점 기준 에러가 또 발생합니다. 필요한 의존성이 없다는 에러가 나고, 필요한 의존성을 설치해도 계속 날텐데요, 또다른 의존성이 필요하다는 에러가 날 것입니다. 이미 `github` 에 아래와 같은 `issue` 가 있더군요. 저는 여기서 삽질을 엄청 했습니다. 제가 설정을 잘못해서 지금 의존성을 제대로 참조하지 못하나 부터 시작해 별에별 의심을 하며, 이짓저짓을 해봤지만 그냥 버그였습니다.

- [https://github.com/storybookjs/builder-vite/issues/141](https://github.com/storybookjs/builder-vite/issues/141)

이 에러를 해결하기 위해, 에러 메시지에서 필요하다는 의존성을 잘보고 차근차근 설치해 주어야 합니다. 제가 추가로 설치한 의존성은 다음과 같습니다. 모두 **devDependencies** 로 설치하면 됩니다.

- @storybook/preview-web
- @storybook/addon-backgrounds
- @storybook/addon-measure
- @storybook/channel-postmessag
- @storybook/channel-websocket
- @storybook/addons
- react react-dom

그럼 의존성을 설치합시다. 의존성이 잘 보이도록 편의상 나누어 작성합니다.

- 아래 명령어로 의존성을 설치해 주세요.

```shell
$ yarn coreui add --dev @storybook/preview-web @storybook/addon-backgrounds
$ yarn coreui add --dev @storybook/addon-measure @storybook/channel-postmessag
$ yarn coreui add --dev @storybook/channel-websocket @storybook/addons
$ yarn coreui add --dev react react-dom
```

제가 프로젝트를 만들던 시점과 변경이 생겼을수도 있어서, 위 의존성을 설치하고도 실행이 안될수 있습니다. error 메시지를 잘 읽어보고 의존성이 없다는 문구가 있다면 그 의존성을 잘 설치해 주시면 됩니다.

현재 작업중인 coreui 프로젝트는 라이브러리 처럼 빌드되어 다른 프로젝트에서 의존성으로 사용할 용도의 프로젝트 인데요. 이 예제에서는 빌드에 `esbuild` 와 `typescript` 를 사용할 것입니다. 일단 두 의존성을 설치해 줍니다. 한가지 첨언하자면 처음에 프로젝트 root 경로에 설치한 typescript 는 yarn berry 를 사용하겠다고 명시한 내 프로젝트 sdk 세팅에 관여합니다. 제 경우는 typescript 버전을 그냥 맞춰버리려고 `resolutions` 에 명시했는데요, 이건 상황에 따라 다를터이니 참고만 해주세요.

- 아래 명령어로 의존성을 설치해 주세요.

```shell
$ yarn coreui add --dev esbuild typescript
```

이제 `typescript` 와 `esbuild` 설정파일을 작성할 차례입니다. 이 프로젝트의 컴포넌트는 라이브러리 형태로 뽑아낼 것이기 때문에 `package.json` 파일도 수정합니다. 일단 typescript 설정파일을 먼저 작성해 보죠. 여기서는 두가지 파일을 작성할 텐대요. `tsconfig.json` 과 `tsconfig.build.json` 파일을 작성할 것입니다. 라이브러리 형태로 코드를 빌드시, type 을 뽑아내기 위한 설정도 해줍니다.

tsconfig.json 과 tsconfig.build.json 을 **따로 작성하는 이유는**, `exclude` 옵션을 다르게 가져가기 위해서 인데요. 이 프로젝트의 경우 exclude 설정이 없다면, build 시 사실상 가져다 쓰는쪽이 필요로 하지 않는 파일을 함께 컴파일 해버립니다.

- `tsconfig.json` 을 아래와 같이 작성해 주세요. 기억해둘 부분은 다음과 같습니다.
  - declaration: **d.ts** 파일을 만들어내기 위해 true 로 명시합니다.
  - emitDeclarationOnly: **d.ts** 선언파일만을 내보냅니다. **js** 파일은 **esbuild** 로 처리할 예정입니다.

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "./",
    "emitDeclarationOnly": true,
    "declaration": true,
    "jsx": "preserve"
  },
  "exclude": ["dist/*"]
}
```

- `tsconfig.build.json` 을 아래와 같이 작성해 주세요. 기억해둘 부분은 다음과 같습니다.
  - `exclude`: 현재 esbuild 나 storybook 관련 파일은 처리하지 않도록 추가해 두었습니다.

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist",
    "emitDeclarationOnly": true,
    "declaration": true,
    "jsx": "preserve"
  },
  "exclude": ["dist/*", "esbuild*", "**/**/*.stories.*"]
}
```

- `package.json` 파일을 아래와 같이 작성해 주세요. 기억해둘 부분은 다음과 같습니다.
  - **option**
    - main: 이 모듈을 가져오는 파일의 시작점이 됩니다. import 시 `./dist/index.js` 가 불려와 집니다.
    - version: 말 그대로 버전인데요. 여기 적힌 버전을 workspace 내 다른 프로젝트에서 사용하기 위해 `package.json` 에 추가할 경우 사용합니다.
    - module: ESM 버전을 가져오는 방법을 지정하기 위한 번들러 간의 일반적인 규칙입니다. 공식으로 채택된 스펙은 아닙니다.
    - types: 이 모듈을 가져오는 타입의 시작점이 됩니다. `./dist/index.d.ts` 가 됩니다.
    - exports: 위 언급한 _module_ 은 공식이 아니지만 이 필드는 **공식**입니다.
      - 몇가지 사용방법을 제공합니다.
      - 현재는 **require**/**import** 로 각각 불릴때, 다른 형태의 모듈을 제공하도록 설정한 상태입니다.
  - **scripts**:
    - build:dev: 특별할건 없지만 && 가 아닌 & 로 명령어를 실행했습니다. 이는 watch 로 실행시 yarn berry 의 버그로 인해 작동을 잘 안한다고 했던 [issue](https://github.com/yarnpkg/berry/issues/1349) 가 있긴한데, 해결된것 같기도 하지만 잘 작동을 안하더군요. 현재는 큰 지장이 없을것 같아서 깊이 알아보진 않고, 백그라운드로 명령을 실행시켰습니다.

위 설명에 관하여 참고할 만한 링크는 다음과 같습니다.

- **package.json**
  - module field 관련
    - [esbuild 공식문서 - api/main-fields](https://esbuild.github.io/api/#main-fields)
    - [stack overflow 관련 글](https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for)
  - export field 관련
    - [nodejs 공식문서 - api/packges](https://nodejs.org/api/packages.html)
    - [toss - commonjs 와 esm 에 모두 대응하는 라이브러리 만들기](https://toss.tech/article/commonjs-esm-exports-field)

```json
{
  "name": "@packages/coreui",
  "packageManager": "yarn@3.3.0",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs"
    }
  },
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "build:dts": "tsc --build tsconfig.build.json",
    "build:js": "node ./esbuild.config.js",
    "build": "yarn build:dts && yarn build:js",
    "build:dev": "yarn build:js --watch & yarn build:dts --watch"
  }
  { ... }
}
```

이제 `esbuild` 관련 설정을 할 차례입니다.

- coreui 최상단 경로에 `esbuild.config.js` 파일을 만들고,
- 내용을 아래와 같이 작성해 주세요.

```shell
$ touch packages/coreui/esbuild.config.js
```

```javascript
/**
 * esbuild.config.js
 */
const { build } = require('esbuild');
const pkg = require('./package.json');

const watch = process.argv.includes('--watch');
const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

const commonConfig = {
  entryPoints: ['./index.ts'],
  outdir: 'dist',
  target: 'es2015',
  bundle: true,
  tsconfig: 'tsconfig.build.json',
  external: [...external],
  sourcemap: true,
};

Promise.all([
  build({
    ...commonConfig,
    format: 'cjs',
    watch,
    minify: !watch,
  }),
  build({
    ...commonConfig,
    format: 'esm',
    outExtension: {
      '.js': '.mjs',
    },
    watch,
    minify: !watch,
  }),
]).catch(() => process.exit(1));
```

위 설정을 살펴보면, `cjs` 와 `mjs` 를 모두 지원토록 설정을 작성했는데요. 신경써서 보실만한 부분은 `external` 설정 정도일것 같습니다. 저는 peerDependencies 및 devDependencies 만을 현재 사용하고 있습니다. 때문에 굳이 bundle 에 포함시킬 의존성이 없어서 모든 의존성을 제외하도록 설정 했습니다.

# Next.js 프로젝트 설정및 workspace 의존성 추가

이 예제는 `webapp` 프로젝트를 `next.js` 프로젝트로 만듭니다. 근데 뭐, 이건 정말 별거 없습니다. 의존성을 설치하고 next 를 실행하기만 하면 됩니다. 일단 이 프로젝트를 next.js 프로젝트로 만들어 보겠습니다.

- 의존성을 설치하고, pages 디렉터리를 만들어 주세요.

```shell
$ yarn webapp add next react react-dom
$ mkdir packages/webapp/pages
```

- `package.json` 에 아래 내용을 추가한뒤 프로젝트를 실행해 주세요. 필요한 작업을 next 가 알아서 해 줍니다.
- 저는 추가로 `tscofnig.json` 을 수정한 상태인데요. 이부분은 [코드](https://github.com/rlawnsxo131/yarn-berry-monorepo-esbuild/blob/main/packages/webapp/tsconfig.json)를 첨부합니다. 입맛에 따라 수정해 주세요.

```json
{
  "scripts": {
    "start:dev": "next dev"
  }
}
```

```shell
$ yarn webapp start:dev
```

# coreui 프로젝트를 라이브러리 형태로 build 하기

일단 `coreui` 프로젝트에 간단한 컴포넌트를 하나 작성해 보겠습니다.

- `components` 디렉터리를만들고, `Button` 컴포넌트를 만들어 주세요.

```shell
$ mkdir packages/coreui/components
$ mkdir packages/coreui/components/Button

$ touch packages/coreui/components/Button/Button.tsx
$ touch packages/coreui/components/Button/index.ts
```

```tsx
/**
 * coreui/Button/Button.tsx
 */
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, ...props }: Props) {
  return <button {...props}>{children}</button>;
}

export default Button;
```

```ts
/**
 * coreui/Button/index.ts
 */
export { default } from './Button';
```

이 예제에서는 components 에 디렉터리 이름을 기준으로 컴포넌트를 내보낼 것입니다.

- `components` 디렉터리와 프로젝트 **root** 아래 `index.ts` 파일을 만들고 컴포넌트를 내보내 주세요.

```shell
$ touch packages/coreui/components/index.ts
$ touch packages/coreui/index.ts
```

```typescript
/**
 * coreui/components/index.ts
 */
export { default as Button } from './Button';
```

```typescript
/**
 * coreui/index.ts
 */
export * from './components';
```

이제 컴포넌트를 빌드할 차례입니다. 아까 작성해둔 build 스크립트를 실행해 주세요. 지금은 그냥 build 를 하지만, 즉각적으로 개발하며 결과물을 봐야 한다면 --watch 옵션을 사용한 `build:dev` 스크립트를 실행하면 됩니다.

- 아래 스크립트를 실행해 주세요

```shell
$ yarn coreui build
```

# webapp 프로젝트에서 @packages/coreui 사용하기

이제 위에서 build 한 coreui 프로젝트를 webapp 프로젝트에서 사용해 보겠습니다. `package.json` 에 명시하고 이를 연결해 주기만 하면 되는데요. 아까 위에서 작성했던 **coreui 프로젝트의 package.json** 옵션을 떠올려 보세요.

- `package.json` 에 coreui 의존성을 추가합니다.

```json
// webapp/package.json
{
  "dependencies": {
    "@packages/coreui": "workspace:0.0.0" // 버전은 와일드카드(*) 도 사용 가능합니다.
  }
}
```

coreui 프로젝트의 packge.json 파일에 입력한 name 이 의존성에 이름이 되고, 버전은 위 주석을 참고해 현 상황에 맞게 작성해 주시면 됩니다. 이작업 후에 꼭 해야 할 것이 있는데요, root 에서 yarn install 을 한번 실행해 workspace 내 의존하고 있는 프로젝트간 관계를 연결시켜 주어야 합니다.

- 프로젝트의 루트(monorepo-example)에서 yarn install 을 실행해 주세요.

```shell
$ yarn install
```

그리고 webapp 프로젝트에서 아래와 같이 사용하면 되는데요.

- 아래와 같이 `index.tsx` 파일을 작성하고, 개발모드로 프로젝트를 실행해 보세요.

```tsx
/**
 * packages/webapp/pages/index.tsx
 */
import { Button } from '@packages/coreui';

import John from '@/components/John';

export default function App() {
  return (
    <div>
      <Button onClick={() => alert('hello')}>click</Button>
      <John />
    </div>
  );
}
```

```shell
$ yarn webapp start:dev
```

네 어림도 없죠. 에러가 발생할 텐데요. Next.js는 빌드 시 프로젝트 디렉토리 안의 파일들만 트랜스파일 합니다. 이를 처리하기 위해 `next-transpile-modules` 를 설치하고, `next.config.mjs` 를 수정해 줍니다. 기존에 다른 plugin 을 함께 사용하고 있었다면 [next-compose-plugins](https://github.com/cyrilwanner/next-compose-plugins) 을 사용하면 됩니다.

- `next-transpile-modules` 를 설치하고, `next.config.mjs` 를 수정해 주세요.

```shell
$ yarn webapp add --dev next-transpile-modules
```

```js
import transpiler from 'next-transpile-modules';

const withTM = transpiler(['@packages/coreui']);

const nextConfig = {
  swcMinify: true,
  compress: true,
  webpack: (config, options) => {
    config.resolve.fallback = { fs: false };
    if (!options.dev) {
      config.devtool = options.isServer ? false : 'hidden-source-map';
    }

    return config;
  },
};

export default withTM(nextConfig);
```

# 더 생각해보면 좋은것들

- **@pacakges/coreui**

`@packages/coreui` 를 현재는 `esbuild` 로 미리 컴파일해 `library` 형태로 제공하고 있습니다. 사실 이 부분은 내가 library 형태로 제공할 필요가 없는경우 처리가 필요 없을수도 있습니다. `package.json` 에 `main` 을 `index.ts` 로선언하고 `export` 옵션만을 적어줘도 될 테니까요. 이부분은 상황에 맞게 사용하면 될 것 같습니다.

- **test with jest**

이 글에서는 다루지 않았으나, 예시코드에는 jest 설정과 eslint 설정을 해둔 상태인데요. `yarn berry` 의 경우 라이브러리 호이스팅을 사용하지 않습니다. 덕분에 `nohoist` 옵션을 사용하지 않아도 됩니다. 하지만 jest 의 경우 전역적으로 버전이 같아도 크게 문제가 없을것 같다는 생각인데요. 이게 yarn berry 에서 권장하는 방식이 맞는지 아직 확신이 서질 않습니다. root 만 `jest` 를 소유한채 각 디렉터리가 config 를 따로 가지고 있다면, root 에서 `yarn workspaces` 명령어로 test 가 전부 가능합니다. 제 생각엔 workspace 내의 프로젝트별 테스트시 jest 의 버전이 달라야 하는 이유가 있는 경우를 제외하곤 상관 없을것 같긴 하나, 고민 해볼 만한 부분 같습니다.  
`yarn workspaces foreach` 명령어를 사용하거나, [공통스크립트를 사용하는 방법](https://yarnpkg.com/getting-started/qa#how-to-share-scripts-between-workspaces) 을 추가로 봐도 좋을것 같습니다.

- **storybook**

오랜만에 `storybook` 을 세팅해보니 뭐가 많이 달라졌더군요. 예전에 `knobs` 에서 제공하던 기능들은 기본으로 탑재되고, 이것저것 옵션이 많이 달라진것 같습니다. 이건 나중에 storybook 을 사용할 일이있으면 문서를 다시한번 자세히 읽어볼 생각입니다.

# 마치며

여기까지 긴 글을 읽어주셔서 감사합니다. 오랜만에 monorepo 를 세팅하며, 평소 잘 사용하지 않았지만 관심있던 기술을 사용해보니 개인적으로 참 재미있었는데요. 이글이 누군가에게 도움이 되었으면 좋겠습니다. 늘 즐거운 코딩이 되시길 바랍니다. 감사합니다.

# Ref

- [yarn 공식문서](https://yarnpkg.com/): 좀 많이 아쉽습니다. 문서가 더 자세하면 좋겠어요...
- [storybook template react vs react product 차이](https://stackoverflow.com/questions/71074658/whats-the-difference-react-vs-react-project-vs-webpack-react-for-storybook)
- [우아한 형제들 기술블로그](https://techblog.woowahan.com/7976/)
- [storybook webpack5 migration](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#wrong-webpack-version)
- [공식 storybook vite guides](https://storybook.js.org/docs/react/builders/vite)
- [공식 typescript cli options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [vite 공식문서](https://vitejs-kr.github.io/)
- [esbuild 공식문서 - api/main-fields](https://esbuild.github.io/api/#main-fields)
- [stack overflow field 관련 글](https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for)
- [nodejs 공식문서 export field 관련 글- api/packges](https://nodejs.org/api/packages.html)
- [toss - commonjs 와 esm 에 모두 대응하는 라이브러리 만들기](https://toss.tech/article/commonjs-esm-exports-field)
- [Nextjs 사전 transpiling 관련글](https://minemanemo.tistory.com/168)
