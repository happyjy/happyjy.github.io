# 01. UI 컴포넌트편 : ‘Best Practice를 내기 위한 시니어 개발자들의 고민들’
특정 컴포넌트 단위에서의 기능을 요구사항에 맞게 구현해보며 다양한 개발자의 시각과 코드(Vanila, jQuery, React 등)를 확인합니다. 이를 통해 보다 좋은 성능을 낼 수 있는 접근방법을 제시합니다.

<주요 학습 내용>
* Case 1. Context Menu : 이벤트 리스너, 이벤트 위임 구현 원리, Detail 태그, React-Create Portal 등
* Case 2. Infinite Scroll : 스크롤 동작 감지, 이벤트 리스너, scrollTop, mousewheel 동작 감지, Intersection Observer, useEffect
* Case 3. Scroll Spy : 스크롤 동작 감지, offsetTop/scrollTop/clientHeight의 상관관계, 이벤트 리스너, mousewheel, throttle과 debounce, IntersectionObserver, useEffect
* Case 4. Scroll Top : 크로스 브라우징을 고려한 스크롤 위치 확인 방법
* Case 5. List : Fetch/Axios/Ajax 기본 사용, async/await 사용한 비동기 방식, 역할별 코드 분리와 리팩토링
* Case 6. Stop Watch 1 : CSS 그리드 레이아웃, setInterval, Document.createDocumentFragment, useState, useEffect
* Case 7. Stop Watch 2 : 데이터 모델 → 뷰 방향의 단방향 데이터 바인딩 구현
* Case 8. Analog Clock : CSS 변수(CSS 커스텀 프로퍼티), styled-components, useRef, useEffect
* Case 9. Pagination : 페이지 설정에 따른 댓글 데이터 가공 표현
* Case 10. Dark Mode : localStorage, prefer-color-scheme, window.matchMedia, styled-components: theming, useState, useEffect, context API, useContext
* Case 11. Modal Window : CSS의 z-index, pointer-events, classList
* Case 12. Carousel : prototype을 사용한 메소드와 속성 정의, new 연산자, translateX, useState/useRef/useEffect hook 사용
* Case 13. Search Bar : axios 라이브러리, async/await, debounce, createElement/innerHTML/appendChild, jQuery의 data- 속성
* Case 14. Auto Complete 1 : fetch, async/await를 이용한 api 호출, debounce, slice/map 함수를 사용하여 특정 조건에 맞는 검색어를 특정 개수만큼 노출시키는 기능RxJS
* Case 15. Auto Complete 2 : input event의 활용도, selector.getBoundingClientRect() 함수, debounce
* Case 16. Instant Search 1 : debounce, request api를 대신하기 위한 Promise 활용(test를 위한 mock data 활용), 디자인 부분과 기능 부분을 분리하기 위한 방법
* Case 17. Dropdown Menu : click event target element 설정에 대한 고민, selector.getBoundingClientRect() 함수, arrow function의 활용, Template literals을 활용한 html templete 관리
* Case 18.Combo Box : CSS animation 사용 시 classList를 추가하여 알림메시지 보내주기, keyup 이벤트 사용, innerHTML 사용하여 DOM에 배열 동적 추가, setTimeout
* Case 19. Radio Box : submit 이벤트 발생, Object.key 사용, innerHTML
* Case 20. Rating UI : DOM Access, DOM Events(mousemove, mouseleave, click, etc.), MouseEvent, Mouse Position Calculation, useState, State Management
* Case 21. Modal Window 2 : 객체 형태로 데이터 속성값이 정보를 저장하여 가져오는 법, 레이어 팝업 처리
* Case22 Scroll Indicator : 크로스 브라우징을 고려한 문서 높이 계산, width 또는 translateX를 사용하여 남은 콘텐츠 표기하는 방법
* Case 23. Loading : 각 영할별 콜백 함수 생성 및 코드 관리 방법, 통신 성공/실패 관리
* Case 24. Progress Bar : jQuery animate 활용
* Case 25. Chips UI : 동적으로 추가되는 Element, template 분리, element.insertAdjacentElement 함수 활용
* Case 26. Toggle Button : 버튼 스타일 적용, 컴포넌트와 어플리케이션과의 통신
* Case 27. Carousel 2 : CSS 변수(CSS 커스텀 프로퍼티), HTMLElement.offsetWidth, HTMLElement: transitionend evnet, styled-components, useState
* Case 28. Tabs : 비동기 처리와 Promise, React hook을 사용한 데이터 패칭
* Case 29. Instant Search 2 : fetch, async/await, Element 속성 innerHTML, style을 사용하여 DOM에 보여주기
* Case 30. Check Box : submit event, filter 함수
# 02. 마크업 언어 심화편 : ‘흔들리지 않는 탄탄한 기초 다지기’
생각보다 실무에서 활용돼야 하는 마크업 언어 학습을 소홀히하는 개발자들이 많이 있습니다. 장기적으로 흔들리지 않는 탄탄한 기초를 다지기 위해 실무에서 많이 활용되는 주요 마크업 이슈들을 sass 기반으로 학습해봅니다.

