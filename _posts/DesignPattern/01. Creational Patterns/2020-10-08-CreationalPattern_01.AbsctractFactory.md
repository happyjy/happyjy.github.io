---
title: CreationalPattern_01.AbsctractFactory
date: 2020-10-08
author: jyoon
category: DesignPattern
tags:
  - AbsctractFactory
  - DesignPattern
  - CreationalPattern
  - JavaScript
---

# def
  공통된 속성과 관련된 객체를 만드는 패턴이다.    
  객제지향 프로그래밍에서 팩토리는 다른 객체를 생성하는 객체이다.   
  Abstract Factory는 새로 생성 된 객체가 공유하는 주제를 추상화했다.  

  button, textbox, radio button, listbox 같은 페이지 컨트롤을 만드는 작업을 수행하는 두개의 추상 팩토리가 있다고 가정한다.
  하나는 흰색 컨트롤을 만드는 Light Factory, 하나는 어두운 컨트롤을 만드는 Dark Factory이다.
  두 Factory 모두 같은 종류의 컨트롤를 생성하지만 다른점은 색상이 다르다.  
  이것이 바로 공통된 속성이 것이다.  
  이것이 Abstract Factory 패턴의 구현이다.  

  시간이 지남에 따라 Abstract Factory및 Factory Method패턴은 Factory라는보다 일반적인 패턴으로 병합됐다. 
  팩토리는 단순히 다른 객체를 만드는 객체이다.  
  
  간단하게 바로 new 키워드를 통해서 constructor function을 호출해서 객체를 만들지 않고 객체 생성 책임을 다른 사람에게 맡기는 이유가 궁금해 할 것이다.  
  이유: constructor function가 전체 생성 프로세스를 제어 하는데 제한이 있고 때로는 더 넓은 정보를 가진 Factory에 제어권을 넘겨야 하기 때문

  여기에는 생성 프로세스에 객체 캐싱, 객체 공유 또는 재사용, 복잡한 논리 또는 객체 및 유형 수를 유지하는 응용 프로그램, 다른 리소스 또는 장치와 상호 작용하는 객체가 포함되는 시나리오가 포함된다. 
  응용 프로그램에서 객체 생성 프로세스를 더 많이 제어해야하는 경우 팩토리 사용을 고려해야 한다.

# Participants
  * AbsctractFactory
    - [POINT]: Prooducts를 만들 interface 생성
    - 생성코드: not used in JS
  * ConcreteFactory
    - 새로운 factory 객체(products를 만들 'manufactures')
    - 생성코드: EmployeeFactory, VendorFactory 
  * Products
    - factory에 의해 생성된 products 인스턴스
    - 생성코드: Employee, Vendor
  * AbstractProduct
    - 생성코드: not used in JS

# 예제 코드 설명
  * JavaScript는 클래스 기반 상속을 지원하지 않으므로 다이어그램에 표시된 추상 클래스는 JavaScript 샘플에서 사용되지 않는다.
  * 추상 클래스와 인터페이스는 파생 클래스에서 일관된 인터페이스를 적용한다. 
  * JavaScript에서 우리는 각 'Concrete'객체가 다른 객체와 동일한 인터페이스 정의 (즉, 속성 및 메서드)를 갖도록하여 이러한 일관성을 보장해야한다.    
  
  * 아래 코드 예
    - 아래 예로는 Concreate Factories가 두개가 있다.(EmployeeFactory, VendorFactory)
    - 첫번재 EmployeeFactory은 Employee 인스턴스를 만든다.
    - 두번째 VendorFactory는 Vendor 인스턴스를 만든다.
    - 두개 모두 person types(같은 인터페이스를 갖는다.)으로 클라이언트가 동일하게 취급 할 수 있다. 
    - 두 명의 직원과 두 명의 공급 업체가 있는 배열(persons)이 생성된다. 
    - 그런 다음 각 사람은 자신이 누구이며 누구인지 말하도록 요청받는다.

# POINT
  * Factory는 공통된 속성을 추상화한 클래스를 인스턴스로 만드는 역할을 한다.

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

  function Employee(name) {
    this.name = name;

    this.say = function () {
      log.add(`나는 고용인 ${this.name} 이다`);
    }
  }
  // ConcreteFactory 역할
  function EmployeeFactory() {
    this.create = function (name) {
      // [POINT] EmployeeFactory의 공통 된 속성을 추상화한 "Employee"함수로 인스턴스를 생성한다.
      return new Employee(name);
    }
  }

  function Vendor(name) {
    this.name = name;

    this.say = function () {
      log.add(`나는 판매회사 ${this.name} 이다`);
    }
  }
  // ConcreteFactory 역할
  function VendorFactory() {
    this.create = function (name) {
      // [POINT] VendorFactory의 공통 된 속성을 추상화한 "Vendor"함수로 인스턴스를 생성한다.
      return new Vendor(name);
    }
  }

  function run() {
    var persons = [];
    // Products: employeeFactory 객체, vendorFactory객체
    var employeeFactory = new EmployeeFactory();
    var vendorFactory = new VendorFactory();

    persons.push(employeeFactory.create("고용인1"));
    persons.push(employeeFactory.create("고용인2"));
    persons.push(vendorFactory.create("판매회사"));
    persons.push(vendorFactory.create("판매회사"));

    persons.forEach(v => {
      v.say();
    })

    log.show();
  }

  run();
```