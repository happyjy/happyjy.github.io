---
title: blog 기능 개선 사항 list
date: 2021-12-30
author: jyoon
category: studyList
tags:
  - studyList
---

- [ ] TOC level 단위 디자인 수정
- [ ] markdown #, ##, ### css 색 수정하기
- [ ] 포트 바꾸기
- [ ] markdown css가 잘 적용안되는 것같음.
- [ ] about에 이력, 교육이력, toyProject history component 형식으로 보여주기, 클릭시 모달로 자세한 사항 보이게
- [x] 20200614 / 20200614 벳지 postCard 밖으로 overflow하는것 해결하기 - hidden, min-width 적용
- [x] 20200531 / 20200531 카테고리 포스트 기준 내림차순 정렬하기
- [x] 20200531 / 20200531 category 벳지 클릭시 대소문자 때문에 안나오는 경우 있음 eg) react / React
- [ ] 20200531 카테코리 상위 카테고리 만들기
- [ ] 20200529 검색 기능
- [ ] 20200529 code tag of md 파일에서 띄워쓰기가 제대로 동작하지 않는다.
- [ ] 20200529 아래 설명 참고 md file에 code block html 구조가 정상적인것과 다름
- [ ] display 변경 [참고 - tistory](https://salgoomoment.tistory.com/)
- [ ] 광고
    - [ ] [ad.daum](https://info.ad.daum.net/optout.do)
    - [ ] [google ad sense](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiph7735ejwAhUGq5YKHe4NDwIYABABGgJ0bA&ohost=www.google.com&cid=CAESQOD2u3rIeQvZLm7UBkvr03pScUpC6bbtZ6QNnNEVC7pp_eEtRISqNM9Xr_ZGOj94OPvT5frE_0SNsuVWmXCfJ10&sig=AOD64_3FlHpZnUxXNj3p1djALg5CmucZ1Q&q&adurl&ved=2ahUKEwjq07T35ejwAhVS-2EKHe-FDF0Q0Qx6BAgGEAE)

  ```
  1.
    *
  이런 형식이 아래와 같이 표기 윈다.
  ---
  1.
  2.
  이렇게 표시된다. md library 수정하기
  ```

- [x] 20205029 / 20200525 페이지네이션, 카테고리 벳지 postCard 밖으로 overflow하는것 해결하기 flex, wrap 적용
- [x] 20200530 / 20200530 pageTitle 제거, card border 제거
- [x] 20200531 /20200525 Category 벳지 클릭시 다문자 섞여서 이동 안됨
- [ ] 20200525 블로그 월 몇개했는지 표시하기
- [ ] 20200525 글 총 몇개?
- [x] 20200531 / 20200525 타이틀하나만나오게 하기
- [ ] 20200525 ul.li dot 표시 margin 줄이기 글 점 정렬 여백
- [x] 20200531 / 20200525 Box 라인 제거
- [ ] 20200525 글씨 크기 줄이기
- [ ] 20200525 공지글 기능 추가하기
- [ ] 20200525 최근글 제거
- [ ] 20200525 About 메뉴에 이력서 정리

---

- markdown에 image import하는 방법
<https://www.gatsbyjs.org/docs/working-with-images-in-markdown/>

- page만드는 것 설명
<https://www.gatsbyjs.org/docs/adding-markdown-pages/>

- Adding a List of Markdown Blog Posts
<https://www.gatsbyjs.org/docs/adding-a-list-of-markdown-blog-posts/>

- pagenation 설명
- query 설명

- 파일 구조

```
  # 첫화면
  # index.js
    ㄴLayout
      Post
      PaginationLinks

```

```
  # Layout.js
    ㄴHeader
    ㄴRow
      ㄴCol - {children}
      ㄴCol - <Sidebar>
    ㄴFooter

  # Post.js
    - only post

  # PaginationLinks.js
    - only component
```
