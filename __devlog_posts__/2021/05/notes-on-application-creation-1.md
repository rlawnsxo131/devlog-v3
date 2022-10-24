---
title: 개발 중 조심해야 할 것들 1
description: 지금 당장 생각나는 개발중 조심해야 하는 것들.
tags:
  - Architecture
thumbnail: https://image-devlog.juntae.kim/post/image/jpeg/things-developers.jpg
date: 2021-05-03
slug: notes-on-application-creation-1
---

# Table of Contents

한동안 현생이 바빠 오랜만에 글을 작성합니다. 이번엔 ``Backend``, ``Client`` 관계없이 제가 개발을 하며 조심해야 한다고 생각하는 부분들과 그중 가장 많이 보아오고, 겪어온 실수에 대해 이야기할까 합니다.

# React - 스파게티 구조
사실 코드를 작성하며 당시엔 별 문제가 아니라 생각하고 넘어갔다가 시간을 가면 갈수록 커다란 쓰레기 덩이가 나오는 것을 지켜보는 일이 한번쯤은 있을것 이란 생각이 듭니다. 저역시도 코딩을 한지 얼마 안되었을 당시는 일단 동작하게 만들고 넘어가자 라는 생각을 종종 갖고 있었죠. 그러나... 제가 이 생각을 고쳐먹은 계기가 있는데요. 이전에 한 회사에서 **FrontEnd** 개발자로 인턴을 경험했을 때의 일입니다.

당시 제가 맡은 부분은 장바구니 부분의 버그를 수정하는 일이었는데요. 정말 ``간단`` 할 것이라 생각했던 기능이었으나 코드를 열어본 결과, 눈알이 빠지는 경험을 했습니다. React.js 로 작성된 프로젝트였는데, 기본적으로 커머스의 성향을 띈데다, 그래픽을 다루는 영역이 있는 프로젝트이다 보니 **굉장히 많은 state** 를 다루고 있는 상황이었습니다. 문제는 이 **state** 의 관리를 너무 중구난방으로 했다는 것입니다.

아마도 리액트를 경험해 보신 분들은 ``presentational component`` 와 ``container component`` 에 관한 내용을 한번쯤은 접해보셨을 것 같습니다. 개념자체는 간단합니다. 오로지 view 를 그리는 영역과, 데이터를 관리하는 영역의 컴포넌트를 완전히 분리시켜 상태를 관리하자 라는 아주 간단한 개념인데요. 여기에 추가로 ``Flux Architecture`` 에 기반한 ``Redux`` 사용시 보통 여러 컴포넌트가 공유하는 상태는 아래와 같은 형태의 데이터 흐름을 가지게 됩니다.

