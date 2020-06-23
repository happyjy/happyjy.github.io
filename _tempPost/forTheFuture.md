[TOC]



> 여기서 물러나면 내미래는 독고다이 끝 이라는 마음으로 



# 개발자 

- 프레임워크만 잘다루는 개발자 되지 않기 
- 성장은 탄탄한 기본기로부터 나온다 
- 기본기 !
  - HTML, CSS 원리와, 최신 스팩(HTML5, CSS, SASS) 관련지식
  - VanillaJS
  - ES6+
  - CS
  - Algorithms
    프로그래머스 기준
    - 높음: 해시, 정렬, 완전탐색, 깊이/너비 우선 탐색(DFS/BFS)
    - 보통: 스택/큐, 힙,  
    - 낮음: 탐욕법(Greeedy), 동적계획법(Dynamic Programming), 이분탐색, 그래프
  - Data Structure
 
      
      
 
    
  - Network
  
  - Design Pattern
  
    - [ ] 제로초 사이트 보고 list up 하기
  
  - Software architecture

# BRAIN STORMING 

## 기존산업, 현재산업 비교 

* 기존
	
	- FRONT 중요X, 서버 개발중요(전자정부프레임워크, JAVA SPRING)
	
	- 고인물이 많다. 나이 많은 사람들이 많다. 
	
* 현재
	
	* 벤처기업, 유니콘 기업
		
	* 빠르게 빌드하는 언어, 프레임워크가 각광
		
	* 성능, 보안에 대해서 이슈가 있는걸로 암(시기가 지나면서 보완되겠지만)
		
	* 웹, 앱 만드는 개발이 열렸으며 허들이 낮아 졌으나 좀더 나은 개발을 위해서는 언어, 개발의 난이도가 높아짐
	
	* 도태 되는 서비스, 기업이 생기겠다. 
	  기존과 비슷하겠지만 기존 산업은 이미 한시기를 지나 걸러진 서비스, 기업이라 생각 함
	  하지만 현재 서비스는 아직 그시기를 지나지 못했다고 생각
	
	  

## 현재산업에서 살아 남기 위해서 ? 

* node 환경 개발이 벤처, 유니콘 회사에서 사용되고 있다. 

## open ai code generation 시대에 대비해서 나는 뭘해야 하는가? 

