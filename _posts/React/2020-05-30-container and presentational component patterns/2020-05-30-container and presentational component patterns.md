---
title: react "container and presentational component patterns"
date: 2020-05-30
author: jyoon
category: React
tags:
  - container and presentational component patterns
  - React pattern
  - React
---

# 소개

- 어플리케이션이 커질수록 컴포넌트도 복잡해지고 이에 따라 데이터와 state를 관리하는것도 복잡해진다.
- 코드 관리도 어려워지고 가독성도 떨어진다.
- 그래서 "container and presentational component patterns"라는 패턴을 도입하면 관리하기 수월해진다.

# container pattern이란?

- continaer components 인스턴스는 [redux](https://github.com/reduxjs/react-redux) library의 `connect()`와 [Relay](https://relay.dev/) library의 `createContainer`(The production-ready GraphQL client for React.) 같은 higher order components에 의해서 생성된다.
- 이 container pattenr이 적용된 컴포넌트는 다른 어플리케이션에서 재사용 될 수 있다.
- presentaionnal component가 어떻게 동작하는지 보내줄 데이터를 **fetching** 하고 전달한다. 즉 **data를 관리하는코드가 있다.**
- **presentational component를 포함한다. 반대로 presentational component은 container를 포함하지 않는다.**

# presentational pattern이란?

- 화면에 보여지는 코드가 모여 있다.
- **대부분의 경우 render 함수 이외에는 있지 않다.**
- 데이터를를 호출하고 가공하는 역할이 아니다.
- 거의 state를 바꾸는 일이 없다.
- 가장 좋은 패턴은 state가 없는 component다.
- 다른 component에서 presentation영역으로 사용 될 수 있다.

# container, presentational 파일 구조

데이터 정보를 다루는 파일 container.js가 화면을 다루는 파일 presenter.js를 데이터를 넘겨주면서 호출하는 구조를 가진다.

```js
container.js
  ㄴ presenter.js
```

# 예시

- container and presentational component patterns이 적용된 코드

```js
  class CarList extends React.Component {
    this.state = { cars: [] };

    componentDidMount() {
      getCars(cars =>
        this.setState({ cars: cars }));
    }
    render() {
      return (
        <ul>
          {this.state.cars.map(e => (
            <li>{e.make}: {e.model}</li>
          ))}
        </ul>
      );
    }
  }
```

## 위 예제를 패턴 적용한 두 코드

- container component pattern code
  - server와 통신하는 fetching하는 로직와 presenter component(CarsList)를 호출해 data를 전달하고 있다.

```js
class CarListContainer extends React.Component {
  state = { cars: [] }
  componentDidMount() {
    //fetching data
    getCars(cars => this.setState({ cars: cars }))
  }
  render() {
    return <CarsList cars={this.state.cars} />
  }
}
```

- presentational component pattern
  - CarsList 컴포넌트가 `cars`라는 prop를 전달 받는다.

```js
const CarsList = props => (
  <ul>
    {props.cars.map(e => (
      <li>
        {e.make}: {e.model}
      </li>
    ))}
  </ul>
)
```

# 참고

- 개념 설명 참고
  [present, container 설명](https://scotch.io/courses/5-essential-react-concepts-to-know-before-learning-redux/presentational-and-container-component-pattern-in-react)
