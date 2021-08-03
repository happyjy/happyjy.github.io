---
title: 다이나믹프로그래밍완전정복실전문제분석_dynamicProgramming_직사각형에서총경로수구하기
date: 2020-09-30
category: Algorithm
author: jyoon
tags:
  - Algorithm
  - dynamicProgramming
  - 다이내믹프로그래밍완전정복실전문제
---

# 문제

- M X N개의 방으로 구성된 직사각형이 있을 때 좌상단 방에서 우하단 방까지 이동하는 모든 경로의 수를 구한다.
- 단 이동은 오른쪽, 아래 방향으로만 이동가능

# 해결 방법

- 2차원 배열 arr[][]을 캐시로 사용.
- 방(m, n)은 다은 두방에서 접근이 가능

    1. 바로 위방 방: 방(m-1, n)
    2. 바로 왼쪽 방: 방(m, n-1)

- arr[2][3]에 도달 할 수 있는 방법은 위, 왼쪽도달 방법을 더한 값과 같다.
    - arr[1][3] + arr[2][2]

- 재귀 호출 종료 조건으로 설명과 반대고 첫행, 첫열을 채운다.
    - arr[i][0](행), arr[0][j](열)
- 나머지 셀 채우는 방법
    - arr[i][j] = arr[i-1][j] + arr[i][j-1]

# CODE

```js
function numOfPaths(m, n) {
  var cache = Array(m).map(v => Array(n))

  //# step1: 첫번째 행, 열
  for (var i = 0; i < m; i++) {
    cache[i][0] = 1
  }
  for (var j = 0; j < n; j++) {
    cache[0][j] = 1
  }

  
  //# step2: 나머지 셀 
  for (var i = 1; i < m; i++) {
    for (var i = 1; i < m; i++) {
      cache[i][j] = cache[i - 1][j] + cache[i][j - 1] // cache[i][j]기준 위 셀 + cache[i][j]기준 왼쪽 셀
    }
  }

  return cache[m - 1][n - 1]
}

console.log(numOfPaths(2, 3))
```

# 2중 반복문 이후 최종 cache 배열(상향식 접근방법)

numOfPaths(2, 3) 호출이후 cache 배열의 변화 과정

```
# step1
[1, 1, 1, 1]
[1, 0, 0, 0]
[1, 0, 0, 0]

# step2
[1, 1, 1,  1]
[1, 2, 3,  4]
[1, 3, 6, 10]
```
