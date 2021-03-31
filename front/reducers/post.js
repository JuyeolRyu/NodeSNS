export const initialState = {
    mainPosts: [{
        User:{
            id:1,
            nickname:'코몽',
        },
        content:'첫번째 게시물',
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8o9EBlf1ZD0lBbJfUcC6wRJDcMZTw8oVQA&usqp=CAU',
    }], //화면에 보일 포스트들
    imagePaths:[],//미리보기 이미지 경로
    addPostErrorReason: false,//포스트 업로드 실패 사유
    isAddingPost: false,//포스트업로드중
    postAdded: false,//포스트 업로드 성공
};

const dummyPost = {
    User: {
        id:1,
        nickname:'코몽',
    },
    content: '더미데이터입니다.'
};
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_IMAGES_REQUEST = 'LIKE_IMAGES_REQUEST';
export const LIKE_IMAGES_SUCCESS = 'LIKE_IMAGES_SUCCESS';
export const LIKE_IMAGES_FAILURE = 'LIKE_IMAGES_FAILURE';

export const UNLIKE_IMAGES_REQUEST = 'UNLIKE_IMAGES_REQUEST';
export const UNLIKE_IMAGES_SUCCESS = 'UNLIKE_IMAGES_SUCCESS';
export const UNLIKE_IMAGES_FAILURE = 'UNLIKE_IMAGES_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';
export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const addPost = {
    type:ADD_POST_REQUEST,
};

const reducer = (state = initialState,action) => {
    switch(action.type){
        case ADD_POST_REQUEST:{
            return{
                ...state,
                isAddingPost:true,
                addPostErrorReason: '',
                postAdded: false,
            };
        }
        case ADD_POST_SUCCESS:{
            return{
                ...state,
                isAddingPost:false,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            };
        }
        case ADD_POST_FAILURE:{
            return{
                ...state,
                isAddingPost:false,
                adPostErrorReason: action.error,
            };
        }
        default:{
            return{
                ...state,
            };
        }
    }
}

export default reducer;


/* 
...state
스프레드 문법
리액트는 state가 변화한것을 기준으로 리렌더링하게 된다. 하지만 참조하는 객체가 같으면 리렌더링하지 않음
따라서 새롭게 객체를 만들어줘서 리렌더링 될수있도록 하는 것
너무 많이 쓰면 가독성 떨어짐
*/