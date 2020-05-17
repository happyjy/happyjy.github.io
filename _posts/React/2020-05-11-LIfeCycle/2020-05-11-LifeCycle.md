---
title: React Life Cycle
date: 2020-05-12
author: jyoon
image: ../../_images/react.png
category: React
tags:
  - ReactLifeCycle
  - lifeCycle
---

# 실습 gitHub 주소 
[실습 gitHub 주소](https://github.com/happyjy/learning-react)  

# 컴포넌트 라이프사이클
* 마운트 : 페이지에 컴포넌트 나타남
* 업데이트 : 컴포넌트 정보 업데이트
* 언마운트 : 페이지에서 컴포넌트가 사라짐

# 마운트할 때 호출 되는 메서드
> 아래 순서대로 메서드 수행

1. constructor
  - 컴포넌트 새로 만들때 마다 호출 되는 클래스 생성자 메서드
2. getDerivedStateFromProps
  - props를 state로 설정 할때 사용하는 메서드
3. render
  - 준비한 UI를 렌더링하는 메서드
4. componentDidMount
  - mount 이후 호출되는 메서드

# 컴포넌트 업데이트 4가지 경우 
* props가 바뀔때
* state가 바뀔때
* 부모 컴포넌트가 리렌더링 될 때
* this.forceUpdate로 강제로 렌더링을 트리거할 때

# 업데이트할 때 호출하는 메서드
> 아래 순서대로 메서드 수행
> 업데이트를 발생시키는 요인: pops, state 변경, 부모 컴포넌트 리렌더링, forceUpdate()

1. getDerivedStateFromProps
  - props변경으로 state값에도 변화를 주고싶을때 사용
  - 마운트 과정에서 호출
  - 업데이트 전에도 호출
2. shouldComponentUpdate
  - 컴포넌트 리렌더링 여부 결정 메서드 
  - true반환 시 render호출, false반환 시 여기서 작업 정지
  - 특정함수에서 this.foreceUpdate() 함수 호출하면 과정 생략하고 바로 render 함수 호출
3. render
  - 컴포넌트 리렌더링
4. getSnapshotBeforeUpdate
  - 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드
5. componentDidUpdate
  - 컴포넌트 업데이트 작업이 끝난 후 호출하는 메서드

# 언마운트 
1. componentWillUmnount
  - 컴포넌트가 웹 브라우저 상에서 사라지기 전에 호출

# 코드와 함께 설명
> 유투브강의로 LIFE CYCLE "기본"을 알아보고 
> 실전 리액트 프로그래밍 책 내용으로 "실전"에서 어떻게 사용되면 좋을지 코드와 함께 정리 했다.  
* [실습 gitHub 주소](https://github.com/happyjy/learning-react)

## LIFE CYCLE 기본 
* [참고 youtube강의](https://youtu.be/7iHepe36m0c)
  * component > lifecycle >  LifecycleForBeginner.js에 내용이 있음 
  * 다루는 lifecycle list 
    - constructor 메서드
    - getDerivedStateFromProps 메서드
    - render 메서드
    - componentDidMount 메서드
    - shouldComponentUpdate 메서드
    - getSnapshotBeforeUpdate 메서드
    - componentDidUpdate 메서드
    - componentWillUnmount 메서드
    - getDerivedStateFromError, componentDidCatch 메서드

## 실전 리액트 프로그래밍 책 내용 
* lifeCycle별로 실제 프로젝트에서 어제 사용되면 좋은지 노하우가 있다. 
  * component 폴더 > 코드 숫자 별로 파일이 있음.
  
# 3.3.1 constructor 메서드 
- [x] 코드 3-27 constructor 메서드의 기본구조 
- [x] 코드 3-28 초기 속성값으로부터 상탯값을 만드는 코드 
- [x] 코드 3-29 constructor 메서드 없이 속성값을 이용하는 코드 
- [x] 코드 3-30 속성값에 항상 의존적인 상탯값을 함수로 대처한 코드 
- [x] 코드 3-31 constructor 메서드에서 setState 메서드를 호출하는 잘못된 예
- [x] 코드 3-32 constructor 메서드에서 API를 호출하는 잘못된 예

# 3.3.2 getDerivedStateFromProps 메서드 
- [x] 코드 3-33 getDerivedStateFromProps 메서드에서 이전 속성값 이용하기
- [x] 코드 3-35 getDerivedStateFromProps를 이용한 메모이제이션
- [x] 코드 3-36 로다시 패키지를 이용한 메모이제이션 예 
- [x] 코드 3-37 속성값 변경시 상탯값을 초기화하는 코드 
- [x] 코드 3-38 key 속성값을 이용한 코드 
- [x] 코드 3-39 상탯갑슬 부모 컴포넌트에서 관리하는 코드 
- [x] 코드 3-40 상탯값이 전후 속성값에 의존적인 경우 사용

# 3.3.3 render 메서드
- [x] 코드 3-41 render 메서드가 반환할 수 있는 값
- [x] 코드 3-42 렌더함수에서 조건부 렌더링을 하는 코드
- [x] 코드 3-43 리액트 포털을 사용한 코드

# 3.3.4 componentDidMount 메서드
- [ ] 코드 3-44 componentDidMount 메서드에서 돔 요소에 접근하는 코드
- [ ] 코드 3-45 constructor 메서드에서 API 요청을 보내는 코드 

# 3.3.5 shouldComponentUpdate 메서드
- [ ] 코드 3-46 shouldComponentUpdate 메서드의 기본 구조

# 3.3.6 getSnapshotBeforeUpdate 메서드
- [ ] 코드 3-47 돔 요소의 높잇값이 변경됐는지 검사하는 코드

# 3.3.7 componentDidUpdate 메서드
- [ ] 코드 3-48 스크롤이 가능해지면 알려주는 코드
- [ ] 코드 3-49 componentDidUpdate 메서드에서 API를 호출하는 코드
- [ ] 코드 3-50 componentDidMount 메서드에서도 API를 호출하도록 변경하기

# 3.3.8 componentWillUnmount 메서드
- [ ] 코드 3-51 componentWillUnmount 메서드에서 이벤트 처리 해제하기

# 3.3.9 getDerivedStateFromError, componentDidCatch 메서드
- [ ] 코드 3-52 ErrorBoundary 컴포넌트
- [ ] 코드 3-53 ErrorBoundary 컴포넌트를사용한 코드
- [ ] 코드 3-54 이벤트 처리 메서드에서 예외가 발생하는 경우

# 참고 
  - [React Component Lifecycle Explained](https://www.youtube.com/watch?v=7iHepe36m0c&feature=youtu.be)
  - [Comments React Lifecycle Methods – A Deep Dive](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)
  - [실전리액트프로그래밍](https://medium.com/@ljs0705/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%B1%85%EC%9D%84-%EC%8D%BC%EC%8A%B5%EB%8B%88%EB%8B%A4-b227ab9df8b8)
