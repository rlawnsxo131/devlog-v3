---
title: 모노레포를 마주하며 1 - 의사결정과 컴포넌트 설계
description: 모노레포를 도입하는 시기와 공통 컴포넌트를 설계하며 느낀점을 이야기합니다
tags:
  - Monorepo
  - Architecture
thumbnail: https://image-devlog.juntae.kim/john/john_home_cherry_blossom_2.jpeg
date: 2022-12-10
slug: as-I-face-the-monorepo-1
---

# Table of Contents

# 글을 시작하며

얼마전 회사에서, 유지보수중인 프로젝트에 `monorepo` 를 도입하며 문득 들었던 생각이 있습니다.  
제가 예전에도(이전 회사) 이와 비슷한 이유로 **monorepo** 를 도입하지 않았었나? 하는 생각입니다.  
기억이라 해야 맞을까요? 그래서 이 기회에 monorepo 를 도입하며 제가 느낀점들과 프로젝트를 세팅하는 간단한 예제를 적어보려 합니다. 이번에 회사에서 진행중인 프로젝트엔 `pnpm` 을 사용했지만, 이번엔 `yarn berry` 와 제게 익숙하지 않은 스택으로 세팅을 해보고 싶어서 예제는 yarn berry 를 사용하였습니다.

이 글에서는, monorepo 를 도입하며 느낀 배경과 프로젝트를 package 별로 떼어내며 느낀점. 의사결정 과정에 대하여 이야기 합니다. 모노레포 프로젝트를 **세팅하는 예제**는 다음글에 이어집니다. 해당 내용이나 소스코드가 궁금하시다면 링크를 참고해 주세요.

