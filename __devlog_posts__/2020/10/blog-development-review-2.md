---
title: 블로그 개발 후기 2 - GraphQL(with. REST API)
description: 난 graphql 을 오해하고 있었다
tags:
  - GraphQL
  - Apollo
thumbnail: /images/post/thumbnail/graphql.png
date: 2020-10-26
slug: blog-development-review-2
published: true
---

# Table of Contents

# 글을 시작하며

블로그 개발후기 두번째, **GraphQL** 에 관한 글입니다.

**GraphQL** 에 관해 제가 오해했던 점, 사용하며 어렵다 느꼈던 점,
**REST API** 와의 간단한 비교 및 여타 요소에 대해 이야기 합니다.

> **이 글은 ApolloServer 와 ApolloClient 를 사용하여 개발한 경험에 기반하여 작성하였습니다.**

# GraphQL 에 관한 나의 오해

[GraphQL 공식 홈페이지](https://graphql.org) 대문에는 이런 글이 적혀 있습니다.

```
GraphQL is a query language for APIs and a runtime for fulfilling those queries with your
existing data. GraphQL provides a complete and understandable description of the data in
your API, gives clients the power to ask for exactly what they need and nothing more,
makes it easier to evolve APIs over time, and enables powerful developer tools.

GraphQL은 API를 위한 쿼리 언어이며 이미 존재하는 데이터로 쿼리를 수행하기 위한 런타임 입니다. GraphQL은 API에
있는 데이터에 대한 완벽하고 이해하기 쉬운 설명을 제공하고 클라이언트에게 필요한 것을 정확하게 요청할 수 있는 기능을 제
공하며 시간이 지남에 따라 API를 쉽게 진화시키고 강력한 개발자 도구를 지원합니다.
```

위에서 설명하듯 **GraphQL** 은 특정 형태의 **Query** 로 **API** 서버에 질의합니다.
예를 들어 제 블로그에서 포스트 목록을 가져오는 대략적인 쿼리의 형태는 아래와 같습니다.
음. 뭔가 굉장히 JSON 객체같으면서 유연해 보이면서 뭐시기 하네요.

```
// schema
query {
  posts {
    id
    post_header
    post_body
    ...
  }
}
```

```typescript
// code 는 이런식
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      post_header
      short_description
      ...
    }
  }
`;
```

저는 GraphQL 을 사용하기 전에 GraphQL 에 관한 글들에 적힌 쿼리의 형태나
기타 설명을 보곤 이런 생각을 했습니다.

이건 NoSQL, Redis 쓸때나 써야하나? 형태가 JSON 이랑 비슷하기도 한것같고.
MongoDB 쓸때 잘맞을거 같은데, 이게 RDB 랑 어울릴까?

뭔가 컨셉이 JOIN 을 많이 사용하지 않는 형태로 API 를 작성하게 되거나 해야할 것 같은데,
개발하기 귀찮지 않나? 하는 바보같은 생각을 했었습니다.

네 전혀 그렇지 않습니다. 사실 서버사이드는 적잖게 귀찮은 면이 있습니다.
NoSQL 이든 RDB 를 쓰든 별 상관 없습니다.
**GraphQL** 은 단지 **API 를 정의하는 한가지 스펙**일뿐입니다.

그냥 갓 **FaceBook** 님이 만드셨고, Graph Query Language 로
어플리케이션 레이어에서 동작하는 쿼리 언어입니다.
목적 자체는 기존에 사용하고 있던 REST API 의 한계점을 극복 하기 위해 나온 언어라고 하는데
개인적으론 REST API 를 완전히 커버할 것이다란 생각은 들지 않습니다.

그럼 본론으로 들어가겠습니다.

# 단 하나의 Endpoint

GraphQL 은 **단 하나의 Endpoint** 만을 갖게 됩니다.
기존의 REST API 라면 제 블로그의 **post** 에 관한 Endpoint 는 대략 이렇게 정의 될 것입니다.

```
// REST API
GET /api/post/:id

POST /api/post

PUT|PATCH /api/post/:id

DELETE /api/post/:id
```

그리고 API 에선 각각의 엔드포인트를 구현하고 데이터 처리에 관한 로직을 구현하게 됩니다.
물론 로직별로 데이터 처리에 관한 사항을 구현한다는 점은 GraphQL 이라고 별반 다르진 않습니다.

다만 단 하나의 엔드포인트를 갖게 되는데, 대충 아래와 같은 형태입니다.
**graphql** 이란 단일 엔드포인트로 요청이 들어가고, 나머지 상세 사항은 쿼리에서 명시해 주게 됩니다.

```typescript
// GraphQL

// Endpoint
query | mutation: /graphql

// GET
query {
  post(id: 1) {
    id
    post_header
  }
}

// POST, DELETE, PATCH|PUT
mutation {
  updatePost(id: 1, post_header: "바꿀 제목") {
    id
  }
}
```

GraphQL 은 REST 의 GET 과 같은 역할을 하는 요청을 **query** 로 표현하고,
나머지 객체에 변화를 주는 요청을 **mutation** 으로 표현합니다.
(GraphQL 의 모든 요청은 POST 로 이루집니다. 이부분에 자세한 내용은 이번글에선 생략하겠습니다.)

이렇게 단 하나의 엔드포인트만을 갖게 되며, 클라이언트 쪽에서 데이터를 요청할땐 여러 타입의
스키마에 해당하는 데이터를 요청하더라도, 하나의 엔드포인트에 단 한번의 쿼리로 값을 가져올 수 있습니다.
여기서 제가 생각하는 GraphQL 의 장점이 한가지 나옵니다.

사실 제가 느끼는 GraphQL 의 가장 큰 강점은 서버사이드가 아닌,
클라이언트 사이드에서의 **데이터 fetching** 에 있습니다.

# Over-Fetching, Under-Fetching

흔히들 **Over-Fetching** 과 **Under-Fetching** 에 대한 이야기를 하며, 이를 줄여야
더욱 효율적인 통신이 가능하다 란 이야기를 합니다.

뭐, 사실 생각해보면 당연한 이야기 입니다. 요청시 필요하지도 않은 데이터를 던져주면
response 크기만 커질 뿐 별반 좋을게 없으니까요.

SQL 을 처음 배울때 역시도 SELECT 문에서 \* 은 쓰지말고 필요한 데이터만 가져올 수 있게
왠만하면 명시를 해 주어라 라고 하는 것과 같은 이치입니다.

## Over-Fetching

그러나 생각을 해봅시다.
개인적으로 실무에서 코딩중 여러개의 테이블을 JOIN 해서 값을 던져주는 경우엔,
사실 어느 테이블에 어느 데이터만 뽑아올지 대부분 명시를 해줍니다.

하지만 단 하나의 테이블이랑만 연관되어 있는 데이터를 원한다면,
조인이고 뭐고 걸 필요도 없고 그냥 ORM 이 제공하는 메서드만 사용해도 충분하다면
이런 코드를 많이 작성하게 됩니다.

```typescript
// TypeORM
async function getPosts(): Array<Post> {
  const posts = await getRepository(Post).find();
  return posts;
}
```

```java
// JPA(Hibernate)
public List<Post> findAll() {
    List<Post> posts = new ArrayList<>();
    postRepository.findAll().forEach(post -> posts.add(post));
    return posts;
}
```

```ruby
# ActiveRecord
def get_posts
  posts = Post.all
  return posts
end
```

위는 몽땅 셀렉트를 해버리니 공감이 안가실수 있지만 아래 상황에선 특히나 이런 경우가 많습니다.
포스트는 하나의 레코드를 가지고, 코멘트는 하나의 포스트에 여러개가 물리게 됩니다.

이같은 1:N 관계에서는 Join 을 걸어서 SELECT 하면 레코드마다 포스트 데이터가 전부 셀렉트 되고,
그럼 가져오는 데이터의 양이 커질뿐더러, 사실 그럴 필요 자체가 없습니다.
차라리 각 모델을 한번씩 따로 셀렉트 해주는게 더 나으니까요.

```typescript
// TypeORM
async function getPost(id: number) {
  const [post, comments] = await Promise.all([
    getRepository(Post).findOne(id),
    getRepository(Comment).find({
      where: {
        post_id: id,
      },
    }),
  ]);

  return {
    post,
    comments,
  };
}
```

물론 필요한 데이터만 뽑아다가 주는게 정석이라 하지만,
생각보다 저런 코드를 많이 보실 수 있을테고, 이러한 데이터를 그대로 클라이언트로 던져주는 경우를
가장 쉽게 볼 수 있는 Over-Fetching 이라 할 수 있을 것 같습니다.

사실 필요한 데이터만 걸러서 던져주는것도 얼마든지 가능한데, 특정 상황에선
굳이 데이터를 정제할 필요까진 없겠다 란 생각에서 나온 나쁜 습관이라면 습관이겠습니다.

DB 상에서의 SELECT 는 이미 일어났으나, 서버단 코드가 이렇게 작성되어 있다해도
GraphQL 은 이 객체안에서도 필요한 데이터만을 걸러내어 전달해줍니다.
아래와 같이 명시한다면 명시한 데이터만을 주는 것입니다.
이를 **ApolloClient** 를 사용한 제 React 클라이언트 코드에선 아래와같이 쿼리합니다.

```typescript
// post의 id, post_header
// comment의 id, comment 만을 response 로 받습니다.
const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      post_header
      comment {
        id
        comment
      }
    }
  }
