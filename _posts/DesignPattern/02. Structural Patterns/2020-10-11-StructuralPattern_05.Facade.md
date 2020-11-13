---
title: StructuralPattern_05.Facade
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Facade
  - DesignPattern
  - StructuralPattern
  - JavaScript
---

# def
  [POINT] 서브시스템을 좀더 사용하기 편하게 만드는 상위 수준의 인터페이스를 정의  
  퍼사드 패턴은 하나 이상의 하위 시스템에서 복잡한 기능으로부터 클라이언트를 보호하는 인터페이스를 제공한다.  
  사소 해 보일 수있는 단순한 패턴이지만 매우 유용하다.  
  다 계층 아키텍처를 중심으로 구축 된 시스템에 종종 존재한다.  

  * 퍼사드의 목적
    - 클라이언트가 서브 시스템 또는 툴킷을 쉽게 사용할 수 있도록하는 고급 인터페이스(속성 및 메소드)를 제공하는 것이다.

  * 퍼사드가 사용되는 이유1: 
    - 서버에서 다중 계층 웹 애플리케이션에는 프레젠테이션 계층(서비스 계층에 대한 클라이언트)이 자주 있다. 
    - 이 두 계층 간의 통신은 잘 정의 된 API를 통해 이루어진다. 
    - 이 API 또는 파사드는 프레젠테이션 계층에서 비즈니스 객체의 복잡성과 상호 작용을 숨긴다.

  * 퍼사드가 사용되는 이유2: 리팩토링! 
    - 클라이언트가 고려하지 않아도 되거나 복잡한 레거시 객체 집합이 있을때 이 코드는 퍼사드 뒤에 숨길 수 있다. 
    - 퍼사드는 노출하고 깔끔하고 사용하기 쉬운 인터페이스를 제공한다.

  * 파사드는 종종 다른 디자인 패턴과 결합된다.
  * 종종 single factory로 구현된다.

# participants
  * Facade
    - 하위 시스템은 reqeust에 책임을 다하고 있다는 것을 알고 있다. 
    - 대표자아다!(client 적절한 하위 시스템 객체에 요청한다.)
    - code: Mortage

  * Sub Systems
    - 구현부이며 전문적인 하위 기능을 수행한다.
    - 어떤 facade에서 사용되고 있는지 모름.
    - code: Bank, Credit, Background

# code 설명
  * Mortage 생성자 함수는 Facade 이다. 
    - Mortage 생성자 함수는 applyFor 함수를 하나 갖은 인터페이스로 대표한다.
    - applyFor 함수는 속으로 복잡성이 고려된 간단한 API가 위치한다.

  * The applicant's name is passed into the Mortgage constructor function. 
  * Mortage 생성자 함수에 name이 설정된다. 
  * 그리고 applyFor 함수가 대출금과 함께 호출된다.
  * 내부적으로 복잡한 기능을하는 3개 하위시스템(Bank, Credit, Background) 처리하는 시간을 갖는다.
  
  * 기준들(bank statements, credit reports, and criminal background)은 대출을 수락하거나 거부한다.

# 나의 설명
  * 서브시스템에 있는 인터페이스 집합에 대해서 하나의 통합된 인터페이스를 제공하는 패턴
  * 서브시스템을 좀더 사용하기 편하게 만드는 상위 수준의 인터페이스를 정의

# CODE
```js
var Mortgage = function (name) {
  this.name = name;
}

Mortgage.prototype = {
  // access multiple subsystems...
  applyFor: function (amount) {
    var result = "approved";

    if (!new Bank().verify(this.namej, amount)) {
      result = "denied";
    } else if (!new Credit().get(this.name)) {
      result = "denied";
    } else if (!new Background().check(this.name)) {
      result = "denied";
    }

    return `${this.name} has been ${result} for a ${amount} mortage`;
  }
}

var Bank = function () {
  this.verify = function (name, amount) {
    // complex logic ...
    return true;
  }
}
var Credit = function () {
  this.get = function (name) {
    // complex logic ... 
    return true;
  }
}

var Background = function () {
  this.check = function (name) {
    // complex logic ... 
    return true;
  }
}

function run() {
  var mortage = new Mortgage("Jyoon");
  var result = mortage.applyFor("$100,000");

  console.log(result);
}

run();
```

# javascript prototype 추가 설명
```JS
/*
  생성자 함수에 this.xxx function을 선언하는 것과
  생성자 함수 prototype 프로퍼티에 function을 선언하는 것의 차이

  (#POINT2)
  생성자 함수 prototype 프로퍼티에 function을 선언하면
  new 키워드로 객체를 생성하고 prototype에 선언한 function을 수정하면(생성된객체.__proto__.function)
  생성자 함수의 prototype function이 수정된다. (메모리 공유)

  (#POINT3)
  하지만 생성된객체[function 명] = function(){} 이렇게 선언된 함수는 메모리 공유를 하지 않는다. (원래 생성자 함수와 메모리 공유를 하지 않는다.)

  (#POINT1)
  하지만
  생성자 함수에 function을 추가 하게 되면 new 키워드로 생성자 함수로 생성한 객체를 변경후
  new 키워드로 다른 객체를 생성해도 변경한 함수는 변경되지 않는다.
*/

// 생성자 함수
var func1 = function () {
  this.name = 'func1';
  this.testFunc = function () {
    return 'func1.testFunc';
  }
}

// 생성자 함수
var func2 = function () {
  this.name = 'func2';
}

func2.prototype = {
  testFunc: function () {
    return 'func2.prototype.testfunc'
  }
}

// f1, f2: 생성된 객체
var f1 = new func1();
var f2 = new func2();
console.log(f1.testFunc()); //func1.testFunc
console.log(f2.testFunc()); //func2.prototype.testfunc


f1.testFunc = () => 'func1.textFunc 변경';
f2.__proto__.testFunc = () => 'func1.textFunc 변경';
f2.testFunc1 = () => 'func1.testFunc1 추가';

var newF1 = new func1();
var newF2 = new func2();
// #POINT1
console.log(newF1.testFunc());  //func1.testFunc
// #POINT2
console.log(newF2.testFunc());  //func1.textFunc 변경
// #POINT3
console.log(newF2.testFunc1()); //Uncaught TypeError: newF2.testFunc1 is not a function
```