---
title: Async/Await
date: 2020-02-16
author: jyoon
image: ../../_images/javascript.png
category: Javascript Core
tags:
  - Promise
  - Async/Await
  - JavaScript
---

# async 함수 

* function 앞에 async를 붙이면 해당 함수는 항상 promise 객체를 반환한다. 
  ```js
    async function f() {
      return 1;
    }

    f() // => Promise 객체 반환 Promise {<fulfilled>: 1}
    f().then(a => console.log(a))
    // 콘솔에 1칙히고 then은 Promise 객체 반환(Promise {<fulfilled>: undefined})

  ```

* 명시적으로 Promise 반환 가능, 결과 동일
  ```js
    async function f() {
      return Promise.resolve(1);
    }

    f().then(a => console.log(a)) // 1
  ```

# await 키워드 
* await는 async 함수 안에서만 동작
* 자바스크립트는 await 키워드를 만나면 promise가 처리(settled)될 때까지 기다린다. 결과는 그 이후 반환된다.
* <u>promise가 처리되길 기다리는 동안에 엔진이 다른일(다른 스크립트 실행, 이벤트처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비 되지 않는다</u>
* await는 promise.then 보다 좀더 세련되게 promise의 result값을 얻을 수 있도록 해주는 문법이다.

* 문법
  ```js
  let value = await promise;
  ```

## 간단예제
  * 주석 POINT 확인
  * 말그대로 promise가 처리될 때까지 함수 실행을 기다린다. 
  * promise가 처리되면 그 결과와 함께 실행이 재개된다. 
  ```js
  async function f() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("완료!"), 1000)
    });
    let result = await promise; // POINT: 프라미스가 이행될 때까지 기다림
    console.log(result); // "완료!"
  } 
  f();
  console.log("다른일을 할 수 있습니다.")
  //# 결과
  // 다른일을 할 수 있습니다.
  // 1초뒤 => 완료
  ```

  * 동기적 코드
  ```js
  async function f() {
    setTimeout(() => console.log("완료!"), 1000)
  } 
  f();
  console.log("기다렸습니다.")
  // # 결과
  // 완료!
  // 1초뒤 => 기다렸습니다.
  ```

## 실전예제
```js
async function showAvatar() {

  // JSON 읽기
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json(); //위 line 코드를 기다렸다 "response"객체 사용

  // github 사용자 정보 읽기
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);//위 line 코드를 기다렸다 "user" 객체사용
  let githubUser = await githubResponse.json();//위 line 코드를 기다렸다 "githubResponse" 객체사용

  // 아바타 보여주기
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 3초 대기
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

## 주의사항1: await는 최상위 레벨 코드에서 작동하지 않는다. 
```js
// 최상위 레벨 코드에선 문법 에러가 발생함
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
//
//하지만 익명 async 함수로 코드를 감싸면 최상위 레벨 코드에도 await를 사용할 수 있습니다.
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```
# 에러 핸들링

* promise가 정상적으로 이행되면 await promise는 프로미스 객체의 result에 저장된 값을 반환
* 하지만 프로미스가 거부되면 마치 throw문을 작성한 것처럼 에러가 던져진다.

* 동일한 두 코드
```js
// 
async function f() {
  await Promise.reject(new Error("에러 발생!"));
}
//---
async function f() {
  throw new Error("에러 발생!");
}
```

## try...catch
* 실제로는 promise가 거부 되기 전에 await가 에러를 던지기 전에 지연이 발생한다.
* 그래서 await가 던진 에러는 throw가 던진에러를 잡을 때처럼 try...catch를 사용해 잡을 수 있다.
* 그리고 async에 에러가 발생하면 제어 흐름이 catch 블록으로 넘어가 여러줄의 코드를 try로 감싸는것도 가능.
  ```js
  async function f() {
      try {
        let response = await fetch('http://유효하지-않은-url');
        let user = await response.json();
      } catch(err) {
        // fetch와 response.json에서 발행한 에러 모두를 여기서 잡습니다.
        alert(err);
      }
  }

  f();
  ```

# 요약 
* function 앞에 async 키워드를 추가하면 두 가지 효과가 있음
  1. 함수는 언제나 프라미스를 반환
  2. 함수 안에서 await를 사용할 수 있음

* 프라미스 앞에 await 키워드를 붙이면 자바스크립트는 프라미스가 처리될 때까지 대기한다. 그리고 처리가 완료되면 조건에 따라 아래와 같은 동작이 이어진다.
  1. 에러 발생 – 예외가 생성됨(에러가 발생한 장소에서 throw error를 호출한 것과 동일함)
  2. 에러 미발생 – 프라미스 객체의 result 값을 반환

* async/await를 함께 사용하면 읽고, 쓰기 쉬운 비동기 코드를 작성할 수 있음
  * <u>async/await를 사용하면 promise.then/catch가 거의 필요 없습니다.</u>
  * <u>하지만 가끔 가장 바깥 스코프에서 비동기 처리가 필요할 때같이 promise.then/catch를 써야만 하는 경우가 생기기 때문에 async/await가 프라미스를 기반으로 한다는 사실을 알고 있어야 한다.</u>
  * 여러 작업이 있고, 이 작업들이 모두 완료될 때까지 기다리려면 Promise.all을 활용 할 수 있다.
    ```js
    // 프라미스 처리 결과가 담긴 배열을 기다린다.
    let results = await Promise.all([
      fetch(url1),
      fetch(url2),
      ...
    ]);
    ```




# 참고

- Javascript.info  
  https://ko.javascript.info/async-await