`;
```

위와 같이 필요한 데이터만을 클라이언트에서 요청한대로 정제해 통신을 한다면
Over-Fetching 문제는 거의 없을것이란 생각이 듭니다. 이번엔 Under-Fetching 입니다.

## Under-Fetching

이번엔 제 블로그보다 저희 회사의 서비스를 예로 들겠습니다.
처음 앱에 접속했을 때 가져와야 할 정보가 간단히 두가지 뿐이라고 가정합니다.

1. os 별 노출되어야 하는 배너 리스트.
2. os 별 노출되어야 하는 팁 리스트.

위와 같은 상황일 때 보통 REST API 로 설계된 서버의 경우 클라이언트는 두개의 엔트포인트를 찌르게 됩니다.
하나의 api 만 찔러서는 홈에서 필요로하는 데이터를 모두 가져올 수 없기 때문에, 한번의 요청으론 Under-fetching 이 일어나고 결국은 두번의 요청을 하게 되는것이죠.

```
GET /api/user/banners
GET /api/user/tips
```

이와 같은 상황을 GraphQL 로 작성된 서버와 클라이언트는 단 한번의 요청으로 해결합니다.

```typescript
query {
  user(id: 1) {
    id
    name
    banners {
      id
      banner
    }
    tips {
      id
      tip
    }
  }
}
```

