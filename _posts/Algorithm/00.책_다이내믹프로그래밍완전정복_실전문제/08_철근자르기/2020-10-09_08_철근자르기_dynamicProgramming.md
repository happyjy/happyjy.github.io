---
title: 다이나믹프로그래밍완전정복실전문제분석_dynamicProgramming_철근자르기
date: 2020-10-08
category: Algorithm
author: jyoon
tags:
  - Algorithm
  - dynamicProgramming
  - 다이내믹프로그래밍완전정복실전문제
---

# 문제

길이가 n인 철근이 있을 때 이 철근을 팔아서 얻을 수 있는 이익의 최댓값을 구해보자
단, 철근은 길이 1에서 길이 n까지 정수의 길이로 나눠 판매할 수 있으며 길이별 가격표가 주어진다.

# 해결 방법

```
// i: 철근 길이 1에서 N까지 계산해 증가하면서 maxValue 배열에 최대 가격 저장
for (let i = 0; i < N; i++) {
   // j: 철근 길이 i인 철근은 i길이에 해당되는 가격표까지만 필요
   // maxValue[i-j]: 철근 i길이에서 j길이를 뺏을때 철근길이의 최대가격저장배열 
  for (let j = 0; j <= i; j++) {
    maxValue[i] = Math.max(maxValue[i], value[j]+maxValue[i-j]);
  }
}
```

# CODE

```js
function maxValue(value, N) {
  let maxValues = Array(value.length).fill(0)

  // # STUDY1
  // i: 철근 길이 1에서 N까지 계산해 증가
  for (var i = 1; i <= N; i++) {
    // # STUDY1
    // j: 철근 길이 i인 철근은 i길이에 해당되는 가격표까지만 필요
    console.log(`# 철근길이 ${i} 일때 최대 가격 구하는 중 `)
    for (var j = 1; j <= i; j++) {
      // # STUDY2
      // i-j의 의미 : 원래 철근길이 i에서 길이 j만큼 자른다는 의미

      // # STUDY3
      // : i-j 길이의 최대 이익(maxValues[i - j])에 j길이 철근의 가격(value[j])을 더하면 i 길이 철근의 판매 가격을 구할 수 있다
      //    ( == value[j] + maxValues[i - j] )
      // : 모든 j에 대해서 최댓값을 취하면 길이 i인 철근을 판매할 때의 최대 이익을 구할 수 있다.
      //    ( Math.max에 대한 설명 )
      maxValues[i] = Math.max(maxValues[i], value[j] + maxValues[i - j])
    //   console.log(
    //     `Math.max(maxValues[${i}], value[${j}] + maxValues[${i} - ${j}])`
    //   )
    // }
    console.log("")
  }

  return maxValues[N]
}
var value = [0, 1, 5, 8, 9, 10, 17, 17, 20]
// console.log(maxValue(value, value.length - 1))
console.log(maxValue(value, 4))
```

# CODE console 출력 결과

```
i=1, j=1
i=2, j=1, 2
i=3, j=1, 2, 3
i=4, j=1, 2, 3, 4


maxValue[i] = Math.max(maxValue[i], value[j]+maxValue[i-j]);

maxValue[0] = 0;

// i=1, j=1
maxValue[1] = Math.max(maxValue[1], value[1]+maxValue[1-1]);

// i=2, j=1, 2
maxValue[2] = Math.max(maxValue[2], value[1]+maxValue[2-1]);
maxValue[2] = Math.max(maxValue[2], value[2]+maxValue[2-2]);

// i=3, j=1, 2, 3
maxValue[3] = Math.max(maxValue[3], value[1]+maxValue[3-1]);
maxValue[3] = Math.max(maxValue[3], value[2]+maxValue[3-2]);
maxValue[3] = Math.max(maxValue[3], value[3]+maxValue[3-3]);

// i=4, j=1, 2, 3, 4
maxValue[4] = Math.max(maxValue[4], value[1]+maxValue[4-1]);
maxValue[4] = Math.max(maxValue[4], value[2]+maxValue[4-2]);
maxValue[4] = Math.max(maxValue[4], value[4]+maxValue[4-3]);
maxValue[4] = Math.max(maxValue[4], value[5]+maxValue[4-4]);
```

# call stack tree(상향식 접근방법)

![](./img/08_철근자르기_dynamicProgramming.png)
