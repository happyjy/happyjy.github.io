---
title: Hook in project
date: 2020-06-15
author: jyoon
category: ToyProj
tags:
  - ToyProjReview
  - Instagram clone coding2
  - setState
  - setEffect
  - customHook
---

# 프로젝트에서 사용한 Hooks

- 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등 기능을 제공
- 현재 프로젝트에서는 useState, useEffect 그리고 custom Hook useInput을 사용했습니다.

## useState

컴포넌트의 State관리를 class의 state 상태 관리가 아니라 function에서도 사용할 수 있게 됐습니다. 

useInput.js에서 useState를 사용하고 있는데 어떻게 사용되고 있는지 설명합니다. 

- 예를 들어 Post 컴포넌트에서 좋아요 버튼 상태 관리를 useState로 하고 있는데 어떻게 사용하는지 보겠습니다.

```jsx
//PostContainer.js 
import React, { useState } from 'react';
...
const PostContainer = ({ 
	...
	isLiked
	...
)} => {
	const [isLikedS, setIsLiked] = useState(isLiked);

	const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };
}
```

## useEffect

- 리액트 컴포넌트가 레더링 될 때마다 특정 작업을 수행할 수 있도록 하는 Hook
- **특정 값 currentItem이 업데이트 될 때만 실행하기 위해서 어떻게 했을까?**
    - **useEffect 함수 두번째 파라미터에 [currentItem]을 설정 했습니다.**
- slide기능은 어떤 방법으로 설정했을까?
    - postContainer.js에 사진 slide 기능을 useEffect로 구현했는데 어떻게 구현했는지 설명합니다.
    - rendering이 완료 된후 useEffect 함수가 수행되면서 slide 함수가 동작하면서 setTimeout에 설정한 초마다 setCurrentItem을 해준다.
    - currentItem 변수를 PostPresenter로 전달해 선택된 이미지만 보이도록 css opacity, transition 속성을 통해서 설정할 수 있습니다.

```jsx
//PostContainer.js 

import React, { useState, useEffect } from 'react';
import PostPresenter from './PostPresenter';

const PostContainer = ({
  ...
  files,
  ...
}) => {
	const [currentItem, setCurrentItem] = useState(0);
	...
	const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };

	useEffect(() => {
    slide();
  }, [currentItem]);
	...

	return (
	    <PostPresenter	
				...
	      currentItem={currentItem}
				...
	    />
	  );
}
```

## useInput

- Header.js에 serach Input에서 useInput을 사용하고 있습니다.
- input을 입력할때 마다 state를 설정하는 custom hook "useInput"을 만들어 사용하는 곳에서 로직이 줄고 재사용 할 수 있게 됐습니다.
- custom hook "Input"을 import 한 곳(Header.js)에서 import해 value, onChange를 SearchInput 컴포넌트 value, onChange에 설정하고 있다.

```jsx
//input.js 
import { useState } from 'react';

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  return { value, onChange, setValue };
};

//Header.js 
import Input from './Input';

const HeaderComponent = ({ history }) => {
	const search = useInput('');
	
	return (<SearchInput
	  value={search.value}
	  onChange={search.onChange}
	  placeholder="search"
	/>)
}
```