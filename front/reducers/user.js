/*user정보를 담고 있는 스토어
  초기 설정함수
*/
const dummyUser = {
    nickname: '코몽',
    Posts: [],
    Followings: [],
    Followers: [],
    signUpData:{},
};
export const initialState = {
    user: null,
    isLoggedIn: false,
};

export const LOG_IN = 'LOG_IN'; //액션의 이름
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';

export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    }
}
export const loginAction= {
    type: LOG_IN,
};
export const logoutAction = {
    type: LOG_OUT,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOG_IN: {
            return{
                ...state,
                isLoggedIn : true,
                user : dummyUser,
            }
        }
        case LOG_OUT: {
            return{
                ...state,
                isLoggedIn : false,
                user : null,
            }
        }
        case SIGN_UP:{
            return{
                ...state,
                signUpData: action.data,
            }
        }
        default:{
            return{
                ...state,
            }
        }
    }
}

export default reducer;