- [모노레포를 마주하며 2 - monorepo 세팅](https://devlog.juntae.kim/post/as-I-face-the-monorepo-2)
- [예제 코드 repository](https://github.com/rlawnsxo131/yarn-berry-monorepo-esbuild)

# monorepo 는 새로운 개념인가?

이 글에서는, 모노레포의 개념에 대한 부분은 자세히 다루지 않습니다. 이미 좋은 글이 충분히 많다고 느껴서 인데요. 개인적으로 모노레포의 전반적인 개념에 대하여 잘 다루었다고 생각하는 글의 링크를 남기겠습니다.

- [https://d2.naver.com/helloworld/0923884](https://d2.naver.com/helloworld/0923884)

이어서, 제가 이야기하고 싶은 부분은 다음과 같습니다. 요즘 컨퍼런스에서 `frontend` 에 관한 내용을 다룰때면, 심심찮게 나오는 이 `monorepo` 라는 녀석은 엄청나게 **새로운** 개념일까요? 혹은 우리의 프로젝트의 복잡성을 줄여주기 위한 마법같은 도구가 드디어 등장한 것일까요?

제가 monorepo 를 실무에서 처음 도입해본 시기는 **2020년 05월** 즈음 입니다. 햇수로 3년 정도 전의 일인듯 싶습니다만, 이때 저는 모노레포라는 이 개념이 새로운 패러다임 이라는 생각은 들지 않았었는데요. 이미 비슷한 개념의 도구들의 이야기는 눈팅을 해왔기 때문이죠.

제가 잘은 몰라도, `JVM` 진영의 Gradle multi module 같은 도구(개념) 이나, 제가 즐겨쓰는 `golang` 의 경우는 애초에 module 을 기준으로, 해당 기능을 똑 떼어 사용할수 있는 방법을 이미 손쉽게 지원하고 있었습니다(비교적 최근에는 더욱 강력한 workspace 라는 기능도 나왔습니다). 저는 javascript 진영의 monorepo 사용 사례보다, 위 두가지 사례를 개인적으로 더 일찍이 접했기 때문에 새롭지는 않았었는데요. 다만, 이번에는 아래와 같은 의문이 한가지 들었습니다.

```
왜 지금일까? 내가 잘못 알고있을 수도 있다.
근데, 확실히 이전보다는 요즘 monorepo 에 대한 언급이 잦아진건 맞는것 같다.
근데 왜? 얼마든지 더 일찍 도입할 수 있었을 것이고, 내가 모르는 곳에서
이미 도입해 잘 사용하고 있었을 수도 있는데. 왜 요즘 이야기 빈도수가 확 늘어난것 같지?
```

# monorepo 를 도입하는 시기

위 의문으로, 제가 실무에서 처음 `monorepo` 를 도입하게 된 계기를 다시 생각해 보게 되었습니다. 당시 monorepo 를 도입하게 된 의사결정 과정은 아래와 같았는데요.

1. 제가 속한 조직에서 개발중인 서비스를 다른 mobile application 에서 import 할 수 있어야 했습니다.
2. 말인 즉슨 타사의 mobile application 에 embed 할 수 있어야 하고, 이를 webview 로 제공해야 했습니다.
3. 서비스 중인 mobile application 의 기능을 web application 으로 포팅하는 작업을 시작합니다.
4. 기획서와 디자인을 살피고 작업에 들어가려다 보니 A, B 회사의 특성에 따른 비즈니스 로직의 차이가 있습니다.
5. 반대로 서비스의 근본적인 기능과 각 컴포넌트의 디자인등은 완전히 동일합니다.

위 조건에 맞는 프로젝트 구조를 논의 시작합니다.

1. private 한 library 형태로 사내 저장소를 만들까? 했지만 현재 필요한 기능에 비해 너무 큰 작업 같습니다.
2. 해당 기능을 활용할 수 있는 다른 케이스가 있다는 확신이 없는 상황에서, 큰 공수를 들이고 싶지는 않았습니다.
3. 그럼 git submodule 을 써볼까? 이전 프로젝트에서 사용해본 바, 저와 팀원은 또 쓰고싶단 생각은 들지 않았습니다.
4. 그럼 repo 하나에 독립된 프로젝트를 몰기 좋은 monorepo 의 개념은 어때? 란 생각을 하게 되고, 현시점 가장 적당한 방법이란 결론에 도달합니다.

여기까지 의사결정을 하며, 당시에는 크게 생각하지 못했던 부분이 있는데요. 프로덕트를 만드는 팀은 언제나 서비스가 커지면서 그에 맞는 적절한 방법과 도구를 찾을 수 밖에 없다고 생각합니다. 그리고 제품은 아래의 수순을 밟아 나아가는 경우가 꽤 많을 것 이라는 생각이 듭니다.

1. 내가 만드는 서비스가 갖추어야 하는 비즈니스적 요구가 늘어남과 동시에 필요한 기능이 추가됩니다.
2. 당연히 어플리케이션의 사이즈가 일정 수준 이상으로 커지게 됩니다. 어플리케이션의 개수가 늘어날 수도 있습니다.
3. 이와 함께 어플리케이션의 품질을 위한 여러 요소가 추가되기 시작합니다(design system, core module 등).
4. 이는 곧 효율적인 운영을 생각하게 하고, 유지보수와 공수를 생각하는 방향으로 자연스레 흐릅니다.
5. 파편화된 리소스를 모으고, 이를 효율적으로 관리하려면 어떤 방법이 좋을까를 고민합니다.

위와 유사한 과정을 거친다면, javascript 의 생태계 안에서 개발하는 사람은 누구나 한 번쯤은 `monorepo` 라는 녀석을 마주칠 가능성이 크다는 생각을 했습니다. 그만큼 성장한 웹 서비스들(혹은 library)이 늘어난 만큼, monorepo 라는 주제를 마주하는 일이 많아진다는 것은 어찌 보면 당연할 수도 있을 것 같습니다.

저는 monorepo 가 갖는 대부분의 장점은 `multirepo` 의 단점이고, multirepo 가 갖는 대부분의 장점은 곧 monorepo 가 갖는 단점이라고 생각합니다. 즉, 장단이 분명한 만큼 이를 효율적으로 써야 우리 팀의 제품에 효과적인 영향력을 가져다 줄 것이라는 생각인데요. 저는 공통된 관심사가 무엇인가 반복되는 경우가 잦다면, monorepo 를 도입하기에 가장 좋은환경이 아닌가 생각합니다. ci/cd 나 devops 환경, component, business logic 등 말이에요. 물론 반복되는 관심사가 꼭 있어야만 monorepo 를 도입해야 한다는 것은 아닙니다. 예를들어 한 팀에서 관리해야 하는 프로젝트가 여러개라면, 관리의 용이함을 위해서라도 충분히 도입할수 있다는 생각입니다. 제 경우 실무에서 경험한 두 번의 케이스는 굉장히 비슷한 상황이었는데요. 그 이야기를 시작해 보겠습니다.

# 공통 컴포넌트 설계하기

제가 운영중인 프로젝트에 `monorepo`를 도입한 이유는 모두 동일 했습니다. 동일한 ui/ux 를 가진 컴포넌트가 굉장히 반복적으로 사용되었고, 이로 인한 중복코드와 프로젝트별 repository 가 늘어나는 상황을 개선하고 싶었습니다. 이전 직장도 그랬고 현재도 그렇습니다. 서비스를 만드는 개발자라면 공감할 말인 듯 싶은데요. 다 똑같은데 한두 군데가 다릅니다. 정말 미세하게 말이에요.

- A 에는 버튼이 있고, B 에는 없지만 나머지가 다 똑같거나,
- B 에는 쿠폰을 다운로드 할 수 있는 컴포넌트가 있는데, A 에는 그려지면 안됩니다.
- 이를테면 아래와 같은 상황이랄까요?

```
// A: 이녀석은 오른쪽 끝에 버튼을 그리지만
title      button
```

```
// B: 이녀석은 아무것도 없어야 하고
title
```

```
// C: 이녀석은 select box 를 그려야 한달까요?
title   selectbox
```

뭐 사실 이미 관련된 좋은 글도 많고, 유연한 컴포넌트를 설계하기 위한 고민은 frontend 개발자라면 누구든 한번쯤은 해볼법한 고민인지라 흔한 내용일 수도 있는데요. 여기서 저는 `Dependency Injection` 이라는 개념을 한번 짚고 넘어가고 싶습니다. `의존성 주입` 은 무엇일까요? 저는 이 개념이 근본적으로 말하고 있는 바가, 사실 아주 간단하다고 봅니다.

> 무엇이 되었든 특정 관심사에 의존해야 하는 A 라는 존재가 있다면,  
> 이걸 A 가 아닌 외부에서 결정하고 주입하게 만든다는 이야기 입니다.

이를테면 Button 이라는 의존성을 필요로 하는 컴포넌트가 있습니다. 하지만 Button 을 그릴때도 있고, 아닐때도 있어야 하는 상황이에요. 그럼 이 컴포넌트를 가장 쉽게 작성하는 방법은 무엇일까요? 제가 생각하는 코드는 다음과 같습니다.

```jsx
function John({ button }) {
  return (
    <div>
      <h3>{title}</h3>
      {button}
    </div>
  );
}
```

뭐 상황에 따라 children 이 될 수도 있고, 위처럼 button 을 특정할 수 도 있지만 지금 제가 이야기하고 싶은 부분은 `외부`로부터 내가 필요로 하는 `관심사`를 `주입` 받는다는 사실입니다. 제가 주로 사용하는 `React` 는 `props` 로 값을 넘기는 것이 너무나 자연스런 도구입니다. 이를 통해 `interface` 만을 정의하고, 외부로부터 필요로 하는 관심사를 주입 받는 것을 제공하는 도구이죠. 그럼 React 가 제공하는 Props 라는 개념을 이용해 컴포넌트를 어떻게 확장할 수 있을까요?

## 컴포넌트 확장하기(Children, Props)

위의 코드를 보셔서 알겠지만, 컴포넌트를 확장하는 가장 간단한 방법중 한가지는, props 로 component 자체를 받는것 입니다. 하지만 이것도 정도에 따라 장단점이 있다고 생각합니다. 아래 케이스를 살펴보겠습니다.

```tsx
/**
 * 자식으로 모든 것을 받을 수 있는 컴포넌트
 */
function ChildrenPropsComponent({ children }) {
  return <div>{children}</div>;
}

/**
 * 사용한다면?
 * 어떤 자식을 받든 제약이 없다.
 */
function Component1() {
  return (
    <ChildrenPropsComponent>
      <div>hello</div>
    </ChildrenPropsComponent>
  );
}

function Component2() {
  return (
    <ChildrenPropsComponent>
      <div>hello</div>
      <div>world</div>
    </ChildrenPropsComponent>
  );
}
```

제가 생각하기에 위 컴포넌트는, 장점과 단점이 모두 존재합니다.

- 일단, 자식으로 어떠한 컴포넌트가 올지라도 유연한 대응이 가능합니다.
- 하지만 너무 유연한 나머지, 어떤 제약이나 이 컴포넌트를 언제 사용해야 하는지 등의 요소를 알기가 쉽지 않습니다.

그럼, 위와같은 형태는 어떤 방식으로 사용하면 좋을까요? 혹은, 어떻게 단점을 상쇄해 낼 수 있을까요? 저는 `Compound Components` 패턴 등을 섞어 컴포넌트를 설계할때 위와 같은 형태를 사용하는데요. `Select`, `Layout`, `Popup` 등의 컴포넌트 작성시 즐겨 사용합니다. 아래의 예시를 살펴보겠습니다.

```jsx
/**
 * 컴포넌트 정의
 */
function Header() { ... }

function Main() { ... }

function Footer() { ... }

function Aside() { ... }

function Layout({ children }) {
  return <div>{children}</div>;
}

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;
Layout.Aside = Aside;
```

위 컴포넌트는 어떤 장점이 있을까요? 일단 기반이 되는 `Layout` 을 기준으로 관련된 컴포넌트를 `property` 로 정의 했습니다. 이와 같은 경우는 내부에 해당 컴포넌트의 property 로 정의된 요소 **외의** 변화가 있을때나, 혹은 property 중 일부만을 사용하고 싶을때 유용하게 사용 가능합니다. 관련된 컴포넌트를 property 로 정의해 자주 함께 사용되는 요소를 **응집** 시키고, `children` 을 props 로 받아 유연한 변화를 가능케한 모습의 컴포넌트 입니다. 사용시 아래와 같은 모습을 지니게 되죠.

```jsx
/**
 * 사용하기
 */

// Layout, Header, Main 사용
function Page1() {
  return (
    <Layout>
      <Layout.Header>
        <h1>hello</h1>
      </Layout.Header>
      <Layout.Main>
        <article>article</article>
      </Layout.Main>
    </Layout>
  );
}

// Layout, Header, Main, Footer 사용
function Page2() {
  return (
    <Layout>
      <Layout.Header>
        <h1>hello</h1>
      </Layout.Header>
      <Layout.Main>
        <article>article</article>
      </Layout.Main>
      <Layout.Footer>
        <div>
          <button onClick={() => alert('hello')}>click</button>
        </div>
      </Layout.Footer>
    </Layout>
  );
}
```

하지만 어떨땐, 위의 예시는 아쉬운 경우가 있습니다. 예를 들어 특정 요소의 위치를 `Header`/`Footer` 등에서 강제한다거나, 이 컴포넌트 만큼은 꼭 내가 받아야 해 라고 주장하는 부분이 결여되어 있기 때문인데요. 위 예제 역시 약간의 변화를 주어 쉽게 구현할 수 있습니다. 위 컴포넌트에서 `Header` 내부에 아이템을 양끝 정렬을 시키고, 그에 해당하는 아이템은 유연하게 받고 싶다고 가정하겠습니다. 이 경우는 아래와 같이 props 를 조금 수정하여, 약간의 **강제**만 추가해주면 됩니다.

```jsx
/**
 * 컴포넌트 정의
 */
function Header({ leftSideItems, rightSideItems }) {
  return (
    <div>
      <div>{leftSideItems}</div>
      <div>{rightSideItems}</div>
    </div>
  );
}

/**
 * 사용하기
 */
function Page() {
  return (
    <Layout>
      <Layout.Header
        leftSideItems={<div>left</div>}
        rightSideItems={
          <>
            <SomethingComponent1 />
            <SomethingComponent2 />
          </>
        }
      />
      { ... }
    </Layout>
  );
}
```

이렇게 적절한 변화를 주면서 컴포넌트를 설계한다면, 외부의 변화에 유연하면서 특정 조건은 만족시키는 컴포넌트를 작성하기가 굉장히 쉬워집니다. 그럼 여기서 한가지 요소를 더 추가하는 케이스를 살펴보면 어떨까 싶습니다. 내가 작성하는 컴포넌트를 다른 팀원이 사용할때, 타인에게 `특정 로직`을 **반드시 받아서 처리하는 컴포넌트**를 구현해야 한다는 사실을 알리고 싶다면 어떻게 해야할까요? view 는 유연하되, 어떤 처리는 꼭 해야한다는 정보를 사용자에게 주고 싶다면요.

## 컴포넌트 확장하기(Render Props With Typescript)

`render props` 는 굉장히 잘 알려진 개념이라 이미 아시거나, 들어보신 분들이 많을것 같습니다. 특히나 `class component` 가 주가 되던 시기엔 `hoc`과 더불어 참 많이 보이던 패턴인데요. 이 패턴을 활용할 만한 상황을 예시로 살펴보겠습니다.

- 내부의 내용은 무엇이든 그릴 수 있지만
- 팝업을 닫는 이벤트는 내부의 컴포넌트중 어느 하나가 꼭 처리해야 하는 컴포넌트를 만들고 싶다면,
- 어떻게 하면 될까요? 예를들면 아래와 같이 말입니다.

```jsx
function PopupBase() { ... }

function Page() {
  return (
    <PopupBase>
      {/* 이렇게 아무 자식이나 올 수 있지만 */}
      {/* 자식중 하나의 요소가 꼭 닫는 기능을 구현해야 한다는 것을 강제하며 알리고 싶다면요? */}
      <div>aaa</div>
      <div>bbb</div>
      { ... }
    </PopupBase>
  )
}
```

위와 같은 경우는 `typescript` 와 `render props` 를 사용한다면 쉽고, 효과적으로 기능을 구현할 수 있습니다. 자식 요소를
**children** 으로 선언은 하지만, **특정 함수를 꼭 받아서 처리해야 하는 children 이라는 코드를 작성** 해주면 간단히 해결이 가능합니다. 이름은 자유롭게 사용하세요. children 이 아니어도 괜찮습니다. 이제 이 개념을 적용한 Popup component 의 형태를 살펴보겠습니다.

```tsx
type OnClose = () => void;

interface Props {
  children: (onClose: OnClose) => React.ReactNode; // 여기가 중요합니다.
  visible: boolean;
  onClose: OnClose;
}

function PopupBase({ children, visible, onClose }: Props) {
  if (!visible) return null;

  return <div>{children(onClose)}</div>;
}
```

위의 컴포넌트를 사용할때, 만약 onClose 함수를 처리하지 않은 children 을 주입하려 한다면, 에러가 나면서 typescript 컴파일러가 경고를 줍니다. 즉, 아래와 같은 코드를 작성시 경고를 줍니다.

```tsx
/**
 * 컴파일러가 경고를 뿜는 코드
 * Type 'Element' is not assignable to type '(onClose: OnClose) => ReactNode'.
 * Type 'Element' provides no match for the signature '(onClose: OnClose): ReactNode'
 * ts(2322)
 */
function Page() {
  const [visible, setVisible] = useState(false);

  const handleClose = () => setVisible(false);

  return (
    <PopupBase visible={visible} onClose={handleClose}>
      <div>onClose 를 처리하지 않고 있습니다.</div>
    </PopupBase>
  );
}
```

문제없이 사용하려 한다면 아래와 같은 코드를 작성해야 하죠. 물론 **onClose** 함수를 받아 컴포넌트를 그리는 함수를 작성해놓고도, 아래 컴포넌트에서 전달받은 함수를 사용하지 않는다면 말짱 꽝이긴 하지만... 설마 저걸보고도 꼭 처리해 달라는 의도를 알아채지 못하는 개발자는 없을것이라 생각입니다.

```tsx
function Page() {
  const [visible, setVisible] = useState(false);

  const handleClose = () => setVisible(false);

  return (
    <PopupBase visible={visible} onClose={handleClose}>
      {(onClose) => (
        <div>
          <div>onClose 를 처리합니다.</div>
          <button onClick={onClose}>닫기</button>
        </div>
      )}
    </PopupBase>
  );
}
```

저는 어떤 common 한 컴포넌트를 만들때, 다른 팀원이 이 컴포넌트를 사용할때를 자주 생각하는 편인데요. 어떤 방식으로 팀원이 실수할 가능성을 줄이면서 내가 주고 싶은 정보를 잘 알려주는 코드를 작성할 수 있나 에 대한 고민을 많이 하는 편입니다. 이러한 고민을 하고 계신다면 render props 나 여타 패턴을 살펴보시길 권해드리고 싶습니다. 아울러 render props 패턴을 typescript 와 함께 사용한다면 조금더 강력한 제약및 상세한 정보를 사용자에게(팀원) 줄 수 있을 것입니다.

여기까지 확장에 대한 간단한 내용을 다루어 보았는데요. 확장은 했으나, 어떤 부분을 조금 더 신경쓴다면 비교적 수정에 용이한 컴포넌트가 될 수 있을까요? 또는 다른 팀원이 내가 작성한 함수 혹은 컴포넌트를 사용시 어떻게 실수를 줄여주고 많은 정보를 줄 수 있을까요?

# 공통된 기능을 작성하며 생각해볼만한 것들

저는 개인적으로 공통된 기능을 작성시 신경쓰는 몇가지가 있습니다. 어찌보면 아주 간단하고, 단순한 부분을 신경쓰는 편인데요. 지금 당장은 세가지 정도가 떠오릅니다.

1. 최대한 많은 정보를 전달해 주는 코드 작성하기
2. presentational 컴포넌트의 성격을 띄는 경우 ui/ux 와 관계없는 상태를 다루는 로직은 절대 넣지 않기
3. 타입을 느슨하게 선언해서, 사용자의 혼란을 야기하지 않기. 아울러 꼭 알아야 하는 부분은 코드 레벨에서 강제하기

위 사항은 사실, backend 나 frontend 어느 특정 영역에 해당하는 개념이 아니라 공통된 기능을 작성하는 전반적인 부분에 신경을 쓰면 좋은 부분이라고 생각하는데요. frontend 에 대한 이야기만 했으나, backend 역시 공통 로직을 작성할땐 위와 같은 부분을 신경쓴다면 더욱 사용하기에 좋은 코드가 나온다고 생각하기 때문입니다. 예를 들어, 아래와 같은 방식으로 표현력이나 범용성을 높힌다고 할까요?

```javascript
// 이런 방식보다는
function alertIfExistError(err, message) {
  if (!err) return;
  alert(message);
}
alertIfExistError(err, '에러 발생');

// 이런방식으로 조금더 범용적인 함수를 선언하려 합니다
function alertIf(visible, message) {
  if (!visible) return;
  alert(message);
}
alertIf(!!err, '에러 발생');
```

위는 아주 단순한 예시이지만, alertIfExistsError 함수의 경우 error 의 유무만을 판단하여 alert 을 해주는 기능으로 밖에 사용할 수 없어 보입니다. 하지만 alertIf 라는 함수는 error 의 유무뿐 아닌 어떠한 상황에도 alert 을 해주는 함수로서 사용될 수 있죠. 함수가 조금더 범용적으로 사용될 수 있을것 같지 않나요? 그럼 이어서 몇가지 생각 해볼 만한 부분에 관한 이야기를 해보겠습니다.

## 타입과 코드의 차이를 만들지 않기

이번엔 잠시 typescript 와 관련된 `느슨한 타입` 선언에 대한 이야기를 해볼까 합니다. 조금더 정확히 이야기 하자면 `Type Driven Development` 를 이야기한다기 보단, 데이터의 자료형을 정확히 선언하여 실제 코드와의 차이가 없도록 하자 라는 이야기 인데요. 제가 실무에서 backend 개발을 주로 할 때도 그렇고, 현시점 frontend 개발을 할때도 그렇고 compile 언어를 사용할거면 compile 언어 답게 사용해야 한다는 생각을 갖고 있습니다. 왜냐? 이 타입이 느슨해 진다면 코드를 처음 작성한 나는 괜찮을 지언정, 나중에 이 코드나 타입을 사용하는 동료의 코드가 달라질 수 있기 때문입니다.

잠시 백엔드에 이야기를 하자면 저는 `에러가 나야하는 로직은 에러가 나는것이 더 좋다` 라는 생각을 기저에 갖고 로직을 작성하는 편인데요. 예를들어 sql 작성시 **SELECT FOR UPDATE** 를 사용하지 않으면 **dead lock** 을 피할수 있는 경우가 있습니다. 하지만 저는 차라리 dead lock 이 나는게 더 나은 상황이라고 생각하는 편인데, 이유는 다음과 같습니다.

- 만약 dead lock 이 나지않게 쿼리를 작성하여 지금 당장의 로직은 잘 실행이 되었을지언정,
- 데이터가 꼬여버리면 이건 정말 머리아픈 일이 생길 수 있습니다.
- 예를들어 초당 어떤 데이터를 변경하는 request 가 1,000 개정도만 발생했다고 가정해봐도,
- 1/10 의 확률로 데이터가 꼬인다면 벌써 100 개의 데이터가 꼬이게 됩니다.
- 만약 대용량 트래픽을 받아야 하는 서비스라면 위의 request는 우습겠죠?
- 만약 이 부분이 결제나 금액과 관련된 로직이라면 정말 생각하기도 싫네요...

그럼 이어서 frontend 이야기를 해보죠. frontend 에서는 제가 생각하는 타입이 느슨하다 라는 말의 의미가 특정상황 에서는 조금 다른데요. 예를들어 서버와 클라이언트는 어떤 값이 optional 하지 않은 값이라고 약속했다고 가정 하겠습니다. 하지만 이 약속과 다르게, 클라이언트 에서는 이 데이터를 의도하에 optional 하게 받는 경우가 종종 생기기도 하는데요. 저는 다음과 같은 의사결정이 있을때, 서버와 약속된 require 한 값을 optional 하게 처리한 경험이 가장 많았습니다.

1. 에러로 인한 나쁜 사용자 경험을 피하는 것이 더 중요하니, 우선은 작동할 수 있게 처리를 해주자.
2. 그 대신, optional 하게 값을 받더라도 이 값이 서버와 약속한 값과 다르게 넘어온다면, 꼭 알수있게 처리를 하자.
3. logging 은 최대한 자세히 하자(log는 정말정말 중요합니다).

자, 위와같은 약속이 되어있다고 할때 어떤부분에서 느슨한 타입선언이 생길 수 있을까요? 바로 타입과 내가 작성한 코드간에 이격이 생길때 입니다. 이건 typescript 라는 녀석이 갖는 특징때문에 생길수 있는 부분이기도 한데요. 코드로 보시죠.

```typescript
type MyObject = Record<string, string>;

const obj: MyObject = {};
const result = obj?.name ?? 'name';
```

위의 경우 optional 한 값이란 선언을 전혀 하지 않았음에도 컴파일러에서 특별히 무언가를 제약하지 않습니다. 이건 **다른 언어**를 하시던 분들께는 굉장히 이상할 수 있는 부분인데요. 예를들어 swift 의 경우 optional 한 값이란 표현을 해주지 않는다면, 어림도 없지 하며 경고를 내뿜습니다. kotlin 역시 저런식으로 코드를 작성한다면 너 optional 한 값으로 정의 안했는데 왜그래? 라며 린트가 경고를 줍니다. 몇일전 정말 혹시나 해서 앞단쪽(Frontend, iOS, Android) 개발을 하고있는 지인들에게 직접 물어보았으나 저런짓은 절대 안한다더군요 ㅋㅋㅋ. 어찌되었든, 위의 방식을 남용한다면 아래와 같은 상황이 생길 수 있습니다.

```tsx
interface Reseponse {
  id: string;
  profile: {
    name: string;
    age: number;
  };
}

function Page() {
  useEffect(() => {
    apiClient.get<Response>('/profile/1234').then(({ data }) => {
      const id = data.id;
      /**
       * 이 아래 두 로직을 보지 못하고 타입만을 본채 위 데이터 타입의 코드를 작성한다면,
       * 아마도 상당수는 optinal 한 값에대한 처리를 하지 않을것이라고 생각합니다.
       * 애초에 타입이 선언된 코드에 맞게 나는 코드를 작성했고, compiler 에서는 경고를 주지 않으니까요.
       */
      const name = data.profile?.name ?? '';
      const age = data.profile?.age ?? 0;
    });
  }, []);

  return (
    <div>{...}</div>
  )
}
```

타입은 optional 한 값이 아닌것으로 선언되어 있지만, 로직은 optional 한 값임을 고려해 작성되어 있습니다. 이게 무슨 문제냐구요? 선언된 타입과 다르게, 해당 값에 대한 optional 한 처리를 해야 한다고 알고있는 사람이 아니면 당연히 require 한 값이라고 인식을 할 가능성이 상당히 높다는 것이 문제입니다. 특히나 바쁘거나 새로운 팀원이 늘어나는 시기엔, 값에대한 처리를 하는 방식이 제각각이 될 가능성이 굉장히 커집니다. 아울러 이러한 일들이 반복되면 **개발자는 선언한 타입을 믿지 못한채 늘 코드를 작성하게 됩니다.**

어플리케이션을 띄울때 유저 정보를 가져오는 api 를 콜해서 어딘가에 담아둔다고 가정합시다. 그럼 최초의 유저정보를 가져오는 로직을 보지 못한 개발자는 `User` 라는 데이터의 자료형에 맞게 코드를 작성하겠죠? 적어도 타입을 믿는다면요. 컴파일러 역시 경고를 해주지 않기때문에, User 라는 데이터를 optional 하게 처리해야 하는것을 아는 개발자라도 실수할 가능성이 높아집니다. 어떠한 이유로 인해 서버와 약속한 값과 다른 타입을 response 의 값으로 명시해도 좋습니다. 다만 내가 담당한 프로젝트 영역에서 만큼은, **타입과 코드의 차이를 만들어내지 마세요.** 이는 내 자신과 팀원이 실수할 가능성을 굉장히 높히는 행위 입니다.

## 순수하게 View 와 관련된 상태를 제외한 값은, 외부에 맡기기

이부분은 공통 컴포넌트. 혹은 디자인 시스템을 처음 만드시는 분들께 꼭 강조하고 싶은 내용인데요. 결론부터 말하자면, 특정 도메인에 해당하는 데이터를 다루는 로직을 컴포넌트 안에 넣는 순간. 이녀석은 **재활용이 거의 불가능한** 컴포넌트가 됩니다. 코드로 보시죠.

```jsx
/**
 * 재활용이 힘든 컴포넌트
 */
function PageItem() {
  const id = useId();
  const [state, setState] = useState();

  useEffect(() => {
    apiClient.get(`/user/${id}`).then(({ data }) => {
      if (!data) return;
      setState({
        ...data,
      });
    });
  }, [id, setState]);

  return (
    <div>
      <h3>hello {state.username}</h3>
      { ... }
    </div>
  );
}
```

위의 코드는 특정 유저의 정보를 가져오는 API 를 컴포넌트 내부에서 사용하고 있습니다. 그럼 이 컴포넌트의 내용만을 바꿔서 재활용이 가능할까요? 예를들어, `h3` 의 데이터가 hello username 이라는 문장을 나타내지만 전혀 다른 타이틀을 그리고 싶다면 어떻게 해야할까요? 간단한 예제이니 이미 눈치 채셨을 것이란 생각입니다. 값을 주입받아야 겠지요. 다음과 같이 말이에요.

```jsx
/**
 * 재활용이 쉬운 컴포넌트: 데이터는 밖에서 처리해 그저 전달해 줍니다.
 * 만약 꼭 이 컴포넌트 내에서 데이터를 fetch 해야 한다면, interface 만을 강제하고
 * 구현은 외부에 맡기세요. 데이터를 fetch한 함수가 반환하는 값과 state 의 interface 만을 약속하면 됩니다.
 */
function PageItem({ username }) {
  return (
    <div>
      <h3>hello {username}</h3>
      { ... }
    </div>
  );
}
```

이게 간단한 예제라 확 와닿지 않을수 있는데요. 조금더 이해가 쉽게 설명을 해 보자면

1. `유저의 데이터를 가져오는 함수` 를 안에서 불렀을뿐 인것같이 보이지만,
2. 화면은 완전히 동일한데, 이 데이터를 각자 네이버와 카카오에서 가져와야 한다고 생각해보세요.
3. 그리고 두 데이터중 한쪽엔 전처리가 필요하다고 가정해보죠. 우린 컴포넌트를 재활용할 수 있을까요?
4. 당장 가능은 할거에요. 컴포넌트 내부에서 분기를 태우면 되죠. 하지만 문제가 한가지 생겨요.
5. 관련된 회사가 하나 늘어날때마다 if 문과 전처리 로직이 추가로 `계속 늘어나는` 문제 말이에요.
6. 이런 코드는 어느 수준의 기능 확장까지 버틸수 있을까요?
7. 만약 어떤 회사의 데이터는 유난히 까다로운 전처리가 필요해서 100줄의 코드가 필요한 경우가 생긴다면요?

저는 위와같은 이유때문에, 느슨한 결합도에 대한 이야기를 수많은 선배 개발자 분들이 해왔다고 생각합니다. 서비스의 변화가 아무리 적어도, 서비스를 접지 않는이상 무언가가 추가된다는 것은 누구나 생각할 수 있는 일이니까요. 아래와 같은 상황을 만들지 않도록 노력하는 것이 조금 더 나은 설계를 위한 방향이라 생각합니다.

```jsx
/**
 * 이런상황은 피하는게 어떨까요? 징그러운 분기문과 로직은
 * 객체로 매핑을하면 조금 깔끔해지긴 하겠네요.
 */
function PageItem() {
  const id = useId();
  const [state, setState] = useState();

  useEffect(() => {
    apiClient.get(`/user/${id}`).then(({ data }) => {
      if (!data) return;
      if (data.userType === 'naver') {
        { ... }
        setState({
          ...data,
        });
      } else if (data.userType === 'kakao') {
        { ... }
        setState({
          ...data,
        });
      } else if (...) {
        { ... }
      } else if (...) {
        { ... }
      }
    });
  }, [id, setState]);

  return (
    <div>
      <h3>hello {state.username}</h3>
      { ... }
    </div>
  );
}
```

추가로, 제가 이 키워드에 `순수하게 View 와 관련되지 않은` 이라고 언급을 한 이유가 있는데요. 만약 우리가 디자인 시스템을 만든다면, 디자이너와 약속된 font, color, animation 등을 정의 할 것입니다. 이역시 밖에서 주입받는 요소가 많을수록 유연해 지기는 하겠죠. 다만, 이 경우에는 상황을 조금 다르게 보아야 한다고 생각합니다. 우리 서비스의 look and feel 을 디자이너와 약속한 시스템은 해당 ui 와 ux 를 주는것을 목표로한 결과물이기 때문이죠. 디자인상의 무엇인가가 바뀌어야 한다면 우린 코드를 수정하는것이 타당한 상황이 맞습니다. `이 컴포넌트가 쓰이는 영역의 기능/기획의 변경으로 공통 컴포넌트의 변화가 생기는것이 아닌, 디자인 시스템이 변해야 해서 변하는 것이니까요`. 특정 영역 내에서의 변화의 대비를 위한 설계는 좋으나, 외부로부터 무엇인가를 꼭 주입받아야 한다는 강박적인 생각은 하지 않으셨으면 좋겠습니다.

특정 기능에 추가적인 기획의 변경 사항이 생긴다 해도, 공통으로 사용하기 위한 컴포넌트에 변경이 일어나서는 안 된다는 생각으로 설계의 방향을 잡았으면 좋겠습니다. 또한 공통된 컴포넌트/디자인시스템 영역에 변화가 생겨야 한다면, 이는 공통 컴포넌트/디자인시스템 상의 변화가 있을때만 바꾼다 라는 생각으로 설계의 방향을 잡았으면 좋겠습니다.

## 컴포넌트를 props로 받는걸 고려해 보기

이 주제 역시 디자인 시스템이나 공통된 컴포넌트를 설계할때 정말정말 많이 마주치는 부분인데요. 저는 이 부분 때문에 처음 디자인시스템을 만들 당시 고생을 했었습니다. 물론 제가 만들던 서비스의 특성상 유난히 케이스별로 티끌하나가 다른 경우가 많긴 했습니다. 추가로 form 이 워낙 많다보니, 다루어야 하는 상태와 이로인한 ui 변경이 많다는 부분도 한몫을 했죠. 그럼 제가 겪은 상황의 간단한 예시를 들어 보겠습니다.

어떤 상품을 보여주는 페이지가 있다고 가정합니다. 모든 ui 가 동일한데, 추천상품의 유무에 따라서 노출에 대한 여부를 판단해야 한다고 해보죠. 그리고 컴포넌트 내부에는 좋아요를 누를 수 있는 버튼이 있어야 합니다. 이를 간단히 표현해 봅시다.

```jsx
function ProductInfo({ recommendProducts }) {
  return (
    <div>
      <div>
        { ... }
      </div>
      {recommendProducts && recommendProducts.map((product) => (
        <div key={product.id}>
          <LikeButton>
          { ... }
        </div>
      ))}
    </div>
  )
}
```

간단하죠? 얼핏 보기에는 큰 문제가 없어 보이는 코드입니다. 하지만 이 컴포넌트는 범용적으로 사용되기엔 한가지 문제가 있습니다. 만약 **recommendProducts** 를 표현하는 각각의 아이템에 대한 생김새가 달라져야 하는 상황이 생긴다면 어떤 상황이 생길까요? 그리고 이 상황에대한 대응을, 컴포넌트가 아닌 데이터를 주입하는 방식으로 해결한다면 어떻게 될까요? 무지성으로 코드를 작성한다면, 보통 아래와 같아집니다.

```jsx
/**
 * showLikeButton, showCartButton 추가
 */
function ProductInfo({
  recommendProducts,
  showLikeButton,
  showCartButton,
}) {
  return (
    <div>
      <div>
        { ... }
      </div>
      {recommendProducts && recommendProducts.map((product) => (
        <div key={product.id}>
          {showLikeButton && <LikeButton />}
          {showCartButton && <CartButton />}
          { ... }
        </div>
      ))}
    </div>
  )
}
```

위 코드와 다른 모습이어도, 데이터를 주입받아 특정 조건을 내부에서 판단하는 컴포넌트의 모습은 대부분 크게 달라지지 않습니다. 여기서 `Button` 만을 표현하는 컴포넌트를 분리한다거나, buttonType 을 받아 내부에서 어떤 버튼을 그려줘야 하는지를 판단해도 말이에요. 이런 형태로 컴포넌트를 확장해 나아간다면, 조건이 하나 추가될때 마다 이전에 언급했던 if 문이 계속증가하는 현상이 일어납니다. 사실 이 상황에서 저희가 신경써야 하는 문제는 한가지가 더 있는데요. 현재는 `LikeButton` 과 `CartButton`을 클릭시 일어나야 하는 액션에 대한 함수를 인자로 받지 않고 있습니다. 이걸 두 버튼 내부에 정의한다면 해당 로직을 바꾸기가 더 힘들어 질테니, `ProductInfo` 에서 각각의 함수를 전달받아 보겠습니다.

```jsx
/**
 * onClickLikeButton, onClickCartButton 추가
 */
function ProductInfo({
  recommendProducts,
  showLikeButton,
  onClickLikeButton,
  showCartButton,
  onClickCartButton,
}) {
  return (
    <div>
      <div>
        { ... }
      </div>
      {recommendProducts && recommendProducts.map((product) => (
        <div key={product.id}>
          {showLikeButton && <LikeButton onClick={onClickLikeButton} />}
          {showCartButton && <CartButton onClick={onClickCartButton} />}
          { ... }
        </div>
      ))}
    </div>
  )
}
```

자 이제 어느부분을 개선하면 좋을지 보이시나요? 이런 방식의 코드는, 하나의 변화에 대한 대응을 추가할 때마다 인자가 늘어남과 비례해 가독성은 갈수록 떨어질 가능성이 높아집니다. 이런 상황에 컴포넌트를 주입받는 것을 고려하면, 복잡도를 떨어뜨린 채로 추가 변경 사항에 대응이 유리한 컴포넌트를 만들수 있는데요. 코드를 조금 바꿔보겠습니다.

```jsx
/**
 * props 로 컴포넌트를 받기
 */
function ProductInfo({ button }) {
  return (
    <div>
      <div>
        { ... }
      </div>
      {recommendProducts && recommendProducts.map((product) => (
        <div key={product.id}>
          {button}
          { ... }
        </div>
      ))}
    </div>
  )
}
```

여태 전달받던 props 가 사라지고, button 이라는 컴포넌트만을 props 로 전달받도록 변경 되었습니다. 그리고 저 버튼은 `ProductInfo` 입장에서는 더이상 어떤 버튼인지, 어떨때 보여주어야 하는지에 대한 상세한 조건을 알 필요가 없어졌죠. 클릭시 어떤 액션을 해야하는지에 대한 것도 알 필요가 없어졌습니다. 그럼 사용하는 쪽은 어떤식으로 사용하게 될까요?

```jsx
/**
 * LikeButton 을 props 로 전달해주기
 */
function LikeButtonProductPage() {
  const prdNo = usePrdNo();
  const [productInfoData, setProductInfoData] = useState(null);

  const handleClick = () => {
    alert('click button');
  }

  useEffect(() => {
    if (!prdNo) return;
    apiClient.get(`/product/${prdNo}`).then(({ data }) => {
      setProductInfoData({
        ...data,
      });
    });
  }, [prdNo]);

  return (
    <div>
      <ProductInfo
        button={<LikeButton onClick={handleClick} />}
      />
      { ... }
    </div>
  )
}
```

`ProductInfo` 컴포넌트를 사용하는 쪽에서 `button` 에 관한 모든 것을 결정하게 바뀌었습니다. 이렇게되면 이제 저 button 이라는 이름으로 전달하는 props 만큼은 어떠한 변경이 생겨도, ProductInfo 의 코드를 **고칠 필요가 없게되죠**. 위는 어디까지나 예시인지라 비교적 간단하게 코드를 작성한 감이 있는데요. 저는 실무에서 사소한 요소의 변경을 많이 요하는 공통 컴포넌트에 경우는 더 작게 쪼갤때도 많습니다. 반대로 어떨땐 컴포넌트를 통으로 작성하도 하죠. 상황별로 다 다르니 적절한 선택이 필요합니다. 그럼 추가로, 아직 개선이 끝나진 않았지만 어제 회사에서 작성한 코드를 아래 첨부합니다.

```tsx
/**
 * 회사에서 중복되는 코드를 공통으로 떼어내고, 해당 컴포넌트를 사용해 리펙터링 한 코드.
 *
 * tmi 인데 요즘 공통컴포넌트 떼어낸다고 기존로직을 열심히 파악하는 중입니다.
 * 아래 코드도 수정이 더 필요하지만, 떼어내고 나니 기분이 좋네요.
 */
function DealGroup() {
  { ... }
  return (
    <ProductSetList
      footerItems={
        isShowMoreButton && (
          <DealGroupMoreButton
            onClick={handleClickMoreItemButton}
            leftItemsCount={leftItemsCount}
          />
        )
      }
    >
      <Header>
        <DealGroupTitle
          title={title}
          isShootingDelivery={isShootingDelivery}
        />
      </Header>
      <Body>
        {renderItems.map((item) => (
          <Item key={item.productNo}>
            <Item.Anchor url={item.linkUrl}>
              <Item.Thumbnail imageUrl={item.imageUrl} alt={item.title} />
              <Item.Info
                title={item.title}
                discountRate={item.discountRate}
                finalDscPrice={item.finalDscPrice}
                unitTxt={item.unitTxt}
                starRate={item.starRate}
                reviewCount={item.reviewCount}
              />
            </Item.Anchor>
            <Item.AddCartButton
              onAddCart={handleAddCart(item.orderParameter)}
            />
          </Item>
        ))}
      </Body>
    </ProductSetList>
  );
}
```

# 마치며

막상 글을 적다보니, 생각보다 분량이 많아졌습니다. 하지만, 실무에서 겪어온 복잡도가 정말 높은 예제는 설명하지 못해 조금 아쉬운 마음인데요. 기회가 된다면 컴포넌의 설계와 디자인만을 자세히 다루는 글을 적어 보겠습니다.

우린 변화가 많은 컴포넌트를 작성해야 하는 일도 있고, 어떨땐 컴포넌트를 작게 쪼개는것이 작업량에 비해 가져오는 이득이 크지 않은 경우도 있습니다. 또한, 데이터를 주입받는 방식과 컴포넌트를 주입받는 방식은 모두 장단점이 있습니다. 이글이 현재 내가 작성해야 하는 코드의 디자인을 결정할 때 도움이 되었으면 합니다.

[다음글](https://devlog.juntae.kim/post/as-I-face-the-monorepo-2) 에서는 monorepo 프로젝트를 세팅하는 내용을 다룹니다.  
`yarn berry worksapce` + `typescript` + `storybook(vite)` + `next` 가 주가되는 예제인데요. 공통으로 사용할 컴포넌트는 `esbuild` 로 빌드 합니다. 관심이 있으시다면 읽어보셔도 좋을것 같습니다. 긴 글을 읽어 주셔서 감사합니다. 여러분의 코딩이 늘 즐겁기를 바랍니다.
