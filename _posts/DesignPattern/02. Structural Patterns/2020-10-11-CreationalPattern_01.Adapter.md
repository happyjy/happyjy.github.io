---
title: Structural_01.Adapter
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Adapter
  - DesignPattern
  - Structural
  - JavaScript
---

# def
  [POINT]interface(객체의 속성, 함수)를 다른 것으로 사용할수 있게 하는 패턴이다.
  클래스의 인터페이스를 사용자가 기대하는 다른 인터페이스로 변환하는 패턴이다.  
  호환성이 없는 인터페이스 때문에 함께 동작할 수 없는 클래스들과 함께 작동하도록 한다.  
  Wrapper Pattern 이라고도 한다.  
  
  * 시나리오1
      - 새로운 컴포넌트가 필요할때 통합적으로 사용하고 
      - 현재 존재하는 컴포넌트와 같이 쓰인다.

  * 시나리오2
      - 개선된 인터페이스로 기존 프로그램을 리팩토링한다. 
      - 그러나 오래된 코드는 여전히 원래 인터페이스를 유지한다.

# Participants
  * Client 
      - Adappter를 service하기 위해서 호출
      - code: run
  * Adapter
      - clients가 기대 하고 아는 interface를 구현한다. 
      - code: ShippingAdapter
  * Adaptee 
      - adapted된 객체
      - client가 기대하고 알고있는 인터페이스와 다르다.
      - code: AdvancedShipping

# 예제 코드 설명
  * 예제코드는 온라인 쇼핑몰 카트(shipping 객체가 shipping한 가격을 계산)를 보여준다.
      - old shipping객체는 개선된 Shipping object(AdvancedShipping)
      (보안, 더 나은 가격제안 기능이 추가된)으로 교체 될 것
  * 새로운 객체는 AdvancedShipping 이다 
      - 어려운 interface로 구성되어 있다.(client가 예상 할 수 없다.)
  * ShippingAdapter
      - client 프로그램을 어떤 API 변화(old Shipping 인터페이스를 adapting 한)를 제외하고 역할을 할수 있도록 한다.

# 나의 분석
  * [POINT]클래스의 인터페이스를 사용자가 기대하는 다른 인터페이스로 변환하는 패턴으로 
    호환성이 없는 인터페이스 때문에 함께 동작할 수 없는 클래스들이 함께 작동 하도록 해준다. 
  * [POINT1]Adater(ShippingAdapter)가 Adaptee(advancedShipping)을 더 개선 시키는 패턴이다. 

  * 개선된 interface(AdvancedShipping) 생성자 함수는 login, setStart, setDestination, calcalate를 인터페이스로 따로 관리 할 수 있도록 구조를 개선 시킨 방법이다.

# CODE
```js
var log = (function () {
  var log = "";

  return {
    add: function (msg) { log += msg + "\n" },
    show: function () { console.log(log); log = ""; }
  }
})();

// old interface
function Shipping() {
  this.request = function (zipStart, zipEnd, wight) {
    //...
    return "$49.75"
  }
}

// Adpatee 역할: new interface
function AdvancedShipping() {
  this.login = function (credentials) {
    console.log("### login()", credentials)
  };
  this.setStart = function (start) {
    console.log("### setStart()", start)
  };
  this.setDestination = function (destination) {
    console.log("### destination()", destination)
  };
  this.calculate = function (weight) {
    // return "$39.50"
    var convertPoundToKg = weight.replace(/\D/g, '') * 0.453592;
    return `$${convertPoundToKg * 39.50} `
  };
}

// Adapter 역할: adapter interface
function ShippingAdapter(credentials) {
  // [POINT1]AdvancedShipping: Adpatee
  var shipping = new AdvancedShipping();
  shipping.login(credentials);

  return {
    request: function (zipStart, zipEnd, weight) {
      // jyoon - shpping closure
      shipping.setStart(zipStart);
      shipping.setDestination(zipEnd);
      return shipping.calculate(weight);
    }
  }
}

// client
function run() {
  // old interface
  var shipping = new Shipping();
  var credentials = { token: "30a8-6ee1" };
  // new interface
  var adapter = new ShippingAdapter(credentials);

  // original shipping object and interface
  var cost = shipping.request("78701", "10010", "2 lbs");
  log.add("Old cost: " + cost);

  // new shipping object with adapted interface
  cost = adapter.request("78701", "10010", "2 lbs");
  log.add("New cost: " + cost);
  log.show()
}

run()
```