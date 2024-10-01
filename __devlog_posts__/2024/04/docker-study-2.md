---
title: Docker 공부 2 - 엔진과 네트워크
description: 글이 너무 늦었지만, 그래도 시간 날 때마다 쓰자
tags:
  - Docker
thumbnail: /images/post/thumbnail/john_home_cherry_blossom_2.jpeg
date: 2024-04-29
slug: docker-study-2
published: true
---

# Table Of Contents

# 글을 시작하며

글이 좀 늦어졌다. 시간이 없단건 핑계고, 재밌어 보이는 다른 주제를 공부하느라 블로그 글을 작성하는데 시간을 쓰지 않았다. 뭐 어쨋든 이 글은 다음의 둘 또는 네가지 주제로 작성될 예정이다.

1. [가상화 : 도커를 이해하기 위한 가장 기본적인 가상화와 컨테이너의 개념을 다룬다](https://devlog.juntae.kim/post/docker-study-1)
2. **[도커엔진과 네트워크 : 실제 docker 엔진과 네트워크 구조를 살펴본다](https://devlog.juntae.kim/post/docker-study-2)**
3. **도커파일과 이미지**(고민중) : 도커파일과 이미지, 이미지 표준, 레이어 캐싱등의 개념을 다룬다
4. **활용**(고민중) : 명령어및 실무에서 겪었던 경험(logging, troubleshooting, container orchestration - main ECS / sub K8S)을 다룬다

도커 공부 두번째, `도커 엔진과 네트워크`에 관한 글이다. 이번 글에서 다룰 내용중 일부는, [이전글](https://devlog.juntae.kim/post/docker-study-1) 에서 언급한 내용이 포함되어 있다. 해당 내용을 조금더 살펴보고, 외에 더 알아두면 좋을만한 요소를 다루어 본다.

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

| 요소          | 역할                                                                                                                                                        |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CLI           | Docker API를 사용하여 스크립팅 또는 직접 CLI 명령을 통해 Docker 데몬을 제어하거나 상호 작용한다. 다른 많은 Docker 애플리케이션은 기본 API와 CLI를 사용한다. |
| Docker daemon | 이미지, 컨테이너, 네트워크, 볼륨과 같은 Docker 개체를 생성하고 관리한다.                                                                                    |

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

도커는 기본적으로 `client - server` 아키텍처를 사용하는데, docker client 와 daemon 은 UNIX Socket 또는 Network Interface 를 통해 `REST API` 통신을 한다. 그럼 이 client-server 통신을 활용해 상호작용하는 각 요소의 역할을 각각 살펴보자.

| 요소            | 설명                                                                                                                                                                                                                                                                                                                                                                                               |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 도커 데몬       | Docker 데몬(dockerd)은 Docker API 요청을 수신하고 이미지, 컨테이너, 네트워크, 볼륨과 같은 Docker 개체를 관리한다. 데몬은 Docker 서비스를 관리하기 위해 다른 데몬과 통신할 수도 있다.                                                                                                                                                                                                               |
| 도커 클라이언트 | Docker 클라이언트(docker)는 많은 Docker 사용자가 Docker와 상호 작용하는 기본 방법 이다. `docker run` 같은 명령을 사용하면 클라이언트는 이러한 명령을 dockerd 에 보내고 이를 수행한다. 이 docker 명령은 Docker API를 사용한다. Docker 클라이언트는 둘 이상의 데몬과 통신할 수 있다.                                                                                                                 |
| 도커 레지스트리 | Docker 레지스트리는 Docker 이미지를 저장한다. Docker Hub 은 누구나 사용할 수 있는 공개 레지스트리이며 Docker는 기본적으로 Docker Hub 에서 이미지를 찾는다. 자신만의 개인 레지스트리를 실행할 수도있다. `docker run` 또는 `docker pull` 명령 을 사용하면, Docker 는 구성된 레지스트리에서 필요한 이미지를 가져온다. `docker push` 명령 을 사용하면 Docker 는 이미지를 구성된 레지스트리에 푸시한다. |
| 도커 객체       | Docker 를 사용하면 이미지, 컨테이너, 네트워크, 볼륨, 플러그인 및 기타 객체를 생성하고 사용하게 된다.                                                                                                                                                                                                                                                                                               |

# UNIX Socket 과 TCP Socket 에 사용 케이스

위에서 docker client 와 daemon 은 서로 REST API 통신을 하며, 상황에 따라 `UNIX Socket` 과 `TCP Socket` 을 사용한다고 했다. 특별한 케이스도 있겠지만, 기본적으로 이 두가지를 알면 일반적인 상황에선 문제가 없어보인다. 각각 사용되는 케이스가 조금 다른데 이는 다음과 같다.

| 소켓 종류   | 설명                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UNIX Socket | 로컬에서 도커를 사용한다면 도커 클라이언트는 기본적으로 `유닉스 도메인 소켓`을 통해 도커 데몬과 통신한다. 이 소켓은 로컬 파일 시스템에 위치하며, 보통은 `/var/run/docker.sock` 경로에 있다. 클라이언트는 이 소켓을 통해 HTTP 요청을 보내고, 데몬은 이를 받아들여 해당 요청에 대한 작업을 수행한 후 응답을 다시 클라이언트에게 보낸다. 이 방법은 **로컬 머신**에서 도커를 사용할 때 주로 채택된다.                           |
| TCP Socket  | **도커데몬**은 필요에 따라 **외부 네트워크에 노출**될수 있는데, 예를들어 내가 통신해야 하는 도커데몬이 로컬이 아닌 다른 서버에 떠있다고 가정해 보자. 해서 해당 도커데몬이 떠있는 서버에 로컬에서 명령어를 내리려면 어떻게 해야할까? 일단 네트워크 상의 통신이 필요할 것이다. 그럼 유닉스 도메인소켓의 동작에서 벗어난 행동을 해야 한다(local host 의 process 간의 통신이 아니기 때문에). 해서 이때는 `TCP 소켓`을 사용한다. |

각 Socket 을 사용하는 방법과 옵션은 [daemon-socket-option](https://docs.docker.com/reference/cli/dockerd/#daemon-socket-option) 에 잘 기재되어 있다.

# Docker Network Driver 와 이에 따른 특징

cli 를 통해 내린 명령어가 도커 데몬에 어떻게 전달되는지 대략적으로 알아 보았으니, 이제 우리가 실제로 컨테이너를 사용할때 필요한 네트워크 통신이 어떻게 이루어 지는지 알아보자.
도커는 각각의 컨테이너가 **논리적으로 격리**된채 독립된 프로세스로서 동작하며, 우리가 **컨테이너를 실행**하면 도커는 호스트로부터 실행되는 컨테이너에 `172.17.0.x` 의 `IP`를 순차적 으로 할당한다(birdge 타입의 네트워크 드라이버를 사용한다는 가정하에). 하지만 **내부 ip 만으로는 외부와의 통신이 불가능**한데, 외부와의 통신을 위해 도커의 네트워크 구조가 어떻게 이루어져 있는지 알아보자.

![docker-network-architecture](/images/post/2024/04/docker-network-architecture.png)

이미지는 내가 가지고 있는, **시작하세요! 도커/쿠버네티스** 라는 책에 첨부된 이미지를 직접 따라 그렸다. 우리가 확인해 봐야 할 요소는 크게 호스트의 `eth0`, 기본 브리지인 `docker0`, 컨테이너의 가상 네트워크 인터페이스인 `veth` 이 3 인데, 각각의 요소를 살펴보자.

| 요소    | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| eth0    | 호스트의 eth0 은, 실제 우리가 `외부와 연결할 때 사용하는 IP가 할당된 호스트 네트워크 인터페이스` 이다.                                                                                                                                                                                                                                                                                                                                      |
| docker0 | docker0 은 도커가 설치될 때, 기본적으로 구성되는 `브리지`이다. 이 브리지의 역할은 `호스트의 네트워크인 eth0 과 컨테이너의 네트워크를 연결을 해주는 역할`을 한다. 하나의 브리지 안에서 다양한 컨테이너와 연결을 해줄 수 있으며, 새로운 브리지를 생성하는 것도 가능하다.                                                                                                                                                                      |
| veth    | veth(virtual eth) 는 `컨테이너의 내부 IP를 외부와 연결해 주는 역할을 하는 가상 인터페이스` 이다. 사용자가 직접 생성할 필욘 없고, 컨테이너가 생성될 때 veth 가 동시에 생성된다. 이 veth를 호스트의 eth0과 연결시킴으로써 외부와의 통신이 가능해 진다. 그리고 이 연결을 docker0과 같은 브리지가 수행한다. 실제 컴퓨터의 랜카드(NIC) 을 통해 랜포트 을 열어서 랜 케이블 에 연결하는 것이 아니라, 가상의 네트워크 인터페이스를 생성하는 것이다. |

_네트워크에 관해 제대로 공부한 분들이라면 당연히 알겠지만, 관련값들을 보려고 `ifconfig` 를 때리다 알게된 `재미있는 사실`이 하나 있다. **맥북에서 ifconfig 명령어를 사용해도 eth0가 보이지 않는다.** 이유는 맥북이 일반적으로 이더넷(Ethernet) 연결을 위한 물리적 네트워크 인터페이스를 기본적으로 사용하지 않기 때문이다. 대신, 맥북은 주로 Wi-Fi(무선 랜)와 같은 무선 네트워크 인터페이스를 기본 네트워크 연결 방법으로 사용한다._

_**무선 연결이 기본**: 맥북은 대부분의 경우 무선 네트워크(Wi-Fi)를 사용한다. 따라서 ifconfig를 실행하면 en0, en1 등의 무선 인터페이스가 나타난다._

_**이더넷 어댑터 필요**: 이더넷 케이블을 통해 유선 연결을 사용하려면 별도의 이더넷 어댑터(USB-C 또는 썬더볼트 기반)가 필요하다. 이런 어댑터가 연결되면 eth0 또는 유사한 유선 네트워크 인터페이스가 나타난다._

_**인터페이스 명칭**: 맥북에서 이더넷 인터페이스는 일반적으로 eth0이 아니라 enx 형식(예: en10)으로 명명된다._

_즉, 맥북에서 ifconfig 명령어를 실행해도 eth0이 보이지 않는 이유는 이더넷 인터페이스가 기본적으로 없거나 어댑터가 연결되지 않았기 때문이다._

다른이야길 한김에 하고싶은 이야기를 하나 더 하겠다. 이 전글부터 여기까지 `가상화`와 `인터페이스`란 단어를 참 많이 사용하는것 같다. 도커라는 기술에 포함된 많은 요소는 하드웨어 / 네트워크 드라이버 / 커널 등이 해야하는 역할을 **어플리케이션레벨로 끌어올려 추상화** 하였으며, 이를 **인터페이스로 제공**한다.

나는 이러한 맥락이 도커뿐 아닌 다양한 인프라와 어플리케이션 레벨에서 활용될 수 있는 개념이라 생각하는데, 예를들어 AWS 등의 **클라우드 기술**은 각종 하드웨어 레벨의 장비나 물리서버등을 추상화하여 우리에게 제공한다. golang 은 os 레벨의 thread 가 아닌 **언어 레벨에서 동작하는 스레드**를 만드는 goroutine 이 있고, jvm 진영엔 virtural thread 등이 있다.

이런식으로 추상화란 개념을 넓혀가면, 사실상 **CS 전공지식상의 수많은 개념이 상위 어플리케이션 레벨까지 끌어올려진 부분이 많다**는것을 참 많이 느끼게 되는데, OS 의 L1 / L2 / L3 캐시를 CDN / Redis / Local Server Memory Cache 또는 ORM cache 로 대응시켜 보자. 참 닮아있지 않나? 예를들어 [aws - circuit-breaker](https://docs.aws.amazon.com/ko_kr/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html#circuit-breaker-implementation)를 살펴봐도 [TTL](https://www.cloudflare.com/ko-kr/learning/cdn/glossary/time-to-live-ttl/)의 개념이 섞여있는 것을 알 수 있다(dynamoDB 와 연관이 있긴 해도 개념을 놓고보자). 결국은 재미없고 지루한 전공수업일수도 있는 CS 의 기본이 그만큼 많이 활용되고 있단걸 이야기 하고 싶다. 난 진또배기 비전공자인지라 아직도 CS 를 공부하는 중인데, 이글을 보는 전공생들은 **_전공수업 열심히 들으면 적어도 소프트웨어를 이해하는데엔, 분명 많은 도움이 될거란 이야기를 하고싶다._**

# 도커 네트워크 기능

컨테이너를 생성하면, 기본적으로 docker0 브리지를 통해 외부와 통신할 수 있는 환경을 사용할수 있지만, 사용자의 선택에 따라 여러 네트워크 드라이버를 쓸 수 있다. 다음 명령어를 입력해보자.

```bash
$ docker network ls

NETWORK ID     NAME      DRIVER    SCOPE
2b65cbfa18ba   bridge    bridge    local
3591c8114eb8   host      host      local
bc36518b9959   none      null      local
```

도커에서 사용할 수 있는 네트워크 종류는 브리지(bridge), 호스트(host), 논(none) 등이 있는데, 이는 도커 데몬이 실행되면서 기본으로 생성되는 네트워크이다. Docker를 설치한 후 Host의 네트워크 인터페이스를 살펴보면 `docker0` 라는 가상 인터페이스가 생긴다. docker0 은 일반적인 가상 인터페이스가 아니며 도커가 자체적으로 제공하는 네트워크 드라이버 중 `브리지(bridge)`에 해당한다. 이부분을 확인해보기 위하여 다음 명령어를 때려보았다.

```bash
$ ifconfig docker0
ifconfig: interface docker0 does not exist
```

음..? 해당 인터페이스가 없다고 한다? 결론부터 말하자면 이유는 지금 내가 **mac** 을 사용해서 이다. mac 에선 약간 특이한게 **Docker Desktop**에서 네트워킹이 구현되는 방식으로 인해 docker0 호스트에서 인터페이스를 볼 수 없고, 이 인터페이스는 실제로 가상 머신 내에 있다고 한다([참고](https://docs.docker.com/desktop/networking/#there-is-no-docker0-bridge-on-the-host)).

도커가 제공하는 각각의 네트워크는 각각이 수행하는 역할이 다르고, 물론 이에따른 기능도 다르다. 사실 문서를 쭉 읽어본바 이부분을 내가 실무에서 직접 다룰일이 있을지 모르겠지만서도 일단 개념정도는 알아둠이 어떨까 싶어 각 개념을 서술한다.

## 브리지(Bridge) 네트워크

`기본 네트워크 드라이버` 이다. 드라이버를 지정하지 않으면 이게 기본 네트워크 유형이다. 브리지 네트워크는 애플리케이션이 동일한 호스트 내에 다른 컨테이너와 소통해야 하는경우 일반적으로 사용된다. Host의 docker0 브리지 인터페이스와 새로 만들어진 컨테이너 eh0을 연결하여 유저가 정의한 bridge 를 직접 설정하여 사용 가능하다. 새로운 브리지 네트워크를 생성하는 명령어는 다음과 같다.

```bash
$ docker network create --driver bridge mybridge
```

docker run 또는 create 명령에 --net 옵션값을 설정하면 컨테이너가 이 네트워크를 사용하도록 설정할 수 있다.

```bash
$ docker run -i -t --name mycontainer \
--net mybridge \
ubuntu:14.04
```

다음 명령어로 사용자 정의 네트워크를 붙이고 뗄수 있다.

```bash
$ docker network disconnect mybridge mynetwork_container
$ docker network connect mybridge mynetwork_container
```

한가지 알아두면 좋을법한 부분이 있다.  
`none`, `host` 네트워크 등과 같은 특별한 네트워크 모드에서는 docker network connect, disconnect 를 사용할 수 **없다**. `birdge` 또는 `overlay` 같은 **특정 ip 대역을 갖는 네트워크 모드**에만 이 명령어를 사용 **가능**하다.

네트워크의 subnet, gateway, ip 할당 범위 등을 임의로 설정하려면 네트워크를 생성할때 아래와 같이 옵션을 추가한다. 당연히 `--subnet` 과 `--ip-range` 는 같은 대역대여야 한다.

```bash
$ docker network create --driver bridge \
--subnet=172.72.0.0/16 \
--ip-range=172.72.0.0/24 \
--gateway=172.72.0.1 \
mybridge
```

## 호스트(Host) 네트워크

컨테이너와 Docker 호스트 간의 네트워크 격리를 제거하고 호스트의 네트워킹을 직접 사용한다. 말인 즉슨 내가 도커을 돌리고 있는 내 호스트 환경의 네트워크를 그대로 사용할 수 있다는 이야기 이다. 위의 bridge 드라이버와는 다르게 **별도로 생성할 필요 없고**, 기존의 `host` 라는 이름을 사용한다.

```bash
$ docker run -i -t --name network_host \
--net host \
ubuntu:14.04
```

위와 같이 `--net` 옵션을 입력해 호스트를 설정한 컨테이너의 내부에서 네트워크 환경을 확인하면, 호스트와 같은것을 알 수 있다. 호스트 머신에서 설정한 호스트 이름도 컨테이너가 물려받기에 컨테이너 호스트이 이름도 무작위 16진수가 아닌 **도커 엔진에 설치된 호스트 머신의 호스트 이름으로 설정**된다.

컨테이너의 네트워크를 host 모드로 설정하면 컨테이너 내부의 어플리케이션을 별도의 포트 포워딩 없이 바로 서비스할 수 있다. 이는 마치 실제 호스트에서 어플리케이션을 외부에 노출하는 것과 같다. 예로, 호스트 모드를 쓰는 컨테이너에서 아파치 웹 서버를 구동한다면 호스트의 ip 와 컨테이너의 아파리 웹 서버 포트인 80으로 바로 접근 가능하다.

개인적으로 한가지 추천하고 싶은바는, 이 모드는 내가 진짜 네트워크에 대해 빠삭하고 보안에 관해 잘 안다 싶을때 정말 필요하다면 사용하라고 이야기 하고 싶다. 예로, 호스트의 ip 와 port 를 그대로 사용하기에 같은 port 를 사용하는 컨테이너를 여러개 띄우는순간 port 가 **충돌**할 것이고 컨테이너와 호스트간의 네트워크 격리를 없애버리므로 **보안 위험**이 높아질 수 있다. 물론 격리없이 직접 호스트와 통신하기에 오버헤드는 비교적 적을것이라 생각이 들지만, 진짜 그정도 오버헤드가 중요한 어플리케이션 이라면 컨테이너를 쓰는게 과연 맞을까? 싶기도 하다.

## 오버레이(Overlay) Network

오버레이 네트워크는 여러 Docker 데몬을 함께 연결하고 Swarm 서비스와 컨테이너가 노드 간에 통신할 수 있도록 한다. 이 전략을 사용하면 OS 수준 라우팅이 필요하지 않다.

## 논(None) 네트워크

컨테이너를 호스트 및 다른 컨테이너로부터 완전히 분리한다. Swarm 서비스에는 사용할 수 없다. 다음과 같이 컨테이너를 생성하면 외부와 연결이 단절된다.

```bash
$ docker run -i -t --name network_none \
--net none \
ubuntu:14.04
```

## 컨테이너(Container) 네트워크

--net 옵션으로 container 를 입력하면 다른 컨테이너의 네트워크 네임스페이스 환경을 공유할 수 있다. 공유되는 속성은 내부 IP, 네트워크 인터페이스의 맥(MAC) 주소 등이다. 다음과 같이 명령어를 입력하면 된다.

```bash
$ docker run -i -t -d --name network_container_1 ubuntu:14.04

$ docker run -i -t -d --name network_container_2 \
--net container:network_container_1 \
ubuntu:14.04
```

위와같이 컨테이너의 네트워크 환경을 공유하면 내부 IP를 새로 할당받지 않으며 호스트에 veth 로 시작하는 가상 네트워크 인터페이스도 생성되지 않는다. network_container_2 컨테이너의 네트워크 관련 사항은 전부 network_container_1과 같게 설정된다. 이를 이미지로 표현하자면 다음과 같다.

![docker-container-network](/images/post/2024/04/docker-container-network.png)
[docker-container-network - 이미지 출처](https://m.yes24.com/Goods/Detail/84927385)

## 브리지(Bridge) 네트워크와 --net-alias

브리지 타입의 네트워크와 run 명령어의 --net-alias 옵션을 함께 쓰면 특정 호스트 이름으로 컨테이너 여러 개에 접근할 수 있다. 위에서 생성한 mybridge 네트워크를 이용해 컨테이너를 3개 생성해보자.

```bash
$ docker run -itd --name network_alias_container1 \
--net mybridge \
--net-alias alicek106 ubuntu:14.04

$ docker run -itd --name network_alias_container2 \
--net mybridge \
--net-alias alicek106 ubuntu:14.04

$ docker run -itd --name network_alias_container3 \
--net mybridge \
--net-alias alicek106 ubuntu:14.04
```

inspect 명령어로 각 컨테이너의 IP 를 확인해 본다.

```bash
$ docker inspect network_alias_container1 | grep IPAddress
```

첫번째 컨테이너의 IP 주소가 172.18.0.3 이라면 두번째, 세번째 컨테이너는 각각 0.4, 0.5 일 것이다. 세개의 컨테이너에 접근할 컨테이너를 생성한 뒤 alice106이라는 호스트 이름으로 ping 을 전송해 테스트해보면 된다.

```bash
$ docker run -i -t --name network_alias_ping \
--net mybridge \
ubuntu:14.04

$ ping -c 1 alicek106
...
```

컨테이너 3개의 IP로 각각 ping이 전송된 것을 확인할 수 있다. 번 달라지는 IP를 결정하는 것은 별도의 알고리즘이 아닌 `라운드 로빈` 방식이다. 이것이 가능한 이유는 도커 엔진에 내장된 DNS가 alicek106이라는 호스트 이름을 `--net-alias` 옵션으로 **alicek106을 설정한 컨테이너로 변환**하기 때문에 가능하다.

![docker-bridge-network-net-alias](/images/post/2024/04/docker-bridge-network-net-alias.png)  
[docker-bridge-network-net-alias - 이미지 출처](https://m.yes24.com/Goods/Detail/84927385)

## MacVLAN 네트워크

MacVLAN은 호스트의 네트워크 인터페이스 카드를 가상화해 물리 네트워크 환경을 컨테이너에게 동일하게 제공한다. 따라서 MacVLAN을 사용하면 컨테이너는 물리 네트워크상에서 가상의 맥(MAC) 주소를 가지며, 해당 네트워크에 연결된 다른 장치와의 통신이 가능해진다. MacVLAN 연결된 컨테이너는 기본적으로 할당되는 IP 대역인 172.17.X.X 대신 네트워크 장비의 IP 를 할당받기 때문이다.

![docker-MacVLAN_network](/images/post/2024/04/docker-MacVLAN_network.png)
[docker-MacVLAN_network - 이미지 출처](https://m.yes24.com/Goods/Detail/84927385)

따라서 MacVLAN 을 사용하는 컨테이너들과 동일한 IP 대역을 사용하는 서버 및 컨테이너들은 서로 통신이 가능하다. 반대로 MacVLAN 을 사용하는 컨테이너는 기본적으로 호스트와 통신이 불가능하다. 위 이미지에서 컨테이너 A 는 서버2와 통신할 수 있지만, 서버1 과는 통신할 수 없다. 책의 예시는 라즈베리파이 두대로 테스트하는데 자세한 내용은 생략하고, 명령어만 서술한다.

```
공유기의 네트워크 정보: 192.168.0.0/24
서버1(node01): 192.168.0.50
서버2(node02): 192.168.0.51
```

두서버에서 각각 아래의 명령어를 입력하면 MacVLAN 네트워크를 생성할 수 있다.

```bash
$ docker network create -d macvlan --subnet=192.168.0.0/24 \
> --ip-range=192.168.0.64/28 --gateway=192.168.0.1 \
> -o macvlan_mode=bridge -i parent=eth0 my_macvlan
```

```bash
$ docker network create -d macvlan --subnet=192.168.0.0/24 \
> --ip-range=192.168.0.64/28 --gateway=192.168.0.1 \
> -o macvlan_mode=bridge -i parent=eth0 my_macvlan
```

- `-d(--driver)`: 네트워크 드라이버로 macvlan 을 사용한다는것을 명시한다
- `--subnet`: 컨테이너가 사용할 네트워크 정보를 입력한다. 여기서는 네트워크 장비의 IP 대역 기본 설정을 그대로 따른다.
- `--ip-range`: MacVLAN을 생성하는 호스트에서 사용할 컨테이너의 IP 범위를 입력한다. node01 과 node02 의 IP 범위가 겹쳐 동일한 IP 의 컨테이너가 각각 생성된다면 컨테이너 네트워크가 정상동작 하지 않을수 있으므로 반드시 겹치지 않게 설정해야 한다.
- `--gateway`: 네트워크에 설정된 게이트웨이를 입력한다. 여기서는 네트워크 장비의 기본 설정을 그대로 따른다.
- `-o`: 네트워크의 추가적인 옵션을 설정한다. 위 예시에서는 macvlan_mode=bridge 값을 통해 MacVLAN 을 bridge 모드로, parent=eth0 값을 통해 MacVLAN으로 생성될 컨테이너 네트워크 인터페이스의 부모 인터페이스를 eth0 으로 지정한다. eth0은 공유기에 랜선으로 연결되어 192.168.0.0/24 대역의 IP를 할당받은 네트워크 인터페이스 이다.

MacVLAN 네트워크를 사용하는 컨테이너를 생성하는 명령어는 다음과 같다.

```bash
$ docker run -it --name c1 --hostname c1 \
> --network my_macvlan ubuntu:14.04

$ ip a
```

```bash
$ docker run -it --name c2 --hostname c2 \
> --network my_macvlan ubuntu:14.04

$ ip a
```

서로 ping 을 날리며 테스트 한다.

```bash
$ ping 192.168.0.128 -c 1
```

```bash
$ ping 192.168.0.51 -c 1
```

## IPvlan 네트워크

IPvlan 네트워크는 사용자에게 IPv4 및 IPv6 주소 지정을 모두 완벽하게 제어할 수 있게 해준다. VLAN 드라이버는 그 위에 구축되어 운영자가 레이어 2 VLAN 태깅과 심지어 언더레이 네트워크 통합에 관심이 있는 사용자를 위한 IPvlan L3 라우팅까지 완벽하게 제어할 수 있도록 해준다.

# 마치며

이번에도 원래 알던내용도 있고, 헷갈리거나 애매하게 알던내용. 모르던 내용들이 있었다. 그간 내가 도커를 너무 모르고 썼다는 생각이 또 든다. 나머지 주제는 이미지 표준에 관한 것들과 명령어. 그리고 내가 실무에서 겪어온 트러블 슈팅. 특히나 백엔드 개발자 + 데브옵스 + 프론트엔드 를 다하던 일명 잡부시절의 경험들인데. 요건 적을지 말지 고민중이다. 우선 오늘 공부한 내용이 머릿속에 완전히 자리잡도록 복습 또 복습을 해야 겠다. 다소 늦은 두번째 글을 읽어주신 분께는 감사의 말을 전하고 싶다.

# Ref

- [Docker Get started overview Docs](https://docs.docker.com/get-started/overview/)
- [Docker Network Docs](https://docs.docker.com/network/)
- [시작하세요 도커/쿠버네티스](https://m.yes24.com/Goods/Detail/84927385)
- [시작하세요 도커/쿠버네티스 github](https://github.com/alicek106/start-docker-kubernetes)
- [AWS circuit-breaker](https://docs.aws.amazon.com/ko_kr/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html)
