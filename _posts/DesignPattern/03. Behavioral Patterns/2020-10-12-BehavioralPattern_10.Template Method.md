---
title: BehavioralPattern_10.Template Method
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Template Method
  - DesignPattern
  - BehavioralPattern
  - JavaScript
---

# def
  * 템플릿 방법 패턴은 알고리즘에 대한 일련의 단계 개요를 ​제공한다.
  * 이러한 단계를 구현하는 객체는 알고리즘의 원래 구조를 유지하지만 특정 단계를 재정의하거나 조정할 수있는 옵션이 있다.
  * 이 패턴은 클라이언트 개발자에게 확장성을 제공하도록 설계되어 있다.

  * 템플릿 메서드는 다른 개발자가 사용할 범용 프레임 워크 또는 라이브러리에서 자주 사용된다.
  * 예제는 프로세스 요청과 같은 작업에 대한 응답으로 일련의 이벤트를 발생시키는 객체이다. 
  * 객체는 '전처리'이벤트, '프로세스'이벤트 및 '후 처리'이벤트를 생성한다.
  * 개발자는 처리 직전, 처리 중 및 처리 직후에 응답을 조정할 수있는 옵션이 있다.

  * 템플릿 방법을 쉽게 생각할 수있는 방법은 구멍이있는 알고리즘이다. (아래 다이어그램 참조). 
  * 각 단계에 적절한 기능으로 이러한 구멍을 채우는 것은 개발자의 몫이다.

# participants
  * AbstractClass
    - [POINT1]
      ```
      - 클라이언트가 templateMethod를 호출할 수 있는 인터페이스를 제공(process 함수)
      - 알고리즘의 기본 단계를 정의하는 템플릿 방법을 구현
      ``` 
    - [POINT2]
      ```
      - 클라이언트 개발자가 구현할 수 있는 hooks(method 재정의를 통해서)를 제공
        : run 함수에서 mySql객체가 인터페이스 내에서 수행되는 method를(connect, select, disconnect) 재정의한다.
      ```
    - code: datastore
  
  * ConcreteClass
    - AbstractClass에 정의 된 기본 단계를 구현한다.
    - code: mySql

# Sample Code 설명
  * 여기에 JavaScript의 프로토타입 상속을 사용하는 예가 있다.
  * 상속 기능은 새로 생성 된 하위 객체의 프로토타입에 기본객체를 할당하여 상속 관계를 설정하는데 도움이 된다.

  * 데이터 저장소 함수는 AbstractClass를 나타내고 mySql은 ConcreteClass를 나타낸다.
  * mySql은 데이터 스토어 별 구현으로 연결, 선택 및 연결 해제의 세 가지 템플릿 메서드를 재정의한다.

  * 템플릿 메서드를 사용하면 클라이언트가 템플릿 메서드만(connect, select, disconnect) 작성하여 데이터 저장소 (SQL Server, Oracle 등)를 변경할 수 있다. 
  * 단계 순서와 같은 나머지는 모든 데이터 스토어에서 동일하게 유지된다.
  datastore.process를 상속받은 객체가 "connect, select, disconnect" 이 세개 function을 정의 하지 않으면 error가 난다.

# CODE
```JS
var log = (function () {
  var log = '';

  return {
    add: function (msg) { log += msg + '\n' },
    show: function () { console.log(log); log = ''; }
  }
})();

// AbstractClass 역할
var datastore = {
  // [POINT1]
  // 상속 대상(프로토타입에 할당)
  process: function () {
    try {
      //[POINT2]
      this.connect();
      this.select();
      this.disconnect();
    } catch (error) {
      console.log(error)
    }
    return this;
  },
}

function inherit(proto) {
  var F = function () { };
  // 상속 하기 위해서는 prototype에 dictionary 객체를 할당하면 된다.
  F.prototype = proto;
  return new F();
}

function run() {
  // ConcreteClass 역할
  // mySql: F{}
  // mySql.__proto__: {process: f}
  var mySql = inherit(datastore);

  // implement template steps
  mySql.connect = function () {
    log.add("MySQL: connect step");
  }
  mySql.select = function () {
    log.add("MySQL: select step");
  }
  mySql.disconnect = function () {
    log.add("MySQL: disconnect step");
  }

  // mySql: F{connect: f, select: f, disconnect: f}

  mySql.process();
  log.show();
}

run();
```