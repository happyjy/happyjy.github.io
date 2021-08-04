---
title: BehavioralPattern_02.Command
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Command
  - DesignPattern
  - BehavioralPattern
  - JavaScript
---

# def

명령패턴은 동작을 객체로 캡슐화 한다.
명령객체는 실제로 요청을 처리하는 객체에서 요청하는 객체를 분리해 느슨하게 결합 된 시스템을 가능하게 한다.
이런 요청들은 이벤트라고 불리고 요청을 처리하는 코드들은 이벤트 핸들러라고 한다.
  
잘라내기 복사하기 붙여넣기 클립보드 행동이 있는 어플리케이션을 만든다고 하자!  
이런 행동들은 앱에서 메뉴시스템, 컨텍스트 메뉴(텍스트 박스 오른쪽 클릭)등 다른 방법으로 트리거 될 수 있다.
  
커멘드 객체에는 각 작업에 대해 하나씩 이러한 작업의 처리를 중앙 집중화 할 수 있다.
그래서 커멘드 객체는 복사하기, 붙여 넣기 요청에 대해서 하나만 필요하다.  
  
왜냐하면 모든 처리에 대해서 중앙 집중되어 있다.
그리고 빈번하게 되돌리기와 같은 기능을 전에 어플리케이션이서 처리하는데도 관련된다.  
  
# participants

* Client
    * Receiver객체와 관련이 있다.
    * code: run
* Receiver
    * 커맨드와 어떻게 연관된 동작을 수행할지 알고 있다.
    * code: Calculator
* Command
    * 일어난 동작 정보를 유지한다.
    * code: Command
* Invoker
    * 이 코드에서 user가 버튼을 누르는 동작이다.
    * code: 요청을 수행하도록 요청한다.(calculator의 execute, undo 함수)

# Sample Code 설명

* 여기 4가지 기본 덧셈, 뺄셈, 곱하기, 나누기 계산기 어플리케이션이 있다.
* 각 동작들은 Command 각체에 캡슐화 되어 있다.

* 계산기는 명령스택을 유지 관리한다.
* 각 동작되어진 새로운 명령은 stack에 push 된다.
* 되돌리기 명령이 요청되면 간단하게 stack의 마지막 명령이 pop/수행돼 동작을 되돌린다.
  
* 자바스크립트의 function객체는 native command object이다.
* function이 하나의 객체처럼 pass된다.
  
# 추가 나의 분석

* Calculator 객체에 대해서
    * POINT1: 계산기 command pattern 에서 현재 값과 연산 기능이 포함된 Command 객체를 stack 자료 형태로 보관
* Calculator execute에 대해서
    * POINT1-1: execute하면 수행한 결과값, 수행한 Command 객체를 commands 배열에 stack 자료형태로 보관
* Calculator undo(실행취소)에 대해서
    * POINT2: Command 객체 생성시 두번째 param에 undo function을 넣어준다.
    * POINT2-1: undo를 하게 되면 Calculator 객체의 command stack에서 마지막에 연산된 객체를 pop해서 pop한 객체의 undo 수행한다.

# CODE

```js
    var log = (function () {
      var log = '';
      return {
        add: function (msg) { log += msg + '\n' },
        show: function () { console.log(log + '\n'); log = ''; },
      }
    })();

    function add(x, y) { return x + y; }
    function sub(x, y) { return x - y; }
    function mul(x, y) { return x * y; }
    function div(x, y) { return x / y; }

    // Command 역할
    // POINT2: Command 객체 생성시 두번째 param에 undo function을 넣어준다.
    var Command = function (execute, undo, value) {
      this.execute = execute;
      this.undo = undo;
      this.value = value;
    }
    var AddCommand = function (value) {
      return new Command(add, sub, value);
    };
    var SubCommand = function (value) {
      return new Command(sub, add, value);
    };
    var MulCommand = function (value) {
      return new Command(mul, div, value);
    };
    var DivCommand = function (value) {
      return new Command(div, mul, value);
    };


    // Receiver 역할
    var Calculator = function () {
      // current: 계산 할 값에 대한 value
      // command: execute시 수행한 연산 stack으로 보관
      // POINT1
      var current = 0;
      var commands = [];

      function action(command) {
        var operationName = command.execute.toString().substr(9, 3);  // function name을 구하기 위해서
        return operationName.charAt(0).toUpperCase() + operationName.slice(1);
      }

      return {
        // POINT1-1: execute하면 수행한 결과값, 수행한 Command 객체를 commands 배열에 stack 자료형태로 보관
        execute: function (command) {
          // command.execute = 연산함수(각 연산 Command객체에서 -AddCommand, SubCommand, MulCommand, DivCommand- 수행 할 )
          current = command.execute(current, command.value);
          commands.push(command);

          log.add("Command Execute: " + action(command) + ", command value: " + command.value + ", current value: " + this.getCurrentValue());
        },

        // POINT2-1: undo를 하게 되면 Calculator 객체의 command stack에서 마지막에 연산된 객체를 pop해서 pop한 객체의 undo 수행한다.
        undo: function () {
          var command = commands.pop();
          current = command.undo(current, command.value);

          log.add("Command Undo: " + action(command) + ", command value: " + command.value + ", current value: " + this.getCurrentValue());
        },

        getCurrentValue: function () {
          return current;
        }
      }
    }

    function run() {
      var calculator = new Calculator();
      /*
        # Invoker 역할
          * execute, undo
      */
      // issue commands
      calculator.execute(new AddCommand(100));
      calculator.execute(new SubCommand(24));
      calculator.execute(new MulCommand(6));
      calculator.execute(new DivCommand(2));
      log.show();

      //reverse last two commands
      calculator.undo();
      log.add('Value: ' + calculator.getCurrentValue());
      log.show();

      calculator.undo();
      log.add('Value: ' + calculator.getCurrentValue());
      log.show();
    }


    run()
```
