---
title: dynamicProgramming_문자열인터리빙확인문제
date: 2020-09-30
category: Algorithm
author: jyoon
tags:
  - Algorithm
  - dynamicProgramming
  - 다이내믹프로그래밍완전정복실전문제
---

# 문제

주어진 두 문자(str1, str2)가 순서를 유지하고 섞었을때 str3이 되는가?

# 해결 방법

상향식 방법으로 str1, str2 길이만큼 순회하면서 str3와 비교하면서 아래 4가지 조건을 확인하며 각 셀마다 인터리빙이 되는지 확인한다.

1. str1 != str3 && str2 != str3 => false;
2. str1 == str3 && str2 != str3 => 위쪽 셀 값과 같다.

   - str1은 행열의 행(가로)으로 아래 code에서 변수 i 인덱스로 이동

3. str1 != str3 && str2 == str3 => 왼쪽 셀 값과 같다.

   - str2는 행열의 열(세로)로 아래 code에서 변수 j 인덱스로 이동

4. str1 == str3 && str2 == str3 => 왼쪽 또는 위쪽 셀값 중 하나라도 true 이면 true이다.

# CODE

```js
function isInterleaving(str1, str2, str3) {
  // str1, str2, str3의 문자열 길이를 구한다.

  var str1Len = str1.length
  var str2Len = str2.length
  var str3Len = str3.length

  // A와 B 문자열의 길이의 합이 C 문자열의 길이와 다를때
  if (str3Len != str1Len + str2Len) {
    return false
  }

  // 인터리빙 여부를 저장하는 2차원 배열
  var ilMatrix = Array(str1Len + 1)
    .fill(true)
    .map(v => Array(str2Len + 1).fill(true))

  ilMatrix[0][0] = true // (0,0)은 true

  // 첫번째 열을 채운다.
  for (let i = 1; i <= str1Len; i++) {
    if (str1[i - 1] != str3[i - 1]) {
      ilMatrix[i][0] = false
    } else {
      ilMatrix[i][0] = ilMatrix[i - 1][0]
    }
  }

  // 첫번째 행을 채운다.
  for (let j = 1; j <= str2Len; j++) {
    if (str2[j - 1] != str3[j - 1]) {
      ilMatrix[0][j] = false
    } else {
      ilMatrix[0][j] = ilMatrix[0][j - 1]
    }
  }

  // 나머지 셀을 채운다.
  // str1은 열(|)
  // str2는 행(-)
  for (var i = 1; i <= str1Len; i++) {
    for (var j = 1; j <= str2Len; j++) {
      //현재의 셀 str1, str2, str3의 글자
      var currentStr1 = str1[i - 1] // i번째 글자
      var currentStr2 = str2[j - 1] // j번째 글자
      var currentStr3 = str3[i + j - 1] //i+j번째 글자

      if (currentStr1 == currentStr3 && currentStr2 != currentStr3) {
        // str3의 글자가 str1의 글자와 같고 str2의 글자와 다를 때
        // str1과 str3가 같으니 이전 i(행-세로)을 i에 대입
        ilMatrix[i][j] = ilMatrix[i - 1][j]
      } else if (currentStr1 != currentStr3 && currentStr2 == currentStr3) {
        // str3의 글자가 str2의 글자와 같고 str1의 글자와 다를 때
        // str2과 str3가 같으니 이전 j(열-가로)을 j에 대입
        ilMatrix[i][j] = ilMatrix[i][j - 1]
      } else if (currentStr1 == currentStr3 && currentStr2 == currentStr3) {
        // str1, str2, str3 글자 모두 가 같을 때
        // 둘중 하나라도 true이면 true
        ilMatrix[i][j] = ilMatrix[i - 1][j] || ilMatrix[i][j - 1]
      } else {
        // C의 글자가 A, B 두 글자 어느쪽과도 다를 때
        ilMatrix[i][j] = false
      }
    }
  }
  return ilMatrix[str1Len][str2Len]
}

var str1 = "bcc"
var str2 = "bbca"
var str3 = "bbcbcac"

console.log(isInterleaving(str1, str2, str3))
```

# 2중 반복문 이후 최종 ilMatrix 배열(상향식 접근방법)

str1 = "bcc"
str2 = "bbca"
str3 = "bbcbcac"

```
    |           b     b      c      a
  ----------------------------------------
    | [true , true , true , true , false]
  b | [true , true , false, true , false]
  c | [false, true , true , true , true ]
  c | [false, false, true , false, true ]


```

- ilMatrix[0][3] 의미

  - str2의 bbc까지 문자열로 str3문자열을 만들 수 있어 true

- ilMatrix[2][3] 의미

  - str1의 bc, str2의 bbc까지 문자열로 str3문자열의 5번째 문자열까지(bbcbc)를 만들 수 있어 true
