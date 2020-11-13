---
title: BehavioralPattern_08.State
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - State
  - DesignPattern
  - BehavioralPattern
  - JavaScript
---

# def
State 패턴은 각 객체가 특정 상태를 나타내는 제한된 객체 집합에 상태 별 로직을 제공한다.  

* 예1
  - 고객이 온라인으로 TV를 주문한다고 가정했을 때  
  - 이 주문이 처리되는 동안 new, 승인, 포장, 보류 중, 보류, 배송, 완료 됨 또는 취소됨 중 하나 일 수 있다.  
  - 모든 것이 순조롭게 진행되면 순서는 신규, 승인 됨, 포장 됨, 배송 됨 및 완료가 된다.  
  - 그러나 언제든지 재고 없음, 파손 또는 고객 취소와 같은 예측 할 수없는 일이 발생할 수 있다.  
  - 이 경우 주문을 적절하게 처리해야 한다.  
  - 이 시나리오에 상태 패턴을 적용하면 각각 고유 한 속성(상태), 메서드(즉, 허용 가능한 상태 전환 규칙)집합이있는 8개의 상태 객체가 제공된다.  
  - 상태 머신은 종종 상태 패턴을 사용하여 구현된다.  
  - 이러한 상태 머신은 상태 전환이 발생할 때 단순히 상태 객체를 다른 객체로 교체한다.  

* 예2
  - 동전의 올바른 조합이 입력 될 때 제품을 주는 자동 판매기

* 예3
  - 엘레베이터가 움직이는 시간과 대기시간을 최소화하려는 특정 복잡한 규칙에 따라 탑승자를 위아래로 움직이는 엘리베이터 로직이 있다.  

# participants
  * Context  
    - [POINT1] 서비스의 클라이언트를 지원하는 인터페이스를 노출
    - [POINT2] 현재 상태를 정의하는 상태 객체에 대한 참조를 유지(count, currentState)
    - [POINT2] State 객체가 현재 상태를 다른 상태로 변경할 수 있다.
    - code: TrafficLight
  * State  
    - [POINT3] state 값, 관련된 state의 행동 function을 캡슐화(light 변수, go 함수)
    - code: Red, Yellow, Green

# Sample Code 설명  
  * 각각 고유 한 규칙 집합이있는 빨간색, 노란색 및 녹색의 세 가지 상태가있는 신호등(예TrafficLight 객체)이 있다.
  * 규칙은 다음과 같다. 신호등이 빨간색이라고 가정했을때 지연 후 빨간색 상태가 녹색 상태로 변경된다.
  * 그런 다음 다른 지연 후 녹색 상태가 노란색 상태로 변경된다.
  * 잠시 후 노란색 상태가 빨간색으로 변경된다.

  * 그리고 계속해서 다음 상태로의 전환을 결정하는 것은 State 객체라는 점에 유의해야한다.
  * 또한 TrafficLight 자체가 아니라 TrafficLight의 현재 상태를 변경하는 것은 State 객체(Red, Yellow, Green 객체)다.

  * 데모 목적으로 내장 카운터는 상태 변경 수를 제한한다. 
  * 그렇지 않으면 프로그램이 무기한 실행된다.

# 함수 호출 도식화
```
  run()
      ㄴ TrafficLight.start()
          ㄴ Red.go()
              ㄴ TrafficLight.change()
                  ㄴ Green.go()
                      ㄴ TrafficLight.change()
                          ㄴ Yellow.go()
                              .
                              .
                              . 반복
```

```js
var log = (function () {
  var log = '';

  return {
    add: function (msg) { log += msg + '\n' },
    show: function () { console.log(log); log = ''; }
  }
})();

/*
    # this: TrafficLisght 생성자 함수
    # currentState는 "Yellow", "Green" 생성자 함수 객체로 변경된다.
    # count, currentState 변수는 외부에 노출 되지 않도록 "clousre 영역에"
*/
var TrafficLight = function () {
  // [POINT2] count, currentState
  var count = 0;
  var currentState = new Red(this);

  this.change = function (state) {
    // limits numbe of changes
    if (count++ >= 10) return;
    currentState = state;
    currentState.go();
  }

  this.start = function () {
    currentState.go();
  }
}

// Context 역할
// * TrafficLight으로 객체 생성시 prototype chain으로 아래 prototype에 설정된 change, start는 실행 되지 않는다.
// # count.currentState에 접근 할 수 없다.
TrafficLight.prototype = {
  start: function () {
    currentState.go();
  },
  // [POINT1]
  change: function (state) {
    // limits numbe of changes
    if (count++ >= 10) return;
    currentState = state;
    currentState.go();
  },
  test: function () {
    console.log(" test ")
  }
}

/*
    # light: TrafficLight 생성자 함수 객체
*/
// State 역할
var Red = function (light) {
  this.light = light;

  this.go = function () {
    log.add("# RED ---> for 1 minute");
    light.change(new Green(light));
  }
}
// State 역할
var Green = function (light) {
  this.light = light;

  this.go = function () {
    log.add("## Green ---> for 10 seconds");
    light.change(new Yellow(light));
  }
}
// State 역할
var Yellow = function (light) {
  this.light = light;

  this.go = function () {
    log.add("### Yellow ---> for 1minutes");
    light.change(new Red(light));
  }
}

function run() {
  var light = new TrafficLight();
  light.start()

  log.show()
}

run()
```