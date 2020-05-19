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
- src > component > lifeCycle  폴더
    - 실전 리액트 프로그래밍 예제별로 코드, 설명이 있습니다.
- src > component > lifeCycle > LifecycleForBeginer.js
    - lifecycle이 모두 담겨 있는 코드, 설명이 있습니다.
    
# 컴포넌트 별로 Mounting, Updating, Unmouting 수행되는 메서드
- Mounting: 페이지에 컴포넌트 나타남
    - constructor
    - componentDidMount
- Updating: 컴포넌트 정보 업데이트
    - getDerivedStateFromProps
    - shouldComponentUpdate
    - render
    - getSnapshotBeforeUpdate
    - componentDidCatch
    - componentDidUpdate
- Unmouting: 페이지에서 컴포넌트가 사라짐
    - componentWillUnmount

## 마운트할 때 호출 되는 메서드
> 아래 순서대로 메서드 수행
1. constructor
    - 컴포넌트 새로 만들때 마다 호출 되는 클래스 생성자 메서드
2. getDerivedStateFromProps
    - props를 state로 설정 할때 사용하는 메서드
3. render
    - 준비한 UI를 렌더링하는 메서드
4. componentDidMount
    - mount 이후 호출되는 메서드

## 컴포넌트 업데이트 4가지 경우 
  * props가 바뀔때
  * state가 바뀔때
  * 부모 컴포넌트가 리렌더링 될 때
  * this.forceUpdate로 강제로 렌더링을 트리거할 때

## 업데이트할 때 호출하는 메서드
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

## 언마운트 
1. componentWillUmnount
  - 컴포넌트가 웹 브라우저 상에서 사라지기 전에 호출


# LIFE CYCLE 기본 
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

## component 구조

```jsx
app.js
	ㄴ Counter.js
```

# life Cycle method
- 아래와 같이 Mounting, Update, Unmounting 별로 수행된 lifecycle 메서드들이 있습니다.
- 아래 순서와같이 설명을 이어집니다.

```jsx
1. constructor
2. render
3. componentDidMount
4. componentDidUpdate
5. componentWillUnmount
6. shouldComponentUpdate
7 .getDerivedStateFromProps
8 .getSnapshotBeforeUpdate
9. componentDidCatch
```
![lifeCycle](./lifeCycle.png)

## constructor
- 상태값을 직접 할당하는 것은 constructor 메서드에서만 허용
- 다른 생명 주기 메서드에서 상탯값을 변경할때는 "setState" 메서드 사용해야 한다.

## render
- render 메서드가 반환할 수 있는 값
    - html에 정의된 거의 모든 태그
    - 문자열, 숫자
    - 배열 (key를 가지고 있어야한다.)
    - 리액트 프래그먼트(Fragment) - key를 부여하지 않아도 됨
    - null, boolean (아무것도 render 안함)
    - 리액트 포털(portal) - 컴포넌트의 현재 위치와는 상관없이 특정 돔요소에 렌더링할 수 있다.
- 리액트 포털을 사용한 코드
    - 특징
        - 리액트 포털을 이용해서 특정 돔요소에 리액트 요소를 렌더링 할 수 있다.
        - Modal 컴포넌트가 사용된 위치와 상관없이 렌더링할 위치를 선택할 수 있다.
        - 주의사항
        - 렌더함수내부에서 setState를 사용하지 않는다
        - 렌더함수의 반환값은 속성값과 상탯값만으로 결정되어야 한다.
        - 부수 효과를 발생시키면 안된다.
        - 서버통신, 브라우저의 쿠키에서 저장하기 등
        - 필요하다면 다른 생명 주기 메서드에서 하면된다.
        - https://reactjs.org/docs/react-dom.html

## componentDidMount
- component constructor 다음 trigger
- dom 에 붙을때 trigger

## componentDidUpdate
- component 업데이트시 발생
- parameter 값: prevProps, prevState, snapshot
- snapshot : getSnapshotBeforeUpdate 함수 return 값

## componentWillUnmount
- render trigger 여부를 결정
- return default는 true
- state, props가 update됐음에도 불구하고 component를 render하지 않아도 될때 유용
- render method는 expensive to compute 그래서 좋은 performance를 얻을 수 있다.

## shouldComponentUpdate
- return value로 render trigger여부를 결정
- return default는 true
- 언제사용?
- state, props가 update됐음에도 불구하고 component를 render하지 않아도 될때 유용
- render method는 expensive to compute 그래서 좋은 performance를 얻을 수 있다.

## getDerivedStateFromProps
- props를 state로 복사할 수 있는 lifeCycle 단계
- 함수 parameter: props, state
- 함수 return value: state로 세팅된다.

## getSnapshotBeforeUpdate
- render이후 commit이전 단계( dom update하기 전 단계)
- 함수 parameter: prevProps, prevState
- 함수 return value: componentDidUpdate 함수 세번째 parameter에서 사용가능

## componentDidCatch

- 컴포넌트에 error가 생길때 실행
- 실행 후에 render 함수가 다시 시행 -> 에러 있는대로 rendring 됨
- 이 함수 없이 컴포넌트에 error가 있을 때 render 되지 않음



# 참고 
  - [React Component Lifecycle Explained](https://www.youtube.com/watch?v=7iHepe36m0c&feature=youtu.be)
  - [Comments React Lifecycle Methods – A Deep Dive](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)
  - [실전리액트프로그래밍](https://medium.com/@ljs0705/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%B1%85%EC%9D%84-%EC%8D%BC%EC%8A%B5%EB%8B%88%EB%8B%A4-b227ab9df8b8)
