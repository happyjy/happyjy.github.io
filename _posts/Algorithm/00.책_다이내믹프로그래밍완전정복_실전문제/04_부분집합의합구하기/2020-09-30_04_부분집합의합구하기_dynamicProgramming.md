---
title: dynamicProgramming_부분집합의합구하기
date: 2020-09-30
category: Algorithm
author: jyoon
tags:
  - Algorithm
  - dynamicProgramming
  - 다이내믹프로그래밍완전정복실전문제
---

# 문제

- 0과 양의 정수로 이루어진 집합이 있고 또 다른 양의 정수 X가 있다.
- 주어진 집합의 부분집합중에 원소의 합이 X인 부분집합이 존재하는지 검사를 하는 함수
- 예로 집합 {3,2,7,1}이고 X가 6인 경우, 한 부분집합 {3,2,1}의 원소의 합이 6이므로 이 함수는 참을 반환해야 한다.

# 해결 방법

셀을 채우는 조건

```
  조건1. 바로 위쪽 셀, 즐 셀(i-1, j)가 T면 셀(i,j)도 T 입니다.
  부분집합에 v를 포함하지 않고도 T가 되기 때문입니다.
  예를 들어 (0,3)이 T이므로 (1,3)역시 T입니다.

  조건2. 그 밖의 경우 (i-1, j-v) 셀의 값을 (i, j)로 복사한다.

  조건3. 3번째 행값 7은 합 6을 만드는데 소용이 없다.
```

# CODE

```js
function isSubsetSum(arr, n, X) {
  // 합이 X인 부분집합이 존재하는지의 결과를 저장해둘 2차원 배열
  // subsum[i][j]는 arr[0...i-1]의 부분집합 중에 합이 j인
  // 부분집합이 있으면 true입니다.
  var subsum = Array(n)
    .fill(undefined)
    .map(v => Array(X + 1).fill(undefined))

  // 첫 번째 열은 항상 참
  for (var i = 0; i < n; i++) {
    subsum[i][0] = true
  }

  // 조건1. 첫번째 행은 j가 0 또는 arr[0]인 경우만 참
  for (var j = 1; j <= X; j++) {
    if (arr[0] == j) {
      subsum[0][j] = true
    } else {
      subsum[0][j] = false
    }
  }

  // 조건2,3에 따라 나머지 셀을 채운다.
  for (var i = 1; i < n; i++) {
    var v = arr[i]
    for (var j = 1; j <= X; j++) {
      if (j < v) {
        // 조건3
        subsum[i][j] = subsum[i - 1][j]
      } else if (subsum[i - 1][j]) {
        subsum[i][j] = true
      } else {
        // 조건2
        subsum[i][j] = subsum[i - 1][j - v]
      }
    }
  }

  return subsum[n - 1][X]
}

var arr = [3, 2, 7, 1]
console.log(isSubsetSum(arr, arr.length, 6))
```

# 2중 반복문 이후 최종 subsum 배열(상향식 접근방법)

```
  |    0      1      2      3      4      5      6
-----------------------------------------------------
3 | [true, false, false, true , false, false, false]
2 | [true, false, true , true , false, true , false]
7 | [true, false, true , true , false, true , false]
1 | [true, true , true , true , true , true , true ]
```
