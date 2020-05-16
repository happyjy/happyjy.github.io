---
title: 정렬_ArrayConsisting 0s,1s,2s
date: 2020-05-16
category: Algorithm
author: jyoon
tags:
  - sort
---

# 문제
Given an array A[] consisting 0s, 1s and 2s.
The task is to write a function that sorts the given array. 
The functions should put all 0s first, then all 1s and all 2s in last.

# 해결 방법
* 1. index 값 3개 이용 해결( lowestIdx, hightestIdx, i)를 이용해서 해결
* 2. 0,1,2개수를 세고 차례대로 숫자별 세어진 개수별로 반복하며 새 배열을 만든다. 

# 수행과정
``` js
  
  * 3가지 index
  l: lowestIdx
  h: highestIdx
  i: i 

  * index 이동별 action/array

  i,l                       : l-0, h-5, i-0
  [0, 1, 2, 1, 2, 2]
     i,l              h     : l-1, h-5, i-1  - index i, h 교환(2, 2) -> 변동없음
  [0, 1, 2, 1, 2, 2]
       i,l        h         : l-2, h-4, i-2  - index i, h 교환(2, 2) -> 변동없음
  [0, 1, 2, 1, 2, 2]
           i   h            : l-2, h-3, i-2  - index i, h 교환(2, 1) -> [0, 1, 1, 2, 2, 2]
  [0, 1, 2, 1, 2, 2]
            i,l             : l-2, h-2, i-2
  [0, 1, 1, 2, 2, 2]
```

# CODE1 
```js
  function solution(arr) {
    let lowestIdx = 0;
    let highestIdx = arr.length - 1;
    let i = 0;

    while (i < highestIdx)
      if (arr[i] == 0) {
        const temp = arr[i];
        arr[i] = arr[lowestIdx];
        arr[lowestIdx] = temp;

        lowestIdx++;
        i++;
      } else if (arr[i] == 1) {
        i++;
      } else {
        const temp = arr[i];
        arr[i] = arr[highestIdx];
        arr[highestIdx] = temp;
        highestIdx--;
      }

    return arr;
  }

  console.log(solution([0, 1, 2, 1, 2, 2]));


```

# CODE2
```js
  function solution(arr) {

    let i = 0, cnt0 = 0, cnt1 = 0, cnt2 = 0;

    // Count the number of 0s, 1s and 2s in the array 
    for (i; i < arr.length - 1; i++) {
      switch (arr[i]) {
        case 0:
          cnt0++;
          break;
        case 1:
          cnt1++;
          break;
        case 2:
          cnt2++;
          break;
      }
    }

    // Update the array
    i = 0;
    // Store all the 0s in the beginning 
    while (cnt0 > 0) {
      arr[i++] = 0;
      cnt0--;
    }
    while (cnt1 > 0) {
      arr[i++] = 1;
      cnt1--;
    }
    while (cnt2 > 0) {
      arr[i++] = 2;
      cnt2--;
    }

    return arr
  }

  console.log(solution([0, 1, 2, 1, 2, 2]));
```
# REF/리뷰
* [geeksforgeek](https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/)