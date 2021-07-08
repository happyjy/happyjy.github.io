---
title: redux비동기처리1(actions으로만처리)
date: 2021-07-08
author: jyoon
image: ../../_images/react.png
category: React
tags:
  - redux
  - redux비동기처리
---

# 비동기 작업을 어디서 하느냐가 젤 중요

- 비동기 작업의 전, 후로 _액션을 분리_
  - Start
  - Success
  - Fail
  - ... 등등
- **dispatch 를 할때** 해줍니다.
  - 당연히 리듀서는 동기적인 것 => Pure
  - dispatch 도 동기적인 것

# 도식화

![도식화](img/redux에서비동기처리하기(nolib).png)

# 설정 작업

## 1. 비동기 처리를 위한 액션 추가

```jsx
// src/redux/actions.js
// # users
// 깃헙 API 호출을 시작하는 것을 의미
export const GET_USERS_START = 'GET_USERS_START';
// 깃헙 API 호출에 대한 응답이 성공적으로 돌아온 경우
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
// 깃헙 API 호출에 대한 응답이 실패한 경우
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

export function getUsersStart() {
  return {
    type: GET_USERS_START,
  };
}
export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}
export function getUsersFail(error) {
  return {
    type: GET_USERS_FAIL,
    error,
  };
}
```

## 2.reducer 추가

```jsx
// src/redux/reducers/users.js
import { GET_USERS_FAIL, GET_USERS_START, GET_USERS_SUCCESS } from '../actions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export default function user(state = initialState, action) {
  if (action.type === GET_USERS_START) {
    return {
      ...state,
      laoding: true,
      error: null,
    };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      laoding: false,
      data: action.data,
    };
  }
  if (action.type === GET_USERS_FAIL) {
    return {
      ...state,
      laoding: false,
      error: action.error,
    };
  }
  return state;
}
```

## 비동기 처리가 컨테이너에 있는 경우

### Container

- 로직 포함

    ```jsx
    // src/containers/UserListContainer.jsx
    import axios from 'axios';
    import { useCallback } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import UserList from '../components/UserList';
    import { getUsersFail, getUsersStart, getUsersSuccess } from '../redux/actions';

    export default function UserListContainer() {
      const users = useSelector((state) => state.users.data);
      const dispatch = useDispatch();

      // # useCallback 사용이유?
      //  * 반복적으로 만들어져 UserList에 props로 전달함으로 리소스 낭비
     // # POINT
      const getUsers = useCallback(async () => {
        try {
          dispatch(getUsersStart());
          const res = await axios.get('https://api.github.com/users');
          console.log(res);
          dispatch(getUsersSuccess(res.data));
        } catch (e) {
          dispatch(getUsersFail());
        }
      }, [dispatch]);

      return <UserList users={users} getUsers={getUsers} />;
    }
    ```

### component

- view 요소

    ```jsx
    // src/component/UserList.jsx
    import { useEffect } from 'react';

    export default function UserList({ users, getUsers }) {
      // useEffect의 decendency list로 정한 것들은 레퍼런스가 바뀌지 않게 useCallback 을 사용해서 생성한다.
      useEffect(() => {
        getUsers();
      }, [getUsers]);

      if (users.length === 0) {
        return <p>현재 유저 정보 없음</p>;
      }
      return (
        <ul>
          {users?.map((user) => (
            <li key={user.id}>{user.login}</li>
          ))}
        </ul>
      );
    }
    ```

# 파일 구조

![파일구조](img/redux에서비동기처리하기(nolib)_파일구조.png)
