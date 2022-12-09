---
title: 모노레포를 마주하며 2 - monorepo 세팅
description: yarn berry workspace + storybook(vite) + esbuild 를 이용한 monorepo 세팅
tags:
  - Monorepo
  - Architecture
thumbnail: https://image-devlog.juntae.kim/john/john_home_cherry_blossom.jpg
date: 2022-12-10
slug: as-I-face-the-monorepo-2
---

# Table of Contents

# 글을 시작하며

이 글은 [모노레포를 마주하며 1 - 의사결정과 컴포넌트 설계](/post/as-I-face-the-monorepo-1) 에서 이어집니다.

```
프로젝트 설정 과정만 보고 싶다면 위 글은 읽지 않으셔도 됩니다.
```

안녕하세요. 이번엔 직접 `monorepo` 프로젝트를 세팅해 볼텐데요. 예제는 **mac book** + **vscode** 를 기준으로 진행합니다. 기왕에 하는거, 제가 요즘 관심갖고 있거나 잘 모르는 녀석들로 세팅해 보고싶었습니다. `yarn berry worksapce` + `typescript` + `storybook(vite)` + `next` 를 이용해 monorepo 프로젝트를 세팅합니다. 추가로 간단한 `jest` 와 `eslint` 환경을 세팅합니다. 공통을 사용할 컴포넌트는 `esbuild` 로 빌드합니다. 전체 `소스코드가` 궁금하시다면 아래 링크를 참고해 주세요.

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

이렇게 프로젝트 sdk 설정을 하면 typescript 버전을 이 workspace 버전을 사용할꺼냐 라는 질문을 합니다.

- workspace 버전을 선택해 주세요.

여기까지 진행하셨다면, 프로젝트는 다음과 같은 파일을 지니게 됩니다.

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
$ cd packages
$ mkdir coreui
$ mkdir webapp
```

- 그리고 아래 명령을 입력해 보세요.

```shell
$ yarn workspaces list
```

이 명령은 프로젝트에 모든 workspace 목록을 출력하는 명령어 인데요, 지금은 아무것도 없다고 나올겁니다.
yarn workspace 는 workspace 로 사용하겠다고 명시한 디렉터리에 package.json 이 없으면 인식하지 않습니다.

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

이번에는 `package.json` 에 `script` 를 추가 하겠습니다. 앞으로의 작업을 편하게 하기 위함인데요. yarn workspace 는 특정 작업영역에 있는 명령을 root 에서 실행가능케 하는 기능을 제공합니다.

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

# storybook(vite) + esbuild 설정

저는 여기서 제일 삽질을 많이 했는데요. 해결은 막상 하고보니 굉장히 간단했으나, 이렇게 하는거 맞아? 란 생각에 시간을 많이 사용하였습니다. 아직까지는 `vite` 를 사용할때 여기저기서 터지는 사례가 종종 들리네요. 하지만 vite 라는 도구는 참 매력적인듯 싶습니다. 이 예제는 `coreui` 에 공통으로 사용할 컴포넌트를 모아 라이브러리 처럼 build 할텐데요. 빌드엔 `esbuild` 와 `tsc` 를 사용합니다. esbuild 는 빨라서 좋은데, 제가 좋아하는 golang 으로 작성되어서 더 맘에듭니다.
