---
title: StructuralPattern_04.Decorator
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Decorator
  - DesignPattern
  - StructuralPattern
  - JavaScript
---

# def
Decorator pattern은 객체의 행동을 드라마틱하게 확장시키는 것이다.   
runtime에 새로운 행동을 추가하는 능력은 Decorator객체가 기존 객체를 감싸면서 해낼 수 있다.  
여러개의 decorator들은 오버라이드 또는 기능을 더 할 수 있다.  
  
decorator은 보안 관리이다.
- 비즈니스 객체는 인증 된 사용자의 권한에 따라 추가적으로 정보에 접근할 수 있는 특권이 부여된다.
- 예를 들어 HR 관리자는 급여 정보를 볼 수 있도록 직원의 급여 기록이 추가 된 (즉, 장식 된) 직원 객체로 작업하게된다.

decorator는 statically한 언어(eg, java)가 runntime에 유연함을 제공한다.  
(complie time에 상속하는 것에 반대로) 
그러나 Javascript는 dynamic언어라 runtime시에 객체를 확장 할 수 있다.   
그래서 Javascript는 Decorator pattern과는 덜 관련이 있다.  
Javascript에서는 "Extend, Mixin patterns"개념이 포함하고 있다.

# participants
  * Client
    - decorated Component를 가르킨다.
    - code: run()
  * Component
    - 기능이 추가될 객체
    - code: User
  * Decorator
    - 참조를 유지하여 Component를 감싸는 역할을 한다.
    - Component 인터페이스역할을 하는 인터페이스를 정의한다.
    - 기능을 추가적으로 수행한다.
    - code: DecoratedUser

# code 설명
  * User 객체는 DecorateddUser객체에 의해서 확장된다.
  * 이 확장은 User에 주소 관련 정보를 확장한다.
  * [POINT]원래 인터페이스는 그대로 있어야 하고 user.name이 this.name으로 할당 되어야한다.
  * 또한 같은 Decorateduser의 say 함수는 User의 say method를 감춘다.
  * Javascript는 자체적으로 객체를 효과적으로 확장하고 있다.
  
# 나의 설명
  * Javascript는 runtime에도 객체에 함수를 추가 할 수 있기 때문에 java와같은 statically한 언어에서 유용한 구조 패턴이다.
  * Decorator 패턴은 기존 객체에 기능(책임)을 추가할 수 있는 패턴으로 기능이 확장이 필요할때 서브 클래싱 대신에 유연한 대안이 될 수 있다.

# CODE
```js
var log = (function () {
  var log = "";

  return {
    add: function (msg) { log += msg + "\n"; },
    show: function () { console.log(log); log = ""; }
  }
})();

// Component 역할
var User = function (name) {
  this.name = name;

  this.say = function () {
    log.add("User: " + this.name);
  };
}

// Decorator 역할
var DecoratedUser = function (user, street, city) {
  this.user = user;
  this.name = user.name;  // [POINT] ensures interface stays the same
  this.street = street;
  this.city = city;

  this.say = function () {
    log.add("Decorated User: " + this.name + ", " + this.street + ", " + this.city);
  };
}

function run() {
  var user = new User("Kelly");
  user.say();

  var decorated = new DecoratedUser(user, "Broadway", "New York");
  decorated.say();

  log.show();
}

run();
```