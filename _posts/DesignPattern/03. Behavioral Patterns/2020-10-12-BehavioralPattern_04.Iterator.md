---
title: BehavioralPattern_04.Iterator
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Iterator
  - DesignPattern
  - BehavioralPattern
  - JavaScript
---

# def
사용자가 효고적으로 반복분(collection 객체) 사용할 수 있도록 돕는다.  
  
흔한 프로그래밍 task로 collection 객체를 순회하는 것이다.  
이런 collection 들은 아마 배열 또는 좀더 복잡한 tree, graph 구조 같은 곳에 저장될 것이다.  
게다가 collection item의 확실한 순서에 접근한다. 예를들어 맨앞, 뒤, depth의 첫번째(트리구조에서), 짝수번째 객체를 뛰어 넘는것들이다.  
  
Iterator 특수한 interator를 구현해 객체 순회에서 객체 collection을 분리해 문제를 해결한다.  

오늘날 많은 언어가 IEnumerable, IEnumberalbe 인터페이스와 같은 'for-each' type을 내장되어 있다.  
하지만 자바스크립트는 for, for-in, while, do while문 형식의 기본 루프만 지원한다.  
Iterator 패턴을 사용하면 자바스크립트 개발자가 훨씬 더 유연하고 정교한 루프 구조를 설계 할 수 있다.  

# participants
  * Client 
    - Collection 객체 순회를 동작시키고 참조한다.
    - 구현코드: run
  * Iterator 
    - 순회를 인터페이스를 first, next등을 동작하게 한다.
    - collection을 순회할때 현재 포지션을 계속 추적한다.
    - 구현코드: Iterator
  * Items 
    - 순회하는 collection의 독립적인 객체
    - 구현코드: Items

# Sample Code 설명
  * Iterator 객체는 collection 객체의 현재 포지션 참조를 유지한다.
  * 또한 이런 구현은 first, next, hasNext, reset, 각각 순회등을 구현하는데 사용된다.
  
  * 내장된 loop와 새로 만든 메소드의 두가지 loop메소드가 사용된다.
  * 순회를 위해서 first, hasNext, next 함수들을 순회를 제어하기 위해서 사용된다.
  * 각각의 함수들은 내부적으로 for loop를 실행하는것은 동일하지만 클라이언트에게 구문이 크게 단순화 되었다.


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

// Iterator 역할
var Iterator = function (items) {
  this.index = 0;
  this.items = items;
}
Iterator.prototype = {
  first: function () {
    this.reset();
    return this.next();
  },
  next: function () {
    return this.items[this.index++];
  },
  hasNext: function () {
    return this.index <= this.items.length;
  },
  reset: function () {
    this.index = 0;
  },
  each: function (callback) {
    for (var item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
  }
}

function run() {
  // Items역할
  var items = ["one", 2, "circle", true, "Applepie"];
  var iter = new Iterator(items);

  // using for loop
  for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
    log.add(item)
  }

  log.add("");

  // useing Iterator's each method
  iter.each(function (item) {
    log.add(item);
  });

  log.show();
}

run();
```