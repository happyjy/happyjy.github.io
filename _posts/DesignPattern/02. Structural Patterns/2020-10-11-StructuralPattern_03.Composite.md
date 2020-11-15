---
title: StructuralPattern_03.Composite
date: 2020-10-11
author: jyoon
category: DesignPattern
tags:
  - Composite
  - DesignPattern
  - StructuralPattern
  - JavaScript
---

# def
collection의 각 item들은 다른 collection을 nested 구조로 가질 수 있다.   

트리 구조 는 Composite pattern의 완벽한 예다.   
트리의 각 노드는 leaf node subtree of node를 포함한다.  

Composite 패턴의 모든 노드는 개별 객체와 객체 collection 지원하는 공통 속성 및 메서드 집합을 공유한다.   
이 공통 인터페이스는 Composite 컬렉션의 각 객체를 반복하는 재귀 알고리즘의 설계, 구성을 용이한다.  

# Participants
* Components
  - Composition 안에서 객체를위해서 선언된 인터페이스 
  - code: Node
* Leaf
  - 자식을 갖지 않은 Leaf node
  - code: Node
* Compositie
  - composition 안에서 branches(subtrees)객체를 가르킨다.
  - code: Node

# code 설명
* 트리 구조는 Node 객체에 의해서 생성 된것이다.
* 각 노드는 4개 메소드를 갖는다(add, remove, getChild, hasChildren)
* 4개 메서드들은 Node의 prototype에 추가 된다.
  - [POINT1] prototype에 설정하면 모든 노드들이 공유하기 때문에 메모리 필요공간을 줄일 수 있다.
* 노드는 완전히 재귀 적이며 별도의 Component 또는 Leaf 객체가 필요하지 않다.

* [POINT2] 코드에서 보이는 Composite tree는 parent nodes에 노드를 추가해서 생성된 것이다.
* 트리구조가 완성된 뒤에 각 노드를 순회 하면서 노드의 이름과 depth를 console에 찍을 것이다.


# 나의 분석
* [POINT1, 2]가 중요해 보인다.
* [POINT1] prototype의 활용
  - prototype에 함수를 설정후 설정한 함수로 인스턴스를 생성하면
  - 생성된 인스턴스에 prototype에 설정한 함수를 생성하지 않고(복사 하지 않는다)
  - 생성된 인스턴스의 생성자 함수의 prototype을 참조해 메모리를 효율적으로 사용할 수 있다. 
  - 하지만 prototype에 설정된 함수를 변경 시키면 이미 생성된 인스턴스에서도 변경된 함수를 사용할 수 있다는 것을 주의해야 겠다.(오염) 

* POINT2: Composite의 원리
  - Composite pattern은 부모 노드에 자식 노드를 추가 함으로 생성된다.
  - 부모 노드에 자식노드를 추가할떄 코드에 생성자 함수 Node에 추가된 add함수를 사용한다.

# CODE
```js
var log = (function () {
  var log = '';

  return {
    add: function (msg) { log += msg + '\n' },
    show: function () { console.log(log); log = ''; }
  }
})();

// POINT1: Node에는 Node의 이름, 자식으로 가질 배열 변수를 갖음
// Component, Leaf, Composite 역할
var Node = function (name) {
  this.children = [];
  this.name = name;
}

Node.prototype = {
  /*
    child type: Node 객체
  */
  add: function (child) {
    // POINT2: Node의 기능으로 본인이 가질 자식 노드를 children 배열에 push
    this.children.push(child);
  },

  /*
    child type: Node 객체
  */
  remove: function (child) {
    var length = this.children.length;
    for (var i = 0; i < length; i++) {
      if (this.children[i] === child) {
        this.children.splice(i, 1);
        return;
      }
    }
  },

  /*
    i: int type
  */
  getChild: function (i) {
    return this.children[i];
  },

  hasChildren: function () {
    return this.children.length > 0;
  }
}// end Node.prototype

// recursively traverse a (sub)tree
function traverse(indent, node) {
  log.add(Array(indent++).join("--") + node.name);

  for (var i = 0, len = node.children.length; i < len; i++) {
    traverse(indent, node.getChild(i));
  }
}

function run() {
  var tree = new Node("root");
  var left = new Node("left");
  var right = new Node("right");
  var leftleft = new Node("leftleft");
  var leftright = new Node("leftright");
  var rightleft = new Node("rightleft");
  var rightright = new Node("rightright");

  tree.add(left)
  tree.add(right)
  tree.remove(right) // note: remove
  tree.add(right)

  left.add(leftleft);
  left.add(leftright);

  right.add(rightleft);
  right.add(rightright);

  traverse(1, tree);

  log.show();
}

run();
```