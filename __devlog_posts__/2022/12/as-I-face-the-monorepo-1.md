---
title: 모노레포를 마주하며 1 - 의사결정
description: 모노레포를 도입하는 시기와 공통 컴포넌트를 설계하며 느낀점을 이야기합니다
tags:
  - monorepo
  - Architecture
thumbnail: https://image-devlog.juntae.kim/john/john_home_cherry_blossom.jpg
date: 2022-12-07
slug: as-I-face-the-monorepo-1
---

# Table of Contents

# 글을 시작하며

얼마전 회사에서, 기존 프로젝트에 `monorepo` 를 도입하며, 문득 들었던 생각이 있습니다.  
제가 예전에도(이전 회사) 이와 비슷한 이유로 **monorepo** 를 도입하지 않았었나? 하는 생각입니다.  
기억이라 해야 맞을까요? 그래서 이 기회에 monorepo 를 도입하며 제가 느낀점들과 프로젝트를 세팅하는 간단한 예제를 적어보려 합니다. 이번에 회사에서 진행한 프로젝트엔 `pnpm` 을 사용했지만, 개인적으로 `yarn berry` 로 세팅을 해보고 싶어서 예제는 yarn berry 를 사용 하였는데요.

이 글에서는, monorepo 를 도입하며 느낀 배경과 프로젝트를 package 별로 떼어내며 느낀점. 의사결정 과정에 대하여 이야기 합니다. 모노레포 프로젝트를 **세팅하는 방법**이 궁금하신 분들은 [다음글](다음글) 을 참고해 주세요. 그럼 이야기를 시작해 보겠습니다.

# monorepo 는 새로운 개념인가?

이 글에서는, 모노레포의 개념에 대한 글은 자세히 다루지 않습니다. 이미 좋은 글이 이미 많다고 느껴서 인데요. 개인적으로 모노레포의 전반적인 개념에 대하여 잘 다루었다고 생각하는 글의 링크를 남기겠습니다.

