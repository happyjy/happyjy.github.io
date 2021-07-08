---
title: redux비동기처리4(redux-saga)
date: 2021-07-08
author: jyoon
image: ../../_images/react.png
category: React
tags:
  - redux
  - redux비동기처리
  - redux-saga
---

아래 github에 redux-saga로 비동기 처리한 코드를 확인/동작을 확인 할 수 있다.

* [github 주소](https://github.com/happyjy/learning-2021-redux/tree/%EB%B9%84%EB%8F%99%EA%B8%B0(redux-saga))

# redux-saga란?

* _액션을 모니터링_ → _특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식으로_ 사용
  * 여기서 특정 작업이란,
    * _특정 자바스크립트를 실행_
    * _다른 액션을 디스패치_
    * _현재 상태를 불러오는 것_
* 미들웨어 입니다.
* 제너레이터 객체를 만들어 내는 _제네레이터 생성 함수를 이용합니다._
* 리덕스 사가 미들웨어를 설정하고,
  * 내가 만든 사가 함수를 등록한 후
  * 사가 미들웨어를 실행합니다.
  * 그리고 등록된 사가 함수를 실행할 액션을 디스패치하면 됩니다.
* redux-saga는 다양한 상황에 쓸 수 있는 만큼 제공되는 기능도 많고 사용방법도 진입장벽이 꽤나 큽니다.
  * 자바스크립트 초심자라면 생소할만한 Generator 문법을 사용
  * 이 문법을 이해하지 못하면 redux-saga를 배우는 것이 매우 어렵다

# redux-saga는 redux-thunk로 못하는 다양한 작업들을 처리하는 예시 5가지

1. 비동기 작업을 할 때 기존 요청을 취소 처리 할 수 있습니다
2. 특정 액션이 발생했을 때 이에 따라 다른 액션이 디스패치되게끔 하거나, 자바스크립트 코드를 실행 할 수 있습니다.
3. 웹소켓을 사용하는 경우 Channel 이라는 기능을 사용하여 더욱 효율적으로 코드를 관리 할 수 있습니다 [(참고)](https://medium.com/@pierremaoui/using-websockets-with-redux-sagas-a2bf26467cab)
4. API 요청이 실패했을 때 재요청하는 작업을 할 수 있습니다.
5. 이 외에도 다양한 까다로운 비동기 작업들을 redux-saga를 사용하여 처리 할 수 있답니다.

# redux-saga 설정방법

1. redux-saga 미들웨어 설정 (store.js)

  ```jsx
  // src/redux/store.js
  import createSagaMiddleware from '@redux-saga/core';

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(
        middleware1,
        middleware2,
        myLogger,
        thunk.withExtraArgument({ history }),
        promise,
        routerMiddleware(history),
        sagaMiddleware,
      ),
    ),
  );
  ```

2. saga 함수 생성 (actions 모듈파일)

  ```jsx
  // src/redux/modules/users.js
  import { call, delay, put, takeEvery } from 'redux-saga/effects';

  const GET_USERS_SAGA_START = 'GET_USERS_SAGA_START';

  export function getUsersSagaStart() {
    return {
      type: GET_USERS_SAGA_START,
    };
  }
  function* getUsersSaga(action) {
    try {
      /* # put (redux-saga effect - dispatch)
      *  * store에 dispatch 하도록 스케쥴링한다.
      *  * doc: https://redux-saga.js.org/docs/api/#putchannel-action
      */
      yield put(getUsersStart());
      // sleep 2초
      yield delay(2000);
      // 비동기로 동작
      /* # call (redux-saga effect - 비동기 동작)
      * 비동기 동작
      * doc: https://redux-saga.js.org/docs/api/#callfn-args
      * call의 첫번째 변수가 promise를 반환하는 객체인경우 설명
      * redux-saga는 generator가 Promise객체가 settled상태까지 대기하고
      * 이후 pormise resolved에 따라서(resolved, rejected) generator는 다시 재개 된다.
      * 원문 : If fn is a normal function and returns a Promise, the middleware will suspend the Generator until the Promise is settled. After the promise is resolved the Generator is resumed with the resolved value, or if the Promise is rejected an error is thrown inside the Generator.
      */
      const res = yield call(axios.get, 'https://api.github.com/users');
      yield put(getUsersSuccess(res.data));
      yield put(push('/'));
    } catch (e) {
      yield put(getUsersFail());
    }
  }
  ```

3. 생성된 saga 함수들 한군데 수집 (in actions 모듈 파일)

  ```jsx
  // src/redux/modules/users.js
  import { call, delay, put, takeEvery } from 'redux-saga/effects';

  export function* usersSaga() {
    yield takeEvery(GET_USERS_SAGA_START, getUsersSaga);
  }
  ```

4. 수집한 saga 함수들 한군데 수집 (rootSaga.js)

  ```jsx
  // src > redux > modules
  import { all } from 'redux-saga/effects';
  import { usersSaga } from './users';

  export default function* rootSaga() {
    yield all([usersSaga()]);
  }
  ```

5. saga 실행 (store.js)

  ```jsx
  // src > redux > store.js
  import createSagaMiddleware from '@redux-saga/core';
  import rootSaga from './modules/rootSaga';
  const sagaMiddleware = createSagaMiddleware();
  sagaMiddleware.run(rootSaga);
  ```

6. component에서 dispatch(UserListContainer.jsx)

  ```jsx
  import { useCallback } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import UserList from '../components/UserList';
  import {
    getUsersSagaStart,
  } from '../redux/modules/users';

  export default function UserListContainer() {
    const users = useSelector((state) => state.users.data);
    const dispatch = useDispatch();

    const getUsers = useCallback(() => {
      dispatch(getUsersSagaStart()); // redux-saga 방법
    }, [dispatch]);

    return <UserList users={users} getUsers={getUsers} />;
  }

  ```
