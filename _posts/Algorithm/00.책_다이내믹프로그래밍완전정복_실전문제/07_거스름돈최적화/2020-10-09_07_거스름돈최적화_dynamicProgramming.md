---
title: 다이나믹프로그래밍완전정복실전문제분석_dynamicProgramming_거스름돈최적화
date: 2020-10-08
category: Algorithm
author: jyoon
tags:
  - Algorithm
  - dynamicProgramming
  - 탐욕알고리즘
  - 다이내믹프로그래밍완전정복실전문제
---

# 문제

105원을 50원, 10원, 5원, 1원 4개 동전으로 최소한의 동전으로 거스를수 있는 방법 구하기

# 해결 방법

* 재귀 호출을 사용할 때 와 비슷한 방법으로 다이내믹 프로그래밍을 사용할수 있다.  
* 다른 점은 작은 액수부터 큰 액수의 방향으로 구해나간다는 점

* 제일아래 "call stack tree(상향식 접근방법)" 예를 든것을 확인하면 이해하기 쉽다.

# CODE

```js
function minCoins(coin, N, C) {
  // # POINT1
  //  * resultArray[i]에는 i원을 거슬러줄 때 필요한 최소 동전의 개수를 저장
  //  * 마지막에 resultArr[C]를 반환합니다.

  // 최솟값을 구하기 위해 resultArr의 모든 값을 매우 큰 값으로 초기화
  var maxNum = Number.MAX_SAFE_INTEGER;
  var resultArr = Array(C + 1).fill(maxNum);

  // C = 0일 때
  resultArr[0] = 0;
  /*
    * C: 거슬러줄 금액
    * N: 동전 종류
    */
  for (var i = 1; i <= C; i++) {
    for (var j = 0; j < N; j++) {
      // # POINT2
      // 현재 구하려는 금액보다 같거나, 작은 액면가의 동전에 대해서만 검사
      if (coin[j] <= i) {
        // i: 현재 거슬러야할 "거스름돈"
        // coin[j]: 가지고 있는 "코인종류"
        // resultArr[i - coin[j]]: 거슬러야할 거스름돈에서 가지고 있는 코인을 빼고난뒤 "코인갯수"
        var temp = resultArr[i - coin[j]];

        // # POINT3 - 거슬러야할 "거스름돈"을 동전으로줄때 최소 동전을 구하기 위한 로직
        // # POINT4 - coin 배열이 내림차 순이어야지 가능한 알고리즘
        if (temp != maxNum && temp + 1 < resultArr[i]) {
          resultArr[i] = temp + 1;
        }
      }
    }
  }

  return resultArr[C];
}

var coin = [50, 10, 5, 1];
var N = coin.length;
var C = 106;

console.log(minCoins(coin, N, C));
```

# code ONLY

```js
function minCoins(coin, N = coin.length, C) {
  var maxNum = Number.MAX_SAFE_INTEGER;
  var resultArr = Array(C + 1).fill(maxNum);

  resultArr[0] = 0;

  for (var i = 0; i <= C; i++) {
    for (var j = 0; j < N; j++) {
      if (coin[j] <= i) {
        var temp = resultArr[i - coin[j]];

        if (temp < resultArr[i]) {
          resultArr[i] = temp + 1;
        }
      }
    }
  }

  return resultArr[C];
}
```

# call stack tree(상향식 접근방법)

* 예, i=5인 경우(거슬러야할 금액이 5원인 경우)

    * resultArr[i]: 거스름돈 i원의 최소 거스름돈 동전 개수
    * _temp: resultArr[i]를 구하기 위한 temporary 변수(동전 종류를 순회하면서 temp가 결정 됨)_
    * coin = [50,10,5,1]

* coin 배열에서 50원, 10원 요소값인 경우 (coin[j] -> 50, 10)
    * 거슬러야할 금액 5원 보다 큼으로 부적합( 5원, 1원 가능)
* coin 배열에서 5원, 1원 요소값인 경우 (coin[j] -> 5, 1)
    * j=2, coin[j] = 5원  
        * temp = resultArr[5-5] = 0  => "거스름돈 0원까지 필요한 최소 거스름 코인 갯수"
        * _5원으로 거스름돈 5원을 0원으로 만들었을때 "거스름돈 동전 개수 1개"_
        * resultArr[5] = 0(temp) + 1 = 1;
    * j=3, coin[j] = 1원  
        * temp = resultArr[5-1] = 4 => "거스름돈 4원까지 필요한 최소 거스름 코인 갯수"
        * _1원으로 거스름돈 5원을 4원으로 만들었을때 "거스름돈 동전 개수 4개"_
        * resultArr[5] = 4(temp) + 1 = 5;

![](./img/07_거스름돈최적화_dynamicProgramming.png)
