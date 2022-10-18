---
title: WebServer 와 Application Layer - 이론편 (with. golang)
description: server 짤때 golang 참 재미있고 괜찮습니다.
tags:
  - application
  - architecture
  - golang
thumbnail: https://image-devlog.juntae.kim/post/image/png/layer_with_golang.png
date: 2022-05-28
published: true
slug: about-the-application-layer
---

한동안 현생이 바빠 오랜만에 글을 작성합니다. 이번엔 Backend, Client 관계없이 제가 개발을 하며 조심해야 한다고 생각하는 부분들과 그중 가장 많이 보아오고, 겪어온 실수에 대해 이야기할까 합니다.

React - 스파게티 구조
사실 코드를 작성하며 당시엔 별 문제가 아니라 생각하고 넘어갔다가 시간을 가면 갈수록 커다란 쓰레기 덩이가 나오는 것을 지켜보는 일이 한번쯤은 있을것 이란 생각이 듭니다. 저역시도 코딩을 한지 얼마 안되었을 당시는 일단 동작하게 만들고 넘어가자 라는 생각을 종종 갖고 있었죠. 그러나... 제가 이 생각을 고쳐먹은 계기가 있는데요. 이전에 한 회사에서 FrontEnd 개발자로 인턴을 경험했을 때의 일입니다.

당시 제가 맡은 부분은 장바구니 부분의 버그를 수정하는 일이었는데요. 정말 간단 할 것이라 생각했던 기능이었으나 코드를 열어본 결과, 눈알이 빠지는 경험을 했습니다. React.js 로 작성된 프로젝트였는데, 기본적으로 커머스의 성향을 띈데다, 그래픽을 다루는 영역이 있는 프로젝트이다 보니 굉장히 많은 state 를 다루고 있는 상황이었습니다. 문제는 이 state 의 관리를 너무 중구난방으로 했다는 것입니다.