---
title: 프로젝트에서 사용한 ApolloGraphQL에 대해서 
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

# 프로젝트에서 사용한 ApolloGraphQL에 대해서

# installation

> npm install apollo-boost @apollo/react-hooks graphql

- `apollo-boost`: Apollo Client 설정하는데 모든것들이 이 패키지에 있다.
- `@apollo/react-hooks`: React hooks(view layer를 통합기반을 위해 만들어진 패키지)
- `graphql`: GraphQL queries를 parseing 해준다.

# Create a Client

- 필요한 이유: endpoint GraphQL server의 를 시작하기 위해서
- uri: 입력한 주소로 endpoint에 접근 할 수 있다.
- clientState: 로컬 상태를 설정해준다.
- headers: request시 보내줄 key, value값을 설정한다.

```jsx
//Client.js 

import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

export default new ApolloClient({
  uri: 'http://localhost:4000', //graphql endpoint
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
```

# Connect your client to React

- Apollo Client를 React에 연결하기 위해서 `ApolloProvider' 컴포넌트를 @apollo/react-hokks에서 export해 설정해준다.
- 아래와 같이 **react app을 `ApolloProvider` 컴포넌트로 감싸면 하위 트리 컴포넌트에서 GraphQL data access 할수 있다**

```jsx
// index.js 
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import App from './Components/App';
import Client from './Apollo/Client';

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
```

# Request data

- 위 단계 처럼 ApolloProvider를 한번 hooksed up 하면 @apollo/react-hooks패키지에서(현재 나는 @apollo/react-hooks 패키지를 확장한 패키지 "react-apollo-hooks"를 사용하고 있다). useQuery를 사용할 수 있다.
- POINT1
    - GraphQL query를 gql function으로 감싼다.
- POINT2
    - POINT1의 return 객체를 useQuery로 전달한다.
    - return value로는 loading, error, data객체를 반환한다.

```jsx
import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import Post from '../Components/Post';

//POINT1
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
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
	// POINT2
  const { data, loading } = useQuery(FEED_QUERY);
  console.log('### FEED_QEURY: ', { data, loading });

  return (
    <Wrapper className="Wrapper">
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => (
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
  );
};
```

# REF

[apollographql Get started]([https://www.apollographql.com/docs/react/get-started/](https://www.apollographql.com/docs/react/get-started/))