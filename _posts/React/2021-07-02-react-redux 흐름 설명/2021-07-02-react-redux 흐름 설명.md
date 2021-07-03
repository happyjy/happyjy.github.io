---
title: react-redux 흐름 설명
date: 2021-07-02
author: jyoon
image: ../../_images/react.png
category: React
tags:
  - react-redux
  - redux
---

redux를 시작할때 만든 프로젝트를 보면서 이전에는 하지 못했던 패키지 분석까지 해보면서 스스로 흐름을 다시 보면서 글을 쓰다보니 블로그로 남겨 나누면 좋을 것 같아서 올리게 됐다.
아래 글은 크게 두가지 redux, react-redux 패키지 설정, 흐름 순서대로 설명 과 파일 기준 설명으로 설명을 합니다.
그리고 [git repository](https://github.com/happyjy/learning-redux)에 파일이 있으니 파일을 참고 하면서 확인하면 더 좋겠다.

- [테스트 방법](#테스트-방법)
- [redux, react-redux 패키지 설정, 흐름 순서대로 설명](#redux-react-redux-패키지-설정-흐름-순서대로-설명)
  - [사용한 패키지 객체 위치](#사용한-패키지-객체-위치)
- [파일 기준 설명](#파일-기준-설명)
  - [index.js](#indexjs)
  - [Home.js](#homejs)

# 테스트 방법

- index.html에 아래 3가지가 구현 되어 있다.
  - vanilla js: 플러스/마이너스
  - vanilla js: todo list
  - react: todo list

- src 폴더 하위에 세개의 파일이 있다.
  - 실행 시키고 싶은 파일을 index.js 파일 이름으로 변경해준다.
  - index.js(index3_react_todo.js)
  - index2_vanilla_todo.js 파
  - index1_vanilla_redux.js 파

# redux, react-redux 패키지 설정, 흐름 순서대로 설명

- react-redux 패키지에 Provider 리액트 컴포넌트 객체에 store을 설정한다.
  - 이때 store는 뭘까?
    - redux 패키지의 createStore 함수의 반환 값이다.

- 컴포넌트에서 redux의 state tree를 사용하기 위해서는 어떻게 해야할까?
  - connect(react-redux패키지) HOC의 첫번째 함수에는
mapStateToProps, mapDispatchToProps 함수를 설정, 두번째 함수에는 redux store를 사용할 컴포넌트를 입력한다.(Home.js 참고)

- redux의 state를 업데이트 해주기 위해서는 어떻게 해야할까?
  - connect에 mapDispatchToProps 설정했을때 `dispatch`(redux store를 변경 시킬 수 있는 함수)함수를 인자 첫번재 값으로 넘겨 받는다.
  - 이 `dispatch`함수에 reducer규칙(actionCreator객체 {type, value})에 맞게 값을 설정해서 호출한다.
  
- dispatch 함수가 호출되면 어떻게 될까?
  - createStore객체에 설정한 reducer 함수가 호출
  - action type에 따라서 다른 로직을 수행하고 return 값으로 새로운 state tree를 반환하면(반환할때도 기존 state를 복사하고 값을 덮어 씌워야 한다.)
  - 새로운 state가 생기면서 component가 리렌더 된다.
  - 이 리렌더될때 connect HOC에 의해서 설정한 `mapStateToProps` 함수에 설정대로 Home 컴포넌트에 props로 넘겨 받는다.

- createStore 란?
  - 특징
    - redux 패키지의 createStore 함수이다.
    - 첫번째 인자로 `reducer` function을 전달해야한다.
    - Redux store를 만드는 function(state tree를 구성한다.)
    - state를 변경할수 있는 방법은 `dispatch()`를 호출 하는 것이다.
      - dispatch를 호출하면 createStore 생성시 설정한 첫번째 인자값 `reducder`가 호출된다.
    - app내에서 store 하나만 있어야 한다.
    - 여러개의 reducer를 생성하기 위해서는?
      - 한개의 reducer로 만들어 줄수 있는 `combineReducers`를 사용해야한다.
  - reducer란?
    - 현재 state tree와 action(이것으로 분기처리를 통해 다른 로직 작성)이 주어진다.
    - next state tree를 반환한다.

- react-redux패키지의 Provider 객체 분석
  - children props, context(Context.Provider)를 사용하고 있다.
  - [children props이란? 언제사용되는지?](https://stackoverflow.com/questions/49706823/what-is-this-props-children-and-when-you-should-use-it)
  - [context](https://reactjs.org/docs/context.html)
  
## 사용한 패키지 객체 위치

- redux 패키지의 `createStore, dispatch` function 위치
  node_modules/redux/src/createStore.js

- react-redux 패키지의 `Provider component` 위치
  node_modules/react-redux/src/components/Provider.js

- react-redux 패키지의 `connect` 위치
  node_modules/react-redux/src/connect/connect.js

# 파일 기준 설명

## index.js

- index.js에 react-redux package에 Provider 리액트 컴포넌트 객체에 store 연결

```js
import { Provider } from "react-redux";

  <Provider store={store}>
    <App />
  </Provider>,
```

## Home.js

- react-redux package에 "connect" hoc에 설정
  - mapStateToProps, mapDispatchToProps 객체를 connect hoc에 먼저 설정
    - redux에서 사용하는 State를 컴포넌트로 props 연결
    - redux에서 사용하는 Dispatch를 컴포넌트로 props 연결
    - 위 두 과정을 통해서 컴포넌트에 변경된 state와 redux에 요청할 수 있는 Dispatch함수를 props로 넘긴다.
  - "Home" 컴포넌트를 설정한다.

- onSubmit 트리거시?(input 입력&엔터)
  - actionCreators.addToDo(text)수행
    - return 값으로 {type, text} 프로퍼티가 있는 dictionary 객체 전달 받는다.
  - dispatch 함수 수행
    - dispatch 함수 수행으로 store.js의 "reducer" 함수 인자값에 "actionCreators.addToDo(text)" 반환값을 전달
    - 인자값 "action" 변수명으로 {type, text} 객체를 받는다.
    - reducer 함수에서 state 설정 한다.
    - reducer 함수 반환값으로 state를 update한다.(redux로 state 관리)
    - [질문] 어떻게 dispatch 함수로 "reducer" 함수로 가능한가?  
      - createStore(redux pkg)함수에 인자값으로 넣고 App 컴포넌트를 감쌋기 때문(index.js 파일 참고)

- dispatch 함수가 수행되면 ?
  - store.js의 reducer함수가 수행되고 이 함수 반환값을 통해서 state가 업데이트 된다.

- state가 업데이트 되면?
  - state가 업데이트 되면 컴포넌트가 다시 render된다.
  - 그래서 Home 컴포넌트가 업데이트된 state를 전달 받고 ToDo 컴포넌트를 다시 렌더링힌다.
  - dispatch 함수가 종료 됐다는 의미

```js
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { actionCreators } from '../store';
import ToDo from '../component/ToDo';


// # { toDos, addToDo, dispatch }: HOC "connect"에 설정한 mapStateToProps, mapDispatchToProps return 객체값이 Props로 전달
function Home({ toDos, addToDo, dispatch }) {
  const [text, setText] = useState('')
  function onSubmit(e){
    // # distpatch 함수(mapDispatchToProps 확인).
    addTodo(text)
  }
  return ()
}

function mapStateToProps(state, ownProps) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text)), 
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```
