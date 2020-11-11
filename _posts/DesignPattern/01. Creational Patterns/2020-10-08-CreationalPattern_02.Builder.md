---
title: CreationalPattern_02.Builder
date: 2020-10-08
author: jyoon
category: DesignPattern
tags:
  - Builder
  - DesignPattern
  - CreationalPattern
  - JavaScript
---
# def
Builder 패턴을 사용하면 클라이언트가 유형과 콘텐츠만 지정하여 복잡한 객체를 구성 할 수 있다.  
Construction 세부 사항은 클라이언트에게 완전히 숨겨진다.  

Builder를 사용하는 가장 일반적인 동기는 복잡한 객체를 만드는 클라이언트 코드를 단순화하는 것이다.  
클라이언트는 실제 작업이 어떻게 수행되는지 몰라도 builder 취한 단계를 지시 할 수 있다.   
관련된 절차가 종종 반복적이고 복잡하기 때문에 빌더는 복합 객체(다른 GoF 디자인 패턴)의 구성을 자주 캡슐화한다.  

일반적으로 빌더가 점 연산자로 구분 된 여러 메서드 호출이 함께 연결되는 유연한 인터페이스에 쉽게 참여할 수 있도록 새로 생성 된 객체를 반환하는 마지막 단계이다.  
(참고: 유연한 인터페이스는 다음과 같은 연결 패턴의 구현이다. 현대 패턴 섹션에 제시 됨)

# Participants
  * Director
    - Builder's multistep interfae를 통해서 constructs products를 만든다.
    - 구현 코드: Shop
  * Builder
    - 구현 코드: not used in JS
  * ConcreteBuilder
    - multistep builder interface를 구현
    - 프로세서 조합을 유지
    - 새로은 product를 생성해서 반환한다.
    - 구현 코드: CarBuilder, TruckBuilder
  * Products
    - 조합된 객체를 대표
    - 구현 코드: Car, Truck

# 예제 설명
  * AbstractBuilder는 JavaScript가 추상 클래스를 지원하지 않기 때문에 사용되지 않았다. 
  * 그러나 다른 빌더는 감독이 조립 프로세스를 단계별로 진행할 수 있도록 동일한 다단계 인터페이스를 구현해야한다.

  * JavaScript코드에는 Shop(디렉터)과 CarBuilder 및 TruckBuilder의 두 빌더객체가 있다. 
  * Shop의 구성 메소드는 일련의 어셈블리 단계 인 step1 및 step2를 거치는 Builder 인스턴스를 허용합니다. 
  * Builder의 get 메서드는 새로 조립 된 제품(Car객체 및 Truck객체)을 반환합니다.

# CODE 
```JS
const log = (function () {
let log = '';

return {
  add: (msg) => log += msg + "\n",
  show: () => {
    console.log(log);
    log = '';
  }
}
})();

// director 역할
function Shop() {
this.construct = function (builder) {
  builder.step1();
  builder.step2();
  return builder.get();
}
}

// ConcreteBuilder 역할
function CarBuilder() {
this.car = null;

this.step1 = function () {
  this.car = new Car();
}
this.step2 = function () {
  this.car.addParts();
}
this.get = function () {
  return this.car;
}
}

// ConcreteBuilder 역할
function TruckBuilder() {
this.truck = null;

this.step1 = function () {
  this.truck = new Truck();
}
this.step2 = function () {
  this.truck.addParts();
}
this.get = function () {
  return this.truck;
}
}

// Products 역할
function Car() {
this.doors = 0;

this.addParts = function () {
  this.doors = 4;
}
this.say = function () {
  log.add(`난 문 ${this.doors}개 달린 차다!`);
}
}

// Products 역할
function Truck() {
this.doors = 0;

this.addParts = function () {
  this.doors = 2;
}
this.say = function () {
  log.add(`난 문 ${this.doors}개 달린 차다!`);
}
}

function run() {
const shop = new Shop();  // director 역할
const carBuilder = new CarBuilder();  // ConcreteBuilder역할 (생성자 함수 안에서 Products(Car, Truck)생성자 함수를 사용해 객체 생성)
const truckBuilder = new TruckBuilder(); // ConcreteBuilder역할 (생성자 함수 안에서 Products(Car, Truck)생성자 함수를 사용해 객체 생성)
const car = shop.construct(carBuilder);
const truck = shop.construct(truckBuilder);

car.say();
truck.say();

log.show();
}

run();
```