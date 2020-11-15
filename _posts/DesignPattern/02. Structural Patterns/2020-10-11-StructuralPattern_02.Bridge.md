---
title: StructuralPattern_02.Bridge
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Bridge
  - DesignPattern
  - StructuralPattern
  - JavaScript
---

# def
  * 두 컴포넌트들을 사용한다
    - 두 컴포넌트가 각각 자신의 인터페이스를 가지고 있고 서로를 위해서 역할을 한다.
    - a client, a service
  * Bridege는 high-level 아키택쳐 패턴이다.
  * [POINT] 주된 목표
    - **추상적 두개 레벨의 코드를 통해서 더 나은 코드를 만드는 것이다.**
    - **loose coupling**한 객체를 가능하게 한다.
  * 때때로 double Adapter 패턴이라고도 한다.
  * 자주사용되는 예: DB API
      - Bridget pattern은 어플리케이션(client), db driver(service)으로 구성되어 있다.
      - 어플리케이션은 잘 선언된 DB API를 선언 되어 있다. (예, ODBC)
      - 그러나 API는 각 드리이버들의 구현체는 완전히 다른 각각 DB vendor(SQL Servr, MySQL, Oracle, etc)들이라는걸 알수 있다.
  * driver development에서 좋은 패턴이다
      - 하지만 JavaScript에서 거의 사용하지 않는다.

# Participants
  * Client
      - 연산을 위해서 Abstraction을 호출한다.
      - code: run()
  * Abstraction
      - 첫번째 레벨 Abstraction를 위한 인터페이스를 선언한다.
      - 구현체를 가리키는 것을 유지 
      - code: not used in JavaScript
  * RefinedAbstraction
      - 구현체, Abstraction를 선언된 인터페이스를 확장한 것
      - code: input device(Gestures, Mouse)
  * Implementor
      - 두번째 레벨 또는 추상 구현체를 선언
      - code: not used in JavaScript
  * ConcreteImplementor
      - 구현해야할 인터페이스를 구현하고, 효과를 선언한다.
      - code: output device(Screen, Audio)
      

# 예제 코드 설명 
  * 예
      - Bridge는 input, output device가 독립적으로 수행할 수 있도록한다.
      - device가 낮은 결합도를 갖도록한다.(낮은 레벨 추상화를 통해서)

  * Javascript는 추상클래스를 지원하지 않는다.
      - 그래서 "Abstraction", 구현체는 포함하지 않았다. 
      - 하지만 iterfaces(properties, method)를 일관적으로 구현했다.("RefinedAbstraction", "ConcreteImplementor" function에서)
      - 아래 예제에서는 "Abstraction" 는 input devices와 구현한 represents Output devices 대표한다.

  * Gesture(finger movements), Mouse는 매우 다른 input device이다. 
  * 그러나 그것의 동작은 공통으로 정한 동작
    (click, move, drag, zoom 등등-Screen, Audio객체에 선언)과 매핑 되어 있다. 
  * 그러나 그것들은 같은 명령에 같은 응답을 한다.
  * 물론 video, sound의 동작은 다르다
  * 효과는 ConcreteImplementor 클래스(Screen, Audio)에 선언
  * Bridge pattern은 어떤 input device와 어떤 output device와 동작 할 수 있도록 도와준다.

# 나의 분석
  * Input, Output device에 대한 Bridge pattern의 해석 
    - input 동작을 하는 디바이스가 직접 output 동작하는 기능을 반복적으로 구현하는것이 아니라 
    - [POINT1]Output device 인스턴스를 생성해 Input device 인스턴스 생성시 함수 파라미터로 전달해 
    - [POINT2]Input device에서 이벤트 발생시 발생한 이벤트에 대한 동작을 Output device 인스턴스에서 동작할 수 있게 하는 예제이다.
  * Input device(Gesture, Mouse)/ Output device(Screen, Audio) 인터페이스의 분리  
  
  * 예제 코드 설명 부분의 [POINT]가 중요 !  
  * 아래와 같이 트랙패드(Gesture)의 기능과 마우스의 기능은 다르지만 output device에서 같은 표현을 해줘야 한다.
    ```
      # input device 트랙패드(Gesture)와 마우스의 기능 비교
      트랙패드(Gesture)의 tap   === 마우스의 click
      트랙패드(Gesture)의 swipe === 마우스의 move
      트랙패드(Gesture)의 pan   === 마우스의 drag
      트랙패드(Gesture)의 pinch === 마우스의 zoom
    ```
#  Gestures, Mouse 함수 설명
  * 역할: RefinedAbstraction
  * parameter
    - output: ConcreateImplementor(Screen, Audio)
  * 설명 
    - output으로 받은 ConcreateImplementor객체(output device)를 수행한다.
    - Bridge 역할을 한다.

# CODE
```JS
var log = (function () {
  var log = '';

  return {
    add: function (msg) { log += msg + "\n"; },
    show: function () { console.log(log); log = ""; }
  }
})();

// 트랙패드라고 생각하자
// RefinedAbstraction 역할
var Gestures = function (output) {
  this.output = output;

  this.tap = function () { this.output.click(); }
  this.swipe = function () { this.output.move(); }
  this.pan = function () { this.output.drag(); }
  this.pinch = function () { this.output.zoom(); }
}
// RefinedAbstraction 역할
var Mouse = function (output) {
  this.output = output;

  this.click = function () { this.output.click(); }
  this.move = function () { this.output.move(); }
  this.drag = function () { this.output.drag(); }
  this.wheel = function () { this.output.zoom(); }
}

// [POINT]ConcreteImplementor 역할
var Screen = function () {
  this.click = function () { log.add("Screen select"); };
  this.move = function () { log.add("Screen move"); };
  this.drag = function () { log.add("Screen drag"); };
  this.zoom = function () { log.add("Screen zoom in"); };
}

// [POINT]ConcreteImplementor 역할
var Audio = function () {
  this.click = function () { log.add("Audio select"); };
  this.move = function () { log.add("Audio waves"); };
  this.drag = function () { log.add("Audio screetch"); };
  this.zoom = function () { log.add("Audio volumn up"); };
}

function run() {
  var screen = new Screen();
  var audio = new Audio();

  //[POINT1]
  var hand = new Gestures(screen);
  var mouse = new Mouse(audio);

  //[POINT2]
  hand.tap();
  hand.swipe();
  hand.pinch();

  mouse.click();
  mouse.move();
  mouse.wheel();

  log.show();
}

run();
```