단 하나의 Endpoint 를 갖게되는 만큼 schema를 명시해 놓기만 한다면, 메인이 되는 해당 데이터와
관련된 모든 데이터를 필요한 값만 원하는 대로 한번의 요청으로 가져올 수 있습니다.
통신은 단 한번이면 되고, 특별히 필요없는 데이터가 네트웍상에서 오고가는 현상이 일어나지 않습니다.

제가 느낀 GraphQL 의 가장 큰 장점중 한가지는 클라이언트가 데이터를 요청할 때,
`내가 필요한 데이터만 원하는데로 단한번의 요청으로 깔끔하게 가져올 수 있다` 는 것 입니다.
허나, 장점이 있으면 단점이 있는 법이지요.

클라이언트가 데이터를 저렇게 편하게 요청할 수 있도록 코드를 작성하면서
아울러 DB에 쓸데없는 SELECT 를 날리지 않는등 성능상 이슈를 없애기 위해서는
서버단 코드작성에 노력이 좀 필요합니다.
저역시 클라이언트보다는 서버쪽 로직 작성시 삽질을 좀 했네요.

대표적으로 GraphQL 로 작성된 서버가 1:N 관계로 인한 문제 해결시 쉽게 찾아볼 수 있는,
**DataLoader** 라는 녀석에 대해 이야기 해보겠습니다.

# DataLoader

**DataLoader** 는 기본적으로 GraphQL 내부 스키마 정의시 **1 : N** 관계에서 깊은 연관이 있습니다.
이를 설명하기 위해 관계정의에 관한 부분을 먼저 살펴보겠습니다.

제 블로그의 포스트는 기본적으로 하나의 포스트가 여러개의 태그를 갖을 수 있습니다.
즉 이로 인해 `포스트(1):태그(N)` 관계가 성립합니다.

지금부터 코드를 살펴볼 텐대요 처음 접하시는 분은 조금 헷갈리실 수도 있지만
최대한 쉽게 설명해 보겠습니다. 우선 포스트의 타입을 정의한 코드를 먼저 살펴봅니다.

```typescript
// Post
export const typeDef = gql`
  // ...
  type Post {
    id: ID!
    post_header: String!
    post_body: String!
    short_description: String
    open_yn: Boolean!
    series_id: Int!
    created_at: Date!
    updated_at: Date!
    released_at: Date
    tags: [String]! // 여기!
    comments_count: Int!
    series_posts: [SeriesPost] // 여기!
  }
  
  extend type Query {
    post(id: ID!, post_header: String!): Post!
    posts(tag: String): [Post]!
  }
  // ... 
