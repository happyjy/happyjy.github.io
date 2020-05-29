# 
* index.js -> App

* App > index 
  : react-redux 라이브러리 connect 함수로 redux와 Container를 한다.
  : Redux로 props를 넘기고/ Redux로 받은 값을 props로 Container로 보낸다.(mapDispatchToProps, mapStateToProps)
	- import { connect } from 'react-redux'
	- import Container from './container';
	- export defatul connect (mapStateToProps)(Container);
* App > container 
  : 비즈니스모델이 있다/ class component다/ presenter에게 props를 넘겨준다.
	- import App from ./presenter.
	- export container props => <App {...props}/>;
* App > presenter 
  : component가 있다/ function component다 
	- import component(Footer, Auth, Navigation, Feed, Explore, Search) from 'component/xxx'
	- export default App;

* 요약
	index
		- connect with react-redux, container
	container
		- export <presenter state, props>
	presenter
		- export <template>

* 관계도
	index.js
	  : connect with react-redux, container
	  ㄴ contianer.js
			: render 함수에서 presenter(컴포넌트)로 props로 '상탯값, 속성값' 전달
			ㄴ presenter.js
				: component 작성
	
	42330 ETXFEA17_01547 퇴직금계산 컴바인 위젯 개발 요청 

	
# ?
1. Feed/index.js "mapDispatchToProps"는 언제 수행되는거지? 
	* stroe가 변경 될때 자동 호출 
	* [?] 어떻게 자동 호출 될까? 
	* 예상 
		- mapDispatchToProps > componentDidMount > componentWillReceiveProps > render(redux에서 받은 props전달)	
		
2. configureStore.js 리뷰 		
	* redux라이브러리의 combineReducers 객체는 리듀서를 합치는 과정이 있다.
	
3. redux > api actions 함수 return에 인자(dispatch, getState)두 개는 어디서 오는거지? 












---

#jquery 파헤쳐보기 
## find === filter? 
## $.each, $.trim

---

## find === filter? 
jquery.prototype.array.js
```

        /**
        var arr = [1, 7, -2, -4, 5];
        arr.find(function(n) { return n < 0; }); //=> -2
        */
        find: function (predicate, context) {
            ///<summary>Returns the first element for which the iterator returns a truthy value.</summary>

            var result;

            context = context || this;
            this.forEach(function (value, index) {
                if (predicate.call(context, value, index)) {
                    result = value;
                    return false;
                }
            });
            return result;
        },

```


## $.each, $.trim
jquery.1.10.2.js

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},


array.filter(function(v,i){
	return array.indexOf(v) === i;
}.bind(array))


