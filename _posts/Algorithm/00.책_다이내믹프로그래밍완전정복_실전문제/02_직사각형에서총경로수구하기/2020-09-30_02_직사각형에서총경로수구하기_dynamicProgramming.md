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

# 해결 방법

# CODE

```js
function numOfPaths(m, n) {
  var cache = Array(m).map(v => Array(n))

  for (var i = 0; i < m; i++) {
    cache[i][0] = 1
  }
  for (var j = 0; j < n; j++) {
    cache[0][j] = 1
  }

  //# step1
  // 나머지 셀
  for (var i = 1; i < m; i++) {
    for (var i = 1; i < m; i++) {
      cache[i][j] = cache[i - 1][j] + cache[i][j - 1] // cache[i][j]기준 위 셀 + cache[i][j]기준 왼쪽 셀
    }
    //# step2,3
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
[1, 1, 1, 1]
[1, 2, 3, 4]
[1, 0, 0, 0]

# step3
[1, 1, 1,  1]
[1, 2, 3,  4]
[1, 3, 6, 10]

```