`;
```

정의된 포스트 타입에 tags 라는 곳이 String 타입의 배열로 이루어져 있는데요,
타입이 뭐건 일단 **배열**이라는 것이 중요합니다.
Query 부분에 **posts 라는 쿼리의 반환 타입이 Post 의 배열**인것 역시 잘 보아두어야 합니다.

제 블로그는 메인에서 여러개의 포스트를 보여줄 때 하나의 포스트에 여러개의 태그가
붙어있는 것을 표현해 주는데요, 각각의 포스트를 가져오는 부분을 REST API Endpoint 하나로 생각하고,
해당 로직의 SQL을 작성한다면 이런식으로 작성할 수 있을 것 같습니다.
일단 예시이니 만큼 핸들링 테이블에 대한 데이터 숫자 등등은 신경쓰지 않고 봅니다.

```sql
SELECT p.*, group_concat(t.name) as tags
FROM `post` p
INNER JOIN `post_has_tag` pht ON p.id = pht.post_id
INNER JOIN `tag` t ON pht.tag_id = t.id
GROUP BY p.id
ORDER BY p.released_at;
```

각각의 포스트안에 tags 의 배열을 넣어주어야 하는지라 위와 같은 쿼리를 작성했습니다.
posts 배열을 돌며 포스트를 그릴텐데 posts 배열의 각각(post)마다 tags 라는 배열이 또 존재하기때문에

이를 따로(posts 배열하나, tags 배열 하나) 담아준다면 클라이언트 쪽에서 이 값들을 일일이 포스트마다 맞는 태그가 뭔지 매핑을 해야하는 귀찮은 일이 생기기 때문입니다.
(상황에 따라 다르긴 한데 가져와야 하는 레코드 수가 많다면 쿼리를 쪼개서 셀렉트하고 로직상에서 매핑처리 후 클라이언트로 던져주는게 정석이긴 합니다.)

위 작성한 쿼리의 리턴 결과를 객체로 표현한다면 아래와 같은 형태의 데이터 객체가 나오게 됩니다.

```typescript
{
  posts: [
    {
      id: 1,
      post_header: '1번 개시글',
      post_body: '내용1',
      tags: 'typescript, java',
      ...
    },
    {
      id: 2,
      post_header: '2번 개시글',
      post_body: '내용2',
      tags: 'Python, ruby',
      ...
    }
  ]
}
```

설명이 길었으나 그냥 SQL 만 봤을때 이렇게 간단한 것을 GraphQL 로 작성할때
왜 쉽지않은 상황이 생기느냐. 바로 GraphQL의 스키마 정의 방식때문 입니다.

저는 개인적으로 이런 형태의 스키마 정의 방식과, API 디자인 방식이 GraphQL 이 추구하는 방향을 잘 드러내는 부분이라 느꼈습니다.

```typescript
export const resolvers: IResolvers = {
  // 포스트의 요소중 tags 라는 객체를 직접 정의
  Post: {
    tags: async (parent: Post, _, { loaders }) => {
      const tags: Array<PostTag> = await loaders.tag.load(parent.id);
      return tags.map((tag) => tag.name);
    },
    // ...
  },
  Query: {
    post: async (parents, args, context, info) => {},
    posts: async (parents, args, context, info) => {},
    // ...
  },
  Mutation: {},
};
```

기본적으로 Post 라는 객체타입에 원래 속해있는 값들
(**DB post 모델만을 select시 넘어오는 순수한 값들**)은 아무 상관이 없지만,
여기에 부가적으로 붙게되는 어떤 객체나 값들은 우리가 직접 명시를 해주어야 합니다.
그리고 직접 명시한 객체를 처리하는 로직 역시 직접 작성해 주어야 합니다.

예를 들어 위의 **tags** 는 **DB**에 정의된 `tag 테이블과 post_has_tag 라는 매핑 테이블을 추가로 연결` 하여 만들어지는 post 테이블과 연결된 관계의 객체입니다.
즉, `post 객체의 순수한 값에는 들어가지 않지만 조인을 통해 관련된 값으로 들어갈 수 있는 객체란 이야기 입니다.`

이렇게 명시한 객체를 쿼리할 때 우리가 직접 명시를 해준 특별한 값이 포함되어 있다면,
하나의 객체당 우리가 작성한 특별한 객체에 대한 처리 로직을 실행하게 됩니다. 여기서 문제가 발생합니다.