- [https://d2.naver.com/helloworld/0923884](https://d2.naver.com/helloworld/0923884)

이어서, 제가 이야기하고 싶은 부분은 다음과 같습니다. 요즘 컨퍼런스에서 `frontend` 에 관한 내용을 다룰때면, 심심찮게 나오는 이 `monorepo` 라는 녀석은 엄청나게 _새로운_ 개념일까요? 혹은 우리의 프로젝트의 복잡성을 줄여주기 위한 마법같은 도구가 드디어 등장한 것일까요?

제가 _monorepo_ 를 실무에서 처음 도입해본 시기는 **2020년 05월** 즈음 입니다. 벌써 햇수로 3년 정도 전의 일인듯 싶습니다만, 이때 저는 모노레포라는 이 개념이 새로운 패러다임 이라는 생각은 들지 않았었는데요. 이미 비슷한 개념의 도구들의 이야기는 눈팅을 해왔기 때문이죠.

제가 잘은 몰라도, `JVM` 진영의 _Gradle multi module_ 같은 도구(개념) 이나, 제가 즐겨쓰는 `golang` 의 경우는 애초에 _module_ 을 기준으로, 해당 기능을 똑 떼어 사용할수 있는 방법을 이미 손쉽게 지원하고 있었습니다(비교적 최근에는 더욱 강력한 workspace 라는 기능도 나왔습니다). 저는 javascript 진영의 _monorepo_ 사용 사례보다, 위 두가지 사례를 개인적으로 더 일찍이 접했기 때문에 새롭지는 않았었는데요. 다만, 이번에는 아래와 같은 의문이 한가지 들었습니다.

```
왜 지금일까? 내가 잘못 알고있을 수도 있다.
근데, 확실히 이전보다는 요즘 monorepo 에 대한 언급이 잦아진건 맞는것 같다.
근데 왜? 얼마든지 더 일찍 도입할 수 있었을 것이고, 내가 모르는 곳에서
이미 도입해 잘 사용하고 있었을 수도 있는데. 왜 요즘 이야기 빈도수가 확 늘어난것 같지?
```

# monorepo 를 도입하는 시기

위 의문이 생기자, 제가 실무에서 처음 monorepo 를 도입하게 된 계기를 다시 생각해 보게 되었는데요. 당시 monorepo 를 도입하게 된 의사결정 과정은 다음과 같았습니다.

1. 제가 속한 조직에서 개발중인 서비스를 다른 mobile application 에서 import 할 수 있어야 했습니다.
2. 말인 즉, 타사의 mobile application 에 embed 할 수 있어야 하고, 이를 webview 로 구현해야 했습니다.
3. 서비스 중인 mobile application 의 기능을 web application 으로 포팅하는 작업을 시작합니다.
4. 기획서와 디자인을 살피고, 작업에 들어가려다 보니 A, B 회사의 특성에 따른 비즈니스 로직의 차이가 있습니다.
5. 반대로 서비스의 근본적인 기능과 각 컴포넌트의 디자인등은 완전히 동일합니다.

위 조건에 맞는 프로젝트 구조를 논의 시작합니다.

1. private 한 library 형태로 따로 publish 를 할까? 했지만, 지금 규모엔 너무 큰 작업같습니다.
2. 또한 이 프로젝트 외의 상황에도 활용 가능할지 모르는 상황에서는, 확장에 용이한 구조를 만들고 싶었습니다.
3. 그럼 git submodule 을 써볼까? 하지만, 이전 프로젝트에서 사용해본 바, 사용경험이 그리 좋진 않았습니다.
4. 그럼 repo 하나에 독립된 프로젝트를 몰기 좋은 monorepo 의 개념은 어때? 란 생각을 하게 되고, 팀원과 저는 가장 적당한 방법이란 결론에 도달합니다.

여기까지 의사결정을 하며, 당시에는 크게 생각하지 못했던 부분이 있는데요. 프로덕트를 만드는 팀은 언제나 서비스가 커지면서 그에 맞는 적절한 방법과 도구를 찾을수 밖에 없다고 생각합니다. 그리고 우리의 제품은 아래의 수순을 밟아 나아가는 경우가 꽤나 많을것 이라는 생각입니다.

- 내가 만드는 서비스가 갖추어야 하는 비즈니스적 요구가 늘어남과 동시에 필요한 기능이 추가됩니다.
- 당연히 어플리케이션의 사이즈가 일정 수준 이상으로 커지게 됩니다. 어플리케이션의 개수가 늘어날 수도 있습니다.
- 이와 함께 어플리케이션의 품질을 위한 여러 요소가 추가되기 시작합니다(design system, core module 등).
- 이는 곧 효율적인 운영을 생각하게 하고, 유지보수와 공수를 생각하는 방향으로 자연스레 흐릅니다.
- 파편화된 리소스를 모으고, 이를 효율적으로 관리하려면 어떤 방법이 좋을까를 고민합니다.

위와 유사한 과정을 거친다면, javascript 의 생태계 안에서 개발을 하는 사람은 누구나 한번쯤은 `monorepo` 라는 녀석을 마주칠 가능성이 높다는 생각을 했습니다. 그만큼 성장한 웹 서비스들(혹은 library)이 늘어난 만큼, _monorepo_ 라는 주제를 마주하는 일이 많아진다는 것은 어찌보면 당연하다는 생각이 듭니다.

_monorepo_ 가 갖는 대부분의 장점은 **multirepo** 의 단점이고, **multirepo** 가 갖는 대부분의 장점은 곧 _monorepo_ 가 갖는 단점입니다. 즉, 장단이 분명한 만큼 이를 효율적으로 써야 우리 팀의 제품에 효과적인 영향력을 가져다 줄 것이라는 생각인데요.

단순하게 생각하면 공통된 관심사가 무엇인가 반복되는 경우에 monorepo 를 도입한다면, 상대적으로 다른 상황보다 더 큰 효과를 가져다 줄 것이라는 생각입니다(ci/cd 나 devops 환경, component, business logic 등). 제 경우 실무에서 경험한 두 번의 케이스는 굉장히 비슷한 상황이었는데요. 그 이야기를 시작해 보겠습니다.

# 공통 컴포넌트 설계하기

제가 운영중인 프로젝트에 `monorepo`를 도입한 이유는 모두 동일 했습니다. 동일한 ui/ux 를 가진 컴포넌트가 굉장히 반복적으로 사용되었고, 이로 인한 중복코드와 프로젝트별 repository 가 늘어나는 상황을 개선하고 싶었습니다. 이전 직장도 그랬고 현재도 그렇습니다. 서비스를 만드는 개발자라면 공감할 말인 듯 싶은데요. 다 똑같은데 한두 군데가 다릅니다. 정말 미세하게 말이에요.

- A 에는 버튼이 있고, B 에는 없지만 나머지가 다 똑같거나,
- B 에는 쿠폰을 다운로드 할 수 있는 컴포넌트가 있는데, A 에는 그려지면 안됩니다.
- 이를테면 아래와 같은 상황이랄까요?

```
A: 이녀석은 오른쪽 끝에 버튼을 그리지만
title      button
```

```
B: 이녀석은 아무것도 없어야 하고
title
```

```
C: 이녀석은 select box 를 그려야 한달까요?
title   selectbox
```

뭐 사실 이미 관련된 좋은 글도 많고, 유연한 컴포넌트를 설계하기 위한 고민은 frontend 개발자라면 누구든 한번쯤은 해볼법한 고민인지라 흔한 내용일 수도 있는데요. 나름 고민한 부분들을 최대한 쉽고 간단히 설명해 보겠습니다. 여기서 저는 `Dependency Injection` 이라는 개념을 한번 짚고 넘어가고 싶습니다. `의존성 주입` 은 무엇일까요? 사실 저는 이 개념이 근본적으로 말하고 있는 바가 아주 간단하다고 봅니다.

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

뭐 상황에 따라 children 이 될 수도 있고, 위처럼 button 을 특정할 수 도 있지만 지금 제가 이야기하고 싶은 요소는 바로 `외부`로부터 내가 필요로 하는 `관심사`를 `주입` 받는다는 사실입니다. 사실 `React` 는 `props` 로 값을 넘기는 것이 너무나 자연스런 도구입니다. 이를 통해 `interface` 만을 정의하고, 외부로부터 필요로 하는 관심사를 주입 받는 것을 기능으로써 제공하는 도구이죠. 그럼 React 가 제공하는 Props 라는 개념을 이용해 컴포넌트를 어떻게 확장할 수 있을까요?

## 컴포넌트 확장하기(Children, Props)

위의 코드를 보셔서 알겠지만, 컴포넌트를 확장하는 가장 간단한 방법중 한가지는, props 로 component 자체를 받는것 입니다. 하지만 이것도 정도에 따라 장단이 존재한다고 생각하는데요. 아래 케이스를 살펴보겠습니다.

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

그럼, 위와같은 형태는 어떤 방식으로 사용하면 좋을까요? 혹은, 어떨때 단점을 상쇄해 낼 수 있을까요? 저는 `Compound Components` 패턴 등을 섞어 컴포넌트를 설계할때 위와 같은 형태를 사용하는데요. `Select`, `Layout`, `Popup` 등의 컴포넌트 작성시 즐겨 사용합니다. 아래의 예시를 살펴보겠습니다.

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

위 컴포넌트는 어떤 장점이 있을까요? 일단 기반이 되는 `Layout` 을 기준으로 관련된 컴포넌트를 `property` 로 정의 했습니다. 이와 같은 경우는 내부에 해당 컴포넌트의 _property_ 로 정의된 요소 **외의** 변화가 있을때나, 혹은 _property_ 중 일부만을 사용하고 싶을때 유용하게 사용 가능합니다. 관련된 컴포넌트를 _property_ 로 정의해 자주 함께 사용되는 요소를 _응집_ 시키고, `children` 을 props 로 받아 유연한 변화를 가능케한 모습의 컴포넌트 입니다. 사용한다면 아래와 같은 모습을 지니게 되죠.

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

하지만 어떨땐, 위의 예시는 아쉬운 경우가 있습니다. 예를 들어 특정 요소의 위치를 `Header`/`Footer` 등에서 강제한다거나, 이 컴포넌트 만큼은 꼭 내가 받아야 해 라고 주장하는 부분이 결여되어 있기 때문이지요. 사실 위의 예제에서도 조금만 변화를 주어도 구현은 얼마든지 가능합니다. 예를들어, `Header` 내부에 아이템을 양끝 정렬을 시키고, 그에 해당하는 아이템은 유연하게 받고 싶다면 props 를 통해 아주 약간의 **강제**만 추가해주어도 되죠.

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

이렇게 적절한 변화를 주면서 컴포넌트를 설계한다면, 외부의 변화에 유연하면서 특정 조건은 만족시키는 컴포넌트를 작성하기가 굉장히 쉬워집니다. 그럼 여기서 한가지 요소를 더 추가하는 케이스를 살펴보면 어떨까 싶습니다. 내가 작성하는 컴포넌트를 다른 팀원이 사용할때, 타인에게 `특정 로직`을 **반드시 받아서 처리하는 컴포넌트**를 구현해야 한다는 사실을 알리고 싶다면 어떻게 해야할까요? view 는 유연하되, 이 로직만은 받아서 처리하라는 정보를 사용자에게 주고 싶다면요.

## 컴포넌트 확장하기(Render Props With Typescript)

`render props` 는 사실 굉장히 유명한 개념이라 이미 아시거나, 들어보신 분들이 많을것이란 생각입니다. 특히나 `class component` 가 주가 되던 시기엔 `hoc`과 더불어 참 많이 보이던 패턴인데요. 그럼 이 패턴을 활용할 만한 상황을 한가지 예시로 살펴보죠.

- 내부의 내용은 무엇이든 그릴 수 있지만, 팝업을 닫는 이벤트는
- 내부의 컴포넌트중 어느 하나가 꼭 처리해야 하는 컴포넌트를 만들고 싶다면,
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

위와 같은 상황은 `typescript` 와 `render props` 를 사용한다면 더욱 효과적으로 기능을 구현할 수 있는데요. 자식요소를 **children** 으로 선언은 하지만, _특정 함수를 꼭 받아서 처리해야 하는 children 이라는 코드를 작성_ 해주면 간단히 해결이 가능합니다. 대략 이 개념을 적용한 Popup component 의 형태는 아래와 같습니다.

```tsx
type CloseHandler = () => void;

interface Props {
  children: (onClose: CloseHandler) => React.ReactNode; // 여기가 중요합니다.
  visible: boolean;
  onClose: CloseHandler;
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
 * Type 'Element' is not assignable to type '(onClose: Handler) => ReactNode'.
 * Type 'Element' provides no match for the signature '(onClose: Handler): ReactNode'
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

문제없이 사용하려 한다면 아래와 같은 코드를 작성해야 하죠. 물론 _onClose_ 를 받아 컴포넌트를 그리는 함수를 작성해놓고도, 아래 컴포넌트에서 전달받은 함수를 사용하지 않는다면 말짱 꽝이긴 하지만... 설마 저걸보고도 꼭 처리해 달라는 의도를 알아채지 못하는 개발자는 없을것이란 생각입니다.

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

# 마치며
