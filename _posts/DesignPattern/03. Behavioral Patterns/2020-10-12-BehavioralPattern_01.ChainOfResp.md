---
title: BehavioralPattern_01.ChainOfResponsibility
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - ChainOfResponsibility
  - DesignPattern
  - BehavioralPattern
  - JavaScript
---

# def
  * 객체 결합을 줄인다. 
  * chain of responsibility는 이벤트 버블링과 같다.(선택한 이벤트가 연속적으로 중첩된 컨트롤들로 증식해 나가기 때문이다.)
  * Javascript에서 자주 사용되는 Chaining pattern과 유사하다.
  
# Participants
  * Client
    - handler객체 연쇠 작용에 요청한다.
    - code: Request
  * Handler
    - 요청 작업하는 인터페이스를 작성한다.
    - code: Request.get() method

# 예제 코드 
  * 고전적인 Chain of Responsiblility pattern과 다르다. 그러나 모든 handlers는 handling 요청에 포함된다.
  * ATM기에서 동전을 바꿔주는 좋은 방법이 된다. 
  * 만약 고객이 777원을을 바꿀 때, 동전 단위는(100, 50, 10, 5, 1)씩 있다고 하자. 
  * 각 동전단위(액면가)가 연속적 호출/ 계산 될 것이다. 
  * 각 handler는 객 동전의 갯수, 남은 돈을 계산한다.
  * 요청객체는 get함수를 포함한 연쇄 객체를 반환한다.
  
# 나의 추가 분석
  * POINT
    - this: get을 호출한 req 객체

# CODE 
```js
var log = (function () {

  var log = '';

  return {
    add: function (msg) {
      return log += msg + '\n';
    },
    show: function () {
      console.log(log);
      log = '';
    }
  }
})();

// Client 역할
var Request = function (amount) {
  this.amount = amount;
  log.add(`### Requested: $${amount} \n`);
}
Request.prototype = {
  // Handler 역할
  get: function (bill) {
    var count = Math.floor(this.amount / bill);
    this.amount -= count * bill;
    log.add(`### Dispense ${count} $${bill} bills`);

    /*  
      ### POINT
        this: get을 호출한 req 객체
    */
    return this;
  }
}

function run() {
  var req = new Request(777);

  req.get(100).get(50).get(10).get(5).get(1);
  log.show();
}

run()
```