만약 아무런 처리를 하지 않고, 전달받은 포스트 아이디에 대한 값에 대한 태그를 셀렉트 하는 로직만을 작성한다면, `우리는 20개의 포스트를 가져올때 20번의 태그를 가져오는 DB SELECT 를 실행하게 됩니다.`
이런 문제를 해결하기 위해 **DataLoader** 라는 라이브러리를 사용합니다.

> DataLoader 의 원리를 비교적 간단히 설명하자면,
> data fetch 시 1+N 의 문제를 **batching** 을 통해 1+1 변환시켜주는 역할을 합니다.
> DataLoader는 javascript의 **event-loop** 를 이용 하는데, **event-loop** 중 하나의 **tick**에서 실행된 data fetch에 대한 요청들을 하나의 요청으로 모아서 실행하고, 그 결과를 다시 알맞게 분배하는 역할을 합니다.
> 아래의 내용들은 실제 블로그를 구현한 로직들이 들어가있어 복잡할 수 있으니,
> 설명이 간단하게 잘 되어있는 [hosung 님의 글](https://y0c.github.io/2019/11/24/graphql-query-optimize-with-dataloader/) 을 참고하셔도 좋을 듯 싶습니다.

다시 Post 객체에대한 tags 라는 특별한 값을 정의한 로직을 보겠습니다.
아래와 같이 loaders 라는 객체에 들어있는 tag.load 라는 로직을 실행합니다.
여기서 parent.id 는 해당 포스트의 아이디가 됩니다.

이는 미리 선언한 Post 객체에대한 정의에 따라 들어오게 되는데,
이부분은 **ApolloServer** 쪽에서 알아서 잘 처리해 줍니다.

다만 저 loaders.tag.load 를 구현한 DataLoader 의 구현체는 직접 구현해 주어야 하는데,
이 로직에선 batching 으로 넘어온 객체들의 아이디를 기반으로 필요한 데이터를 한번에 셀렉트하고,
다시 재 정리해 줍니다.

```typescript
  Post: {
    tags: async (parent: Post, _, { loaders }) => {
      const tags: Array<PostTag> = await loaders.tag.load(parent.id);
      return tags.map(tag => tag.name);
    },
    // ...
  },
```

그럼 loaders.tag.load 의 구현 코드를 살펴보겠습니다.

```typescript
export const createTagsLoader = () =>
  new DataLoader<number, Array<PostTag>>(async (postIds) => {
    const tags = await getRepository(Tag)
      .createQueryBuilder('t')
      .select(['t.name, pht.post_id'])
      .innerJoin(PostHasTag, 'pht', 't.id = pht.tag_id')
      .where('pht.post_id IN (:postIds)', { postIds })
      .getRawMany();

    const groupingObj = groupByObjectId<PostTag>(
      postIds,
      tags,
      (tag) => tag.post_id,
    );
    return postIds.map((id) => groupingObj[id]);
  });
```

순서대로 살펴봅니다.

1. 일단 postIds 라는 값은 셀렉트한 모든 포스트의 아이디값이 들어오게 됩니다.
2. 이를 기반으로 모든 포스트 아이디가 갖고 있는 태그를 셀렉트합니다. 이때 포스트의 아이디와 매핑을 해주기 위한 포스트 아이디도 같이 셀렉트 해 줍니다.
3. 여기가 중요합니다. 아래코드의 주석을 보면서 코드를 자세히 살펴봅니다.

```typescript
export function groupByObjectId<T>(
  ids: ReadonlyArray<number>, // baching 으로 인해 셀렉트할 인자로 넘어온 포스트 아이디들을 그대로 받음
  rows: Array<T>, // tag 를 셀렉트한 결과에 해당하는 모든 로우들
  idResolver: (row: T) => number, // 각각의 tag 로우를 넘겨주면 해당 tag와 매핑할 post_id 를 셀렉트해주는 함수
) {
  // 결과가 담길 객체 선언
  const obj: {
    [key: number]: Array<T>;
  } = {};

  // 넘어온 아이디를 객체의 key 값으로 각각 담아준다.
  // 그리고 각각의 객체의 값은 빈 배열을 넣어준다.
  ids.forEach((id) => {
    obj[id] = [];
  });

  // 이제 셀렉트한 결과값으로 넘어온 모든 tags 로우를 돌면서
  // 각각의 row.post_id 를 키값으로 갖고있는 객체의 배열에 해당하는 row를 넣어준다.
  // 즉, 아까 위에서 모든 postIds 를 각각 객체의 키로 넣어주었으니,
  // obj 의 키가 tag.post_id 와 일치하는 값들을 넣어준다.(현재 아래서 돌고있는 row 가 tag객체)
  rows.forEach((row) => {
    obj[idResolver(row)].push(row);
  });

  return obj;
}
```

타입스크립트로 작성되어 코드가 좀 더 길어진 감이 있지만 순서대로 보자면,

1. batching 으로 인해 셀렉트한 포스트의 아이디가 한번에 넘어왔고,
2. 이걸 기반으로 post_has_tag 와 tag 를 연결시켜 넘어온 포스트아이디가 가지고 있는 태그객체를 전부 셀렉트한 값이 rows 란 이름으로 넘어옵니다.
3. 이때 post_id 가 꼭 있어야 합니다. 이걸기반으로 post 와 매핑해줍니다.
4. batching 으로 인해 한번에 넘어온 포스트 아이디를 빈 객체에 각각 키값으로 넣어주고, 그 값은 빈배열로 선언합니다.
5. 셀렉트한 모든 로우를 돌며 해당 태그가 가지고 있는 post_id 가 아까 키값을 넣어준 객체의 키와 같다면, 해당 객체의 값은 배열이니 여기에 push 해 줍니다.

제가 설명해놓고도 복잡하네요..

1. 원리는 한방에 넘어온 모든 값들의 아이디를 추려서
2. 이걸 기반으로 내가 필요로 하는 값을 찾아내고
3. 다시 묶어준다 입니다.

비교적 단순한 1 : N 관계의 로직도 사실 마냥 쉽지만은 않은 로직으로 작성이 되어있는데
이보다 훨씬 복잡한 백엔드 로직을 작성한다고 생각하면 백엔드 단의 데이터 관계정의를
정말 잘 해야할 것 같다는 생각이 듭니다.

# 마치며

저는 GraphQL 과 RestAPI 를 적절히 섞어서 쓰는것을 추천하고 싶습니다.
예를 들어 현재의 제 블로그 역시 기본적인 CRUD 로직은 GraphQL 로 작성되어 있는 반면,

RSS 나 Sitemap 을 반환하는 로직, 로그인 관련 로직은 REST API 기반의 구조로 작성되어 있습니다.
아울러 추가로 구현할 이미지 업로드나 파일 업로드 관련 로직은 REST API 로 구현할 생각입니다.

기술적이 부분만 놓고 보자면, 사실 조금 더 섬세하고 세세한 작업을 한다거나 (캐싱, 프록시 처리, http 로 할 수있는 많은것들) HTTP2 혹은 HTTP3 를 사용한다고 하면 그로인해 따라오는 높은 성능등은 아직 GraphQL 로 커버할 수 없을지도 모릅니다.

하지만 ApolloServer 나 ApolloClient 를 사용했을 때 해당 기술들이 알아서 해주는 Caching 이나,
여러 Cache 관련 옵션들, Over-Fetching, Under-Fetching 등이 없는 요청을 클라이언트에서 주체적으로 처리할 수 있는 부분은 큰 장점이란 생각이 듭니다.

이처럼 서로의 장단점이 분명한 만큼, 적절한 부분에 적절한 기술을 적용한다면
조금 더 우아한 구조로 이루어진 어플리케이션을 만들 수 있을 것 같습니다.

추가로, 기존의 서버가 REST API 로 작성되어 있다면, 클라이언트에서 ApolloClient 를 사용하는 것과
유사한 사용자 경험을 주는 [SWR](https://swr.vercel.app) 이나 [ReactQuery](https://react-query.tanstack.com/) 를 고려해 보셔도 좋을 것 같습니다.

개인적으로 많이 사용해 본 것은 아니지만, 상당히 괜찮은 기술이란 인상을 받아 추천드립니다.

마지막으로, 어플리케이션의 스펙에 GraphQL 사용을 고려하고 계시다면,
이글이 도움이 되었으면 하는 바램입니다.

# Ref

- [https://www.apollographql.com/docs/](https://www.apollographql.com/docs/)
- [https://graphql.org](https://graphql.org)
- [https://medium.com/@FourwingsY/graphql을-오해하다-3216f404134](https://medium.com/@FourwingsY/graphql을-오해하다-3216f404134)
- [https://tech.kakao.com/2019/08/01/graphql-basic](https://tech.kakao.com/2019/08/01/graphql-basic)
