function knapSack(C, weight, value, n) {
    let maxValue = Array(n + 1).fill(0).map(x => Array(C + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= C; j++) {
            // i: 물건무게배열(wight) 순회할 변수
            // j: 배낭용량
            // maxValue[i][j] 의미:
            // "물건무게 배열"(wieight)를  
            // j만큼 담을수 있는 배낭에 넣을 수 있는 "최대 물건 가격"
            if (weight[i - 1] <= j) {
                var leftWight = j - weight[i - 1];  //leftWight 배낭에 넣을수 있는 무게 
                console.log(`Math.max(value[${i} - 1] + maxValue[${i} - 1][${leftWight}], maxValue[${i} - 1][${j}])`);
                maxValue[i][j] = Math.max(value[i - 1] + maxValue[i - 1][leftWight], maxValue[i - 1][j]);
                // 현재 넣은 물건 가격 + 
            } else {
                console.log(`maxValue[${i}][${j}] = maxValue[${i} - 1][${j}];`);
                maxValue[i][j] = maxValue[i - 1][j];
            }
        }
    }

    return maxValue[n][C];
}

const weight = [2, 3, 4, 5]
const C = 5
const value = [3, 4, 5, 6]
const n = weight.length;

knapSack(C, weight, value, n)


/*
  maxValue[1][1] = maxValue[1 - 1][1];
  Math.max(value[1 - 1] + maxValue[1 - 1][0], maxValue[1 - 1][2])
  Math.max(value[1 - 1] + maxValue[1 - 1][1], maxValue[1 - 1][3])
  Math.max(value[1 - 1] + maxValue[1 - 1][2], maxValue[1 - 1][4])
  Math.max(value[1 - 1] + maxValue[1 - 1][3], maxValue[1 - 1][5])

  maxValue[2][1] = maxValue[2 - 1][1];
  maxValue[2][2] = maxValue[2 - 1][2];
  Math.max(value[2 - 1] + maxValue[2 - 1][0], maxValue[2 - 1][3])
  Math.max(value[2 - 1] + maxValue[2 - 1][1], maxValue[2 - 1][4])
  Math.max(value[2 - 1] + maxValue[2 - 1][2], maxValue[2 - 1][5])

  maxValue[3][1] = maxValue[3 - 1][1];
  maxValue[3][2] = maxValue[3 - 1][2];
  maxValue[3][3] = maxValue[3 - 1][3];
  Math.max(value[3 - 1] + maxValue[3 - 1][0], maxValue[3 - 1][4])
  Math.max(value[3 - 1] + maxValue[3 - 1][1], maxValue[3 - 1][5])

  maxValue[4][1] = maxValue[4 - 1][1];
  maxValue[4][2] = maxValue[4 - 1][2];
  maxValue[4][3] = maxValue[4 - 1][3];
  maxValue[4][4] = maxValue[4 - 1][4];
  Math.max(value[4 - 1] + maxValue[4 - 1][0], maxValue[4 - 1][5])
*/
