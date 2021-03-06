export const initialState = {
    mainPosts: [], //화면에 보일 포스트들
    imagePaths:[],//미리보기 이미지 경로
    addPostErrorReason: false,//포스트 업로드 실패 사유
    isAddingPost: false,//포스트업로드중
    postAdded: false,//포스트 업로드 성공
    isAddingComment: false,
    CommentAdded: false,
    addCommentErrorReason: '',
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

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const addPost = {
    type:ADD_POST_REQUEST,
};

const reducer = (state = initialState,action) => {
    switch(action.type){
        //retweet
        case RETWEET_REQUEST:{
            return{
                ...state,
            };
        }
        case RETWEET_SUCCESS:{
            return{
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            };
        }
        case RETWEET_FAILURE:{
            return{
                ...state,
            };
        }
        //like
        case LIKE_POST_REQUEST:{
            return{
                ...state,
            };
        }
        case LIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex((v => v.id === action.data.postId))
            const post = state.mainPosts[postIndex];
            const Likers = [{ id:action.data.userId}, ...post.Likers];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post,Likers};
            return{
                ...state,
                mainPosts,
            };
        }
        case LIKE_POST_FAILURE:{
            return{
                ...state,
            };
        }
        case UNLIKE_POST_REQUEST:{
            return{
                ...state,
            };
        }
        case UNLIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex((v => v.id === action.data.postId))
            const post = state.mainPosts[postIndex];
            const Likers = [post.Likers.filter(v=>v.id === action.data.postId)];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post,Likers};
            return{
                ...state,
                mainPosts,
            };
        }
        case UNLIKE_POST_FAILURE:{
            return{
                ...state,
            };
        }
        case REMOVE_IMAGE:{
            return {
                ...state,
                imagePaths: state.imagePaths.filter((v,i)=> i !== action.index),
            };
        }
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
                mainPosts: [action.data, ...state.mainPosts],
                postAdded: true,
                imagePaths: [],
            };
        }
        case ADD_POST_FAILURE:{
            return{
                ...state,
                isAddingPost:false,
                adPostErrorReason: action.error,
            };
        }
        case ADD_COMMENT_REQUEST:{
            return{
                ...state,
                isAddingComment:true,
                addCommentErrorReason: '',
                CommentAdded: false,
            };
        }
        case ADD_COMMENT_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v=>v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Comments = [...post.Comments, action.data.comment];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Comments};
            return{
                ...state,
                isAddingComment:false,
                mainPosts,
                CommentAdded: true,
            };
        }
        case ADD_COMMENT_FAILURE:{
            return{
                ...state,
                isAddingComment:false,
                addCommentErrorReason: action.error,
            };
        }
        case LOAD_COMMENTS_SUCCESS:
            const postIndex = state.mainPosts.findIndex(v=>v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Comments = action.data.comments;
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post,Comments};
            return {
                ...state,
                mainPosts,
            }
        case LOAD_MAIN_POSTS_REQUEST:
        case LOAD_USER_POSTS_REQUEST:
        case LOAD_HASHTAG_POSTS_REQUEST:{//같은 기능을 수행하는 케이스의 경우
            return{
                ...state,
                mainPosts: [],
            };
        }
        case LOAD_MAIN_POSTS_SUCCESS:
        case LOAD_USER_POSTS_SUCCESS:
        case LOAD_HASHTAG_POSTS_SUCCESS:{
            return{
                ...state,
                mainPosts: action.data,
            };
        }
        case LOAD_MAIN_POSTS_FAILURE:
        case LOAD_USER_POSTS_FAILURE:
        case LOAD_HASHTAG_POSTS_FAILURE:{
            return{
                ...state,
            };
        }
        case UPLOAD_IMAGES_REQUEST:{
            return{
                ...state,
            };
        }
        case UPLOAD_IMAGES_SUCCESS:{
            return{
                ...state,
                imagePaths: [...state.imagePaths, ...action.data],
            };
        }
        case UPLOAD_IMAGES_FAILURE:{
            return{
                ...state,
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