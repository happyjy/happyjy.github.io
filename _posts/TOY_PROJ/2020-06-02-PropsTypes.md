---
title: PropTypes에 대해서(vs Typescript)
date: 2020-0602
author: jyoon
category: React
tags:
  - PropTypes
  - TypeScript
  - react 
---

# Typescript, PropsTypes 설명

* Typescript, PropTypes의 validate 시점 차이 
  - Typescript: compile time
  - PropsTypes: runtime

* PropTypes를 쓰면 좋은점 
  - API통신을 통해 JSON 데이터를 받아 컴포넌트로 전달시에 설정한 타입이 아니라면 아래 와 같은 에러 메시지를 보여준다.
  ```
  Warning: Failed prop type: Invalid prop `id` of type `number` supplied to `Table`, expected `string`
  ```
* TypeScript를 쓰면 좋은점 
  - 컴포넌트간 잘못된 type을 넘겨주면 경고해준다 


* 정리 
  - 보기에 Typescript, PropsTypes가 같아 보여도 그렇지 않다 
  - using both is not a 'pointless exercies'
  - PropsType을 Typescript에서 자동 생성할 수 있다. 그래서 두번 타입을 설정할 필요가 없다. 
    - [babel-plugin-typescript-to-proptypes lib](https://github.com/milesj/babel-plugin-typescript-to-proptypes)
    - [ts-react-loader](https://github.com/grncdr/ts-react-loader#what-it-does)
    - [prop-types-ts](https://github.com/gcanti/prop-types-ts)


# 인스타그램 클론 코딩 Props 사용 예시 
```js
import PropTypes from 'prop-types';

const Feed = (props) => {
	if (props.loading) {
		return <LoadingFeed />;
	} else if (props.feed) {
		console.log('### Feed > presenter.js > props', props);
		return <RenderFeed {...props} />;
	}
};

Feed.propTyps = {
	loading: PropTypes.bool.isRequired,
	feed: PropTypes.array
};

export default Feed;


```

