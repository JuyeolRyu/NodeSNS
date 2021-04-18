/*user정보를 담고 있는 스토어
  초기 설정함수
*/
export const initialState = {
    me: null,
    isLoggingOut: false,//로그아웃 시도중
    isLoggingIn: false,//로그인 시도중
    logInErrorReason:'',//로그인 실패 이유
    isSignedUp: false,//회원가입 성공
    isSigningUp: false,//회원가입 시도중
    signUpErrorReason: '',//회원가입 실패 이유
    followingList:[],//팔로잉리스트
    followerList:[],//팔로워 리스트
    userInfo: null,//남의 정보
};
//서버쪽에 다녀와야하는 액션
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; //액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
//export const INCREMENT_NUMBER;

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOG_IN_REQUEST: {
            return{
                ...state,
                isLoggingIn: true,
            };
        }
        //로그인 사이클
        case LOG_IN_SUCCESS:{
            return{
                ...state,
                isLoggingIn: false,
                me : action.data,
                isLoading: false,
            }
        }
        case LOG_IN_FAILURE:{
            return{
                ...state,
                isLogginIn:false,
                logInErrorReason: action.error,
                me : null,
            }
        }
        case LOG_OUT_REQUEST: {
            return{
                ...state,
                isLoggingOut: true,
            }
        }
        case LOG_OUT_SUCCESS: {
            return{
                ...state,
                isLoggingOut: false,
                me : null,
            };
        }
        //회원가입 사이클
        case SIGN_UP_REQUEST:{
            return{
                ...state,
                isSigningUp: true,
            };
        }
        case SIGN_UP_SUCCESS:{
            return{
                ...state,
                isSigningUp: false,
                isSignedUp: true,
            };
        }
        case SIGN_UP_FAILURE:{
            return{
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error,
            };
        }
        case LOAD_USER_REQUEST:{
            return{
                ...state,
            };
        }
        case LOAD_USER_SUCCESS:{
            if(action.me){
                return{
                    ...state,
                    me: action.data,
                };
            }
            return {
                ...state,
                userInfo: action.data,
            }
        }
        case LOAD_USER_FAILURE:{
            return{
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error,
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