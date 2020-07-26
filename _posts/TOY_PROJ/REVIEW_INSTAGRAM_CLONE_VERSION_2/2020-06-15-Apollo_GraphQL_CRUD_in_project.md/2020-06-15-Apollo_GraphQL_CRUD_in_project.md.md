---
title: Apollo GraphQl CRUD in project
date: 2020-06-15
author: jyoon
category: ToyProj
tags:
  - ToyProjReview
  - Instagram clone coding2
  - apollo
  - graphql
  - apollo-graphql
---

# apollo GraphQl CRUD 에 대해서

react-redux를 사용할때는 connect를 이용 mapDispatchToProps를 통해서 redux로 갔다가 다시 return받은걸 mapStateToProps 로 받아서 presentation으로 보내는 작업이 있었는데

apollo GraphQl 해당 컴포넌트에 필요한 query가 있어서 해당 컴포넌트를 사용하면 추가적으로 호출/후처리를 해주지 않아도 되는 편리한 점이 있다.생산성이 높아질것 같다.
(컴포넌트형 개발이 아니라면 api를 필요한곳에서 계속 호출/ 후처리를 불편함이 있을 것이다.)

# Create: ADD_COMMENT에 대해서

  - mutation에서 사용될 query객체는 어떤 모습일까?
    - mutation은 create, update, delete에서 사용되기 때문에 variables 설정이 필요하기 때문에 아래 코드와 같이 variables를 받는 과정이 있습니다.

  - useMutation함수를 통해서 어떻게 server로 request할까?
    - useMutation 호출시 반환되는 배열 첫번째 요소를 호출해야 request합니다.
    - 조회 할 때 쓰이는 "useQuery"는 호출시 바로 수행 됩니다.

  - useMutation함수 설정은 프로젝트에서 어떻게 해줬는가? 
    - 두개의 인자를 넣었으며 아래와 같이 설정했습니다. 
    - 첫번째 인자: 수행할 sql 
    - 두번째 인자: 수행 sql에서 필요한 조건

  - useMutation함수로 반환 받은 첫번째 객체 설명
    - 이 객체는 promise 객체라서 await를 사용하게 되면 await 키워드를 사용한 promise객체가 settles and return 할때까지 async를 사용한 function은 기다리게 된다.
    - 이 프로젝트에서는 아래 코드 주석 POINT3에서 addCommentMutation를 통해 server request를 하고 있고 그 아래 "setSelfComments" 이 함수는 response를 받은 후에 실행 될것입니다. 
      - 이때 기다린다고 해서 cpu의 resource가 낭비되는것이 아니라 javascript engine은 다른 script를 excute를 하거나, 이벤트 처리를 하는 등의 수행을 합니다.
    - Aync, Await는 다음을 참고하자
      - [async-await](https://javascript.info/async-await)

  - Aync, Await에 대한 간략한 추가 설명
    - 이때 기다린다고 해서 cpu의 resource가 낭비되는것이 아니라 javascript engine은 다른 script를 excute를 하거나, 이벤트 처리를 하는 등의 수행을 합니다.
  

```jsx
//PostQuery.js
import { gql } from "apollo-boost"

//POINT1
export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        username
      }
    }
  }
`

//PostContainer.js
import { useMutation } from "react-apollo-hooks"
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries"

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  caption,
  location,
  createdAt,
}) => {

  //POINT2
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  })
  const onKeyPress = async event => {
    const { which } = event
    if (which === 13) {
      event.preventDefault()
      try {
        //POINT3
        const {
          data: { addComment },
        } = await addCommentMutation()
        // console.log("### addComment: ", addComment);
        setSelfComments([...selfComments, addComment])
        comment.setValue("")
      } catch {
        toast.error("Can't send comment")
      }
    }
  }

  return (
    <PostPresenter
      user={user}
      files={files}
      isLiked={isLikedS}
      likeCount={likeCountS}
      comments={comments}
      caption={caption}
      location={location}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  )
}
```

# Retrieve: FEED_QUERY에 대해서

* POINT1. Query 작성
  - retreieve 할 query를 gql(apollo-boost패키지)에 작성한다.(FEED_QEURY)
* POINT2. useQeury로 서버 요청
  - POINT1에서 설정한 query를 useQuery 함수에 설정해 호출
    - const { data, loading } = useQuery(FEED_QUERY)
  - useQuery는 호출시 자동으로 query를 수행한다.(useMutation은 그렇지 않다.)
  - response 객체로 "loading, error, data" 객체를 받을 수 있습니다.
  - [useQuery 공식문서](https://www.apollographql.com/docs/react/data/queries/)


- 예제 코드

```jsx
//Feed.js 

import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import { gql } from "apollo-boost"
import { useQuery } from "react-apollo-hooks"
import Loader from "../Components/Loader"
import Post from "../Components/Post"

//POINT1. 
const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`
...

export default () => {
  //POINT2. 
  const { data, loading } = useQuery(FEED_QUERY)

  return (
    <Wrapper className="Wrapper">
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            caption={post.caption}
            location={post.location}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  )
}
```

- Playground query 수행 결과를 확인할 수 있다. 
  - Apollo Client 설정시 설정한 uri에서 확인가능(Client.js)

![./img/Untitled.png](./img/Untitled.png)


# Delete: toggleLike(create 기능도 있음)

* POINT1. Query 작성
  - mutation을 수행할 query를 gql 함수에 작성
* POINT2. useMutation에 작성한 query, query 조건을 인자값으로 전달
* POINT3. trigger query
  - useMutation함수 return 배열 첫번째 함수를 수행시킨다.

```jsx
//PostQuery.js
import { gql } from 'apollo-boost';

//POINT1
export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        username
      }
    }
  }
`;

//PostContainer.js
import { useMutation } from 'react-apollo-hooks';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  caption,
  location,
  createdAt,
}) => {
  //POINT2
	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

	const onKeyPress = async (event) => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      try {
        const {
          data: { addComment },
        } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
        comment.setValue('');
      } catch {
        toast.error("Can't send comment");
      }
    }
  };

	...

	const toggleLike = () => {
    //POINT3
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      isLiked={isLikedS}
      likeCount={likeCountS}
      comments={comments}
      caption={caption}
      location={location}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};
```

# REF
 - [apollographgql mutation 공식 문서](https://www.apollographql.com/docs/react/data/mutations/)
 - [apollographgql queryies 공식 문서](https://www.apollographql.com/docs/react/data/queries/)
 - [async-await](https://javascript.info/async-await)
