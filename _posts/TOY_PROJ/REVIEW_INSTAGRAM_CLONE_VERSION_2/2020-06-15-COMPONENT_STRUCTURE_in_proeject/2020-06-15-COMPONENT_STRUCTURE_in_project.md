---
title: COMPONENT STRUCTURE in project
date: 2020-06-15
author: jyoon
category: ToyProj
tags:
  - ToyProjReview
  - Instagram clone coding2
---


# 메인 화면 캡쳐 
![](./img/instagramclonecoding.png)

# 기술스택

- React(Hooks, graphQl) + Express(Prisma) + Prisma(apollo)
- styled-components

# 프로젝트 컴포넌트 구조

- ApolloProvider
    - App
        - Header
            - HeaderWrapper
                - HeaderColumn
                    - Link
                        - Home
                - HeaderColumn
                    - form
                        - SearchInput
                - HeaderColumn
                    - HeaderLink
                        - Compass
                    - HeaderLink
                        - HeartEmpty
                    - HeaderLink
                        - User
        - Routes
            - Switch
                - Route_component={Feed}
                    - Post
                        - Header
                            - Avatar
                            - userColumn
                                - Link
                                    - FatText
                                - Location
                        - Files: 사진
                        - Meta
                            - Buttons
                                - Button onClick={toggleLike}
                            - Buttons
                                - CommentIcon
                            - FatText: xLikes
                            - Caption: 사진 설명
                            - Comments
                            - Timestamp: 사진 올린날짜
                            - Textarea: 댓글작성
                - Route_component={Explore}
                - Route_component={Search}
                - Route_component={Profile}
        - Footer