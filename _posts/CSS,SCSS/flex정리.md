---
title: Flex
date: 2020-05-29
author: jyoon
category: css
tags:
  - css
  - flex
---

# flex

- 효과적인 layout을 제공하기위해서 나왔다.
- container 안에 item들의 정렬, 공간배분, 유동적인 크기 조절 등이 쉬워졌다.
- 메인 아이디어는 items를 갖는 container에 본인이 가지고 있는 속성의 width/height를 디바이스의 스크린 사이즈에의해서 정한다.
- container 크기만큼 item들이 확장, 축소가 유동적으로 이뤄지고 overflow되는것도 막는다.
- 일반 레이아웃(수직 기반블록, 수평기반 블록)과 달리 방향에 구애 받지 않는다.
- 하지만 크고, 복잡한 어플리케이션에서 크기조절, 늘어나고 줄어드는것에서 유연성이 떨어질 수 있습니다.
  - 그래서 Flexbox는 어플리케이션의 일부분 component과 같은 작은 규모 layout에 어울리고
  - Grid layout은 큰 규모의 layout 설정에 어울립니다.

- flex 구조 
```
# flex continer
    ㄴ flex item
    ㄴ flex item
    ㄴ flex item
        .
        .
        .
```

# 부모 요소와 자식 요소에 정의하는 속성 구분

- flex container 속성
  - flex-direction, flex-wrap, justify-content, align-items, align-content
- flex item 속성
  - flex, flex-grow, flex-shrink, flex-basis, order

* flex: 1의 의미
  - flex-grow 속성과 flex-shrink 속성, flex-basis 속성을 축약해서 flex 속성으로 표현할 때 flex: 1 속성은 flex: 1 1 0 속성을 의미한다.
  - 즉, flex-grow 속성의 값이 '1'이고 flex-shrink 속성의 값이 '1'이기 때문에 flex container의 크기에 따라 flex item의 크기도 커지거나 작아진다는 의미다.


# flex Container 
> Properties for the Parent

- flex item
  (flex container)
  - main-axis, cross-axis

## display

- container 자체에는 효과가 없고 container direct 하위 element에 영향을 준다.

```css
.container {
  display: flex; /* or inline-flex */
}
```

## flex-direction

- main-axis(depends on justify-content property)를 정하고 방향이 정해진다.

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

- row (default): left to right in ltr; right to left in rtl
- row-reverse: right to left in ltr; left to right in rtl
- column: same as row but top to bottom
- column-reverse: same as row-reverse but bottom to top

## flex-wrap

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- nowrap (default): flex items을 한줄에!
- wrap: 위에서 아래로 여러줄에 flex items를 감싼다.
- wrap-reverse: 아래서 위로 여러줄에 flex items를 감싼다.

## flex-flow

- shorthand for "flex-direction" and "flex-wrap"

```css
.container {
  flex-flow: column wrap;
}
```

## justify-content

- main axis 기준으로 items이 정렬된다.
- cross axis 기준으로 items이 정렬되는 속성(align-items)

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around
    | space-evenly | start | end | left | right ... + safe | unsafe;
}
```

- flex-start (default): items are packed toward the start of the flex-direction.
- flex-end: items are packed toward the end of the flex-direction.
- center: 가운데 정렬
- space-between: 첫번째, 마지막 아이템이 container끝에 붙고 아이템들의 사이 여백이 동등하게 주어진다.
- space-around: 아이템들이 균등한 여백이 주어지는데 가장자리 끝에는 아이템 사이의 반정도의 여백이 주어진다.(합니면 아이템 사이의 여백)
- space-evenly: 가장자리 양끝, 아이템 사이의 여백 모두 같다.

## align-items

- cross axis 기준으로 items이 정렬된다.
- main axis 기준으로 items이 정렬되는 속성(justify-content)

```css
.container {
  align-items: stretch | flex-start | flex-end | center | baseline;
}
```

- stretch (default): cotainer를 모두 채운다.(하지만 min-width, max-width가 적용된다.)
- flex-start / start / self-start: items들이 cross axis 기준으로 위로 붙는다.
- flex-end / end / self-end: items들이 cross axis 기준으로 아래로 붙는다.
- center: items are centered in the cross-axis
- baseline: items are aligned such as their baselines align

## align-content

- justify-content 같은 속성을 갖고 있으며 cross axis 기준으로 items들이 정렬된다.

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around |
    space-evenly | stretch;
}
```

- flex-start / start:
- flex-end / end:
- center:
- space-between:
- space-around:
- space-evenly:
- stretch (default):


# flex items
> Properties for the Children of Container

## order

- 특정 아이템의 flex items 사이에서 순서를 바꾸는것.
- 예를 들어 1번째 items를 selector로 선택새 order: flex마지막 순번 을 주면 flex items제일 끝으로 이동한다.

```css
.item {
  order: 5; /* default is 0 */
}
```

## flex-grow

- flex-grow의 아이템은 다른 아이템에 제일 작은 가로길이에 4배로 가로 길이가 늘어난다.

```css
.item {
  flex-grow: 4; /* default 0 */
}
```

## flex-basis

- flex item의 길이를 정한다.

```css
.item {
  flex-basis: | auto; /* default auto */
}
```

## align-self

- 기본으로 align-items의 속성을 따르지만 특정 flex item만 align-item 속성을 줄 수 있다.

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```


# ref
- [flexbox로 만들 수 있는 10가지 레이아웃](https://d2.naver.com/helloworld/8540176)
- [A Complete Guide to Flexbox - css trick](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)