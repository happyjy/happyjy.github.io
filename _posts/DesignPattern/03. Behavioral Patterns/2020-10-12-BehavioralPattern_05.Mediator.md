---
title: BehavioralPattern_05.Mediator
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Mediator
  - DesignPattern
  - BehavioralPattern
  - JavaScript
---


# def
  * Mediator 패턴은 객체들이 어떻게 상호작용을 하는지 캡슐화 되어 객체의 그룹을 통해서 중앙 권한를 제공한다.
  * 이런 모델은 복잡한 상태를 모든 관리하는 시나리오에서 유용하다.
    - 복잡한 상태란?: 그룹내에 모든 객체가 서로 어떤 상태인지 알고 있는 것
  
  * 예1
    - 항공 예매를 한다고 생각해보자. 
    - 간단한 Mediator 로직은 이렇다. 아래 세가지 조건을 만족해야 검색 조건이 활성화 된다.
      ```
      - 가능한 이륙날짜, 돌아오는 날짜(이륙날짜 이후의 날짜 이어야만한다.)
      - 가능한 이륙 공항, 도착 공항
      - 가능한 여행자 수
      ```
  * 예2
    - 공항의 control tower에서 이륙, 착륙하는 항공기들을 조정하는 것이다.
    
# participants
  * Mediator
    * 동료 객체와 통신하기 위한 인터페이스를 정의한다.
    * 동료 객체에 대한 참조를 유지한다.
    * 운영에 대한 중앙제어를 관리한다.
    - code: Chatroom
  * Colleagues
    * Mediator 객체에 의해서 중재되어 지는 객체다.
    * 각 인스턴스들은 Mediator객체는를 참조하는것을 유지한다.
    - code: Participants

# Sample Code 설명
  * 예제 코드에는 Chatroom(중재자)에 등록하여 채팅 세션에 참여하는 4명의 참가자가 있다.
  * 각 참가자는 Participant 객체로 표시된다.
  * 참가자는 서로에게 메시지를 보내고 Chatroom에서 라우팅 처리한다.

  * 이 예는 간단하지만 참가자가 정크 메시지를받지 못하도록 보호하는 '정크 필터'와 같은 다른 복잡한 규칙을 추가 할 수 있다.

# 나의 분석
  * [POINT1] participants dictionary 객체
    - Chatroom객체 register함수로 할당한 참여자 객체(participant)가 
      Mediator역할 객체 Participant에 할당되는 객체
  * [POINT2] participant.chatroom = this;
    - Mediator역할 객체 Participant의 register함수에서 수행되는 코드로 
    - 이 코드는 참여자 객체(jyoon, boa, yoonho, iu)가 send 함수 호출시 
      this.chatroom.send 함수를 호출을 가능하게 함으로 메세지를 
      Mediator역할 객체(Participant)의 send를 호출해
      메세지를 보낼 수 있도록 한다.

# CODE
```JS
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

var Participant = function (name) {
  this.name = name;
  this.chatroom = null;
}

Participant.prototype = {
  send: function (message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function (message, from) {
    log.add(`${from.name} to ${this.name} : ${message}`);
  }
}

var Chatroom = function () {
  // POINT1
  var participants = {};
  return {
    /*
      register에 의해서 모든 participant들은 chatroom 객체를 상속 받는다. 
      
      * parameter(participant): Participant 생성자 함수의 instance
    */
    register: function (participant) {
      participants[participant.name] = participant;
      // POINT2
      participant.chatroom = this;
    },

    send: function (message, from, to) {
      if (to) {                       // single mesagge
        to.receive(message, from);
      } else {                        // broadcast message
        for (key in participants) {
          if (participants[key] !== from) {
            participants[key].receive(message, from);
          }
        }
      }
    }
  };
};

function run() {
  var jyoon = new Participant("JYOON");
  var boa = new Participant("BOA");
  var yoonho = new Participant("YOONHO");
  var iu = new Participant("IU");

  var chatroom = new Chatroom();
  chatroom.register(jyoon);
  chatroom.register(boa);
  chatroom.register(yoonho);
  chatroom.register(iu);

  jyoon.send("All you need is love. chrismas is comming!!!");
  jyoon.send("I love you boa");
  boa.send("Hey, no need to broadcast", jyoon);
  yoonho.send("Ha, I heard that !!! I love boa too !!!");
  iu.send("yoonho, what do you think? ", yoonho);

  log.show();
}

run()
```