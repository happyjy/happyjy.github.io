---
title: 다이나믹프로그래밍완전정복실전문제분석_dynamicProgramming_부분집합의합구하기
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

- 셀을 채우는 조건
- 블로그 제일 아래 subsum 배열의 조건과 값을 비교해볼 수 있다.

```
  조건0. 첫번째 열은 true

  조건1. 바로 위쪽 셀, 즉 셀(i-1, j)가 T면 셀(i,j)도 T 입니다.
        부분집합에 v를 포함하지 않고도 T가 되기 때문입니다.
        예를 들어 (0,3)이 T이므로 (1,3)역시 T입니다.

  조건2. 3번째 행값 7은 합 6을 만드는데 소용이 없다.
  조건3. 같은열 윗 행이 true이면  
         현재 만들려고하는 합이 이전행에서 이미 성공했으므로  
         현재 집합의 원소로 만들 수 있는 값이다.  
         * 예를 들어 제일 아래 subsum(2,2)의 배열을 보면  
            2행의 집합 원소값은 7이다. 그리고 만들수 있는 값이 2임을 확인하는데  
            7로 2를 만들 수 없다.  
            그러나, 1번째 행 집합원소값은 2일때 2를 만들 수 있다. 그래서 참이다.
  조건4. 그 밖의 경우 (i-1, j-v) 셀의 값을 (i, j)로 복사한다.
```

# CODE + 해석

```js
function isSubsetSum(arr, n, X) {
  // * subsum
  //   - 합이 X인 부분집합이 존재하는지의 결과를 저장해둘 2차원 배열
  // * subsum[i]
  //   - 집합의 원소에 접근할 index
  // * subsum[i][j]
  //   - arr[0...i-1]의 부분집합 중에 합이 j인
  // 부분집합이 있으면 true입니다.
  var subsum = Array(n)
    .fill(undefined)
    .map(v => Array(X + 1).fill(undefined))

  // 첫 번째 열은 항상 참
  // 의미는 집합으로 만들 수 있는 값이 0은 항상 true라는 의미
  // 조건0. 첫번째 열은 true
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

  // 조건2,3, 4에 따라 나머지 셀을 채운다.
  for (var i = 1; i < n; i++) {
    var v = arr[i]  //highlight-line
    for (var j = 1; j <= X; j++) {
      if (j < v) {
        // 조건2
        subsum[i][j] = subsum[i - 1][j] //highlight-line
      } else if (subsum[i - 1][j]) {
        // 조건3
        subsum[i][j] = true //highlight-line  // subsum[i - 1][j] = true;
      } else {
        // 조건4
        // * j: 집합으로 만들려고 하는 숫자
        // * v: 집합 원소 
        // * subsum[i - 1][j - v]: 
        //    이전행에서(subsum[i - 1]), 
        //    집합으로 만들려고하는 숫자에서 지금 선택된 집합을 뺀 값이 어땟니?
        subsum[i][j] = subsum[i - 1][j - v] //highlight-line
      }
    }
  }

  return subsum[n - 1][X]
}

var arr = [3, 2, 7, 1]
console.log(isSubsetSum(arr, arr.length, 6))
```

# CODE ONLY

```JS
function isSubsetSum(arr, n, X) {
  var subsum = Array(n)
    .fill(undefined)
    .map((v) => Array(X + 1).fill(undefined));

  for (var i = 0; i < n; i++) {
    subsum[i][0] = true;
  }

  for (var j = 1; j <= X; j++) {
    if (arr[0] === j) {
      subsum[0][j] = true;
    } else {
      subsum[0][i] = false;
    }
  }

  for (var i = 1; i < n; i++) {
    var v = arr[i];
    for (var j = 1; j <= X; j++) {
      if (j < v) {
        subsum[i][j] = subsum[i - 1][j];
      } else if (subsum[i - 1][j]) {
        subsum[i][j] = true;
      } else {
        subsum[i][j] = subsum[i - 1][j - v];
      }
    }
  }
}

var arr = [3, 2, 7, 1];
console.log(isSubsetSum(arr, arr.length, 6));
```

# 2중 반복문 이후 최종 subsum 배열(상향식 접근방법)

- 행(0~3): 집합에 접근할 index
- 열(0~6): 집합 원소로 만들 수 있는 숫자 여부를 확인할 숫자
- 셀값: 집합의 원소로 만들 수 있는 숫자 여부

- subsum(1,5) 분석
    - arr의 원소 배열 인덱스 0,1에 접근하면 3,2의 값이다.
    - 3,2의 값을 사용해서 5를 만들 수 있어 "T" 이다.

- arr = [3,2,7,1]

```
             |  0  1  2  3  4  5  6
-------------------------------------
0 (arr[0]=3) | [T, F, F, T, F, F, F]
1 (arr[1]=2) | [T, F, T, T, F, T, F]
2 (arr[2]=7) | [T, F, T, T, F, T, F]
3 (arr[3]=1) | [T, T, T, T, T, T, T]
```

```
["조건0", "조건1", "조건1", "조건1", "조건1", "조건1", "조건1"]
["조건0", "조건2", "조건4", "조건3", "조건4", "조건4", "조건4"]
["조건0", "조건2", "조건2", "조건2", "조건2", "조건2", "조건2"]
["조건0", "조건4", "조건3", "조건3", "조건4", "조건3", "조건4"]
```