![](https://image-devlog.juntae.kim/post/image/png/flux.png)

굉장히 간단합니다. 여러 컴포넌트, 혹은 전역적으로 공유해야 하는 데이터는 단방향으로 흐르고, 특정 액션이 ``dispatch`` 되면 그로인해 ``store`` 의 상태가 변화됩니다. 그리고 이 store 의 특정 상태와 연결되어 있는
**container component** 는 이 상태를 받아 **presentational component** 에 주입시켜 줍니다. 그리고 데이터를 받은 presentational component 는 데이터를 반영해 화면을 그립니다. 아주 쉽죠?

물론 ``React hook`` 의 등장이후 ``Dan Abramov`` 이 **presentational component** 와 **container component** 의 분리는 무조건 적인게 아니다! 라고 정정을 했기도 하고, 분명 현재에 와서 필수적인것은 아닙니다. 그러나 ``재사용성``이 중요한 컴포넌트에서 View 를 관리하는 영역과 State 를 관리하는 영역을 분리해야 하는것은 여전히 중요합니다. 예를 들어 아래와 같은 형태로 말이죠.

### hook 기반의 State 와 View 가 분리된 예제
```tsx
// hook
export default function useMyComponent() {
  const [state, setState] = useState({
    //...
  });
  const handleState = useCallback((e: React.ChangeEvent<HtmlInputElement>) => {
    const { name, value } = e.target;
    setState(state => ({
      ...state,
      [name]: value
    }));
  }, []);
  
  return {
    state,
    handleState
  }
}

// component
function MyComponent() {
  const { state, handleState } = useMyComponent();
  return (
    <div>
      <input name="a" value={state.a} onChange={handleState} />
      <input name="b" value={state.b} onChange={handleState} />
      {/* ... */}
    </div>
  )
}
```

개념은 간단한데, 사실 이 원칙을 잘 지키며 수천, 수만개의 데이터를 관리해야 하는 어플리케이션을 작성하는 일이 마냥 쉽지만은 않습니다. 사실 어렵다기 보다 귀찮습니다. 그덕에 전 **한 화면에서 수백, 어쩌면 수천개의 상태를 다루는 프로젝트** 임에도, 아래와 같은 구조의 코드를 마주했습니다. 이당시엔 hook 이 없었지만 편의상 function component 로 작성합니다.

### 내가 고생했던 상황의 pseudo code
```jsx
// component1
function MyComponent({ name, age }) {
  const dispatch = useDispatch();
  const { storeName, storeAge } = useSelector((state) => state);
  const [state, setState] = useState({
    changeName: '',
    changeAge: 0
  });
  
  useEffect(() => {
    if (!name || !age || !storeState1 || !storeState2) return;
    setState({
      changeName: `${name}${storeName}`,
      changeAge: storeAge + changeAge
    });
  }, [name, age, storeState1, storeState2]);
  
  return (
    <div>
      <MyComponent2
        name={state.changeName}
        age={store.changeAge}
      />
    </div>
  );
}
```

```jsx
// component2
function MyComponent2({ changeName, changeAge }) {
  const dispatch = useDispatch();
  const {storeItem, storePrice} = useSelector((state) => state);
  const [showText, setShowText] = setState(false);
  const [confirmPrice, setConfirmPrice] = setState(0);
  const [state, setState] = useState({
    changeName: '',
    changeAge: '',
    changeItem: '',
    storePrice: ''
  });
  
  useEffect(() => {
    if (!changeName || !changeAge || !storeItem || !storePrice) return;
    setState({
      changeName,
      changeAge,
      changeItem: somethingFunc(changeItem),
      storePrice: somethingFunc(storePrice)
    });
  }, [changeName, changeAge, storeItem, storePrice]);
  
  
  useEffect(() => {
    const fetchFunc = async () => {
      const { data } = await axios.get('...', {
        params: {
        	...
	    }
      });
      setConfirmPrice(data.price);
      dispatch({
        type: 'CALCULATION_PRICE_ACTION',
        payload: {
          price: data.price,
          discount: data.discount
        }
      });
    }
    fetchFunc();
  }, [state]);
  
  return (
    <div>
      <MyComponent3
        changeName={changeName}
        changeAge={changeAge}
        storeItem={storeItem}
        storePrice={storePrice}
      />
      <button onClick={() => setShowText(!showText)}>click</button>
      {showText && <TextComponent confirmPrice={confirmPrice} />}
    </div>
  );
}

// component3
// component4
// component5 ...
```

나름 최대한 간단히 작성했습니다. 상태는 위 코드를 보시다 싶이 스토어와 현 컴포넌트에 있는 스테이트가 만나 새로운 상태를 만들어내고, 그걸 **props** 로 자식에게 건내준 다음 그걸 가지고 또 그 자식컴포넌트의 상태와 합성해 새로운 상태를 만들어냅니다. 와중 뷰에 변화를 주는 스테이트 역시 같은 컴포넌트에서 관리하고, 로컬상태와 서버에서 받아온 새로운 데이터를 합쳐 스토어에 디스패치 합니다.

위 코드는 거의 의사코드 수준으로 작성했으니, 읽기 어렵지 않으실 수도 있지만 한 화면에 저런 최상위 컴포넌트가 10개가 그려지고, 그 각각의 컴포넌트는 50개의 상태를 다룬다고 생각해 보죠. 또한 각각 추가로 자식 컴포넌트들을 갖고 있다고 생각한다면 상상이 가실것 같습니다. depth 가 3depth 이상만 내려가도 이때부턴 **스파게티의 대행진** 이 시작됩니다.

이게 일정 수준이 넘어가면 앞날은 눈에 선합니다. 만약 처음 입사한 개발자가 이런 코드를 유지보수라도 하려 든다면, 코드 구조 파악하는 데에만 굉장한 시간을 쏟아야 하겠죠.

곧죽어도 원칙을 지키고, 그 원칙을 어기면 **좋지 않은 코드라는 의미는 절대 아닙니다.** 다만 지금의 내가 지킬수 있는 부분이라면 조금은 더 신경써보는 것이 어떨까요? 개인적으론 처음엔 시간이 걸려도, 꾸준히 올바른 코드를 작성하려 노력한다면, 결국은 같은 생산성을 낼 수 있다 생각합니다. 귀찮더라도 꾸준히 노력하면 언젠가는 나아지지 않을까요? 🙂

위의 예제는 제가 겪었던 상황을 표현하느라 Redux 를 예로 들었지만 Graphql, Swr, ReactQuery, Recoil 등등 뭘 사용해도 기본원리는 같습니다. 컴포넌트의 역할은 분리합시다. 미리 말했듯 필수인것은 아닙니다. 다만, 이 컴포넌트가 다른 어떤 화면의 일부로서도 상호작용을 해야하고, 재사용성이 중요한 컴포넌트라면 분리 하는것이 좋습니다.

저당시 억지로 고칠순 있지만, 저대로 고치다간 더더더 큰 대형 똥이 나올것 같아, 서른개의 컴포넌트를 리팩토링한 생각을 하면 지금도 우울해집니다.

# All - 과도한 wrapping
현시대에 웹, 모바일 어플리케이션을 개발하며 라이브러리를 사용하지 않는 개발자는 거의 없을것이란 생각이 듭니다. 그리고 우리는 흔하게 그 라이브러리를 wrapping 하여 사용하는 경우를 볼 수 있죠. 적당한 wrapping 은 저역시 좋다 생각합니다. 그러나 **목적자체를 잊어버리는 경우** 가 종종 있습니다. 라이브러리는 개발의 편의성을 제공해 주는 녀석들입니다. ``wrapping`` 의 목적은 이 라이브러리를 상황에 맞게, 혹은 특정 반복코드를 줄이거나 복잡도를 떨어뜨리기 위해 사용하는등의 이유가 있을 것 입니다.

but,, wrapping 을 함으로서 **코드의 복잡성이 더 높아진다면** 이게 과연 의미가 있는 것일까요? 혹은, 라이브러리를 wrapping 하는것이 아닌 **어떤 공통로직에 대한 처리** 를 할때 역시 마찬가지입니다. 예를들어 전역 에러처리에 대한 핸들러를 작성한다고 가정하겠습니다. 적게잡아 한 서너가지 방식으로 에러를 처리한다고 가정하죠. 이부분은 서버든 클라이언트든 상관 없습니다. 제가 경험한 실수는 다음과 같습니다.

```
나는 이 함수안에서 모든걸 다 처리할거야.
그럼 어떤 에러가 발생하던, 어떤 처리를 할지 저 함수만 알면 되잖아.
그럼 신경 하나도 안써도 되는걸?

throw 만 하면 되겠지.
아 message 를 return 할 일도 생겼네?
음 이건 redirect 를 명령해야 겠다.
아 이건 alert 을 준 다음에 redirect 를 해야하는구나.
```

네 위처럼 생각 하시다간 **점점 코드가 새끼를 치는 상황**을 쉽게 만날 수 있을것 같습니다. **가면 갈수록 조합만 늘어납니다.** 우리가 잊지 말아야 할 것이 한가지 있습니다. ``저 모든 사항을 코드로 표현하는건 개발자 입니다. 그리고 이 상황에서 에러를 뿜을지, 메시지를 던질지, 리다이렉트를 시킬지 결정하는 것도 개발자 입니다.`` 그리고 우리는 **이미 이상황에 어떻게 하고 싶은지를 생각하며, 의도하에 코드를 작성합니다.** 에러의 발생을 나는 몰라도 되는게 아니고, **이미 이 에러에 어떤 처리를 해야하는지** 알고 있습니다.

일단 위상황에 코드가 어떻게 되는지 간단히 작성해 보죠.
옵셔널한 값들의 이해를 돕기위해 타입스크립트로 작성해 보겠습니다. 미리 말씀드리면
아래 코드에서 에러 코드를 리턴하는 함수를 뺀다던지, 메시지를 리턴하는 함수를 뺀다던지 해도 나중 결과는 결국 같아지는 경우가 대다수입니다. 에러 핸들러는 점점더 뚱뚱해집니다. 궁금하시다면 직접 이런 방식으로 코드를 작성해 보셔서 이 방법이 좋은지, 아닌지를 생각해보는 것도 괜찮을 것 같네요.

### 하나의 함수에서 모든 에러를 처리하는 예시
```typescript
interface BadErrorHandlerParams {
  error: any;
  alert?: boolean;
  redirect?: boolean;
  message?: string;
}

function badErrorHandler({ error, alert, redirect, message }) {
  // 일단 에러 코드를 좀 보자
  const errorCode = error.code;
  // 메시지 결정 해야함
  let message = message ?? '알 수 없는에러';
  if (redirect) {
    if (alert) {
      // 리다이렉트 시키고 알럿을 띄우고 싶다면?
      // 만약 알럿에 콜백으로 준다면 그역시 이것저것 상황별로 코드 작성필요
    }
    // 코드보고 어떤화면으로 보낼지 분기 몇개가 될지 모름
    // 리듀스나 맵등을 써서 코드만 발라도 에러 처리의 순서가 있어서 복잡해짐
    if (code === 400) {}
    if (code === 403) {}
    if (code === 500) {}
    return;
  }
  
  // 알럿을 띄워보자
  if (alert) {
    if (redirect) {
      // 이번엔 알럿뒤 리다이렉트를 시키고 싶다면?
      // 코드보고 어떤화면으로 보낼지 분기 몇개가 될지 모름
      // 리듀스나 맵등을 써서 코드만 발라도 에러 처리의 순서가 있어서 복잡해짐
      if (code === 400) {}
      if (code === 403) {}
      if (code === 500) {}
    }
  }
}

// 사용한다면?
function somethingAction() {
  try {
    // 어쩌구
  } catch (e) {
    // 일단 에러코드는 줘야하니까
    // 알럿띄우고 리다이렉트?
    // 메시지는 그냥 내가 원하는 메시지 줄까?
    badErrorHandler(e, alert, redirect, 'blabla');
  }
}

```

위와 같은 코드는 에러처리시 보여주어야 하는 액션의 개수나, 순서가 다양해 질 수록 결국 함수는 복잡해질 수 밖에 없습니다. 특히나 화면단에서는 에러처리시의 인터렉션이 더해지는 경우가 많으니 더더욱 조심하는 것을 추천하고 싶습니다. 저라면 저런 처리 없이 아래와 같이 함수를 작성할 것 같습니다.

```
에러코드가 뭘로 내려오던 몇개의 단순한 함수로 처리하고 싶습니다.
이 어플리케이션을 작성하는건 개발자니까요.
서버사이드, 클라이언트 구분없이 표현하기 위해 함수는 handler 로 작성합니다.
리액트의 경우 hook 으로 뺸다면 형태는 조금 달라질 수 있겠죠.
```

### 특정 함수에 얽매이지 않고 내가 할일만 하는 함수의 예시
```typescript
// 어차피 코드만 던지면 되는 함수라 if 를 쓰던 reduce, map, filter 를 쓰던 무방
function errorCodeReturner(error: any) {
  let code = 0;
  if (code === 400) {}
  if (code === 403) {}
  if (code === 500) {}
  // ...
  return code;
}

// 뭐가 들어오던 팝업만 띄움
// 필요하다면 메시지 판단정도는 해도 되겠지만 개인적으론 밖에서 해서 인자로 넣어줌
// 최대한 단순한 기능만을 수행하도록 하는것이 코드의 복잡성을 떨어뜨리는 기본
function popupHandler(message: string) {
  showPopup(message);
}

// 뭐가 들어오던 그냥 리다이렉트만 시킴
function redirectHandler(url: string) {
  redirect(url);
}

// 사용한다면?
function somethingAction() {
  try {
    // 어쩌구
  } catch(e) {
    // 에러 처리 순서가 눈에 보여서 읽기 쉬움
    // 각각의 함수역시 굉장히 단순한 일만 처리
    // 알럿도 띄우고 리다이렉트도 띄우고, 코드도 던져줘보자
    // 혹은 순서를 어떻게 섞어도 각각함수의 순서만 바꾸면 됨
    const code = errorCodeReturner(e);
    popupHandler(e.message ?? `알 수 없는에러 발생: ${e}`);
    redirectHandler('https://...');
  }
}
```

어떤 차이인지 눈에 들어오시나요? 굳이 하나의 함수가 모든 일을 처리하게 할 필요가 없습니다. 혹 함수 하나에서 처리하지만 그 안에서 하는일을 전부 함수로 빼면 되는거 아니냐 할 수 있습니다. 그러나 결국에 그 하나의 함수안에서 처리하는 이상, 받아내야 하는 인자는 에러 처리 방법에 비례해 계속 늘어나기만 할 뿐입니다.

글을 쓰다보니 길어졌네요. **제가 드리고 싶은 말은 무조건 정석대로 해라, 무조건 wrapping 을 줄여라가 아닙니다.** 다만 ``내 목적을 잊지 않고 산으로 가고``있지는 않은지. 내가 ``귀찮다고 해서 좋지 않은 구조``를 향해 달려가고 있지는 않은지. 자기 스스로에 대한 체크를 끝없이 하면 어떨까 라는 이야기를 하고 싶었습니다.

저역시 지금도 가끔 위에 언급한 실수를 많이 합니다. 그리곤 반성. 지금도 이 과정을 반복중입니다. 하지만 앞으로 계속 꾸준히 노력해 나간다면, 조금더 아름다운 코드를 작성할 수 있지 않을까요?

다음번엔 제가 새로운 라이브러리들을 접하며 어떤 삽질을 했는지. 현재는 어떤 방식으로 사용하고, 접근하는가에 대한 이야기를 해보겠습니다. 감사합니다.