---
title: CreationalPattern_04.Prototype
date: 2020-10-08
author: jyoon
category: DesignPattern
tags:
  - Prototype
  - DesignPattern
  - CreationalPattern
  - JavaScript
---

# def
Prototype Pattern은 새로운 객체를 만든다.   
객체를 초기화 하지 않은 상태에서 객체를 반환한다.   
이것은 초기화되지 않은 객체이며 된다.  
Prototype pattern은 또한 Property를 패턴을 참조한다.  

Prorotype 패턴이 유용하게 사용되는 객체는 데이터베이스에 기본 값을 매핑 할때이다.   
프로토타입 객체는 기본 값을 가지고 있으며 복사해서 새로운 객체를 만든다.  

클래식한 언어에서는 프로토타입 패턴이 거의 사용되지 않으나  
프로토타입 언어인 자바스크립트는 객체의 생성자로서, Prorotype들로 생성하는데 사용된다.
  

# Participants
  * Client
    - 원하는 prototype을 복사하기 위해서 새로운 객체를 만든다.
    - code: run()
  * Prototype
    - 클론할 인터페이스를 생성
    - code: CustomerPrototype function
  * Clones
    - Clone될 객체
    - code: Customer

# 예제 코드 설명
  * CustomerPrototype 객체
    - 이 생성자 함수는 clone변수에 Customer type의 prototype의 객체를 생성/ 반환한다.
    - clone함수를 호출시 Customer 객체를 반환한다. 
      생성자함수의 proto 변수에 초기화된 객체로 초기화 된 Customer 객체

  * 이것을 프로토타입의 고전적인 구현 방법이며 자바스크립트에서 더 효과적인것은 내장되어 있는 prototype 기능을 사용하는 것이다. 

  * [POINT1] Customer 생성자 함수 this에 할당한 properties(first, last, status)은 
    new 키워드로 객체를 생성시 생성된 객체의 바로 하위 property에 등록 된다.
  * [POINT2] closure
    - clone 함수에서 CustomerPrototype 생성자 함수의 프로퍼티 proto를 참조하고 있음으로 closure 메모리 영역에 남아 있어 clone 함수 호출시 proto.first, proto.last, proto.status를 참조하고 있다.

# CODE
```js
function CustomerPrototype(proto) {
  // [POINT2]
  this.proto = proto;

  this.clone = function () {
    var customer = new Customer();
    
    // POINT1
    customer.first = proto.first;
    customer.last = proto.last;
    customer.status = proto.status;

    return customer;
  }
}

function Customer(info = {}) {
  // POINT1
  this.first = info.first;
  this.last = info.last;
  this.status = info.status;

  this.say = function () {
    console.log(`# NAME: ${this.first}, # LAST: ${this.last}, # STATUS: ${this.status}`)
  }
}

function run() {
  var proto = new Customer({ first: "n/a", last: "n/a", status: "pending" });
  var prototype = new CustomerPrototype(proto);

  var customer = prototype.clone();
  customer.say();
}

run()
```