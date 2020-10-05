---
title: 문자열최소교정비용_dynamicProgramming
date: 2020-09-30
category: Algorithm
author: jyoon
tags:
  - 문자열최소교정비용
  - dynamicProgramming
---

# 문제

두 단어가 주어지며 "삽입, 삭제, 치환"을통해서 같게 만들기 위한 최소 교정 비용을 구하는 문제

# 해결 방법

1.  두글자가 같으면 교정 비용의 차이가 없으므로 대각선 방향 값을 가지고 온다.  
    (예로 'SUND', 'SATURD'의 교정 비용과 'SUN', 'SATUR'의 최소 교정 비용은 같다.)
2.  두글자가 다르면 위쪽, 왼쪽, 왼쪽 위셀의 값의 최솟값을 가져와 1을 더한다.  
    각 셀에 해당하는 문자열에 치환, 삽입, 삭제 연산을 통해서 도달한 결과

    ```
        # 'SUND', 'SATUR'의 예를 들어보자

        2.1 str1에 삭제 연산을 수행 -> 'SUN', 'SATUR'의 최소 교정 비용과 같은 값이 된다.
        2.2 양쪽 단어에 치환연산을 수행 ->  'SUN', 'SATU'의 최소 교정 비용과 같은 값이 된다.
        2.3 str에 삽입 연산을 수행 -> 'SUNDR', 'SATUR'이 되어 'SUND', 'SATU'의 최소교정비용과같은 값이된다.

        IF(str1[i-1] == str2[j-1]){
          EditD[i][j] = EditD[i-1][j-1] //1번
        } ESLE {
          EditD[i][j] = 1 + MININUM(EditD[i-1][ j ],  //2.1
                                    EditD[i-1][j-1],  //2.2
                                    EditD[ i ][j-1])  //2.3
        }
    ```

# CODE

```js
function editDistance(str, str2, m = str.length, n = str2.length) {
  var EditD = [...Array(m + 1)].map(v => Array(n + 1))

  // editD[0][m] // 맨 윗줄 0으로 초기화
  for (var j = 0; j <= n; j++) {
    EditD[0][j] = j
  }

  for (var i = 0; i <= m; i++) {
    EditD[i][0] = i
  }

  // editD[n][0] // 맨 왼쪽줄 0으로 초기화
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      if (str[i - 1] === str2[j - 1]) {
        EditD[i][j] = EditD[i - 1][j - 1]
      } else {
        EditD[i][j] =
          1 + Math.min(EditD[i][j - 1], EditD[i - 1][j], EditD[i - 1][j - 1])
      }
    }
    console.log(EditD)
    console.log("-------------------------")
  }

  return EditD[m][n]
}

const str = "SUNDAY"
const str2 = "SATURDAY"

// const str = "CAT";
// const str2 = "DOG";

// const str = "CAT";
// const str2 = "CAR";

console.log(editDistance(str, str2))
```

# 작은 예시

SUNDAY, SATURDAY/ SATURDAY, SUNDAY 두 단어의 최소 연산 과정

```
  -: 삭제, +: 삽입, @: 교환

    S     U N D A Y
      + +   @
    S A T U R D A Y


    S A T U R D A Y
      - -   @
    S     U N D A Y
```

# 2중 for문 이후 EditD 배열(상향식 접근방법)

```
  |      S  A  T  U  R  D  A  Y
-------------------------------
  |  [0, 1, 2, 3, 4, 5, 6, 7, 8]
S |  [1, 0, 1, 2, 3, 4, 5, 6, 7]
U |  [2, 1, 1, 2, 2, 3, 4, 5, 6]
N |  [3, 2, 2, 2, 3, 3, 4, 5, 6]
D |  [4, 3, 3, 3, 3, 4, 3, 4, 5]
A |  [5, 4, 3, 4, 4, 4, 4, 3, 4]
Y |  [6, 5, 4, 4, 5, 5, 5, 4, 3]
```

- EditD[0][7] = 8의 의미

  - str1 = '', str2 = 'SATURDAY' 인 경우
  - str1에 8번 삽입으로 sr2와 같은 문자가 된다.

- EditD[3][4] = 3의 의미

  - str1 = 'SUN', str2 = 'SATUR' 인 경우
  - 아래와 같은 방법으로 최소 교정 비용은 3이다.

  ```
    +: 추가, @: 변경

    S     U N
      + +   @
    S A T U R
  ```