[openAI GIT](https://github.com/openai)

* 함수, 주석으로 코드를 생성해준다. 
* 정형적인것은 가능하지만 조금 고민이 있는 것은 어렵지 않을까? 
* 100% 완벽해지기 전까지 테스트, 코드 리뷰를 해야 하는데 코드를 확인하려면 코드를 직접 작성해본사람이 검수하는 작업이 필요하지 않을까? 
* 빨리 개발하고 남은 시간에 다른 역량을 키워야 하지 않을까? 
* 퍼블리싱 분야에 대해서 어떨까? 
  * 주로 비즈니스 로직 처리에서 사용되기 때문에 프론트 개발에서 원하는 화면을 구현하기에는 어렵지 않을까? 
  * 나모웹에디터, 센차터치  integrated development environment (**IDE**) 사용시에도 정형적인것들만 가능했다. 정형적이지 않은 화면을 만들기에는 어려움이 있다. 이때 필요한게 css, js 능력이라고 생각한다.

```
* ecounterp login 화면 template 똑같이 따라해보기 
* 블로그 포스트 쓰기 
	* [ ] sub-pub
		: https://rinae.dev/posts/why-every-beginner-front-end-developer-should-know-publish-subscribe-pattern-kr
* 블로그 기능 추가 
	* [ ] 포스트 제일 아래 마지막 update 시간 적기
	* [ ] 메뉴 상단에 REpository 적기
* 책
	* [ ] 성능
	* [ ] 크로스브라우징
	* [ ] babel (devops)
	* [ ] 진도 프레임워크에 대해서
	
*  UI
 - [ ] nav bar
 - [ ] dropdown
 - [ ] auto search
 
* etc
	* [ ] 구직시 자신감을 잃지 말라고 했던 사이드가...? (1. jbee? 2. toss 상엽? 3. 트레바리 cto)
	* [ ] jb https://cafe.naver.com/hacosa/196010
	* [ ] udemy 강좌 확인하기
	* [x] 코츠 todo 하위에 하위에 하위에 하위 todo list 작성하는 방법 소개한 곳 
		- 75회_3회차

* 경력에 대한 나의 생각
	* 기초: 언어에 대한 깊은 이해
		- 언어 기초 
		- 인터뷰용
	* 제품 만드는 능력: toy project
		- nomad, udemy(Stephen Grider)

	* 기존산업/ new산업
		- 기존 산업: 고도화
		- new 산업: 빠르게 빌드, 속도 중요 -> 살아 남을 것만 살아 남아 -> 기존 산업 처럼 고도화 진행하겠지? 

* ecount framework
	* 구조 
```



# ECOUNT EFE LIB STRUCTURE

```
# page
	* page 인스턴스로 header, contents, footer에 들어갈 instance를 만드는 시작 단계 인스턴스 
	* 생성시 page에 생성될 인스턴스들을 캐싱 해놓는다.(event trigger시 여기서 인스턴스 찾는다.) 
	
# control
	* 위젯 rendering시 필요로 하는 공통 property
 	* 위젯 기능 함수 

# control을 상속 받는 아이들
    * control.input/ control.select/ control.label/ contorl.button
    / control.date ... 

# widget
	* widget 본인의 control을 갖고 있으면 이 control은 최상위 control을 상속 받아서 구현


--------------------------------------------------------
# control proeprty 구조
	ㄴ state: 위젯 상태 property
		ㄴcomponent: 위젯 component가 가질 property(id, name, attr, oppt, service ...)
         ㄴfunctions: component 가 갖는 기타 기능 설정 property
			
# widget instance property 구조 
	ㄴ 위젯 기본 property
		ㄴ__proto__: control.[widget Name]: 위젯에 해당하는 control
			ㄴ__proto__: control
				...
				ㄴ Object prototype
	
--------------------------------------------------------
# Event 설계
## 개념 설명
    * Observer pattern 사용으로 document가 ready 될때 mouse, click, key, change, focus, input등등 이벤트를 dom에 한번 등록한다. 
    * 등록한 이벤트 trigger될때 event의 target dom의data-set정보(target instance, rendering시 등록한 cid, service, funtion etc)을 parsing 한다. 
    * parsing 데이터 중 target instance control에 parsing한데이터, event data, pipeline design pattern 적용한 store객체를 넘긴다. 
    * 마지막으로 event가 trigger된 page로 위 paring한 데이터를 보내줘 개별적인 event 처리 가능하다.
## Observer pattern 장점
    * event가 일어날 dom, 종류별로 event를 구현해야하지만 Observer pattern은 window, document에 한번 등록한뒤 event가 trigger가 될때 event target에 evnet type별로 구현부가 한 command로 event를 모을 수 있기 때문에 공통 로직을 정리 하기 용이하다. 
    * 페이지별로 event를 trigger시켜 줌으로 trigger된 dom의 개별적인 event처리가 가능하다.
  	

--------------------------------------------------------
ecount.lib.js
	- even target의 proeprty paring 구현부(finde el, instance ... )
ecount.global.js
	- page에서 캐싱한 instance register 구현부
ecount.event.js
	- delegator pattern 구현부
ecount.handler.event.js
	- observer pattern 구현부, event parse 구현부, 
ecount.handler.event.navtive.js
	- event 등록, trigger 구현부


```





* [ ] ECOUNT EFE LIB STRUCTURE 설계도 같은게 있었는데...
* [ ] observer pattern

  - [pub-sub pattern 설명](https://rinae.dev/posts/why-every-beginner-front-end-developer-should-know-publish-subscribe-pattern-kr)
* [ ] observer pattern, pubsub pattern 차이점
  * [Observer 패턴과 Publisher/Subscriber(Pub-Sub) 패턴의 차이점]([https://jistol.github.io/software%20engineering/2018/04/11/observer-pubsub-pattern/](https://jistol.github.io/software engineering/2018/04/11/observer-pubsub-pattern/))
  * * [ ] [초보 프론트엔드 개발자들을 위한 Pub-Sub(Publish-Subscribe) 패턴을 알아보기](https://rinae.dev/posts/why-every-beginner-front-end-developer-should-know-publish-subscribe-pattern-kr)
* [ ] event delegator pattern
* [ ] mvvm pattern
  
  * 코드스피츠 강의참고
  * [ ] mvvm pattern 생기게 된 이유 
    * 비즈니스로직 처리가 화면으로 많이 넘어오게 되면서 (왜? 많이 넘어오게 됐을까?) javascript에서 비즈니스 로직 처리하는 것들이 많아 졌다. 
  
  * JQEURY VS  MVVM 
    * jQuery 
      * 돔에 직접 접근
    * MVVM
      * state로 상태 관리 -> state가 변경될때 state를 업데이트 시키고 view에서 변경된 state에 따른 view 상태를 변경시킨다.

# Design pattern

* [GFG](https://www.geeksforgeeks.org/software-design-patterns/)
  
  * 웹, 자바스크립트 전용은 아님
  
* * [ ] [제로초 - 디자인패턴](https://www.zerocho.com/category/JavaScript/post/5800b4831dfb250015c38db5)

  * 자바스크립트로 이정도 패턴을 알아둬야 겠다.

  * 전에 봤던 것들인데 나도 정리해두자

    



# DEV OPS
프론트 엔드가 꼭 알아야할 분야가 있다고 생각
* bundling 


# Data structure
   - Array, Linked List, Stack, Queue
    - Binary Tree, Binary Search Tree, Heap, Hashing
    - Graph, Matrix, Misc, Advanced DataStructure
    - 자바스크립트로 하는 자료 구조와 알고리즘 [핵심 자료 구조와 알고리즘을 이해하고 구현하기 위한 입문서]
      - 자바스크립트 문자열 기본 
      - 정규표현식
      - 재귀 
      - 집합
      - 검색과 정렬(선형, 이진 검색)/ (거품정렬, 선택정렬, 삽입정렬, 빠른정렬, 빠른선택, 병합정렬, 계수정렬, 자바스크립트 내장정렬)
      - 해시 테이블
      - 스택과 큐 
      - 연결 리스트 (단일 연결리스트, 이중 연결 리스트)
      - 캐싱(LFU, LRU)
      - 트리(이진트리, 트리순회[preorder, inorder, postorder], 이진 검색 트리, AVL트리)
      - 힙(이진 힙 배열 인덱스 구조, 최소힙, 힙정렬)
      - 그래프(DFS, BFS, Undirected Graph, Directed Graph)
      - 고급문자열 
      - 동적 프로그래밍

# Algorithms
> * 50시간만 투자하자 
> * 프로그래머스 기준으로 보통 3단계 테스트(동적프로그래밍 포함)가 코딩인터뷰때 나오는 시험 문제
  * 안경잡이개발자
    * [네이버 블로그](http://blog.naver.com/PostList.nhn?blogId=ndb796&from=postList&categoryNo=128)
    * [유투브](https://www.youtube.com/watch?v=qQ5iLNjpxSk&list=PLRx0vPvlEmdDHxCvAQS1_6XV4deOwfVrz)
  * 권오흠
    * [권오흠 부경대 교수 - 2015년 봄 학기](https://www.youtube.com/watch?v=ln7AfppN7mY&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l)
  * GFG
    * [GFG DS](https://www.geeksforgeeks.org/data-structures/)
    * [GFG ALGO](https://www.geeksforgeeks.org/fundamentals-of-algorithms/)
      * [GFG ALGO - dynamic progoramming](https://www.geeksforgeeks.org/dynamic-programming/)
      * [GFG ALGO - backtracking](https://www.geeksforgeeks.org/backtracking-algorithms/)
      * [GFG ALGO - graph](https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/)
      * [GFG ALGO - greedy](https://www.geeksforgeeks.org/greedy-algorithms/)

* 문제 풀이 
  * 프로그래머스
    * 단계별로 나뉘어져 있으며 보통 3단계 테스트(동적프로그래밍 포함)가 코딩인터뷰때 나오는 시험 문제
    
    





# Javascript fundamental

- [ ] [JAVASCRIPT INFO - Promises, async/await](https://javascript.info/async)
- [ ] [JAVASCRIPT INFO - Generators, advanced iteration](https://javascript.info/generators-iterators)

- [ ] [JAVASCRIPT INFO - DOM tree](https://javascript.info/dom-nodes)
* [ ] [prototype - poiemaweb](https://poiemaweb.com/js-prototype)
* [ ] [dom - poiemaweb](https://poiemaweb.com/js-dom)
* [ ] [함수 - poiemaweb](https://poiemaweb.com/js-function)
* [ ] [동기식처리모델 vs 비동기식처리모델 - poiemaweb](https://poiemaweb.com/js-async)
* [ ] [데이터타입과 변수 - poiemaweb](https://poiemaweb.com/js-data-type-variable)

    * 호이스팅
    * 함수 레벨 스코프(Function-level scope)
    * 블록 레벨 스코프(Block-level scope)

* * [ ] [scope - poiemaweb](https://poiemaweb.com/js-scope) 

    


# Javascript Game

* * [ ] [FreeCodeCamp - Learn JavaScript by Building 7 Games - Full Course](https://www.youtube.com/watch?v=lhNdUVh3qCc)
  
* * 중년 여자분 이신데.. 대단. 만들어 보고 싶다 js로 게임
* * [ ] emory Game - Level 1
* * [ ] Whack-a-mole - level 1
* * [ ] Connect Four - level 1
* * [ ] Nokia 3310 Snake - level 2
* * [ ] Space Invaders - level 2
* * [ ] Frogger - level 2
* * [ ] Tetris - level 3
* [Create a Platformer Game with JavaScript - Full Tutorial](https://www.youtube.com/watch?v=w-OKdSHRlfA)
  
  * First, learn to organize the code using the Model, View, Controller (MVC) strategy and the principles of Object Oriented Programming (OOP). Then, learn how to program movement, draw a tile map, and detect collision. Finally, see how to animate the sprites, load levels, and collect items. 

# CSS

* * [ ] [진행중] 니콜라스 노마드 코더 - flex, grid
* FreeCodeCamp - Style Fancy Buttons: CSS Tutorial (Day 1 of CSS3 in 30 Days)](https://www.youtube.com/watch?v=pmKyG3NBY_k&list=PLWKjhJtqVAbl1AfjiGyYxwpdAPi5v-1OU)
* [CSS Grid Tutorial | CSS Grid Crash Course](https://www.youtube.com/watch?v=EFafSYg-PkI)

# 본 책

- [x] 자바스크립트 완벽가이드
- [x] 자바스크립트 패턴
- [x] 이팩티브 자바스크립트
- [x] 자바스크립트 코어 
- [x] 실전 리액트 프로그래밍
- [x] 리액트를 다루는 기술

# 본 강의

- [x] 패스트캠퍼스 vue
- [x] 코드스피츠 객체지향 자바스크립트 
- [x] 노마드코더 인스타그램 클론 코딩 version 1
  * react, redux, django, progresql
- [x] 노마드코더 인스타그램 클론 코딩 version 2
  * [x] react, hook, graphQl, apollo, Express, prismagram
* [x] 노마드코더 redux, react-redux
* [x] 권오흠 2015년 봄 학기 유투브 강의 recursion 일부
- [ ] [...ING]노마드코더 FLEX, GRID/ 웹페이지 클론





#  JH

* EC FE LIB STRUCTURE

* PERFORMANCE, IMPROVE? 
  - [ ] 구조개선
    - [ ] EVENT target
    - [ ] EVENT focusout -> click
    - [ ] api, loading, 완료시, closure 영역
    - [ ] RECOMMEND 기능 
    - [ ] FAVORITE CODE
  
* 포트폴리오 참고 

  * [ ] [문성욱](https://munseonguk.github.io/#education)

  * TimeLIne
    * [W3SHCOOL - TimeLine](https://www.w3schools.com/howto/howto_css_timeline.asp)

# REFERENCE

- [javascript.info](https://javascript.info/)
- [publishing guide](https://www.w3schools.com/howto/)
  - 테마별로 정리가 너무 잘돼 있다.
  - 응용해서 하면 웹에서 사용하는 거의 모든 퍼블리싱 할 수 있을 듯 
- FreeCodeCamp
  - [유투브](https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ)
  - [devOps  Youtube](https://www.youtube.com/watch?v=Wvf0mBNGjXY&list=PLWKjhJtqVAbkzvvpY12KkfiIGso9A_Ixs)
  - [coding Interview](https://www.youtube.com/watch?v=iAHQopLuZ4Q&list=PLWKjhJtqVAblv09G3sFgRMSeR0jnKQmJ9)
  - 
- 니콜라스 노마드코더
  - [강의](https://nomadcoders.co/)
    - [유투브](https://www.youtube.com/channel/UCUpJs89fSBXNolQGOYKn0YQ)

* [엔지니어대한민국](https://www.youtube.com/user/damazzang/playlists)
  * DS, ALGORITHMS 이론 잡기 좋음
  * big operation, Arrays and STrings, Dynamic Programming, Trees&Grpah, Sorting and Searching, Big O, Stack & Queue, Linked List

## 개발자 구직

* 정원희 
  * [NOTION](https://www.notion.so/by-Wonny-d8f197d6f0cb4f24ba3ad3c1cfb732b5)

이현섭-비바퍼블리카

조영륜 - 디자이너

청천향로 - 이동욱

한재엽 - 프론트에드 개발자

유용우 - 야놀자 개발자 

구인본 우아한형제들 개발자



# TODO 

* 프레임워크만 잘다루는 개발자 되지 않기 
* 성장은 탄탄한 기본기로부터 나온다 
* 기본기 
  * VanillaJS
  * ES6+
  * CS
  * Algorithms
    * [ ] 작성하기
    * 배열, 탐욕, DSP/
  * Data Structure
    * [ ] 작성하기
    * Queue .... 
  * Network
  * Design Pattern
  * Software architecture

* * [ ] 블로그에 TimeLIne 작성하기

* * [ ] [지도 표기하는걸로 확인해보기 - 초보 프론트엔드 개발자들을 위한 Pub-Sub(Publish-Subscribe) 패턴을 알아보기](https://rinae.dev/posts/why-every-beginner-front-end-developer-should-know-publish-subscribe-pattern-kr)

* * [ ] ECOUNT EFE LIB STRUCTURE 설명

```

page
form

-----------------------------------------------------------------------
- [ ] observer pattern
- [ ] event delegator pattern
- [ ] mvvm pattern

- [ ] - JQEURY VS  MVVM 
    - jQuery 
      - 돔에 직접 접근
    - MVVM
      - state로 상태 관리 -> state가 변경될때 state를 업데이트 시키고 view에서 변경된 state에 따른 view 상태를 변경시킨다.

# 

```
