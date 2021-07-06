---
title: practical_redux
date: 2021-07-06
author: jyoon
image: ../../_images/react.png
category: React
tags:
  - redux
---
- [01. Redux 개요](#01-redux-개요)
  - [설치](#설치)
- [02. Action -  액션](#02-action----액션)
  - [리덕스의 액션이란?](#리덕스의-액션이란)
  - [리덕스의 액션 생성자란?](#리덕스의-액션-생성자란)
  - [**리덕스의 액션은 어떤 일을 하나요 ?**](#리덕스의-액션은-어떤-일을-하나요-)
  - [액션을 준비하기 위해서는 ?](#액션을-준비하기-위해서는-)
  - [예시 코드](#예시-코드)
- [03. Reducers - 리듀서](#03-reducers---리듀서)
  - [Reducer란?](#reducer란)
  - [리덕스의 리듀서란 ?](#리덕스의-리듀서란-)
    - [reducer 함수 형태](#reducer-함수-형태)
  - [예시 코드](#예시-코드-1)
- [04. createStore](#04-createstore)
  - [createStore란?](#createstore란)
  - [설정 방법](#설정-방법)
  - [store 설명](#store-설명)
    - [store object의 4개 function](#store-object의-4개-function)
  - [로직을 추가 하기 3가지](#로직을-추가-하기-3가지)
    - [action 정의](#action-정의)
    - [action 생성자 만들기](#action-생성자-만들기)
    - [reducer 수정](#reducer-수정)
- [05. combineReducers](#05-combinereducers)
- [06. Redux 를 React 에 연결 (1) - react-redux 안쓰고 연결하기](#06-redux-를-react-에-연결-1---react-redux-안쓰고-연결하기)
  - [작업 내용](#작업-내용)
- [07. Redux 를 React 에 연결 (2) - react-redux 쓰고 연결하기](#07-redux-를-react-에-연결-2---react-redux-쓰고-연결하기)
  - [설치](#설치-1)
  - [react-redux 란?](#react-redux-란)
  - [작업1. provider, connect(hoc) 사용(react-redux pkg)](#작업1-provider-connecthoc-사용react-redux-pkg)
  - [작업2. 관심사 분리(container, presentational component)](#작업2-관심사-분리container-presentational-component)
    - [파일구조](#파일구조)
  - [작업3. connect hoc로 작업한 것을 hook으로 대체(useSelector, useDispatch)](#작업3-connect-hoc로-작업한-것을-hook으로-대체useselector-usedispatch)
- [[추가정리] 사용한 패키지별 알아야 할 키워드](#추가정리-사용한-패키지별-알아야-할-키워드)
- [[추가정리] redux의 store객체의 state, dispatch를 사용하기 위한 방법 3가지](#추가정리-redux의-store객체의-state-dispatch를-사용하기-위한-방법-3가지)

redux를 이해하기 위해서는

redux 개념, redux를 react에서 사용하는 방법을 차례로 익히면 된다.

아래 각각 상세하게 어떤것을 알아야 하는지 작성했으면 자례로 설명하겠습니다.

- redux 개념에서 익힐것
  - redux가 왜 쓰이는가?
    - context를 사용해서 결국 하위 props로 전달하지만 redux를 사용하는 이유는
    - 관심사의 분리가 뛰어나고, 훌륭한 미들웨어가 존재하기 때문이다.
  - redux의 구조(action, reducers, createStore, combineReducers)
- redux를 react에 연결하는 방법 3가지
  - 방법1) react-redux lib 사용하지 않고 연결
  - react-redux lib 사용하고 연결

        관심사 분리(container, presentational component)할 수있음.

    - 방법2) provider, connect(hoc) 사용(react-redux pkg)
    - 방법3) connect hoc로 작업한것 hook으로 대체(useSelector, useDispatch)

추가로 [코드는 깃허브](https://github.com/happyjy/learning-2021-redux)에서 확인 하수 있으며 commit 내역에 단계별로 상세하게commit 명을 적어 놓아서 단계별로 확인하면 되겠습니다.

- commit

    ```jsx
    # Redux 를 React 에 연결 (2-2) - react-redux 쓰고 연결하기
      * hook으로 component에서 redux store객체의 state, dispatch 객체를 호출해서 컴포넌트 props에 꽂아 줌으로 사용
      * 사용된 hook: useDispatch, useSelector, useCallback

    # Redux 를 React 에 연결 (2-2) - react-redux 쓰고 연결하기
      * 관심사 분리(container, presentational)
      * container
        - redux에서 connect hoc객체에 의해서 state, dispatch를
      받아서 컴포넌트 props로 전달하는 역할
      * presentational
        - 위 container에 의해서 전달된 state, dispatch를 props
      로 전달 받는다.
        - view 역할을 한다.(render될 컴포넌트 요소만 있다.)

    # Redux 를 React 에 연결 (2-1) - react-redux 쓰고 연결하기
      * provider 사용(react-redux)
      * connect 사용(react-redux)
        - mapStateToProps, mapDispatchToProps

    # Redux 를 React 에 연결 (1) - react-redux 안쓰고 연결하기

    # combineReducer 추가 작업
    # reducer에 complete_todo, show_all, show_complete 로직 추가
    # complete_todo action 추가
    # createStore 설정/ store객체의 getState, subscribe, unsubscribe 함수에 대해서 createStore.js 분석
    # reducer 설정
    # action, actions creators 설정
    # action, actions creators 선언
    ```

# 01. Redux 개요

## 설치

- redux: store를 만들수 있는 lib

    ```jsx
    npx create-react-app learning-redux-start

    npm i redux
    ```

# 02. Action -  액션

## 리덕스의 액션이란?

- 액션은 사실 그냥 **객체 (object)** 입니다.
- 두 가지 형태의 액션이 있습니다.
  - { type: 'TEST' } // payload 없는 액션
  - { type: 'TEST', params: 'hello' } // payload 있는 액션
- type 만이 필수 프로퍼티이며, type 은 문자열 입니다.
- 스토어에 전달/ 상태를 변경하는데 사용되는 객체
- 주의
  - 리덕스를 만들때는 literal 객체로 사용하는 것이 아니다.
  - action을 만드는 함수를 만들어 사용한다.(actionCreator를 만든다)
    - 실수를 방지하기 위함

## 리덕스의 액션 생성자란?

```jsx
function 액션생성자(...args) { return 액션; }
```

- 액션을 생성하는 함수를 "액션 생성자 (Action Creator)" 라고 합니다.
- 함수를 통해 액션을 생성해서, 액션 객체를 리턴해줍니다.
- createTest('hello'); // { type: 'TEST', params: 'h ello' } 리턴

## **리덕스의 액션은 어떤 일을 하나요 ?**

- `액션 생성자`를 통해 액션을 만들어 냅니다.
- 만들어낸 `액션 객체`를 리덕스 스토어에 보냅니다.
- `리덕스 스토어`가 액션 객체를 받으면 스토어의 상태 값이 변경 됩니다.
- 변경된 상태 값에 의해 상태를 이용하고 있는 컴포넌트가 변경됩니다.
- 액션은 스토어에 보내는 일종의 인풋이라 생각할 수 있습니다.

```jsx
* action creator 함수: action 객체를 생성하는 함수
* action 객체: redux store가 action 객체를 받으면 store의 상태 값이 변경

action creator -> action -> "redux store" -> new state -> component

```

## 액션을 준비하기 위해서는 ?

- 액션의 타입을 정의하여 변수로 빼는 단계
  - 강제는 아닙니다. (그러므로 안해도 됩니다.)
  - 그냥 타입을 문자열로 넣기에는 실수를 유발할 가능성이 큽니다.
  - 미리 정의한 변수를 사용하면, 스펠링에 주의를 덜 기울여도 됩니다.

- 액션 객체를 만들어 내는 함수를 만드는 단계
  - 하나의 액션 객체를 만들기 위해 하나의 함수를 만들어냅니다.
  - 액션의 타입은 미리 정의한 타입 변수로 부터 가져와서 사용합니다.

## 예시 코드

```jsx
export const ADD_TODO = 'ADD_TODO';

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}
```

# 03. Reducers - 리듀서

## Reducer란?

- 액션을 주면, 그 액션이 적용되어 달라진(안달라질수도...) 결과를 만들어 줌.
- 그냥 함수이다.
  - Pure Function
    - 같은 input을 받으면 같은 결과를 return 한다.
      - 그래서 주의해야 할 점은 시간에 따라서 변경이 되는 코드가 있으면 안된다.
  - Immutable
    - previous state, new state는 각각 다른 객체로 생성 되어야한다.
    - 왜*?*
      - `리듀서`를 통해 `스테이트`가 달라졌음을 `리덕스`가 인지하는 방식

## 리덕스의 리듀서란 ?

### reducer 함수 형태

```jsx
function 리듀서(previousState, action) { 
  return newState;
}
```

- 액션을 받아서 스테이트를 리턴하는 구조
- 인자로 들어오는 previousState 와 리턴되는 newState는 다른 **참조를 가지도록 해야합**니다.
  - redux가 상태가 변경됐다는 것을 인지하고 state를 사용하면 component에 변경을 해준다.

## 예시 코드

```jsx
import { ADD_TODO, COMPLETE_TODO } from './actions';

// state
// ['코딩', '러닝']
// [ {text: '코딩', done: false}, {text: '러닝', done: true}]
/* 
    { 
      todos: [ 
        {text: '코딩', done: false}, 
        {text: '러닝', done: true}
      ], 
      filter: ALL
    }
 */
//
const initialState = [];

export function todoApp(previousState = initialState, action) {
  if (action.type === ADD_TODO) {
    // action 객체의 property를 보고 action뒤에 어떤 프로퍼티를 접근할지 결정한다.
    return [...previousState, { text: action.text, done: false }];
    /*
      # 아래와 같이 하면 Immuable한 성질을 이용하지 못하는 코드 이다. 
      return previousState.push('')
     */
  }

  if (action.type === COMPLETE_TODO) {
    return previousState.map((todo, idx) => {
      if (idx === action.index) {
        return { ...todo, done: true };
      }
      return todo;
    });
  }

  return previousState;
}
```

# 04. createStore

## createStore란?

- redux lib에서 가져와서 사용하는 것
- store를 만드는 함수
  - store는 action에 의해서 state를 변경/ 관리를 하게 됩니다.

    ```jsx
    const store = createStore(리듀서);

    createStore<S>(
      reducer: Reducer<S>,
      preloadedState: S,
      enhancer?: StoreEnhancer<S>
    ): Store<S>;
    ```

## 설정 방법

- createStore를 통해서 store객체 return

```jsx
// store.js
import { todoApp } from './reducers';
import { createStore } from 'redux';

const store = createStore(todoApp);

export default store;
```

- 위 생성한 store를 사용
  - PIONT: store import
  - POINT1: subscribe

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// POINT: import stroe
import store from './store';

// POINT1: subscribe
store.subscribe(() => {
  const state = store.getState();
  console.log('store changed', state);
});

ReactDOM.render(<App />, document.getElementById('root'));
```

## store 설명

> redux pkg의 createStore함수에 reducer을 주입한 return value이다.

- store.getState();
- store.dispatch(액션);, store.dispatch(액션생성자());
- const unsubscribe = store.subscribe(() => {});
  - subscribe은 dispatch 함수로 reducer가 실행이 완료 되면 수행 된다.
  - 리턴이 unsubscribe 라는 점 !
  - unsubscribe(); 하면 제거
- store.replaceReducer(다른리듀서);
  - 실무에서 잘 사용하지 않는다.

### store object의 4개 function

- dispatch: ƒ dispatch(action)
- getState: ƒ getState()
- replaceReducer: ƒ replaceReducer(nextReducer)
- subscribe: ƒ subscribe(listener)

## 로직을 추가 하기 3가지

- action 정의, action 생성자 만들기, reducer 수정

### action 정의

```jsx
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';

// action을 정의
export const COMPLETE_TODO = 'COMPLETE_TODO';
```

### action 생성자 만들기

```jsx
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}

// action 생성자 만들기
export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }; // { type: COMPLETE_TODO, index: index}
}
```

### reducer 수정

```jsx
import { ADD_TODO, COMPLETE_TODO } from './actions';

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return [];
  }
  if (action.type === ADD_TODO) {
    return [...previousState, { text: action.text, completed: false }];
  }

 // reducer 수정 부분
 if (action.type === COMPLETE_TODO) {
    return previousState.map((todo, idx) => {
      if (idx === action.index) {
        return { ...todo, done: true };
      }
      return todo;
    });
  }
  return previousState;
}
```

# 05. combineReducers

- store가 복잡해질때 처리하는 방법
- reducers 폴더에 reducer.js파일에 combineReducers를 활용해
filter.js, todos.js에 각각 선언된 rilger, todos reducer를 합쳐주고 있다.

# 06. Redux 를 React 에 연결 (1) - react-redux 안쓰고 연결하기

- 컴포넌트에서 store 객체만 가지고 있으면 redux의 store를 사용 할 수 있다는 것을 알 수 있습니다.
  - 컴포넌트에서 useEffect에 store객체의 subscribe, unsubscribe 함수 실행
- 전체 하위 컴포넌트에 모두 사용할 수 있도록 `context`를 사용
  - `createContext(react)`, createContext의component.Provider, `useContext`
  - context관련 custom hook 생성

## 작업 내용

1. react context 설정

    ```jsx
    // ReduxContext.js 
    import { createContext } from 'react';
    const ReduxContext = createContext();
    export default ReduxContext;

    // index.js 
    import store from './redux/store';
    import ReduxContext from './contexts/ReduxContext';

    //POINT
    <ReduxContext.Provider value={store}>
     <App />
    </ReduxContext.Provider>
    ```

2. redux store객체의 state, dispatch를 사용하기위해 customhook 사용(useReduxState, useReduxDispatch)
    - 아래 두 customhook은 component(TodoForm.js, TodoList.js)에서 사용된다
    - 주석 POINT1 설명: useContext hook에 createContext함수로 생성된 객체 주입
    - 주석 POINT2 설명: 컴포넌트 render완료 된뒤 store 객체의 `subscribe` 객체를 이용해 dispatch 이후 수행할 로직을 추가

    ```jsx
    // hooks/useReduxState.js
    import { useContext, useEffect, useState } from 'react';
    import ReduxContext from '../contexts/ReduxContext';

    export default function useReduxState() {
     //POINT1
      const store = useContext(ReduxContext);
      const [state, setState] = useState(store.getState());

      useEffect(() => {
      //POINT2
        const unsubscribe = store.subscribe(() => {
          setState(store.getState());
        });
        return () => {
          unsubscribe();
        };
      }, [store]);
      return state;
    }
    ```

    ```jsx
    // hooks/useReduxDispatch.js

    import { useContext } from 'react';
    import ReduxContext from '../contexts/ReduxContext';

    export default function useReduxDispatch() {
     //POINT
      const store = useContext(ReduxContext);
      return store.dispatch;
    }
    ```

3. TodoList, TodoForm 컴포넌트에서 생성한 custom hook 사용
    - 주석 POINT설명 : 2번에서 생성한 custom hook (useReduxState, useReduxDispatch) 사용

    ```jsx
    // component/TodoList.js
    import useReduxState from '../hooks/useReduxState';

    export default function Todolist() {
     //POINT
      const state = useReduxState();

      return (
        <ul>
          {state.todos.map((todo) => {
            return <li key={todo.index}>{todo.text}</li>;
          })}
        </ul>
      );
    }
    ```

    ```jsx
    // component/TodoForm.js
    import { useRef } from 'react';
    import useReduxDispatch from '../hooks/useReduxDispatch';
    import { addTodo } from '../redux/actions';

    export default function TodoForm() {
      const inputRef = useRef();
     //POINT
      const dispatch = useReduxDispatch();

      const click = () => {
        dispatch(addTodo(inputRef.current.value));
        inputRef.current.value = '';
        inputRef.current.focus();
      };

      return (
        <div>
          <input ref={inputRef} />
          <button onClick={click}>추가</button>
        </div>
      );
    }
    ```

# 07. Redux 를 React 에 연결 (2) - react-redux 쓰고 연결하기

## 설치

```jsx
npm i redux-react
```

## react-redux 란?

- `Provider 컴포넌트`를 제공해줍니다.
- `connect 함수`를 통해 `"컨테이너"`를 만들어줍니다.
  - `컨테이너`는 스토어의 **state** 와 **dispatch(액션)** 를 연결한 컴포넌트에 props 로 넣어주는 역할을 합니다.
  - 그렇다면 필요한 것은?
    - 어떤 state 를 어떤 props 에 연결할 것인지에 대한 정의(mapStateToProps)
    - 어떤 dispatch(액션) 을 어떤 props 에 연결할 것인지에 대한 정의(mapDispatchToProps)
    - 그 props 를 보낼 컴포넌트를 정의

## 작업1. provider, connect(hoc) 사용(react-redux pkg)

> connect 방식은 state, dispatch를 사용하기 위해서 설정하는 과정이 필요

> redux store객체를 연결 과정없이 state, dispatch를 hook으로 호출해 컴포넌트에 꽂아 주는 방식

- provider 컴포넌트 store 프로퍼티에 redux store객체 store 설정

    ```jsx
    // index.js 
    import store from './redux/store';

    <Provider store={store}>
      <App />
    </Provider>
    ```

- connect(mapStateToProps, mapDispatchToProps)(컴포넌트)
  - hoc 방법으로 redux의 state 객체, dispatch 함수를 컴포넌트 props로 연결
  - mapStateToProps: redux의 state를 받아서 props 객체로 만든다.(connect hoc에 의해서 컴포넌트 props로 전달)
  - mapDispatchToProps: redux의 dispatch를 받아서 props 객체로 만든다.(connect hoc에 의해서 컴포넌트 props로 전달)

        ```jsx
        // src/containers/TodoFormContainer.jsx
        const TodoForm = () => (컴포넌트)

        //POINT
        const TodoFormContainer = connect(
          mapStateToProps: (state) => {
           return {};
         },
          mapDispatchToProps: (dispatch) => {
           return { addTodo: (text) => dispatch(addTodo(text)) };
         };
        )(TodoForm);
        ```

## 작업2. 관심사 분리(container, presentational component)

- container: connect(react-redux 함수)함수에 필요한 요소들(mapStateToProps, mapDispatchToProps)을 컴포넌트 props로 전달해준다.
- presentational component: props를 받아서 view 요소 역할을 한다.

### 파일구조

- components폴더: view 역할는 요소만 있음
- containers폴더
  - store객체를 가지고와서 component에 전달(components폴더에 있음)
  - store객체를 가지고 오는 방법 두가지
    - connect hoc, hook 사용(useSelector, useDispatch)

    ```jsx
    src
     ┣ components              : 역할분리1
     ┃ ┣ TodoForm.jsx
     ┃ ┗ TodoList.jsx
     ┣ containers              : 역할분리2
     ┃ ┣ TodoFormContainer.jsx
     ┃ ┗ TodoListContainer.jsx
     ┣ contexts
     ┃ ┗ ReduxContext.js
     ┣ hooks
     ┃ ┣ useReduxDispatch.js
     ┃ ┗ useReduxState.js
     ┣ redux
     ┃ ┣ reducers
     ┃ ┃ ┣ filter.js
     ┃ ┃ ┣ reducer.js
     ┃ ┃ ┗ todos.js
     ┃ ┣ actions.js
     ┃ ┗ store.js
     ┣ App.css
     ┣ App.js
     ┣ index.css
     ┣ index.js
    ```

## 작업3. connect hoc로 작업한 것을 hook으로 대체(useSelector, useDispatch)

> redux store객체를 연결 과정없이 state, dispatch를 hook으로 호출해 컴포넌트에 꽂아 주는 방식

> connect 방식은 state, dispatch를 사용하기 위해서 설정하는 과정이 필요

1. useSelector (hook)
    - 2번에서 connect로 redux의 store를 컴포넌트 props로 넘겨주는 방법을
    "useSelector" hook으로 변경
        - (= connect의 첫번째 callback function인 "mapStateToProps" 역할)
2. useDispatch (hook)
    - 2번에서 connect로 redux의 dispatch함수를 컴포넌트 props로 넘겨주는 방법을
    "useDispatch" hook으로 변경
        - (= connect의 두번째 callback function인 "mapDispatchToProps" 역할)
    - useCallback hook 사용
        - 컴포넌트가 다시 생성될때 function이 새로 만들어져 props로 할당되는것을
        useCallback을 사용해서 function이 새로 생성되는 것을 방지한다.(리소스 낭비 절약)

    ```jsx
    // src/containers/TodoFormContainer.js
    import { useCallback } from 'react';
    import { useDispatch } from 'react-redux';
    import TodoForm from '../component/TodoForm';
    import { addTodo } from '../redux/actions';

    export default function TodoFormContainer() {
      const dispatch = useDispatch();

      const addTodoFn = useCallback(
        (text) => {
          dispatch(addTodo(text));
        },
        [dispatch],
      );

      return <TodoForm addTodo={addTodoFn} />;
    }
    ```

    ```jsx
    // src/containers/TodoListContainer.js
    import { useSelector } from 'react-redux';
    import TodoList from '../components/TodoList';

    export default function TodoListContainer() {
      const todos = useSelector((state) => state.todos);

      return <TodoList todos={todos} />;
    }
    ```

# [추가정리] 사용한 패키지별 알아야 할 키워드

- redux pkg
  - createStore
    - redux store 생성 함수
    - reducer pure function을 안자로 받는다.
  - combineReducer
    - 관심사 별로 reducer function을 나눌 수 있다.
- react pkg
  - createContext
    - redux store를 react에 연결하는 컴포넌트
- react-redux pkg
  - provider component
    - redux store를 react에 연결하는 컴포넌트
  - connect hoc
    - react에서 store의 state, dispatch 사용하기 위한 방법1
  - useSelector, useDispatch hook
    - react에서 store의 state, dispatch 사용하기 위한 방법

# [추가정리] redux의 store객체의 state, dispatch를 사용하기 위한 방법 3가지

- store객체(=createStore(redux pkg) 함수에 의해서 생성)

1. store객체의 함수
    1. store.getStore()
    2. store.dispatch()
2. HOC → connect(react-redux pkg)
    1. hoc 특성으로 store의 state, dispatch 객체를 컴포넌트로 연결
3. hook → useSelector, useDispatch(reac-redux pkg)
    1. hook 특성으로 useSelector, useDispatch hook 호출로 컴포넌틑 props로 꽂아 준다.
