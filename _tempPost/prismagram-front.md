* App
	- login
* Feed.js 
	- useQuery(FEED_QUERY): 조회 
* PostContainer.js
	- useMutation(TOGGLE_LIKE, { });
	- useMutation(ADD_COMMENT, { });
		- TOGGLE_LIKE, ADD_COMMENT: query 
		- useMutation: C,R,D
	
src\Components\App.js
    - useQuery
		- isLoggedIn

src\Components\Header.js
    - useQuery
		- me
		: 본인 여부 

src\Components\FollowButton\FollowButtonContainer.js
	- const [followMutation] = useMutation(FOLLOW, { variables: { id } });
	- const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

src\Components\Post\PostContainer.js
    - useMutation(TOGGLE_LIKE, { });
	- useMutation(ADD_COMMENT, { });
		- TOGGLE_LIKE, ADD_COMMENT: query 		


src\Routes\Feed.js
    - useQuery
		: FEED_QUERY

src\Routes\Auth\AuthContainer.js
	- const [requestSecretMutation] = useMutation(LOG_IN, {
	variables: { email: email.value }
	});

	- const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
	variables: {
	  email: email.value,
	  username: username.value,
	  firstName: firstName.value,
	  lastName: lastName.value
	}
	});

	- const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
	variables: {
	  email: email.value,
	  secret: secret.value
	}
	})

	- const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

		

src\Routes\Profile\ProfileContainer.js
	- const { data, loading } = useQuery(GET_USER, { variables: { username } });
	- const [logOut] = useMutation(LOG_OUT);

src\Routes\Search\SearchContainer.js
	- const { data, loading } = useQuery(SEARCH, {
		skip: term === undefined,
		variables: {
		  term
		}
	});
