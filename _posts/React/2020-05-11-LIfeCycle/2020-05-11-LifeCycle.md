---
title: React Life Cycle
date: 2020-05-12
author: jyoon
image: ../../_images/react.png
category: React
tags:
  - ReactLifeCycle
  - render
  - constructor
  - componentDidMount
  - componentDidUpdate
  - componentWillUnmount
  - shouldComponentUpdate
  - getDerivedStateFromProps
  - getSnapshotBeforeUpdate
  - componentDidCatch

---

# 실습 gitHub 주소 
[실습 gitHub 주소](https://github.com/happyjy/learning-reactLifeCycle)  

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
> 업데이트를 발생시키는 요인: pops, state 변경, 부모 컴포넌트 리렌더링

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



# STUDY1: render
## def
## 특징

# STUDY2: constructor
## def
## 특징

# STUDY3: componentDidMount
## def
## 특징

# STUDY4: componentDidUpdate
## def
## 특징

# STUDY5: componentWillUnmount
## def
## 특징

# STUDY6: shouldComponentUpdate
## def
## 특징

# STUDY7: getDerivedStateFromProps
## def
## 특징

# STUDY8: getSnapshotBeforeUpdate
## def
## 특징

# STUDY9: componentDidCatch
## def
## 특징


# 참고 
  - [React Component Lifecycle Explained](https://www.youtube.com/watch?v=7iHepe36m0c&feature=youtu.be)
  - [Comments React Lifecycle Methods – A Deep Dive](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)
  - [실전리액트프로그래밍](https://medium.com/@ljs0705/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%B1%85%EC%9D%84-%EC%8D%BC%EC%8A%B5%EB%8B%88%EB%8B%A4-b227ab9df8b8)
