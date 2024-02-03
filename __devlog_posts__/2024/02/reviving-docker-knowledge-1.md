---
title: Docker 공부 1 - 가상화
description: 근 2년만에 쓰는 글이 도커일 줄이야
tags:
  - Docker
thumbnail: /images/post/thumbnail/john_home_cherry_blossom_2.jpeg
date: 2024-02-02
slug: docker-study-1
---

# Table Of Contents

# 글을 시작하며

어쩌다 보니 회사에서 SSR 에 관한 작업을 많이 하게 되었다. 현재 근무중인 직장은 k8s 기반으로 거의 모든 어플리케이션 서버 리소스가 돌아가고, 컨테이너를 다루기위한 기술로 `Docker`를 사용한다. 어디나 그렇겠지만 특정 조직은 현 상황에 알맞는 형태로 기술을 사용하기 마련이고, 이를 이해하기 위해선 당연히 시간이 필요하다 생각한다(이 조직에 인프라에 대해 모르는게 많아서 지금은 머리가 뒤죽박죽이다). 또한 이 환경을 이해하기 위한 기반 기술의 기본 지식이 있다면 이해가 더욱 빠를것이라 생각한다. _말인 즉슨 일 잘하려면 공부해야 된다._

헌데 한참 devops 나 backend 관련 실무를 더 많이하던 시절엔 비교적 빠릿하게 떠오르던 도커와 관련된 내용들이 가물가물 하다. 해서 이참에 기억을 되살릴겸/공부할겸 글을 적는다. 사실 실무에 내가 해야하는 작업에 딱 필요한만큼? 혹은 조금더? 살펴본것 외엔 그다지 깊게 공부한적도 없는것 같다.

이 시리즈는 아래 네가지를 주제로 작성될 예정이며, 더 길어지거나 짧아질수도 있다.  
이글은 그중 첫번째 주제인 `가상화`를 다룬다.

1. **가상화**: 도커를 이해하기 위한 가장 기본적인 가상화와 컨테이너의 개념을 다룬다
2. **도커엔진**: 실제 docker 엔진의 내부 구조를 살펴본다.
3. **도커파일과 이미지**: 도커파일과 이미지, 이미지 표준, 레이어 캐싱등의 개념을 다룬다
4. **활용**: 명령어및 실무에서 겪었던 경험을 다룬다

