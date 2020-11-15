---
title: BehavioralPattern_03.Interpreter
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Interpreter
  - DesignPattern
  - BehavioralPattern
  - JavaScript
---

# def
[POINT2] 인터프리터 패턴은 최종사용자가 그들의 솔루션을 customize할 수 있는 스크립트 언어를 제공한다.  

어떤 어플리케이션들은 고급된 구성이 필요하는 굉장히 복잡하다.  
최종 사용자가 간단한 명령을 통해 어플리케이션을 조작 할 수 있는 기본 스크립팅 언어를 제공한다.  
인터프리터 패턴은 간단한 스크립팅 언어를 만드는 문제를 해결한다.  
    
[POINT3] tree 배열에 대해서   
특정 타입 문제는 언어에 의해서 특성화된다.   
이 언어는 잘 이해 되어야 한고 잘 정의된 문제영역을 설명한다.  
이것을 구현 하려면 언어를 문법에 매핑해야 한다.  
문법은 계층적 tree 구조 이다.  
(계층적 tree구조란? literal이라고도 불리는 여러 단계를 걸치는 단계 마침내 terminal node에 도달하는)  
  
문법으로 표현되는 이와 같은 문제는 인터프리터 디자인 패턴을 사용하여 구현할 수 있다.  

자바스크립트에서 이런 유형의 제어가 정말 필요로한 경우 ANTLR과 같은 코드 생성기를 사용하면   
제공하는 문법을 기반으로 자신만의 명령 인터프리터를 구축하는 것이 더 쉬울 것이다.

# participants
  * Client 
    - 문법을 나타내는 구문 트리를 빌드, 제공한다.
    - 초기 컨텍스트를 설정한다.
    - 해석 작업을 동작시킨다.
    - 구현코드: run()
  * Context 
    - 상태 정보를 해석하기 위해서 가지고 있다. 
    - 구현코드: Context
  * TerminalExpression 
    - 터미널 기호와 관련된 해석 작업을 구현한다.
    - 문장의 각 터미널 표현식에 대해 하나의 인스턴스이다.
    - 구현코드: Expression
  * NonTerminalExpression 
    - 미사용 문법에서 터미널이 아닌 기호와 관련된 해석 작업을 구현한다.
    - 구현코드: not used

# Sample Code 설명
  * 샘플예제는 로마숫자를 10진수로 해석하기 위한 인터프리터를 만든것이다.

  * [POINT1] 
    * Context 객체는 input(로마숫자)그리고 인터프리터에서 해석된 결과 output.
    * 표현 객체는 문법트리에 있는 각 노드를 대표한다.
    * 이것들은 인터프리터 함수를 도와준다.
  
  * [POINT2] 프로그램이 동작할때 로마 숫자를 십진수 숫자로 변환하는 간단한 문법 트리는 만들어진다.

# 나의 해석
```
  1. run함수 
    1.1 Context객체
      * 역할
        - Context객체에 로마 숫자를 넣고 interpret를 순환하면서 input, output를 관리한다.
    1.1 tree 배열
      * 역할
        - 로마 숫자를 해석할 Expression 객체의 배열 집합
    1.2 tree 배열 순회 && interpret
      * 역할 
        - 로마숫자를 번역하기 위해서 생성한 규칙 배열 집합 tree의 Expression 객체의 interpret 객체를 Context객체를 인자로 설정한뒤 호출한다.
        
  2. Expression 
    2.1 Expression 객체 
      * 역할 
        - 로마 숫자를 해석하기 위해 규칙을 만들기 위한 문법 객체
    2.2 interpret 함수
      * 역할 
        - 로마숫자의 상태를 관리하는 context객체를 인자로 받아 
        - 현재 input의 첫 글자를 순차 적으로 확인하며 context의 input, output 프로퍼티들을 update하며 해석해나간다.

  * Expression 객체 ?
    - tree에 push 하는 4개 Expression객체는 로마 숫자를 10진수로 변환하는 규칙 1

  * Expression.interpret? 
    - Expression객체를 10진수로 변환하는 규칙 2

  * Roman Numberals
    - https://roman-numerals.info/MCMXXVIII#:~:text=Roman%20Numerals%3A%20MCMXXVIII%20%3D%201928
```

# CODE 
```js
// # POINT1
// Context 역할
// : 상태정보를 해석하기 위해서 가지고 있다.
var Context = function (input) {
  this.input = input;
  this.output = 0;
}
Context.prototype = {
  startsWith: function (str) {
    return this.input.substr(0, str.length) === str;
  }
}

// TerminalExpression 역할
var Expression = function (name, one, four, five, nine, multiplier) {
  this.name = name;
  this.one = one;
  this.four = four;
  this.five = five;
  this.nine = nine;
  this.multiplier = multiplier;
}
Expression.prototype = {
  // context parameter: Context 인스턴스
  // context.ouput: 로마숫자를 해석한 십진수 숫자
  // context.input: 주어진 로마 숫자를 해석하고 해석된 로마 숫자를 제거된 로마 숫자 관리
  interpret: function (context) {
    if (context.input.length == 0) {
      return;
    } else if (context.startsWith(this.nine)) {
      context.output += (9 * this.multiplier);
      context.input = context.input.substr(2);
    } else if (context.startsWith(this.four)) {
      context.output += (4 * this.multiplier);
      context.input = context.input.substr(2);
    } else if (context.startsWith(this.five)) {
      context.output += (5 * this.multiplier);
      context.input = context.input.substr(1);
    }
    while (context.startsWith(this.one)) {
      context.output += (1 * this.multiplier);
      context.input = context.input.substr(1);
    }
  }
}

function run() {
  // var roman = "MCMXXVIII";  //1928
  var roman = "MCMLXXII";  //1972
  // var roman = "XXXVI" // 36

  var context = new Context(roman);
  var tree = [];

  // POINT2
  // 문법을 나타내는 구문 트리를 빌드, 제공한다.
  tree.push(new Expression("thousand", "M", " ", " ", " ", 1000));
  tree.push(new Expression("hundred", "C", "CD", "D", "CM", 100));
  tree.push(new Expression("ten", "X", "XL", "L", "XC", 10));
  tree.push(new Expression("one", "I", "IV", "V", "IX", 1));


  for (var i = 0, len = tree.length; i < len; i++) {
    // POINT3
    tree[i].interpret(context);
  }

  console.log(`${roman} = ${context.output}`);
}

run();
```