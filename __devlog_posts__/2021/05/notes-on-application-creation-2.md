---
title: 개발 중 조심해야 할 것들 2
description: 지금 당장 생각나는 개발중 조심해야 하는 것들
tags:
  - Architecture
thumbnail: https://image-devlog.juntae.kim/post/image/thumbnail/jpeg/things-developers.jpg
date: 2021-05-03
slug: notes-on-application-creation-2
---

# Table of Contents

# 글을 시작하며
개발 중 조심해야 할 것들 두번째 이야기 입니다. 이번에는 라이브러리를 선택하는 제 개인적인 기준과 사용방식에 관한 이야기를 해보겠습니다. 첫번째 이야기가 궁금하다면 다음 링크를 클릭해 주세요.
[개발 중 조심해야 할 것들(1)](https://devlog.juntae.kim/post/notes-on-application-creation)

예전에 저는 좋다는 기술들은 몽땅 프로젝트에 넣어보던 시절이 있었습니다. 그리고 그 라이브러리들을 섞어 이것저것 작성해보기도 했죠. 제가 이걸 잘했으면 다행이지만.. 역시나 예상하신 것처럼 엉망이 된 프로젝트를 수차례 눈으로 보아가며 제 잘못들을 고치곤 했는데요. 그중 일부에 관한 이야기를 꺼내볼까 합니다.

> 아래의 글은 지극히 개인적인 경험에 바탕한 의견입니다. 항상 옳은 방법은 아니에요!

# 정말 라이브러리가 필요한 상황인지 고민해보기

저는 항상 라이브러리의 사용을 고려하며 가장 먼저 정말 라이브러리가 필요한 상황 인지를 생각 합니다. 사실상 간단한 기능이라면 직접 구현하여 사용하는 것 을 선호하는데 이유는 다음과 같습니다.

* 서드파티는 외부에 종속성을 갖을 수 밖에 없습니다.
* 특정 기능이 update 되거나, 변경사항 이 생길 시 그렇지 않다면 좋겠지만 api 스펙이 변경되거나 type 이 바뀌는 경우가 종종 있습니다.
* 위 상황을 마주한다면 결국엔 코드를 바꾸어 주어야 합니다.
* 과도한 wrapping 을 하지 않는 이유중 한가지도, 위와 비슷한데 예를들어 얼마전 **React Query** 의 버전 업데이트시 다음과 같은 변경사항이 있었고, type 이 바뀌는 덕에 코드를 약간 수정했습니다.
[react-query 3\.15\.3 변경사항](https://github.com/tannerlinsley/react-query/compare/v3.15.2...v3.15.3)(참고로 같은날 잽싸게 코드를 추가 수정해 주었더군요?)
* 개인적으로 제가 필요한 기능외에 너무 많은 기능이 포함된 라이브러리를 좋아하지 않습니다.
* 어디까지나 개인 코딩에 한해서 입니다. 내가 있는 팀이 선호하는 기술을 제가 맘에 들지 않는다고, 난 이건 죽어도 못써! 라는 태도는 좋지 않다고 생각합니다.🤞

저는 그래서 ``어떤 기능인가``, ``내가 구현하기에 공수가 너무 큰가``, 혹은 ``구현된 라이브러리와 내가 직접 구현한 라이브러리에 성능차가 큰가`` 등등을 먼저 따져봅니다. 이때 비교적 간단한 처리만이 필요하거나 성능차가 크게 나지 않을 것 같다면 직접 코드를 작성합니다.

## Example - CORS

예를 들자면 [cors](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS) 관련 처리시 저는 굳이 라이브러리를 사용하지 않았습니다. 제가 개인 개발시 가장 많이 사용하는 **node.js** 나 **golang** 진영에도 물론 뛰어난 라이브러리가 있지만 사실 **cors** 에 대한 약간의 이해만 있다면 굳이 사용할 필요성을 느끼지 못했기 때문입니다. 클라이언트는 먼저 **OPTIONS** 로 어떠한 사항들을 허용하는지 서버에 질의하고 서버는 이에 대한 응답을 헤더에 실어줍니다. 이정도의 이해면 충분하단 생각이 듭니다.

더군다나 제 블로그의 경우는 특히나 복잡하거나 특이한 사항을 처리할 일이 없었으므로 코드역시 몇줄이면 cors 처리가 가능했습니다. 아래와 같이 말이죠.

```typescript
// 직접 작성한 cors 처리 코드
const cors: Middleware = (ctx, next) => {
  const allowHosts = [/^https:\/\/devlog.juntae.kim$/];
  const { origin } = ctx.headers;
  const valid = allowedHosts.some(regex => regex.test(ctx.headers.origin));
  
  if (!valid) return next();
  
  ctx.set('Access-Control-Allow-Origin', origin);
  ctx.set('Access-Control-Allow-Credentials', 'true');
  if (ctx.method === 'OPTIONS') {
    ctx.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Cookie'
    );
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');
  }
  return next();
}
```

아주 간단하죠? 위 코드 몇줄만으로 하나의 서드파티 라이브러리로 부터의 의존성을 갖지 않게 되었습니다.

## Example - React Error Boundary
리액트 를 사용하며 에러처리를 할 때 마주치는 단어중 하나일 것입니다. 저는 이부분 역시 라이브러리를 사용하지 않았습니다. 이유는 아주 간단한데요. 일단 애초에 React 에서 **Error Boundary** 를 처리하기 위해 나온 라이브러리 들을 직접 까보면 대부분이 그냥 **Class Component** 에 **life cycle** 을 그대로 사용하고, 그 안에서 몇몇가지 처리를 해주는 경우가 대부분 이기 때문입니다. 제경우는 사실 필요없는 부분에 대한 처리코드가 더 많았습니다. 거기다 굳이 안에 특별한 코드도 없는데 아래와 같은 형태로 사용할 필요성을 느끼지 못했습니다.

[react-error-boundary](https://github.com/bvaughn/react-error-boundary/blob/master/src/index.tsx) 에서 구현된 라이브러리의 코드를 보시면 쉽게 구현할 수 있다고 느끼실 겁니다.

```tsx
// 라이브러리 사용 예제
function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function Bomb() {
  throw new Error('💥 CABOOM 💥')
}

function App() {
  const [explode, setExplode] = React.useState(false)
  return (
    <div>
      <button onClick={() => setExplode(e => !e)}>toggle explode</button>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setExplode(false)}
        resetKeys={[explode]}
      >
        {explode ? <Bomb /> : null}
      </ErrorBoundary>
    </div>
  )
}
```

개인적으로, 리액트의 순수한 라이프사이클 만으로 처리가 가능한 부분인데, 더해서 라이브러리 역시 리액트에 라이프사이클을 이용해 작성되어 있는데 이걸 쓸 필요가 없다 느꼈습니다. 그리고 구현역시 간단합니다. 리액트의 라이프사이클만 알고 있다면 작성할 수 있는 아주 기본적인 부분이기 때문이죠.

리액트 공식문서의 코드를 긁어와 제가 필요한 부분만 살짝 고쳐사용했습니다. 간단하죠?

```tsx
// 내가 직접 구현한 코드
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    chunkError: false,
  };

  static getDerivedStateFromError(error: Error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    if (error.name === 'ChunkLoadError') {
      return {
        chunkError: true,
      };
    }
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.(production Sentry)
    // logErrorToMyService(error, errorInfo);
  }

  handleResolveError = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    return (
      <ErrorBoundaryWrapper
        hasError={this.state.hasError}
        chunkError={this.state.chunkError}
        handleResolveError={this.handleResolveError}
      >
        {this.props.children}
      </ErrorBoundaryWrapper>
    );
  }
}
```

위와 같이 간단한 구현만으로 해결되는 상황이라면 저는 라이브러리를 사용하지 않고, 직접 구현하는 것을 선호합니다. 서드파티로 부터의 종속성을 없앨 수 있을뿐더러 딱히 성능이나 기능적인 부분에서의 차이가 없는 경우이기 때문이죠.

위의 경우와는 조금 다르지만, 여러가지 기능을 가지고 있는 라이브러리의 일부 기능만이 필요 하다면 직접 그 오픈소스의 코드를 보고 필요한 부분만을 긁어다 쓰는 것도 추천드리고 싶습니다. 혹은 Lodash 같은 경우는 debounce 와 throttle 만을 떼어낸 라이브러리도 따로 존재하니, 유명 라이브러리라면 내가 필요한 기능만 떼어낸 녀석이 있는지 찾아보셔도 좋을 것 같습니다.

# 라이브러리를 어떻게 Wrapping 할까?
앞선 글에서도 잠깐 언급했던 내용이지만 여기서 조금 더 자세히 다루어볼까 합니다. 저는 라이브러리를 wrapping 할 때 ``최대한 작은`` 부분만을, 혹은 단위로 wrapping 하는 편입니다. 이렇게 wrapping 을 하는데에는 몇가지 이유가 있는데, 가장 큰 이유는 다음과 같습니다.

* 이 라이브러리의 api 가 언제 어떻게 변할지 모릅니다.
* 라이브러리간 상호작용이 필요한 경우, 기능을 정확히 분리해 두어야 후에 문제가 생겼을 때 트러블 슈팅에 용이합니다. 모든 경우가 이 방법이 효율적인 것은 아닙니다.
* 다만 회사에서 모바일 앱을 웹으로 포팅하는 프로젝트에서, 화면별로 **완전히 같은 데이터와 결괏값**이 response 로 오지만 **서로 다른 인터렉션**을 보여주어야 하는 상황이 페이지마다 다른때가 많았습니다.
* 이때 이 상황을 컨트롤하려니 커다란 단위에 wrapping 은 정말 대응하기 힘든 구조로 발전해 나가는 경험을 했습니다 ㅜㅜㅜ

상황은 역시 예시로 보는 것이 좋겠죠. 두가지 요소가 상호작용을 하는 경우가 많은 **React Query** 를 예로 들어보겠습니다. 우선 첫번째 경우입니다. 라이브러리를 뭉텅이로 wrapping 했을 때 api 의 형태가 변한다면 어떤 상황이 올까요? 가장 쉽게 만날 수 있는상황은 type 이 깨지거나, wrapping 한 코드를 전부 다 뜯어 고쳐야 하는 상황입니다. 사실 이 경우는 코드로 작성하기도 빡센데 굳이 이 빡센작업을 해서 고생을 하는 경우도 생각보다 많이 보았습니다.

## 복잡한 Wrapping

```tsx
// React Query 에 useQuery 에 대한 타이핑
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError>;

// 이 타입들을 전부 다 끄집어내서 한번더 감싼 코드라면 대강 이런 형태가 되기 쉽습니다.
interface UseQueryFetch {
  queryFunctionData: TQueryFnData<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey ...>(...);
}
interface UseQueryFetchParams {
  queryFunctionData: QueryFunctionData;
  ...
}
function useQueryFetch({queryFunctionData, ...}: UseQueryFetchParams) {
  ...
}
```

위는 정신 건강상 아주 짧게 대체했는데요. 어떤 부분이 문제인지는 쉽게 보일것이라 생각합니다. 사실 React Query 정도 되는 라이브러리는 이미 타이핑이 아주 잘 되어있습니다. 하지만 역시나 복잡하지 않다고는 이야기 하기 힘이 듭니다.

만약 라이브러리가 업데이트되면서 저 위의 타입중 한가지라도 타입이 바뀐다면 어떨까요?
위는 상황을 짧게 줄여 작성해서 그렇지 저 타이핑이 다른 커스텀 함수들과 엮여 있다면 그 함수 전체를 전부 다 살펴보아야 합니다. 아울러 저걸 다른 팀원들과 같이 유지보수를 해야한다면? useQuery 와 useMutation 만 끄집어냈다 해도 굉장히 복잡한 제네릭 파티일겁니다.

저라면 이런 wrapping 만을 할 것 같습니다.

## 단순한 Wrapping
```tsx
export default async function useQueryFetch<T>({
  queryKey,
}: QueryFunctionContext): Promise<T> {
  const [key, params = {}] = queryKey as [string, any];
  // 여기서 apiClient 는 baseURL 을 설정해둔 axios 입니다.
  const { data } = await apiClient.get<T>(key, {
    params,
  });
  return data;
}

// 사용한다면?
// queryFn 자리에 () => axios.get('/devlog/post', { params: ... }) 대신 들어갑니다.
const { isLoading, isError, data } = useQuery<{ posts: PostsType }>({
  queryKey: ['/devlog/post', { test: 'test' }],
  queryFn: useQueryFetch,
});
```

queryKey 로 주는 고유한 값을 url 로 할당한다 가정시 첫번째 값은 항상 url 로서 들어가고, 두번째 이후의 값은 params 로 들어갑니다. 저야 객체로 params 를 던지기로 약속하고 작성했지만, params 의 처리는 편한대로 하셔도 상관 없을듯 싶습니다. 다만 여기서 중요한 것은 ``이미 React Query 로서 충실히 하고 있는 역할은 그대로 두고`` **url 을 두번 입력하게 되는 부분**만을 wrapping 하여 반복되는 코드만을 없앴습니다. 이렇게 작은 단위로 wrapping 을 하게 되는 경우 저 params 의 타입이 변하더라도 useQueryFetch 함수 하나만을 고쳐주어도 되며, 아울러 다른 사람이 고치기에도 크게 어려운 형태가 아니게 됩니다.

## 본연의 기능에 충실한 로직작성
계속해서 **React Query** 를 대표로 예를 들어 보겠습니다. 제 생각에 React Query 및 Swr 같은 라이브러리들의 특징은, 어떠한 api 요청이 있을 때 비동기 작업의 각 단계를 컨트롤하는 복잡성을 줄여주는 것이(아울러 캐싱도요) 굉장히 강력한 기능이라 생각하는데요. 이중 가장 이해하기 쉬운 get 요청을 예로 살펴보겠습니다.

```tsx
function PostCards(props: PostCardsProps) {
  const [handleError] = useError();
  const { isLoading, isError, data } = useQuery<{ post: PostState }>(
    `/devlog/post/${id}`,
    useQueryFetch,
    {
      onError: (error) => {
        handleError(error);
      }
    }
  );
  
  // 위 onError 를 안쓴다면 아래와 비슷한 형태가 되겠죠
  // isError 혹은 error 의 값중 하나만 봐도 무방할듯 싶습니다.
  useEffect(() => {
    if (!isError || !error) return;
    handleError(error);
  }, [isError, error]);
  
  if (isLoading) return <PostCardsSkelleton />;
  if (isError) return null;

  return (
    <Block>
      {data?.posts.map((v, i) => (
        <PostCard key={`post_card_${i}`} post={v} />
      ))}
    </Block>
  );
}
```

예를들어 위와 같은 로직에서 isError 라는 객체는 에러의 유무를 boolean 타입으로 알려주고, error 객체는 에러가 있을 때 그 에러에 대한 정보를 담고 있습니다. 그리고 react query 는 이걸 우리가 사용하기 쉽게 앞으로 끄집어 내주는 역할을 아주 잘 해주고 있습니다.

그런데 이와 ``반대``로 에러에 대한 핸들링을 **fetch** 를 날리는 쪽에 ``섞어서`` 하는 경우를 볼 수 있습니다. 예를들면 axios 에서 처리를 한다거나 fetch API, node-fetch 쪽에서 하는 경우이죠. **단순 throw 만을 하는 경우가 아닌** 어떤 화면을 보여준다거나 알럿을 띄워주는 등 **핸들링 전체(예를들면 인터렉션 관련 작업)** 를 주관하는 방식 말입니다.

axios 나 fetch api 에서 에러 핸들링을 주관하는 것이 **잘못 되었다는 뜻이 아닙니다.** 다만 그럴거면 왜 React Query 를 사용한 건지 의문이 갑니다. loading 처리는 react query 가 하게하면서 error 는 axios 가 처리하게 할때 어떤 커다란 이점이 있어서 일까요? 음... 혹은 캐싱의 용도로만 사용했을 수는 있을것도 같습니다. 하지만 저는 ``특별한 경우가 아니면`` 일부러 이런식으로 로직을 작성할 필요가 없다 생각합니다. 주가 되는 라이브러리를 정하고 서로 연관이 있을 수 밖에 없는 상황이라면 서로가 맡은 부분을 명확히 구분하는 것이 트러블 슈팅이나 코딩중 모호한 부분을 없애는 기본이라 생각하기 때문입니다.

제 생각에 Swr 및 React Query 는 fetch 를 누가 하느냐, axios 같이 중간에 에러핸들링에 용이한 기능이 있는 녀석이 하느냐는 전혀 중요하지 않습니다. 어차피 에러는 앞으로 던져줄테니까요. 다만 데이터를 fetch 하기 위한 http 요청을 날려줄 녀석만 필요할 뿐 입니다.

그렇다면 axios 는 data fetch 에만 집중하는 편이 좋지 않을까요? 만약 차라리 둘을 섞지않고, **axios 에서 모든 에러에 대한 핸들링을 한다면** 더 나은 상황이란 생각이 듭니다. 그러나 axios 에서 몇부분 처리하고, React Query 에서 몇부분 처리하고, 또 어디서 뭘 처리하는 식이라면, ``트러블 슈팅``시 그 모든 부분을 전부 다 살펴보아야 할 것입니다.

여러가지 라이브러리를 섞어서 사용하는 경우에는 각자의 역할을 명확히 나누고 그 역할에 맞는 로직만을 담당하게 하는것이 코드의 복잡성을 낮추는 가장 쉬운 방법이란 생각이 드네요.

예를든다면 기본 axios 가 담당하는 설정은 http 요청시의 각종 헤더에 대한 옵션만을 명시하고, 요청 성공시/실패시 의 결괏값의 핸들링은 ReactQuery 가 담당하게 하는 등의 방식이 더 명확하다는 생각이 듭니다. 

# 글을 마무리하며
여기까지 글을 적으며 제가 가장 많이 한 몇가지 생각이 있습니다. 이 기술이 좋은 기술이고 많은 이들이 사용하는 것도 중요합니다. 하지만 그 부분을 생각하기 전에, 내가 이 기술을 왜 쓰고, ``내 프로젝트에서 얻을 수 있는 부분``이 무엇인가. 혹은 잃을 수 있는 부분이 무엇인가를 확실히 하는것이 가장 먼저란 생각이 드는데요.

어플리케이션이 복잡해지는 만큼 기술들은 더 많이 쏟아져나오고, 다들 새로운 기술들에 홍수속에서 열심히 뭐가 더 좋은지 배우려 노력하고 있을 것이란 생각이 듭니다. 다만 조금더 현명한 선택을 하기위해 화려하고 멋진것 대신, 때론 단순함에 집중을 해도 도움이 될 것이란 생각이 드네요. 역시 은총알은 없는것 같습니다. 긴글 읽어주셔서 감사합니다. 저도 더 공부를 열심히 해야겠습니다.