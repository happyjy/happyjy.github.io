---
title: 정렬_quickSort
date: 2020-05-16
category: Algorithm
author: jyoon
tags:
  - sort
---

# 문제
quick_sort

# Quick Sort에 대해서 
* QuickSort is a Divide and Conquer algorithm. 
* It picks an element as pivot and partitions the given array around the picked pivot.
* sort는 아래와 같이 몇 가지 종류가 있음
  1. Always pick first element as pivot.
  2. Always pick last element as pivot (implemented below)
  3. Pick a random element as pivot.
  4. Pick median as pivot.

# 해결 방법 
* 아래 설명한 두가지 방법에 대한 코드가 있다. 

## 1. partition 함수를 사용해서 해결하는 방법
  - partition 함수
    - pivot: 함수의 제일 마지막 값
    - index of smaller element: 배열의 제일 작은 값
      - 배열의 요소가 pivot 보다 작을 때 1 증가
    - 배열의 요소가 pivot 보다 작을 때
      - index of smaller element 1 증가
      - swap! index of smaller element/ if condition에 해당하는 배열 요소값
  - 작은 케이스로 생각해보기 
    - [4,5,1,2,3] 배열이 있을 때
    - 첫번째 partition 함수 수행 과정
      - pivot: 3 / index of smaller element = begin - 1 (=0-1)
      - for begin(0) to end (4)
        - 4 < 3 false -> no action
        - 4 < 5 false -> no action
        - 1 < 3 true -> index of smaller element 1증가/ swap(4, 1)
          - [1,5,4,2,3]
        - 2 < 3 true -> index of smaller element 1증가/ swap(2, 5)
          - [1,2,4,5,3]
      - swap(index of smaller elemnt+1, end)
        - index of smaller elemtn 다음 index에 pivot 값 index 'end'와 바꿔준다.
        - [1,2,3,5,4] : 첫번째 partitions은 이렇게 끝나며 3을 기준으로 이와 같은 정렬이 이뤄진다.
      
  - 동작 참고 
    - [geeksforgeeks Youtube](https://www.youtube.com/watch?v=PgBzjlCcFvc&feature=emb_logo)
    - [geeksforgeeks](https://www.geeksforgeeks.org/quick-sort/)

## 2. 배열을 pivot 값 기준으로 작고, 큰 값을 배열로 만들어 concat 하는 방법
  - 코드보면 1번 보다 이해하기 비교적 쉬움
  - [참고사이트](https://www.w3resource.com/javascript-exercises/searching-and-sorting-algorithm/searching-and-sorting-algorithm-exercise-1.php#)


# CODE1 - partition 함수 사용
```js
  function partition(array, begin, end) {
    var pivot = array[end];
    var smallerIdx = begin - 1;  // highlight-line // index of smaller element
    for (var j = begin; j < end; j++) { // highlight-line
      // If current element is smaller than the pivot 
      if (array[j] < pivot) { // highlight-line
        smallerIdx++; // highlight-line

        // swap arr[i] and arr[j] 
        array.swap(smallerIdx, j); // highlight-line
      }
    }

    // swap arr[i+1] and arr[end] (or pivot) 
    array.swap(smallerIdx + 1, end); // highlight-line

    return smallerIdx + 1;
  }

  function quick_sort(array, begin, end) {
    if (begin < end) { // highlight-line // array.length > 1
      var pivot = partition(array, begin, end);

      quick_sort(array, begin, pivot - 1);
      quick_sort(array, pivot + 1, end);
    }
  }

  Array.prototype.swap = function (a, b) {
    var tmp = this[a];
    this[a] = this[b];
    this[b] = tmp;
  }
  //-------------------------------
  array = randomArray(4);
  console.log(array);
  console.log(quick_sort(array, 0, array.length - 1));
  console.log(array);

  function randomArray(n) {
    var i, list = [];
    for (i = 0; i < n; i++) {
      list.push(Math.round(Math.random() * 10));
    }
    return list;
  }
```

# CODE2 - 배열객체 2개 만들어서 concat 하는 방법
  ```js
  function quick_Sort(arr) {
    if (arr.length <= 1) {// highlight-line
      return arr;
    } else {
      let left = [];
      let right = [];
      let newArr = [];
      // let pivot = arr.pop();
      let pivot = arr.shift();
      let length = arr.length;

      for (let i = 0; i < length; i++) {
        if (arr[i] <= pivot) {// highlight-line
          left.push(arr[i]);// highlight-line
        } else {// highlight-line
          right.push(arr[i]);// highlight-line
        }
      }

      return newArr.concat(quick_Sort(left), pivot, quick_Sort(right));
    }
  }

  let arr = [3, 0, 2, 5, -1, 4, 1];

  console.log("### Original arr: ", arr);
  const sortedArr = quick_Sort(arr);
  console.log("### Sorted array: ", sortedArr);
  ```


  # REF/리뷰
* [첫번째코드](https://www.geeksforgeeks.org/quick-sort/)
  * 영상 설명 있음 
    - 두번째 알고리즘 이해는데 한방에 이해 됨
    - 이해 안되던 부분
      - ISE(index of smaller element)는 배열의 요소가 pivot 보다 작을때 만 '1증가' 되는 부분이 이해가 안됐었다.
        - "ISE는 배열을 순회하면서 pivot 보다 큰수에서 멈춰 있는다."
        - 그러다 pivot 보다 작은 수를 만나면 그 수와 ISE index에 해당하는 배열 요소와 swap
        - 위 과정을 걸치면 pivot 수 기준으로 작은수는 배열의 왼쪽으로, 큰수는 오른쪽으로 정렬이 된다. 
        - 즉, partition 함수가 return arr는 high index 기준으로 작은수, 큰수가 정렬이 된다. 
        - 예시
        ```
        아래 숫자 7: pivot
        partition 전 arr = [1, 8, 3, 9, 4, 5, "7"]
        partition 제일 마지막 swap 함수 실행 직전 arr = [1, 3, 4, 5, 8, 9, "7"]
        partition 종료 arr =[1, 3, 4, 5, "7", 8, 9]
        배열의 요소보다 큰 수는 -> no action
        배열의 요소보다 작은 수는 -> swap iteration요소와, ISE 요소 
        ```
    - https://www.youtube.com/watch?time_continue=47&v=PgBzjlCcFvc&feature=emb_logo
  * [추가 참고사이트](https://jsperf.com/quicksort)
    - geeksforgeeks와 같은 내용
    - w3resource와 코드가 다른점은 swap 하는 로직이 유무가 다르다.

* [두번째코드](https://www.w3resource.com/javascript-exercises/searching-and-sorting-algorithm/searching-and-sorting-algorithm-exercise-1.php#)