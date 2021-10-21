---
title: redux비동기처리3(redux-promise)
date: 2021-07-08
author: jyoon
image: ../../_images/react.png
category: React
tags:
  - redux
  - redux비동기처리
  - redux-promise
---

아래 github에 redux-promise로 처리한 비동기처리 코드를 확인/동작을 확인 할 수 있다.

* [github 주소](https://github.com/happyjy/learning-2021-redux/tree/6.3%EB%B9%84%EB%8F%99%EA%B8%B0(redux-promise))

# redux-promise란?

* redux비동기처리2(redux-thunk) 게시글에서 `thunk`는 비동기 시작, 성공, 실패에 대한 actions creator를 직접 입력해야 하지만
* `promise-redux`는 비동기 작업을 처리하는 action type(설정2에 action creator에서 설정)에 post fix를 붙여 (\_PENDING, \_FULLFILLED, \_REJECTED)
    * promise의 비동기 처리 성공, 실패에 따라서 _자동으로 dispatch_ 해준다.
    * _그래서 reducer에서 다음과 같이 세가지 타입에 대한 reducer를 작성해줘야한다._
        * [action type]_PENDING
        * [action type]_FULLFILLED
        * [action type]_REJECTED

# redux-promise 동작 원리

* 어떤 타입으로 dispatch 할때 payload에 promise 함수가 있으면
    * 어떤 타입에 \_PENDING, \_FULFILLED, \_REJECTED를 붙인 action type이 생성된다.
* payload에 promise 함수가 성공, 실패 여부에 따라서
    * 성공하면 [type]_FULFILLED 액션으로 payload 프로퍼티로 설정한 promise함수의 return 값을 reducer로 넘긴다.
    * 실패하면 [type]_REJECTED 액션으로 payload 프로퍼티로 promise의 error값을 reducer로 넘긴다.

# redux-promise 정리

* thunk는 비동기 시작, 성공, 실패에 대한 actions creator를 직접 입력해야 하지만
* promise-redux는 비동기 작업을 처리하는 "action type"에 post fix를 붙여 (\_PENDING, \_FULLFILLED, \_REJECTED)
* promise의 비동기 처리 성공, 실패에 따라서 자동으로 dispatch 해준다.

# 예제 코드

* 설정4에서 actions create "getUsersPromise"를 통해서 redux-promise를 통해서 비동기 처리가 수행됩니다.
* 그리고는 설정2 -> 설정3을 통해서 reudx-promise를 통한 비동기 처리가 수행됩니다.

## 설정1

* redux-promise 미들웨어 설정

  ```jsx

  import { applyMiddleware, createStore } from 'redux';
  import { composeWithDevTools } from 'redux-devtools-extension';
  import reducer from './reducers/reducer';
  import promise from 'redux-promise-middleware';


  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(promise),  //highlight-line // POINT: redux-promsie 설정
    ),
  );

  export default store;

  ```

## 설정2

* action creator 설정
    * payload의 promise 객체의 결과에 따라서 reducer로 자동 dispatch 해준다.
        * 그래서 다음 세가지 타입에 대해서 reducer에 대해서 작성해야 한다.(GET\_USERS\_PENDING, GET\_USERS\_FULFILLED, GET\_USERS\_REJECTED)

  ```js
  //src/redux/actions.js
  import axios from 'axios';

  // action Type
  const GET_USERS = 'GET_USERS'; //highlight-line POINT: 아래 promise

  export const GET_USERS_PENDING = 'GET_USERS_PENDING'; //highlight-line
  export const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED'; //highlight-line
  export const GET_USERS_REJECTED = 'GET_USERS_REJECTED'; //highlight-line

  export function getUsersPromise() { //highlight-line
    return {
      type: GET_USERS,  //highlight-line
      payload: async () => {
        const res = await axios.get('https://api.github.com/users');
        return res.data;
      },
    };
  }

  ```

## 설정3

* reducer 설정
* 설정2에서 설정한 actions creator(getusersPromise)의 payload promise 객체의 결과에 따라서
* getUsersPromise redux-promise
* `redux-promise` 미들웨어가 reducer를 자동 호출해 다음 세가지 타입에 따라서 처리된다.
    * "GET\_USERS\_PENDING, GET\_USERS\_FULFILLED, GET\_USERS\_REJECTED"

  ```jsx
  import {
    GET_USERS_PENDING,
    GET_USERS_FULFILLED,
    GET_USERS_REJECTED,
  } from '../actions';

  const initialState = {
    loading: false,
    data: [],
    error: null,
  };

  export default function user(state = initialState, action) {
    // redux-promise reducer 처리
    if (action.type === GET_USERS_PENDING) {  //highlight-line
      return {
        ...state,
        laoding: true,
        error: null,
      };
    }
    if (action.type === GET_USERS_FULFILLED) {  //highlight-line
      return {
        ...state,
        laoding: false,
        data: action.payload,
      };
    }
    if (action.type === GET_USERS_REJECTED) {  //highlight-line
      return {
        ...state,
        laoding: false,
        error: action.payload,
      };
    }
    return state;
  }
  ```

## 설정4

* component 에서 creator actions을 dispatch
* actions create "getUsersPromise"를 통해서 redux-promise를 통해서 비동기 처리가 수행됩니다.

  ```jsx
  import axios from 'axios';
  import { useCallback } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import UserList from '../components/UserList';
  import {
    getUsersPromise,
  } from '../redux/actions';

  export default function UserListContainer() {
    const users = useSelector((state) => state.users.data);
    const dispatch = useDispatch();

    const getUsers = useCallback(() => {
      dispatch(getUsersPromise());//highlight-line // redux-promise 방법
    }, [dispatch]);

    return <UserList users={users} getUsers={getUsers} />;
  }

  ```
