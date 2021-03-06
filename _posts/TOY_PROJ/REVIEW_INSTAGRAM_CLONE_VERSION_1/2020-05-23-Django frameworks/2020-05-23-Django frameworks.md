---
title: Django frameworks
date: 2020-05-23
author: jyoon
category: Django
tags:
  - ToyProjReview
  - Instagram clone coding
  - Django
---

[Django overview | Django](https://www.djangoproject.com/start/overview/)

- 프레임워크
    - 파이썬으로 만들어진 프레임워크
- 개발속도가 빠르다
- 안전하다
    - 유명해서 장고 커뮤니티 안에서 해킹하려고 하다 보니 버전이 계속 업그레이드
- 유명 기관들이 사용
    - 인스타그램,  핀터레스트, 스포티파이, NASA ETC

- 라이브러리 vs 프레임워크 
  - 라이브러리
      - 내가 불러 사용할 수 이는 기능 (리엑트, jQuery)
  - 프레임워크
      - 코드가 실행되는 방식
      - 역전의 제어가 일어난다.

# 장고 프레임워크에 대한 설명

- MVC 패턴

    ```jsx

    client request -> urls -> view -> serialize -> Model -> DB
    client request -> urls -> view ->              Model -> DB

    ```

    - URLs
        - Controller 역할
        - 유저가 장고 어플리케이션으로 찾아 갈수 있는 주소(endPoint)
    - views
        - model 역할
        - business 개발, DB와 통신 데이터를 저장/수정/삭제/호출한다.
    - serialize
        - Model에서 사용할 Table Column 세팅
    - Model
        - django.db 에 요청해서 DB와 통시난다.
    - 보다시피 장고는 우리가 뭘 안해도 URLs에서 views를 불러낸다. 
    장고는 그렇게 디자인 되어 있다.
- ORM
    - DB와 대화할때 쓰인다.
    - default로 admin pannel을 갖고 있다.

    #