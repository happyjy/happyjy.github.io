---
title: STUDY LIST
date: 2021-12-31
author: jyoon
category: studyList
tags:
  - studyList
---

# spread operator

- object, array 객체를 "새로운 메모리"에 복사본을 만든다.
- spread operator 복사된 객체가 nested된 객체와 그렇지 않는 객체에 따라서 copy 방법이 다르다.
    - spread operator가 nested 객체가 아닌경우 copy 방법은?
        - "deep copy"
    - spread operator가 nested 객체인 경우 copy 방법은?
        - 최상위 데이터는 "deep copy"
        - 하위 "nested property data"는 "shallow copy"를 한다.

    ```tsx
    /* 
     # 메모리 공유에 대한 확인 2가지 
      [확인1] nested 아닌 프로퍼티 변경
      [확인2] nested 프로퍼티 변경
    */

    var obj1 = {
        id: 1,
      a: {
           nestedA: "AAA"
        },
    }
    var obj2 = {...obj1}
    // POINT
    console.log(obj1 === obj2) // false; // 서로 다른 메모리 영역임을 확인
    console.log(obj1.a.nestedA === obj2.a.nestedA) // true; 같은 메모리 영역을 참조하고 있다.
    ```

- [확인]1. nested 아닌 프로퍼티 변경

    ```tsx
    // [확인]1. nested 아닌 프로퍼티 변경
    obj2.id = 2
    console.log({obj1, obj2}); // obj1, obj2는 copy를 통해서 값이 공유 x
    /*
     obj1: {id: 1, a: {nestedA: "AAA"}}  // POINT
     obj2: {id: 2, a: {nestedA: "AAA"}}  // POINT
    */
    ```

- [확인2] nested 프로퍼티 변경

    ```tsx
    // [확인2] nested 프로퍼티 변경
    /*
     # obj1만 nested property(a.nestedA)를 변경했을때  
      - obj1, obj2 모두 "a.nestedA" 프로퍼티가 변경 됐다. 
    */

    obj1.a.nestedA = 'newAAA'
    console.log({obj1, obj2}); // obj1, obj2는 같은 메모리를 참조하고 있다.
    /*
     obj1: {id: 1, a: {nestedA: "newAAA"}}  // POINT
     obj2: {id: 2, a: {nestedA: "newAAA"}}  // POINT
    */
    ```

- [추가확인] nested 객체 deep copy하는 방법은 ?

    ```tsx
    obj1.a = {...obj2.a}

    obj2.a.nestedA = 'deepCopyAAA'
    console.log({obj1, obj2})
    /*
     obj1: {id: 1, a: {nestedA: "newAAA"}}
     obj2: {id: 2, a: {nestedA: "deepCopyAAA"}} // POINT
    */

    ```

[https://medium.com/@kevinlai76/the-spread-operator-deep-and-shallow-copies-d193ac9b58bf#:~:text=The spread operator makes deep,copy of the nested data](https://medium.com/@kevinlai76/the-spread-operator-deep-and-shallow-copies-d193ac9b58bf#:~:text=The%20spread%20operator%20makes%20deep,copy%20of%20the%20nested%20data).

# deep, shallow copy?

- deep copy란?
    - 메모리를 다른 곳을 사용하기 때문에 접근이 불가능하다.
    - 그래서 값을 변경하면 "원래객체, 복사된객체" 모두 변경된다.
- shallow copy란?
    - 값을 복사할때 같음 메모리를 참조 하기 때문에 접근이 가능하다.
    - 그래서 값을 변경하면 원래객체, 복사된객체가 모두 변경된다.

- [?] [Symbol.iterator]