글을 적으려다 보니 도커는 참 대단하단 생각이 든다. [k8s 측이 런타임으로 서의 도커지원을 중단한다는 소식](https://kubernetes.io/ko/blog/2020/12/02/dont-panic-kubernetes-and-docker/)을 듣곤, podman 같은걸 슬슬 봐야하나? 했던 때가 있었다.
이땐 실무에서 컨테이너를 만질일이 많아서 더 쫄렸다. but, k8s 와 관련있는 EKS 등이 아니라 ECS 만 사용했다는거. 무튼 주변을 보면 아직도 도커는 컨테이너 관련 솔루션으로서 여전히 건재한것 같다([containerd](https://containerd.io/) 가 있으니 뭐). 사실상 거의 표준이라 해도 과언이 아닐까.

```
잘못된 정보가 퍼져나가는 것을 원치 않습니다.
저는 이 분야의 전문가가 아니며, 잘못된 내용이 있을수 있습니다.

댓글 혹은 메일로 내용의 잘못된 부분을 정정해 주신다면,
감사한 마음으로 기쁘게 글을 수정 하겠습니다(출처나 github, email 등은 동의하에 남기겠습니다).
```

# Docker 란

뭐 다들 알겠지만 도커는 `리눅스 컨테이너`에 여러 기능을 추가하여, 어플리케이션을 컨테이너로서 좀더 편하게 사용하게 만들어진 오픈소스 프로젝트이다. 뭐 이전부터 이것저것 가격정책은 있었지만, 오픈소스란 말이지. 근데 이녀석이 왜 이리도 핫해졌을까? 뭐가 다를까?
우선, 컨테이너란 근본적으로 무엇인가를 알아보자.

# 컨테이너(Container)

일단 컨테이너란 무엇인가를 좀 정리하고 싶다. 내가 생각하는 컨테이너의 정의를 한마디로 한다면 `격리된 환경에서 프로세스를 실행하는 기술` 이다. 이게 무슨말이냐?

```
여기서 이야기하는 컨테이너는 시스템 컨테이너, 어플리케이션 컨테이너 등을 엄격하게 구분짓지 않고
조금더 포괄적인 개념을 이해하기 위한 표현으로 사용한다.
```

우리가 작성하는 소프트웨어는 결국 os 와 라이브러리에 의존성을 지니고 있다. 우리가 브라우저에서 어떤 라이브러리를 이용해 HTTP 요청을 작성하더라도, 이것은 결국엔 os 의 socket 을 이용해야 하는것처럼 말이다. 이런 의존성을 가진채, 성격이 전혀 다른 어플리케이션 여러개를 하나의 os 에 띄워야 한다고 생각해보자. 이때, 작동중인 어플리케이션들이 서로 간섭하지 않고 안전하게 동작하려면 어떤 요소가 필요할까?

nodejs 로 작성된 어플리케이션 여러개를 하나의 server 에서 실행해야 한다고 가정해보자. 이때 nodejs 어플리케이션이 실행되어야 하는 host 환경이 모두 다르며, 의존하는 nodejs 의 버전이 모두 다르다고 가정해보자. 도대체 어떤 일들이 필요할까? 그냥 생각만 해도 머리가 아프다.

![linux_container](/images/post/2024/02/linux_container.png)
[Virtualization VS Containers - 이미지 출처](https://www.redhat.com/ko/topics/containers/whats-a-linux-container)

컨테이너라는 개념(기술)은 위와같은 문제들을 해결한다. 컨테이너를 실행한다는 것은, 기존 시스템에 존재하는 프로세스를 격리하여 `독립적인 환경` 에서 실행하게 된다는 의미이다. 사실 **컨테이너는 실제로 실행중인 프로세스** 일 뿐이다.

아울러 도커에서 이야기하는 컨테이너는 근본적으로 `리눅스`의 기술이다. 뒤에 조금더 자세히 다루겠지만, 도커는 `리눅스 시스템콜`을 활용해 특정 프로세스를 논리적으로 격리시킨다.
간혹 그럼 윈도우에서는 어떻게 동작하지? 란 의문을 갖을수도 있다만, 이건 도커를 윈도우에서 실행할때 linux VM 을 실행해 주기 때문에 가능한 것이다([참고](https://www.docker.com/blog/the-magic-behind-the-scenes-of-docker-desktop/)).

도커 컨테이너는 호스트와 많은것을 공유하는 만큼 호스트에 영향을 받으며, 머신에 영향도 받는다. m1 맥이 처음 나왔을때 이걸 도커측에서 지원해주길 기다리며 펑펑 터지는걸 꼼수로 처리하던 기억이 있는 사람들이라면 알것이다. 머신 아키텍처에 영향을 받는다.

```
도커는 컨테이너가 자체가 아니다.
컨테이너를 관리하기 위한 많은 기능을 지닌채, 컨테이너 관리에 필요한 기능들을
편리하게 이용할 수 있게 만들어진 툴이다.
```

# 가상화

도커란 녀석을 구글링 하다보면 자주 만나는게 **system call 혹은 커널을 공유한다** 라는 문구이다. 이부분은 워낙 자료가 많긴한데, 일단 살펴보자. 우선 이 커널을 공유한다는게 얼마나 큰 의미인지 알기 위해선 컨테이너 이전의 가상화 기술을 살펴보아야 한다.

## 가상화 기술

기존의 가상화 기술은 하이퍼바이저를 이용해 여러개의 운영체제를 하나의 호스트에서 생성해 사용하는 방식이었다. 이러한 여러 개의 운영체제는 가상 머신이라는 단위로 구분되고, 각 가상머신에는 Ubuntu, CentOS 등의 운영체제가 설치되어 사용된다. 당연히도 OS 자체를 가상화 하다보니 무거울수 밖에 없다.

아울러 각종 시스템 자원을 가상화하고 독립된 공간을 생성하는 작업은 하이퍼바이저를 거치게 되는데, 이때 일반 호스트에 비하여 성능 손실이 발생한다.

- 하이퍼바이저: 호스트 컴퓨터에서 다수의 운영 체제를 동시에 실행하기 위한 논리적 플랫폼(virtual machine monitor 또는 virtual machine manager, 줄여서 VMM). 가상머신과 하드웨어 간의 리소스할당, io 처리등을 담당한다.
- Guest OS: 하이퍼바이저를 통해 생성되고 관리되는 운영체제. 즉 host OS 에 올라가는 가상화된 녀석.

![virtual_machines_docker_containers](/images/post/2024/02/virtual_machines_docker_containers.png)
[Virtual machines vs Docker Containers - 이미지 출처](https://www.cherryservers.com/blog/a-complete-overview-of-docker-architecture)

이를 해결하기 위해 CPU의 가상화 기술([HVM](https://en.wikipedia.org/wiki/Hardware-assisted_virtualization))을 이용한 [KVM](https://linux-kvm.org/page/Main_Page)(Kernel-based Virtual Machine)과 [반가상화](https://en.wikipedia.org/wiki/Paravirtualization)(Paravirtualization)방식의 Xen이 등장한다. 이러한 방식은 게스트 OS가 필요하긴 하지만 전체OS를 가상화하는 방식이 아니였기 때문에 호스트형 가상화 방식에 비해 성능이 향상 되었다.

- 전가상화(Hardware Virtual Machine): 어려운말 재끼고 그냥 하드웨어까지 완전히 가상화 하는 기술. Guest OS 의 수정이 필요 없다. 그대신 비교적 무겁다.
- 반가상화(Para-Virtualization): 하드웨어를 완전히 가상화 하지 않고, 하이퍼콜이라는 인터페이스를 통해 하이퍼바이저에게 요청을 날리는 형식. Guest OS 를 수정하여 특정 명령을 날릴때 하이퍼콜을 호출한다. 비교적 가볍긴 하지만 Guest OS 를 수정해야 한다(말인즉슨 오픈소스 OS 아니면 조금 곤란하지 않을까?).

하지만 전가상화든 반가상화든 추가적인 OS를 설치하여 가상화하는 방법은 어쨌든 성능문제가 있었고 이를 개선하기 위해 프로세스를 격리 하는 방식이 등장한다.

리눅스에서는 이 방식을 `리눅스 컨테이너`라고 하고 단순히 프로세스를 격리시키기 때문에 가볍고 빠르게 동작한다. CPU나 메모리는 딱 프로세스가 필요한 만큼만 추가로 사용하고 성능적으로도 손실이 미미하다. 도커는 `runC(libContainer 의 wrapper)`를 사용하여 컨테이너를 만드는데, 이때 host OS 의 자원을 공유한다. 때문에 기존 VM 에 비해 소프트웨어로 가상화를 구현해야 하는 요소가 엄청나게 줄어들고, 이는 가벼운 크기의 이미지와 성능 손실이 비교적 미미한 실행환경을 갖게되는 것으로 연결된다.

한가지 추가로 언급하고 싶은점은 **os 가상화가 안좋아 보이지만 그것도 아니다.** 격리수준은 더 높아 보안적인 측면에선 더 뛰어나기도 하다. 또한 도커와 VM 기술은 꼭 따로써야 하는것도 아니다. 다만, 컨테이너 기술을 활용하여 리소스를 격리시키는 메커니즘은 현대의 어플리케이션이 돌아가는 환경에 잘 맞는 부분이 많다. 하여 **"현 시기에 동작하는 많은 어플리케이션과 궁합이 좋은 기술이다"** 라는 말이 조금더 정확한 표현이라 생각한다.

사실 모든 기술이란 어떤 니즈/문제가 있어야 탄생하고, 많은이가 원하는 요소를 아름답게 뭉쳐내면 그중 몇몇이 한시대를 풍미하는것 아닐까 한다만. 도커는 현대 어플리케이션을 관리함에 있어 필요한 사항을 아주 잘 뭉쳐낸 기술이라 하기에 충분해 보인다.

## 가상화와 성능

일단 리눅스 컨테이너를 구현하려면 `리눅스 시스템 콜`인 `chroot`나 `namespace`, `cgroup`, `unionmount` 등의 기능을 활용해야 한다. 도커는 `libcontainer` 로 인해 리눅스 커널 기능인 cgroups, namespaces 등을 직접적으로 활용할 수 있는데, 이런식으로 리눅스의 기술을 활용한 프로세스 단위의 격리환경을 만들기 때문에 성능의 손실이 거의 없다(**뒤에서 더 자세히 다룬다**).

직전에 전가상화/반가상화 와 하이퍼바이저를 언급하며 설명했듯, 일단 이 하이퍼바이저를 통해 무언가를 실행한다면 내 컨테이너가 실행되는 커널의 기능을 직접적으로 사용하지 못한다는것을 의미한다(system call 도 따지고 보면 interface 이긴 하지만 성격이 다르다). 중간에 어떠한 특정 단계가 있으니 오버헤드가 있는것은 당연하다. 아울러 가상화나 반가상화로 만든 환경은 무겁기 때문에, 상대적으로 이미지가 크고, 이는 실행/배포 시간 등에 영향을 줄수밖에 없다.

즉 이 도커라는 녀석을 사용하여 컨테이너를 활용한다면

1. 컨테이너에 필요한 커널은 호스트의 커널을 공유하여 사용하고
2. 컨테이너 안에는 어플리케이션을 구동하는데 필요한 라이브러리 및 실행 파일만 필요하기 때문에, 만들어내는 이미지의 크기가 작다.
3. 이미지의 크기가 작으니 가상 머신에 비해 이미지를 만드는 속도가 빠르며, 이미지 저장소에 push 를 한다는 등의 행위에 속도가 빠르다.
4. 리눅스 컨테이너를 기반으로 작동하는 만큼 단순히 프로세스를 격리시키기 때문에, 성능 손실이 훨씬 적을수 밖에 없다. 즉 빠르다.

# 도커의 컨테이너

컨테이너와 가상화를 정리했으니, 이제 이걸 도커가 어떤 형태로 구현했는지 살펴보자. 일단 도커는 리눅스 컨테이너 기술을 활용한다 했다. [이 글](https://www.docker.com/blog/docker-0-9-introducing-execution-drivers-and-libcontainer/) 을 살펴보면 알수있듯, 0.9 버전 이전엔 컨테이너 기술을 활용하기 위한 수단으로 [LXC](https://linuxcontainers.org/lxc/) 를 사용했으나, 0.9 부턴 [libcontainer](https://github.com/opencontainers/runc/blob/main/libcontainer/README.md) 라는 내장 드라이버를 기본드라이버로 사용하기 시작했다.

이 변화로 도커는 LXC나 다른 사용자 영역 패키지에 의존하지 않고 `namespaces`, `control groups`, `capabilities`, `apparmor profiles`, `network interfaces`, `firewalling rules` 등을 모두 일관되고 예측 가능한 방식으로 조작할 수 있게 되었는데, 여러 변수를 대폭 줄이고 LXC 버전 및 배포판 전반에 걸쳐 발생하는 부작용으로부터 Docker를 보호 하게 되었다고 한다. 실제로 안정성을 크게 향상시켰다고 하고, 나는 이게 window/mac 등의 여러 플랫폼에서 더 잘 동작하기 위한 기반을 만드는데 큰 영향을 준 변경사항 이었다는 생각이 든다.

![docker execdriver diagram](/images/post/2024/02/docker-execdriver-diagram.png)[docker execdriver diagram - 이미지 출처](https://www.docker.com/blog/docker-0-9-introducing-execution-drivers-and-libcontainer/)

위 이미지를 보면 알 수있듯 [libcontainer](https://github.com/opencontainers/runc/blob/main/libcontainer/README.md) 는 도커가 필요로하는 리눅스의 시스템콜을 사용하는데 관여하며, 컨테이너를 생성하기 위한 기본 Go 구현을 제공한다. 현재는 [runC](https://github.com/opencontainers/runc) 에 포함되어 있다. 이어서 `runC` 가 어디서 어떻게 돌아가는지 가볍게만 살펴보자(**도커 엔진은 다음글에서 다룰 예정**).

## containerd

[containerd](https://containerd.io/)는 도커의 런타임인데, [OCI](https://opencontainers.org/) 가 정한 표준을 준수하여 도커측에서 만든 런타임이다. 도커 컨테이너의 실행과 관리, 이미지, 스토리지와 네트워크 인터페이스 연결과 같은 시스템의 전체 라이프사이클 관리하는 주체가 된다. 하지만 containerd 는 컨테이너를 생성하는 역할은 하지 못하기에, 비교적 더 저수준에 속하는 런타임에 의존하게 되는데 이때 컨테이너를 생성하는 녀석이 바로 [runC](https://github.com/opencontainers/runc) 이다.
아래 이미지를 살펴보자.

![docker engine](/images/post/2024/02/docker-engine.png)[docker engine - 이미지 출처](https://gngsn.tistory.com/128)

위 이미지의 흐름대로 도커 cli 를 통해 명령어를 입력하게 되면 실행되는 흐름은 다음과 같고 이는 [다음 글](https://gngsn.tistory.com/128)을 참고하였다. **runC 가 실행되는 시점까지만 살펴본다**.

1. docker container run ...
2. docker client는 명령어를 적절한 API Payload로 변환해서 Docker Daemon(이하 dockerd)에게 REST API로 POST 요청
3. API 는 UNIX 소켓을 통해 dockerd 에게 전달.
4. dockerd 가 로컬 이미지를 확인하고 없으면 이미지를 registry 에서 가져옴 새로운 컨테이너를 생성하라는 명령을 수신하면, containerd를 호출(with.grpc)
5. containerd 는 docker 이미지를 가져와서 컨테이너 구성을 적용하여 runc 가 이해할수 있는 OCI 번들로 변환
6. runc(내부의 libcontainer 사용)는 OS 커널에 접속해서 컨테이너를 만드는 데 필요한 모든 구성 요소(네임스페이스, cgroup 등)를 하나로 묶고 컨테이너를 생성한다.

...

위와같은 단계로 우리의 도커컨테이너를 만들어줘 란 명령어는 실행되고, 우린 이미지가 컨테이너로 만들어져 실행되는 것을 볼 수 있는것이다.

# 마치며

원래 알던내용도 있고, 헷갈리거나 애매하게 알던내용. 모르던 내용들을 나름 정리해 보았다. 그간 내가 도커를 너무 모르고 썼다는 생각이 드는데, 끈기를 가지고 나머지 주제를 작성해 보려한다.  
다음은 엔진이다. 공부할 내용의 분량이 상당히 많을것 같지만 화이팅

```
궁금한 점이나 내용에 잘못된 부분이 있다면 댓글이나 이메일을 남겨주세요.
질문과 내용정정은 언제나 감사하고 기쁜 마음으로 받습니다.
```

# Ref

- [docker vs containerd](https://blog.purestorage.com/purely-informational/containerd-vs-docker-whats-the-difference/)
- [the magic behind the scenes of docker desktop](https://www.docker.com/blog/the-magic-behind-the-scenes-of-docker-desktop/)
- [how docker desktop for windows works under the hood](https://collabnix.com/how-docker-desktop-for-windows-works-under-the-hood/)
- [what is a hypervisor](https://www.redhat.com/ko/topics/virtualization/what-is-a-hypervisor)
- [lxc vs docker](https://earthly.dev/blog/lxc-vs-docker/)
- [linux container](https://www.44bits.io/ko/keyword/linux-container#lxc)
- [whats future lxc dockers semi forgotten step mother](https://cloudnativenow.com/features/whats-future-lxc-dockers-semi-forgotten-step-mother/)
- [a practical guide to choosing between docker containers and vms](https://www.weave.works/blog/a-practical-guide-to-choosing-between-docker-containers-and-vms)
- [초보를 위한 도커 안내서 - 도커란 무엇인가?](https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html)
- [Docker Engine, 제대로 이해하기](https://gngsn.tistory.com/128)
- [containerd 는 무엇이고 왜 중요할까](https://www.linkedin.com/pulse/containerd%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%B4%EA%B3%A0-%EC%99%9C-%EC%A4%91%EC%9A%94%ED%95%A0%EA%B9%8C-sean-lee/?originalSubdomain=kr)
