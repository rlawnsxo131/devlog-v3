---
title: 블로그 개발 후기 1탄 - Typescript
description: 타입스크립트 너무 좋다.
tags:
  - Typescript
thumbnail: https://image-devlog.juntae.kim/post/image/jpeg/typescript.jpg
date: 2020-10-19
slug: blog-development-review-1
---

> *글 작성에 앞서 **이 블로그에 쓰인 모든 기술스택**은 아래 링크를 참조해 주세요.
> 
> *아래 링크를 따라가시면 깃헙 링크에 모든 코드가 공개되어 있습니다.
> 
> *[https://devlog.juntae.kim/info](https://devlog.juntae.kim/info)


개발용 블로그를 직접 만든 이유는 너무 여러가지 인지라 생략하고,
이 블로그를 개발하며 사용한 기술들에 대한 **지극히 개인적인 의견** 들을 **순차적**으로 작성하려 합니다.

첫번째는 **Typescript**입니다.
결론부터 말씀드리자면, 전 앞으로 Javascript로 작성될 수 있는 프로젝트는
가능타면 모두 Typescript 로 작성할 생각입니다.

개인적으로 몇가지 정적타입의 컴파일 언어들을 다루어 보았으나, 이녀석은
이름부터 Type 이 들어가는게 어울린다 할만큼 강타입의 언어란 생각이 가장 많이 드는 언어입니다.

특히나 **Typescript** 에 익숙해지기 이전엔 **Javascript** 로 아무 신경쓰지 않고 작성하던 많은 로직들을
타이핑하느라(특히나 서드파티 라이브러리...) 삽질을 한적도 종종 있습니다.

각설하고 코드로 비교 해보겠습니다.
편의상 예시코드는 최대한 쉽고, 간단한 코드로 살펴봅니다.

# 간단한 코드

## Javascript
아래는 posts 라는 값을 props 로 받아 리스트를 그리는 아주 간단한
리액트 컴포넌트 입니다. 물론 아무런 경고 따위는 뱉지 않습니다.

```tsx
import * as React from 'react';

function Posts({ posts }) {
  return (
    <div>
      {posts.map((v, i) => (
        <div key={i}>
          <span>{v.id}</span>
          <span>{v.title}</span>
        </div>
      ))}
    </div>
  );
}
```

## Typescript
이번엔 타입스크립트 입니다.
만약 위와 같은 코드를 파일 확장자만 **jsx** > **tsx** 로 변경한다면 아래와 같은 에러가 발생합니다.

```
var posts: any
Binding element 'posts' implicitly has an 'any' type.ts(7031)

(parameter) v: any
Parameter 'v' implicitly has an 'any' type.ts(7006)

(parameter) i: any
Parameter 'i' implicitly has an 'any' type.ts(7006)
```

네 그냥 죄다 무슨 타입인지 모르겠다네요. 다 **any** 타입 이래요.
이 코드를 타입스크립트로 작성해 보겠습니다.

```tsx
import * as React from 'react';

type Post = {
  id: number;
  title: string;
};
type PostsProps = {
  posts: Array<Post>;
};

function Posts({ posts }: PostsProps) {
  return (
    <div>
      {posts.map((v, i) => (
        <div key={i}>
          <span>{v.id}</span>
          <span>{v.title}</span>
        </div>
      ))}
    </div>
  );
}
```

편의상 객체의 타이핑은 컴포넌트 상단에 했습니다.
한눈에 보기에도 차이가 쉽게 보입니다.

**Typescript** 는 posts가 어떤 타입들의 배열인지 모르고,
posts 안에 있는 Post 들이 어떤 프로퍼티를 가지고 있는지 타이핑을 해주지 않는다면,

> 난 니가 말하는 값들, 그리고 거기 들어있다는 id, title이 뭔지 알수없으니 타이핑을 해줘!
> 라는 경고문구 혹은 에러를 뱉어냅니다.

여기까지만 본다면 음.. 이게 과연 뭐가 좋은 거지?
라는 생각이 들 수도 있습니다.
그럼 더 간단한 아래 코드를 살펴보겠습니다.

# 더 간단한 코드
## Javascirpt
아래 **sum** 이란 함수는 인자 a, b 를 받고 이를 더해 리턴하는 아주 간단한 함수입니다.
그런데 여기 **문자열 '1'** 과 **숫자 2**를 인자로 전달한다면?
javascript의 특성상 결과는 **문자열 12** 가 나와버립니다.

```javascript
function sum(a, b) {
  return a + b;
}
const result = sum('1', 2);
console.log(result); // 12
console.log(typeof result); // string
```

사실 이런 부분을 이용해 **javascript** 로 어찌보면 유연하고,
정적 타입의 언어에서는 도저히 불가능한 코드를 작성할 수 있지만,
이는 종종 개발자가 생각지 못한 버그를 발생시키기 쉬운 요소중 한가지가 됩니다.

저역시 회사나 개인 프로젝트중 굉장히 복잡한 데이터들을 처리해야 하는
**javascript** 및 **ruby** 코드를 작성할 때, 타입 확인을 소홀히 해 이런실수를 한적이 종종 있습니다.
(사실 로직자체를 복잡하게 짜지 않는게 옳은 방법이란 생각이 드네요 1111)

또는 굉장히 **복잡한 객체**들을 가지고 **수백 or 수천줄 분량의 복잡한 연산을 하는 코드**를 작성하는 경우엔,
개발중 로직이 꼬인부분을 찾기 위해 수없이 디버깅을 돌리곤 합니다. ㅜㅜ
(사실 로직자체를 복잡하게 짜지 않는게 옳은 방법이란 생각이 드네요 2222)

## Typescript
타입스크립트입니다.
일단 저 파일의 확장자만 **ts**로 변경한다면 **너 지금 인자가 any 야** 란 경고를 뱉어줍니다.

```
(parameter) b: any
Parameter 'b' implicitly has an 'any' type.ts(7006)
```

타이핑을 해보겠습니다.

``` typescript
function sum(a: number, b: number) {
  return a + b;
}
const result = sum('1', 2);
```

네 저 **sum** 함수에 **문자열 '1'** 을 넣었다고 아래와 같은 경고를 뱉어줍니다.
덕분에 타입을 못맞춰 실수할 일은 없겠네요.

```
Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
```

# Server && Client Codes
마지막으로 타입스크립트로 작성된 이 블로그의 서버와 클라이언트 사이드 코드를 간단히 보고 넘어가겠습니다.
편의상 **ServerSide**는 **RestAPI** 로 짜여진 부분의 코드를 참조합니다.

## ServerSide
서버사이드의 코드입니다. 필요없는 부분은 전부 생략했습니다.
이번 코드에서 살펴보실 부분은 딱 한가지, **Parameter** 에 관한 **typing** 입니다.

```typescript
type EnrollPostArgs = {
  id?: number; // 이값은 항상 있나없나 확인하라는 경고
  post_header: string;
  post_body: string;
  short_description: string;
  open_yn: boolean;
  series_id?: number; // 이값도 항상 있나없나 확인하라는 경고
  tags: Array<string>;
};

// 예를들어 아래 참조된 코드중 이런부분
post.series_id = series_id ? series_id : 0;

// 이런식으로 작성하면 경고
post.series_id = series_id;
```

**?** 가 없을 수도 있는값이야 란 부분을 명시해주면
귀신같이 **?** 로 명시한 타입의 값이 들어올 때 값의 유효성을 체크하라고 빨간 밑줄을 그어줍니다.
아래 명시된 주석과 코드를 함께 보신다면 쉽게 이해가 갈 것 같습니다.

```typescript
// ...
type EnrollPostArgs = {
  id?: number;
  post_header: string;
  post_body: string;
  short_description: string;
  open_yn: boolean;
  series_id?: number;
  tags: Array<string>;
};
export const enrollPost: Middleware = async ctx => {
  const {
    id,
    post_header,
    post_body,
    short_description,
    open_yn,
    series_id,
    tags,
  } = ctx.request.body as EnrollPostArgs;

  // start transaction
  await getConnection().transaction(async (tm: EntityManager) => {
    try {
      const postRepo = tm.getRepository(Post);
      const postHasTagRepo = tm.getRepository(PostHasTag);
      // 아이디가 있을지 없을지 모르니 확인이 필요함
      const post = id ? await postRepo.findOne(id) : new Post();
      if (!post) {
        ctx.status = 400;
        return;
      }
      let released_at = undefined;
      if (open_yn && !post.released_at) {
        released_at = new Date();
      }
      if (post.released_at) {
        released_at = post.released_at;
      }

      post.post_header = post_header;
      post.short_description = short_description;
      post.post_body = post_body;
      post.open_yn = open_yn;
      post.released_at = released_at;
      // 여기도 series_id가 있을지 없을지 모르니 확인
      post.series_id = series_id ? series_id : 0;
      await postRepo.save(post);

      if (!tags.length) {
        await postHasTagRepo
          .createQueryBuilder()
          .delete()
          .where('post_id = :id', { id: post.id })
          .execute();
      }

      // ...

      ctx.body = {
        post,
      };
    } catch (e) {
      ctx.throw(500, e);
    }
  });
};
```

## Client
다음은 게시글 리스트를 그려주는 클라이언트 사이드의 코드입니다. 이번에도 한부분만 살펴보겠습니다.
**val** 에 **PostType** 이란걸 명시해 주었습니다. 이렇게 타이핑을 하지 않으면 **val** 가 **any** 라며 경고를 합니다.

```tsx
const { loading, error, data } = useQuery(GET_POSTS, {
  variables: {
    tag: query.tag,
  },
});

<>
  {data.posts.map((val: PostType, idx: number) => (
     <PostCard key={`${val.id}${idx}`} post={val} />
  ))}
</>
```

저는 귀찮아서 위와같이 작성했지만 사실 아래와 같이 바꾸어 주어도 무방합니다.

``` tsx
// data가 무슨 타입인지 알려주고,
const { loading, error, data } = useQuery<{posts: Array<PostType>}>(GET_POSTS, {
  variables: {
    tag: query.tag,
  },
});

// 어쩌면 이녀석은 undefined 일수도 있으니
// 값이 있을때만 그리란 optional 연산을 해줍니다.(data?.<logic>)
<>
  {data?.posts.map((val, idx) => (
     <PostCard key={`${val.id}${idx}`} post={val} />
  ))}
</>
```

위 작성한 예시 컴포넌트의 모든 코드입니다.

``` tsx
import * as React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { useRouter } from 'next/dist/client/router';
import { GET_POSTS, PostType } from '../../graphql/post';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import PostCardsSkelleton from './PostCardsSkelleton';

type PostCardsProps = {};

const { memo } = React;
function PostCards(props: PostCardsProps) {
  const { query } = useRouter();
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      tag: query.tag,
    },
  });

  if (loading) return <PostCardsSkelleton />;
  if (error) return <div>error</div>;

  return (
    <Block>
      {/* ... */} 
      {data.posts.map((val: PostType, idx: number) => (
        <PostCard key={`${val.id}${idx}`} post={val} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

export default memo(PostCards);
```

# 정리
위 예시를 위해 작성한 코드는 아주 간단한 코드로 이루어 져 있습니다.
아울러 제가 이 글에서 말하고 싶은부분 또한 아주 단순한 부분입니다.
제가 생각하는 **Typescript** 의 최대의 강점은,

```
타입이 날아다니던 javascript 를 정적타입의 언어로 둔갑시켜줌과 동시에,
약간은 귀찮지만 조금더 안전한 코드를 작성할 수 있게 해준다는 점입니다.
```

물론 이녀석은 간단히 말하면 javascript 에 타입을 씌워주는 역할만을 하기에,
특별히 typescript 를 사용함으로써 로직의 성능이 비약적으로 올라간다거나 하는 일은 없습니다.

네 모던한 신택스로 작성한 javascript 를 컴파일하고 보면 사실 그냥 똑같은 자바스크립트이고,
Typescript 역시 컴파일하고 보면 그냥 똑같은 자바스크립트입니다.

아울러 서드파티 라이브러리를 사용하거나, 혹은 타이핑을 지원하지 않는 라이브러리를 사용하는 경우엔
귀찮은 상황이 종종 있습니다.

자바스크립트에 익숙한 개발자 라면 정말 쉽게 타입스크립트에 익숙해 질 수 있다 생각하지만,
굳이 내가 이걸 사용해야 하나? 란 생각 역시 얼마든지 할 수 있다 생각합니다.

다만 좀더 안정적인 코드를 작성하고, 실수를 줄이고 싶다면 한번쯤은 고려해도 좋은 선택지란 생각이 듭니다.

이후 작성하는 글들은 보다 기술적인 부분들을 조금 더 다루어 보겠습니다.
아마도 다음글은 **GraphQL** 에 관한 내용이 될 것 같습니다.