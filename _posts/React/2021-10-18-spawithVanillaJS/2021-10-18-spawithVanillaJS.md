---
title: JS로 SPA 구현해보기(routing)
date: 2021-07-08
author: jyoon
image: ../../_images/react.png
category: React
tags:
  - SPA
  - routing
---



# **페이지 이동 원리**

페이지는 새로 갱신되지 않았는데 주소변경으로 페이지를 변경하는 효과를 나타낸다.

## **url 이동으로 페이지 routing 원리**

- 이동하고 싶은 페이지 이동 url 설정
    - "history.pushState" 설정으로 url 설정
- 먼저 이동하고 싶은 routes를 설정
    - path와 해당 view class를 설정
- url path에 해당하는 view의 인스턴스 생성
- 생성된 인스턴스에서 getHTML을 호출로 페이지 rendering

## **브라우저 앞, 뒤 이동시 페이지 rendering 방법**

- popstate 이벤트를 등록 routing 기능을 호출한다.(router function)
    - popstate 이벤트는 브라우저 앞,뒤 이동시 호출된다.

# **분석 순서**

- click 이벤트
- navigateTo
- router(getparams)

# **파일 구조/ 설명**

```jsx
frontend
 ┣ static
 ┃ ┣ css
 ┃ ┃ ┗ index.css
 ┃ ┗ js
 ┃ ┃ ┣ views
 ┃ ┃ ┃ ┣ AbstractView.js  : "view의 추상화 인터페이스"
 ┃ ┃ ┃ ┣ Dashboard.js     : view
 ┃ ┃ ┃ ┣ PostView.js      : view
 ┃ ┃ ┃ ┣ Posts.js         : view
 ┃ ┃ ┃ ┗ Settings.js      : view
 ┃ ┃ ┗ index.js           : "Routing, param core"
 ┗ index.html
```

- 아래 두 파일이 중요한 역할을 한다.
    - AbstractView.js, index.js
- AbstractView.js
    - 페이지를 만들때의 추상 클래스 역할을 한다.
    - setTitle, getHtml 기능이 있다.
- index.js
    - Routing, url param을 전달해주는 역할을 한다.
    - Routing은 History API의 "pushState"로 가능하게 한다.
    - 브라우저 앞, 뒤 이동시 "popstate" 이벤트가 발생한다.
    - code

      ```js
      import Dashboard from './views/Dashboard.js';
      import Posts from './views/Posts.js';
      import PostView from './views/PostView.js';
      import Settings from './views/Settings.js';

      const pathToRegex = (path) => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

      // url param을 page로 전달하는 방법
      const getParams = (match) => {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

        return Object.fromEntries(
          keys.map((key, i) => {
            return [key, values[i]];
          }),
        );
      };

      // routing 하는 방법
      const navigateTo = (url) => {
        /*
          # History API
            * 브라우저 세션 히스토리에 접근할 수 있는 api

            * history.pushState()
              * 브라우저 세션 히스토리 스택에 항목을 추가

            * 참고
              * [mdn](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
              * [zerocho](https://www.zerocho.com/category/HTML&DOM/post/599d2fb635814200189fe1a7)
        */
        // history.pushState(null, null, url);
        router();
      };

      const router = async () => {
        // routes 설정
        const routes = [
          { path: '/', view: Dashboard },
          { path: '/posts', view: Posts },
          { path: '/posts/:id', view: PostView },
          { path: '/settings', view: Settings },
        ];

        // url pathname과 routes 설정을 비교하면서 매칭 되는 것을 체크
        const potentialMatches = routes.map((route) => {
          return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path)),
          };
        });

        let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

        if (!match) {
          match = {
            route: routes[0],
            result: [location.pathname], // getParams에서 사용됨
          };
        }

        // 매칭된 view 객체 생성
        // getparams로 url에 설정한 param을 전달
        const view = new match.route.view(getParams(match));

        // 매칭 된 view html 을 app에 붙여 줌
        // spa를 구현 (화면이 업데이트 되지 않으면서 페이지 전환)
        document.querySelector('#app').innerHTML = await view.getHtml();
      };

      // 브라우저 뒤, 앞으로가기 햇을때 발생하는 이벤트
      window.addEventListener('popstate', router);

      document.addEventListener('DOMContentLoaded', () => {
        document.body.addEventListener('click', (e) => {
          if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
          }
        });

        router();
      });
      ```

# 추가분석

## popstate eventListener

- event trigger
    - 사용자가 마지막으로 방문한 페이지의 항목을 이전, 다음 이동시
    - history.pushState()
- 참고: [mdn]([https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event))

```jsx
window.addEventListener('popstate', router);
```

## History.pushState()

- 브라우저 세션 기록 스택에 항목을 추가
- 참고: [mdn](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)

## Object.fromEntries()

- 참고: [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

# 참고

- dcode 유투브 채널
    - 아래 두개 영상은 이어지는 영상이며
    첫번째 영상은 spa 구현, 두번째 영상은 페이지 이동시 param을 url을 통해서 전달하는 과정이 있다.
- 강의 list
    1. [Build a Single Page Application with JavaScript (No Frameworks)](https://www.youtube.com/watch?v=6BozpmSjk-Y)
    2. [Adding Client Side URL Params - Build a Single Page Application with JavaScript (No Frameworks)](https://www.youtube.com/watch?v=OstALBk-jTc)
    3. [YT Navigation for Single Page Applications | curran kellher](https://www.youtube.com/watch?v=xN9QxPtK2LM)
- [강의 git](https://github.com/dcode-youtube/single-page-app-vanilla-js)
