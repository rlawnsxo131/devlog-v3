---
title: Docker 공부 2 - 엔진
description: 글이 너무 늦었지만, 그래도 시간 날 때마다 쓰자
tags:
  - Docker
thumbnail: /images/post/thumbnail/john_home_cherry_blossom_2.jpeg
date: 2024-03-09
slug: docker-study-2
---

# Table Of Contents

# 글을 시작하며

글이 좀 늦어졌다. 시간이 없단건 핑계고, 실무와 재밌어 보이는 다른 주제를 공부하느라 블로그 글을 작성하는데 시간을 쓰지 않았다. 반성해야지. 뭐 어쨋든 이 글은 다음의 네가지 주제로 작성될 예정이다.

1. [가상화 : 도커를 이해하기 위한 가장 기본적인 가상화와 컨테이너의 개념을 다룬다](https://devlog.juntae.kim/post/docker-study-1)
2. **[도커엔진 : 실제 docker 엔진의 내부 구조를 살펴본다](https://devlog.juntae.kim/post/docker-study-2)**
3. **도커파일과 이미지**(예정) : 도커파일과 이미지, 이미지 표준, 레이어 캐싱등의 개념을 다룬다
4. **활용**(예정) : 명령어및 실무에서 겪었던 경험을 다룬다

도커 공부 두번째, `도커엔진`에 관한 글이다. 이번 글에서 다룰 내용중 일부는, [이전글](https://devlog.juntae.kim/post/docker-study-1) 에서 언급한 내용이 포함되어 있다. 해당 내용을 조금더 살펴보고, 외에 더 알아두면 좋을만한 요소를 다루어 본다.

```
잘못된 정보가 퍼져나가는 것을 원치 않습니다.
잘못된 내용이 있다면, 댓글 혹은 메일로 알려주세요.
```

# 도커 엔진 개요

도커엔진은 여러가지 요소로 이루어져 있는데, [공식 문서](https://docs.docker.com/engine/) 에서는 다음과 같이 소개한다.

- Docker 엔진은 애플리케이션을 구축하고 컨테이너화하기 위한 오픈 소스 컨테이너화 기술이다.
- Docker 엔진은 다음을 통해 클라이언트-서버 애플리케이션 역할을 한다.
  - 장기 실행 데몬 프로세스가 있는 서버 `dockerd`
  - 프로그램이 Docker 데몬과 대화하고 지시하는 데 사용할 수 있는 인터페이스를 지정하는 `API`
  - 명령줄 인터페이스(CLI) 클라이언트 `docker`

| 요소            | 역할                                                                                                                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI`           | Docker API를 사용하여 스크립팅 또는 직접 CLI 명령을 통해 Docker 데몬을 제어하거나 상호 작용한다. 다른 많은 Docker 애플리케이션은 기본 API와 CLI를 사용한다. |
| `Docker daemon` | 이미지, 컨테이너, 네트워크, 볼륨과 같은 Docker 개체를 생성하고 관리한다.                                                                                    |

우리가 도커를 사용할때를 떠올리면 이해가 쉬울듯 한데. CLI 를 통해 명령어를 입력하면 도커는 이 명령을 실행한다. 이 명령은 도커 데몬과 상호작용 하거나, 제어 하는 역할을 하는데 말인즉슨 우리가 실제로 아래와 같은 명령어를 실행하면 이를 도커 데몬에게 전달하고,

```bash
$ docker ps
$ docker build .
$ docker exec -it asdf /bin/sh
```

도커데몬은 이미지 생성, 컨테이너 시작과 종료, 볼륨 마운트나 네트워크 인터페이스 조작 등을 우리가 내린 명령어에 따라 실행한다는 것을 의미한다.

# 도커 아키텍처와 client - server 통신

![docker-architecture](/images/post/2024/04/docker-architecture.png)
[docker-architecture - 이미지 출처](https://docs.docker.com/get-started/overview/#docker-architecture)

위 이미지는 [도커 아키텍처 공식문서](https://docs.docker.com/get-started/overview/#docker-architecture) 에 있는 이미지이다. 이미지를 살펴보면 알 수 있듯, 각 명령어 실행시 `docker client` 의 역할을 하는 녀석이 입력받은 명령어를 **docker host** 영역의 `docker daemon` 에 전달한다.

도커는 기본적으로 `client - server` 아키텍처를 사용하는데, docker client 와 daemon 은 UNIX Socket 또는 Network Interface 를 통해 `REST API` 통신을 한다. 다음 명령어를 입력해보면 알 수 있듯, 도커에서 사용할 수 있는 네트워크 종류는 브리지(bridge), 호스트(host), 논(none) 등이 있다.

```bash
$ docker network ls

NETWORK ID     NAME      DRIVER    SCOPE
2b65cbfa18ba   bridge    bridge    local
3591c8114eb8   host      host      local
bc36518b9959   none      null      local
```

Docker를 설치한 후 Host의 네트워크 인터페이스를 살펴보면 `docker0` 라는 가상 인터페이스가 생기는데,
docker0 는 일반적인 가상 인터페이스가 아니며 도커가 자체적으로 제공하는 네트워크 드라이버 중 `브리지(bridge)`에 해당한다고 한다. 이부분을 확인해보기 위하여 다음 명령어를 때려보았다.

```bash
$ ifconfig docker0
ifconfig: interface docker0 does not exist
```

음..? 해당 인터페이스가 없다고 한다? 결론부터 말하자면 이유는 지금 내가 **mac** 을 사용해서 이다. mac 에선 약간 특이한게 **Docker Desktop**에서 네트워킹이 구현되는 방식으로 인해 docker0 호스트에서 인터페이스를 볼 수 없고, 이 인터페이스는 실제로 가상 머신 내에 있다고 한다([참고](https://docs.docker.com/desktop/networking/#there-is-no-docker0-bridge-on-the-host)).

# UNIX Socket 과 TCP Socket 에 사용 케이스

위에서 docker client 와 daemon 은 서로 REST API 통신을 하며, 상황에 따라 `UNIX Socket` 과 `TCP Socket` 을 사용한다고 했다. 특별한 케이스도 있겠지만, 기본적으로 이 두가지를 알면 일반적인 상황에선 문제가 없어보인다. 각각 사용되는 케이스가 조금 다른데 이는 다음과 같다.

| 소켓 종류   | 설명                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UNIX Socket | 로컬에서 도커를 사용한다면 도커 클라이언트는 기본적으로 `유닉스 도메인 소켓`을 통해 도커 데몬과 통신한다. 이 소켓은 로컬 파일 시스템에 위치하며, 보통은 `/var/run/docker.sock` 경로에 있다. 클라이언트는 이 소켓을 통해 HTTP 요청을 보내고, 데몬은 이를 받아들여 해당 요청에 대한 작업을 수행한 후 응답을 다시 클라이언트에게 보낸다. 이 방법은 **로컬 머신**에서 도커를 사용할 때 주로 채택된다.                           |
| TCP Socket  | **도커데몬**은 필요에 따라 **외부 네트워크에 노출**될수 있는데, 예를들어 내가 통신해야 하는 도커데몬이 로컬이 아닌 다른 서버에 떠있다고 가정해 보자. 해서 해당 도커데몬이 떠있는 서버에 로컬에서 명령어를 내리려면 어떻게 해야할까? 일단 네트워크 상의 통신이 필요할 것이다. 그럼 유닉스 도메인소켓의 동작에서 벗어난 행동을 해야 한다(local host 의 process 간의 통신이 아니기 때문에). 해서 이때는 `TCP 소켓`을 사용한다. |

각 Socket 을 사용하는 방법과 옵션은 [daemon-socket-option](https://docs.docker.com/reference/cli/dockerd/#daemon-socket-option) 에 잘 기재되어 있다.

# Docker Network Driver 와 이에 따른 특징

위에서 도커의 Server - client 간 통신과 상황에 따른 Socket 의 사용 케이스를 살펴보았다. 헌데 이 기능이 왜 필요할까? 잘 생각해보면 우리가 도커를 활용할때 컨테이너의 내부와 외부의 통신이 거의 대부분의 상황에 필연적임을 알 수 있다. 평소 내가 익숙하게 EXPOSE 명령어를 dockerfile 에 명시하여, 아래와 같이 호스트와 내부의 특정 포트를 연결시키는 행위를 생각하면 이해가 쉬울듯 하다.

```bash
$ docker run -d -p 3000:3000 my-image
```

후에 더 자세히 다루겠으나, EXPOSE 는 사실 필수가 아니긴 하다. 일단은 다음 [공식 문서](https://docs.docker.com/reference/dockerfile/#expose) 를 참고하자.

본론으로 들어가서, 우리가 **컨테이너를 실행**하면 **특정 내부 IP** 가 할당된다. 이때 내부 IP 만으로는 **외부와의 통신이 불가능** 한데, 컨테이너를 활용하다 보면 컨테이너와 컨테이너, 컨테이너와 호스트등 통신이 가능해야 하는 순간이 필수적이라 봐도 무방하다. 이를 위한, 도커의 네트워크 구조를 살펴보자.

![docker-network-architecture](/images/post/2024/04/docker-network-architecture.png)

이미지는 내가 가지고 있는, **시작하세요! 도커/쿠버네티스** 라는 책에 첨부된 이미지를 직접 따라 그렸다. 우리가 확인해 봐야 할 요소는 크게 호스트의 `eth0`, 기본 브리지인 `docker0`, 컨테이너의 가상 네트워크 인터페이스인 `veth` 이 3 인데, 각각의 요소를 살펴보자.

# Ref
