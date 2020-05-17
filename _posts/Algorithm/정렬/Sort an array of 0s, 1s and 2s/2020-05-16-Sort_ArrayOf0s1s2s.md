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

## 방법1 
* index 값 3개 이용 해결( i, lowestIdx, hightestIdx)를 이용해서 해결
* index별 증가 케이스
  * i: 0,1일때 증가
  * lowestIdx: 0일때만 증가
  * hightestIdx: 2일때만 증가

## 방법2 
* 0,1,2개수를 세고 차례대로 숫자별 세어진 개수별로 반복하며 새 배열을 만든다. 



# 방법1 - CODE
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

## CODE1 - 수행과정
``` js
  * 3가지 index
  i: i
  l: lowestIdx
  h: highestIdx

  * index 이동별 action/array
    - iteration이 끝난 상태 기준으로 작성
  1. i=0, h=5
   i,l                h         : i-0, l-0, h-5 => arr[i]=0 -> index i(0), lowestIdx(0) 교환 -> arr 값 변경 없음
  [0, 1, 2, 1, 2, 2]
       i,l            h         : i-1, l-1, h-5
  [0, 1, 2, 1, 2, 2]


  2. i=1, h=5
       i,l            h         : i-1, l-1, h-5 => arr[i]=1 -> no Action
  [0, 1, 2, 1, 2, 2]
        l   i         h         : i-2, l-1, h-5
  [0, 1, 2, 1, 2, 2]


  3. i=2, h=5
        l  i          h        : i-2, l-1, h-5 => arr[i]=2 -> index i(2), highestIdx(2) 교환
  [0, 1, 2, 1, 2, 2]
        l  i      h            : i-2, l-1, h-4 => 교환결과(배열 요소가 같아서 값 자체는 변경 없음)
  [0, 1, 2, 1, 2, 2]


  4. i=2, h=4
        l   i     h          : i-2, l-1, h-4 => arr[i]=2 -> index i(2), highestIdx(2) 교환
  [0, 1, 2, 1, 2, 2]
        l   i  h             : i-2, l-1, h-3 => 교환결과(배열 요소가 같아서 값 자체는 변경 없음)
  [0, 1, 2, 1, 2, 2]


  5. i=2, h=3
        l   i  h             : i-2, l-1, h-3 => arr[i]=2 -> index i(2), highestIdx(1) 교환
  [0, 1, 2, 1, 2, 2]
        l i,h                : i-2, l-1, h-2 => 교환결과(i < h 조건이 안됨으로 while문 종료)
  [0, 1, 1, 2, 2, 2]
```

# 방법2 - CODE
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