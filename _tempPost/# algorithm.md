

[TOC]





# 문제 permutation

```
Permutation 혹은 모든 조합을 구하는 문제는 주로 재귀함수로 풀 수 있습니다.


이 문제는 각 자리 마다 가능한 모든 문자를 넣고 재귀함수를 돌려주면 됩니다.

ABC로 예를 들자면,

"A", BC -> A를 고른뒤 BC로 재귀함수 콜.

-- "AB", C -> B를 고른뒤 C로 재귀함수 콜.

---- "ABC" -> 남은 문자가 없을때 프린트.

-- "AC", B -> C를 고른뒤 B로 재귀함수 콜.

---- "ACB" -> 남은 문자가 없을때 프린트.



"B", AC -> B를 고른뒤 AC로 재귀함수 콜.

-- 위와 같이 반복



"C", BA -> C를 고른뒤 BA로 재귀함수 콜.

-- 위와 같이 반복



확실히 고른 문자들과 고르지 않은 문자들을 구별할 정수(l)를 지정해줍니다.

(l)인덱스 전의 문자는 바꾸지 않습니다.

문자를 추가한뒤 재귀함수를 콜할때 이 정수(l)를 +1 해줍니다.



"각 문자를 바꾸려면 substring(str, l, r) 사이에서 l 포지션의 문자를 l 부터 r 까지의 문자와 바꾸어 주며 재귀함수를 콜해줍니다."

"이때 중요한건 재귀함수가 끝나면 바꾸었던 문자를 되돌려놓아야합니다."

그래야 재귀함수 안의 함수가 끝났을때 이어서 다른 재귀함수를 제대로된 문자열로 콜할수 있습니다.


```





```java
void main() {
  String str = "ABC";
  solve(str, 0, str.length() - 1);
}

void solve(String str, int l, int r) {
  if (l == r) {
    System.out.println(str);
  }
  else {
    for (int i = l; i <= r; i++) {
      str = swap(str, l, i);
      solve(str, l + 1, r);		//재귀
      str = swap(str, l, i);
    }
  }
}

String swap(String str, int i, int j) {
  StringBuilder sb = new StringBuilder(str);
  sb.setCharAt(i, str.charAt(j));
  sb.setCharAt(j, str.charAt(i));
  return sb.toString();
}
```



```js
function solve(str, l, r){
    if(l === r){ 
    	console.log(str)
    } else {
    	for(var i = l; i <=r; i++){
        	str = swap(str, l, i);
            solve(str, l + 1, r);
            str = swap(str, l, i);
		}
    }
}

function swap(str, l, i){
    var newStr = [...str]

	var temp = newStr[i];
    newStr[i] = newStr[l]
    newStr[l] = temp;
    return newStr.join("");
}

solve('ABC', 0, 2)
```



시간복잡도: O(n!)

n 개의 문자열로 만들수 있는 모든 가지의 수는 n!





# 문제 SortBinaryArray

```
바이너리 배열(원소를 0, 1만 갖는 배열)이 주어졌을 때, 배열을 정렬하시오.

단, 시간 복잡도는 O(n), 공간 복잡도는 O(1).

결과는 0이 먼저 출력되고 1이 출력되어야 합니다.


Input: [1, 0, 1, 0, 1, 0, 0, 1]
Output: [0, 0, 0, 0, 1, 1, 1, 1]
```



* 단순하게 주어진 배열에 존재하는 0의 갯수를 세는 방법을

  생각해 볼 수 있습니다.

  0의 개수만큼 배열을 앞에서부터 채운 뒤,

  나머지는 1로 채우면 됩니다.

* 시간 복잡도: O(n)

  공간 복잡도: O(1)

```js
var arr = [1, 0, 1, 0, 1, 0, 0, 1];
var zeros = 0;
for (var a of arr) {
    if (a === 0) zeros++;
}

var newArr= [];
// for(var i=0; i<zeros; i++){
//     newArr.push(0);
// }

// for(var j=zeros; j<arr.length; j++){
//     newArr.push(1)
// }

var k = 0;
while(zeros-- !=0){
    newArr[k++] = 0;
}
while(k < arr.length){
    newArr[k++] = 1;
}
```







* 다른 방법으로 배열을 채워가는 인덱스 k를 정의하고

  인덱스 i로 배열을 순회하면서 원소가 0이면

  인덱스 k 위치에 0을 채우고 k를 증가한 뒤

  나머지를 1로 채워 정렬할 수 있습니다.

* 시간 복잡도: O(n)

  공간 복잡도: O(1)

```js
        var arr = [1, 0, 1, 0, 1, 0, 0, 1];

        var k = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === 0) {
                arr[k++] = 0;
            }
        }

        for (var j = k; j < arr.length; j++) {
            arr[k++] = 1;
        }
```







* 퀵 소트(quicksort)의 분할 기법(partitioning)을 적용해

  문제를 풀어 볼 수도 있습니다.

   

  Pivot 원소를 1로 정하고 배열을 순회하며

  0은 왼쪽으로 1은 오른쪽으로 보내는 방법입니다.

* 시간 복잡도: O(n)

  공간 복잡도: O(1)

```js
// 변수 j를 확인해보자 
// 반복문 i변수는 arr를 순회하고 j는 조건에 해당할때만 j를 증가시켜 문제를 해결 할 수 있다.
// for문을 두번 쓰지 않았다.
//	ㄴ 연한 얘기지만 이런 패턴으로 문제를 해결해본적이 없어 적어 봤다.
// 	ㄴ 새로운 길이 열리는 순간 ^^
var arr = [0, 0, 1, 0, 1, 1, 0, 1, 0, 0];

var pivot = 1;
var j = 0;

for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {

        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp; 
        j++;
    }
}
```

`
