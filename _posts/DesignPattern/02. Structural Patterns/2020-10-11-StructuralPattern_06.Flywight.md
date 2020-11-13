---
title: StructuralPattern_08.Flywight
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Flywight
  - DesignPattern
  - StructuralPattern
  - JavaScript
---

# def
  * Flyweight 패턴은 많은 수의 세분화 된 객체를 효율적으로 공유하여 메모리를 절약한다.
  * 공유된 fly weight객체는 변경할 수 없다.
    - 즉, 다른 객체와 공유되는 특성을 나타내므로 변경할 수 없다.
  
  * 본질적으로 Flyweight는 공통 속성이 공유 된 flyweight 객체로 분해되는 '객체 정규화 기술'이다.
    - 참고 : 아이디어는 모델러가 중복성을 최소화하려고 시도하는 프로세스 인 데이터 모델 정규화와 유하하다.
  
  * Flyweight 패턴의 예는 애플리케이션 전체에서 공유되는 
    변경 불가능한 문자열 목록을 유지하는 JavaScript 엔진 자체에 있다.
  
  * 다른 예로
    - 워드 프로세서의 문자 및 선 스타일 또는 공중 전화 교환망 응용 프로그램의 '숫자 수신기'가 있다. 
    - 주로 워드 프로세서, 그래픽 프로그램 및 네트워크 앱과 같은 유틸리티 유형 응용 프로그램에서 플라이 웨이트를 찾을 수 있다. 
    - 데이터 기반 비즈니스 유형 애플리케이션에서는 덜 자주 사용된다.

# Participants
  * Client
      - Flyweight 객체를 얻기 위해서 FlyweightFactory를 호출
      - sampleCode:Computer
  * FlyWeightFactory
      - flyweight 객체를 생성, 관리
      - sampleCode:FlyweightFactory
  * Flyweight
      - application 내 데이터를 공유하기 위해서 내재한 data를 유지한다
      - sampleCode:Flyweight


# Sample Code 설명
  * 공통적인 models, makes, processor 부품을 이용해 컴퓨터를 만든다.
  * 그래서 이런 특징들은 Flyweight객체에서 공유/ 관리 된다.fail

  * FlyweightFactory
      - Flyweight 객체를 관리한다.
      - FlywidghtFactory에게 Flyweight 객체를 생성해달라고 요청하면 이미 있는지 확인한다.
      - 없다면 하나 Flyweight 객체를 생성하고 저장해놓는다 다음에 사용할 때 다시 사용하기 위해서
      - 같은 computer를 연속적으로 요청 될때 Flyweight는 같은 Flyweight 객체를 반환한다.fail

  * 여러 다른 컴퓨터들은 ComputerCollection에 추가 된다.
  * 우리는 7개 컴퓨터 객체를 가지고 있고 2개 Flyweights를 공유한다.
  * 이런 저장은 작은 부분이지만, 큰 datasets에서는 큰 메모리 공유는 중요할 수 있다.
      - [!중요] 대용량 처리할때 유용하게 사용할 것같다.

# 나의 해석
  * 크기가 작은 객체가 여러 개 있을 때, 공유를 통해서 이들을 효율적으로 지원하는 패턴

# CODE
```js
var log = (function () {
  var log = '';

  return {
    add: function (msg) { log += msg + '\n' },
    show: function () { console.log(log); log = ''; }
  }
})();

// Flyweight 역할
function Flyweight(make, model, processor) {
  this.make = make;
  this.model = model;
  this.processor = processor;
}

// FlyWeightFactory 역할
var FlyWeightFactory = (function () {
  // [POINT]
  var flyweights = {};

  return {
    get: function (make, model, processor) {
      if (!flyweights[make + model]) {
        flyweights[make + model] = new Flyweight(make, model, processor);
      }
      return flyweights[make + model];
    },
    getCount: function () {
      var count = 0;
      for (var f in flyweights) count++;
      return count;
    }
  }
})()


function ComputerCollection() {
  var computers = {};
  var count = 0;

  return {
    add: function (make, model, processor, memory, tag) {
      computers[tag] = new Computer(make, model, processor, memory, tag);
      count++;
    },
    get: function (tag) {
      return computers[tag];
    },
    getCount: function () {
      return count;
    }
  }
}

var Computer = function (make, model, processor, memory, tag) {
  this.flywight = FlyWeightFactory.get(make, model, processor, memory, tag)
  this.memory = memory;
  this.tag = tag;
  this.getMake = function () {
    return this.flywight.make;
  }
}

function run() {
  /*
    # 코드 흐름
      * new ComputerCollection.add(make, model, processor, memory, tag)
        -> new Computer(make, model, processor, memory, tag)
        -> FlyWeightFactory.get(make, model, processor) FlyWeightFactory-IIFE
        -> new Flywight(make, model, processor)
  */
  var computers = new ComputerCollection();

  computers.add("Dell", "Studio XPS", "Intel", "5RAM", "Y755OP1");
  computers.add("Dell", "Studio XPS", "Intel", "6RAM", "Y755OP2");
  computers.add("Dell", "Studio XPS", "Intel", "3RAM", "Y755OP3");
  computers.add("Dell", "Studio XPS", "Intel", "4RAM", "Y755OP4");
  computers.add("Dell", "Studio XPS", "Intel", "1RAM", "Y755OP5");
  computers.add("HP", "Envy", "Intel", "4RAM", "C12CJ001");
  computers.add("HP", "Envy", "Intel", "2RAM", "C12CJ2");

  log.add("Computers: " + computers.getCount());
  log.add("Flyweights: " + FlyWeightFactory.getCount());
  log.show();
}

run();
```