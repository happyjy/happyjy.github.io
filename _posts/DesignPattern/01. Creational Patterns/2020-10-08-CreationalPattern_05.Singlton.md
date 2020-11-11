---
title: CreationalPattern_05.Singlton
date: 2020-10-08
author: jyoon
category: DesignPattern
tags:
  - Singlton
  - DesignPattern
  - CreationalPattern
  - JavaScript
---

# def
싱글톤패턴은 특정 객체의 인스턴스 수를 하나로 제한한다.   
이 단일 인스턴스를 singleton pattern이라고한다.  
  
singleton pattern은 단일 중앙 위치에서 시스템 전체 작업을 조정해야하는 상황에서 유용하다  
예는 데이터베이스 connection pool이다.  
connection poll은 전체 애플리케이션에 대한 모든 데이터베이스 연결의 생성, 파괴 및 수명을 관리하여 연결이 손실되지 않도록한다.  

singleton pattern은 네임 스페이스 오염 및 이름 충돌과 관련된 위험을 제한하기 때문에 JavaScript에서 특히 중요한 전역 변수의 필요성을 줄인다.  
모듈 패턴 (Dofactory JS 제품 참조)은 JavaScript의 Singleton 패턴 표현이다.  

Factory, Prototype 및 Facade와 같은 몇 가지 다른 패턴은 인스턴스가 하나만 필요할 때 singleton pattern으로 자주 구현된다.  

# Participants
  * Singleton
    - getInstance 함수를 구현하고 반환으로 유일한 인스턴스를 반환한다.
    - 인스턴스객체를 생성하고 관리하는 역학을 한다.
    - code: Singleton

# 예제 코드 설명
  * Singleton 객체는 즉각적인 익명 함수로 구현된다.
  * 함수는 대괄호와 두 개의 추가 대괄호로 묶어 즉시 실행된다.
  * 이름이 없기 때문에 익명함수라고 한다.

  * getInstance 메소드는 Singleton의 gatekeeper이다.
  * 외부 세계에서 액세스 할 수없는 개인 참조를 유지하면서 객체의 유일한 인스턴스를 반환한다.

  * getInstance 메소드는 Lazy Load라는 또 다른 디자인 패턴을 보여준다.
  * Lazy Load는 인스턴스가 이미 생성되었는지 확인한다.
  * 그렇지 않은 경우 하나를 만들고 나중에 참조 할 수 있도록 저장한다.
  * 모든 후속 호출은 저장된 인스턴스를 수신한다.
  * 지연 로딩은 절대적으로 필요한 경우에만 객체를 생성하는 CPU 및 메모리 절약 기술이다.

  * singleton pattern은 일반적인 javascriopt패턴 인 "모듈 패턴"의 표현이다. 
  * Module은 모든 인기있는 JavaScript 라이브러리 및 프레임 워크 (jQuery, Backbone, Ember 등)의 기반이다. 

# CODE

```JS
var Singleton = (function () {
  var instance;

  function createInstance() {
    var object = new Object("I am the instance");
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  }
})();

function run() {
  var instance1 = Singleton.getInstance();
  var instance2 = Singleton.getInstance();

  console.log(`### Same instance? `, (instance1 === instance2))
}
```