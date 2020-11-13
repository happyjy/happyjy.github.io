---
title: BehavioralPattern_06.Memento
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Memento
  - DesignPattern
  - BehavioralPattern
  - JavaScript
---

# def
Memento 패턴은 객체의 복원뿐만 아니라 임시 저장소를 제공한다.  
이런 메커니즘은 state 객체를 저장하는 것을 필요로 하게 지속 기간에 따라 다르며 다를 수 있다.  
    
객체가 유지되고 복원되는 Memento 디자인 패턴을 구현하기 위해서 객체의 데이터 베이스를 생각할수도 있다.  
그러나 이 패턴을 사용하는 가장 중요한 이유는 객체 state를 snapshot capture을 하기 위해서이다.  
(이를 통해서 후속 변경사항을 쉽게 취소 할 수 있다.)
  
기본적으로 Memento는 객체의 상태를 저장하는 작은 저장소이다.  
객체를 이전에 존재했던 상태로 복원하려는 시나리오에는 컴퓨터 게임에서 플레이어의 상태 저장 및 복원 또는 데이터베이스에서 실행 취소 작업 구현이 포함된다.  
  
JavaScript에서 Mementos는 JSON으로 객체를 serializing, de-serializing로 쉽게 구현된다.  

# participants
  * Originator
    - Mementor객체를 만들고 복원하는 인터페이스를 구현한다.
      - 코드: hydrate and dehydrate
    - 상태가 임시적으로 저장되고 복구되는 객체
    - code: Person
  * Memento
    - 일부 저장 형식에서 Originator 객체의 내부 상태
    - code: JSON representation of Person
  * CareTaker
    - memento를 저장하기 위한 책임
    - 저장소이다(meemnto를 변화시키지 않는다.)
    - code: CareTaker

# Sample Code 설명
  * 샘플 코드는 Mike라는 두 사람을 생성하고 John은 Person 생성자 함수를 사용하여 생성된다.
  * 다음으로 CareTaker 객체가 유지 관리하는 Mementor객체가 생성된다.

  * 유품에서 복원하기 전에 Mike와 John의 가짜 이름을 지정한다. 
  * 복원 후 우리는 사람 객체가 유효한 이름으로 원래 상태로 돌아 왔는지 확인한다.

  * CareTaker 등의 Memento 패턴 자체는 JavaScript에서 거의 사용되지 않는다. 
  * 그러나 JSON은 다양한 데이터 교환 시나리오에서 매우 유용한 매우 효과적인 데이터 형식이다.

# CODE
```js
var log = (function () {
  var log = '';

  return {
    add: function (msg) { log += msg + '\n' },
    show: function () { console.log(log); log = ''; }
  }
})();

// Originator 역할
var Person = function (name, street, city, state) {
  this.name = name;
  this.street = street;
  this.city = city;
  this.state = state;
}
Person.prototype = {
  hydrate: function () {
    // Memento역할: JSON.stringify
    var memento = JSON.stringify(this);
    return memento;
  },
  dehydrate: function (memento) {
    // Memento역할: JSON.parse
    var m = JSON.parse(memento);
    this.name = m.name;
    this.street = m.street;
    this.city = m.city;
    this.state = m.state;
  }
}

// CareTaker 역할
var CareTaker = function () {
  this.mementos = {};
  /*
      key type: integer
      memento type: hydrate 시킨 객체
  */
  this.add = function (key, memento) {
    this.mementos[key] = memento;
  }
  this.get = function (key) {
    return this.mementos[key];
  }
}

function run() {
  // # [POINT1]CareTaker객체에 Originator 역할을 하는(Person 생성자 함수)생성자함수의 인스턴스를 hydrate한 객체를 add한다.
  //  ㄴ CareTacker가 Person 생성자 함수의 인스턴스를(mike, jyoon) caching한다.
  //  ㄴ caching한 mike, jyoon인스턴스는 get 함수로 꺼내 쓸수 있다.

  var mike = new Person("Mike Foley", "1222 Main", "Dallas", "Tx");
  var jyoon = new Person("Jaeyoon", "48th Street", "sna jose", "CA");
  var caretaker = new CareTaker();

  // [POINT1]save state
  caretaker.add(1, mike.hydrate());
  caretaker.add(2, jyoon.hydrate());

  // mess up their name
  mike.name = 'King Kong';
  jyoon.name = 'Superman';

  // restore original state
  mike.dehydrate(caretaker.get(1));
  jyoon.dehydrate(caretaker.get(2));

  log.add(mike.name);
  log.add(jyoon.name);

  log.show();
}

run();
```