- 마크업 언어 심화편 1,2,3차 오픈 : 2021. 4. 9(금), 2021. 4. 16(금), 2021. 4. 23 (금)

<주요 학습 내용> 
* 자세한 세부 항목은 차후 일부 변경될 수 있습니다.

1. All about Form : 기본적으로 모든 과정은 Sass를 사용. 각 컴포넌트의 상태(basic, disabled, readonly, focus, hover) 등을 다룹니다.
- text input, textarea, checkbox(switch), radio, button(mixin 응용 심화), dropdown

2. 기본 레이아웃 시리즈 : 반응형을 고려하여, 프론트엔드 개발자들이 마크업 단에서 신경써야 하는 부분들을 짚어줍니다. rest.css부터 브라우저 호환성 체크 등의 노하우를 피그마 디자인 시안을 보면서 작업하며 실습합니다.
- gnb, lnb, footer, login form, signup form, modal(toast, tooltip)

3. 선택자 심화 학습 & 포지셔닝 끝판왕 : CSS를 보다 능숙하게 다루기 위한 학습 과제를 다뤄봅니다.
- 선택자 심화 : nth-of-type, nth-child, ::before, ::after, + ~ *= ^= 등
- 포지셔닝 끝판왕 : position, float, flex, grid(IE 호환 이슈)

4. 마크업 최신 트렌드
- atomic css, tailwind css

5. 이메일 템플릿
- email template(table coding), 이메일 다크모드 대응 노하우/현업 사례 소개


# 03. 프레임워크 동작 원리 완전 정복 : ‘프레임워크 동작 원리 하나하나 뜯어보기’
React의 핵심 기능 몇가지를 Vanila JS로 직접 구현해봅니다. React가 동작하는 원리에 대해 깊이 이해하며 보다 좋은 성능을 내는 코드를 작성하기 위한 단서를 찾아갑니다.

- 프레임워크 동작원리 완전 정복 1,2,3차 오픈 : 2021. 4. 30(금)/ 2021. 5. 7(금)/ 2021. 5. 14(금)

<주요 학습 내용>
* 자세한 세부 항목 안내는 차후 공개


# 04. 프레임워크 활용 예제 모음집 : ‘안정적인 구조를 잡아가기 위한 프레임워크 활용법’
어플리케이션 수준의 기능을 React와 Vue로 실제 구현해보면서 안정적인 구조로 프로젝트를 설계해가기 위해 고민해봐야 할 부분이 어디인지를 짚어드립니다.
  - 프레임워크 활용 예제 모음집 1,2,3차 오픈 : 2021. 5. 21(금)/ 2021. 5. 28(금)/ 2021. 6. 4(금)

<주요 학습 내용>
* 자세한 세부 항목 안내는 차후 공개

# 05. 상태관리 라이브러리 사용 예제집 : ‘이유와 목적에 맞게 상태관리 라이브러리 도구 선택’
Redux, Mobx 및 다양한 상태관리 라이브러리들을 다뤄보면서 라이브러리별 장단점을 알아보고 맥락과 상황에 따른 도구 선택 및 활용에 대한 인사이트를 찾아갑니다.

- 상태관리 라이브러리 사용 예제집 1,2차 오픈 : 2021. 6. 11(금), 2021. 6. 18(금)

<주요 학습 내용>
* 자세한 세부 항목 안내는 차후 공개

# 06. 테스팅 도구 활용 & 리팩토링 예제집 : ‘실력있는 개발자의 필수 요건 : 클린 코드 작성하기’
가독성, 범용성, 재사용성 높은 클린코드 작성 방법론에 대해 깊게 고민해볼 수 있도록 테스트코드 작성 및 리팩토링 예제들을 살펴봅니다.

- 테스팅 도구 활용 및 리팩토링 예제집 1,2차 오픈 : 2021. 6. 18(금)/ 2021. 6. 25(금)

<주요 학습 내용>
* 자세한 세부 항목 안내는 차후 공개
* 테스팅 도구 활용 및 리팩토링 예제집