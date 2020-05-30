---
title: react "container and presentational component patterns" with "redux"
date: 2020-05-29
author: jyoon
category: ToyProj
tags:
  - ToyProjReview
  - Instagram clone coding
  - container and presentational component patterns
  - React pattern
  - React
  - redux
---

- 이번 클론코딩에서 사용된 패턴 `container and presentational component patterns`이 `redux`와 함께 사용 됐는데 어떻게 구성되고 data fetching할때 redux와 어떤 흐름을 보이는 설명하는 포스트 입니다.

# component 구성

```
	index.js
	  : connect with react-redux, container
	  ㄴ contianer.js
			: render 함수에서 presenter(컴포넌트)로 props로 '상탯값, 속성값' 전달
			ㄴ presenter.js
				: component 작성
```

# 흐름

- src/index.js

```js
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store, { history } from "redux/configureStore"
import App from "components/App"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
```

- App > index  
  : react-redux 라이브러리 connect 함수로 redux와 Container를 한다.  
  : Redux로 props를 넘기고/ Redux로 받은 값을 props로 Container로 보낸다.(mapDispatchToProps, mapStateToProps) - import { connect } from 'react-redux'
  - import Container from './container';
  - export defatul connect (mapStateToProps)(Container);
- App > container  
  : 비즈니스모델이 있다/ class component다/ presenter에게 props를 넘겨준다.
  - import App from ./presenter. - export container props => <App {...props}/>;
- App > presenter  
  : component가 있다/ function component다
  - import component(Footer, Auth, Navigation, Feed, Explore, Search) from 'component/xxx' - export default App;

# 요약

- index
  - connect(mapStateToProps)(Container);
  - connect: react-redux
- container
  - export <presenter-component state={state} props={props}>
- presenter
  - export <component>

# 질문으로 알아본 container and presentational component patterns

- Feed/index.js "mapDispatchToProps"는 언제 수행되는거지?

  - Feed/container.js > componentDidMount function에서 index.js에서 전달한 this.pros.getFeed를 수행

- Feed/index.js "mapStateToProps"는 언제 수행되는거지?

  - store가 변경 될때 자동 호출

    - store는 redux파일에 reducer function이 return 될때 호출 된다.
    - reducer function은 "api actions function"에 fetching response 받은 promise then 부분에서 "dispatch"함수에 의해 호출

  - 정리

```
  * Feed/index.js > mapDispatchToProps
    - getFeed: () => dispatch(photoActions.getFeed())에 의해서 redux api action function 호출

  * photos.js(redux)
    - getFeed function (api action function)
      : dispatch(setFeed(json))에 의해서 reducer function 호출
    - reducer function
      : return으로 store가 업데이트
      : store업데이트로 mapStateToProps 호출

  * Feed/index.js > mapStateProps
    - getFeed의 데이터를 state로 전달받는다
    - 전달 받은 state를 연결한 container props로 전달
```

- redux > api actions 함수 return에 인자(dispatch, getState)두 개는 어디서 오는거지?

  - connect HOC(higher Order Component)에서 넘겨준 값이다.
  - HOC component가 재사용성에서 좋은데 이렇게 개발자가 모르는 value가 parameter로 넘겨 오는것이 단점이다.

- configureStore.js
  - redux라이브러리의 combineReducers 객체는 리듀서를 합치는 과정이 있다.

# 참고

- 개념 설명 참고
  [present, container 설명](https://scotch.io/courses/5-essential-react-concepts-to-know-before-learning-redux/presentational-and-container-component-pattern-in-react)
