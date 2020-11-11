---
title: CreationalPattern_03.Factory Method
date: 2020-10-08
author: jyoon
category: DesignPattern
tags:
  - FactoryMethod
  - DesignPattern
  - CreationalPattern
  - JavaScript
---

# def
Factory pattern은 사용자가(클라이언트) 원하는대로 새로운 객체를 생성한다.  
객체를 생성하는 방법은 new 연산자로 생성자 함수를 호출하는 것이다.   
그러나 인스턴스화 할 여러 후보 객체 중 하나를 알지 못하거나 알지 못하는 상황이 있다.  
팩토리 메서드를 사용하면 사용자가 인스턴스화 할 유형에 대한 제어를 유지 하면서 객체 생성을 위임 할 수 있다.  

Factory Method의 핵심 목표는 확장성 이다.   
Factory Method는 서로 다르지만 동시에 많은 특성(예: 메서드, 속성)을 공통으로 갖는 객체 컬렉션을 관리, 유지 관리 되는 조작하는 응용 프로그램에서 자주 사용된다.  
예로 Xml, Pdf문서 및 Rtf문서가 혼합 된 문서 모음이 있다.  

# Participants
  * Creator
    - #POINT1: factory 객체는 새로운 인스턴스를 생성한다.
    - #POINT2: 새로운 인스턴스를 반환하는 factoryMethod(createEmployee 함수)를 구현한다.
    - code: Factory
  * AbstractProduct -- not used in JavaScript
    - 인스턴스를 생성할 인터페이스를 선언한다.
    - code: 사용되지 않음
  * ConcreteProduct
    - 인스턴스가 생성되는 대상이다.
    - #POINT2: 모든 생성된 인스턴스가 같은 인터페이스를 지원한다(property와 함수들)
    - code: Employees

# 샘플 코드 설명 
  * JavaScript 예제에서 Factory 객체는 네 가지 유형의 직원을 만든다.
  * 직원 유형마다 시간당 요금이 다르다. 
  * createEmployee 메서드는 실제 팩토리 메서드이다. 
  * 클라이언트는 유형 인수를 Factory 메서드에 전달하여 생성 할 직원 유형을 공장에 지시한다.

  * Javascript가 추상 클래스 또는 인터페이스를 지원하지 않기 때문에 다이어그램의 AbstractProduct는 구현되지 않는다.
  * 그러나 모든 직원 유형이 동일한 인터페이스 (속성 및 메서드)를 갖도록해야한다.

  * 네 가지 유형의 직원이 생성된다.
  * 모두 동일한 배열에 저장된다.
  * 각 직원은 자신이 무엇인지와 시간당 요금을 say한다.
  
# 나의 분석
  * Factory function: 팩토리 패턴 함수 
    - this.createEmployee: 팩토리 함수 
    - employee.type, employee.say: 팩토리 함수에 의해서 생성된 인스턴스는 같은 인터페이스를 지원
  * type, say를 여러번 생성자 함수 FullTime, PartTime, temporary, contractor마다 선언하지 않아도 된다.

# CODE
```js
var log = (function () {
  var log = '';

  return {
    add: function (msg) {
      log += msg + "\n";
    },
    show: function () {
      console.log(log);
      log = '';
    }
  }
})();

// Creator 역할
function Factory() {
  this.createEmployee = function (type) {
    var employee;

    if (type === 'fulltime') {
      // #POINT1
      employee = new FullTime();
    } else if (type === 'parttime') {
      // #POINT1
      employee = new PartTime();
    } else if (type === 'temporary') {
      // #POINT1
      employee = new Temporary();
    } else if (type === 'contractor') {
      // #POINT1
      employee = new Contractor();
    }
    employee.type = type;

    // #POINT2
    employee.say = function () {
      log.add(`${this.type}: rate ${this.hourly} /hour`);
    }

    return employee;
  }
}

// ConcreteProduct 역할
var FullTime = function () {
  this.hourly = "$12";
}
// ConcreteProduct 역할
var PartTime = function () {
  this.hourly = "$11"
}
// ConcreteProduct 역할
var Temporary = function () {
  this.hourly = "$10"
}
// ConcreteProduct 역할
var Contractor = function () {
  this.hourly = "$15"
}

function run() {
  var employees = [];
  var factory = new Factory();

  employees.push(factory.createEmployee("fulltime"));
  employees.push(factory.createEmployee("parttime"));
  employees.push(factory.createEmployee("temporary"));
  employees.push(factory.createEmployee("contractor"));

  for (var i = 0, len = employees.length; i < len; i++) {
    employees[i].say();
  }

  log.show();
}

run();
```