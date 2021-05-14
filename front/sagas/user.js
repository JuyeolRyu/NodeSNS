import { all, call, fork, put, take, takeLatest, takeEvery, delay } from "@redux-saga/core/effects";
import {LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE,SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,
        LOG_OUT_REQUEST,LOG_OUT_SUCCESS,LOG_OUT_FAILURE, LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAILURE } from '../reducers/user';
import axios from 'axios';

function logInAPI(loginData){
    //서버에 로그인 요청 보내는 코드
    return axios.post('/user/login',loginData, {
        withCredentials: true,//쿠키를 주고 받을수 있게 해줌(서버쪽은 따로 해줘야함)
    });
}
function signUpAPI(signUpData){
    return axios.post('/user/',signUpData);
}
function logOutAPI(){//post 두번째 인자는 data인데 빈 객체라도 넣어줘야한다
    return axios.post('/user/logout',{},{
        withCredentials: true,//쿠키를 주고 받을수 있게 해줌(서버쪽은 따로 해줘야함)
    });
}
function loadUserAPI(userId){
    return axios.get(userId ? `/user/${userId}` : '/user/',{
        withCredentials: true,//쿠키를 주고 받을수 있게 해줌(서버쪽은 따로 해줘야함)
    });
}
function* logIn(action){
    try{
        //서버에 loginAPI 요청 보냄
        const result = yield call(logInAPI,action.data);//로그인된 사용자 정보 result로 받음
        //로그인 성공시
        yield put({ //put 은 dispatch 와 동일한 기능을 한다
            type: LOG_IN_SUCCESS,
            data: result.data,
        })
    }catch(e){
        //로그인 실패시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        })
    }
}
function* signUp(action){
    try{
        yield call(signUpAPI,action.data);
        yield put({ //put 은 dispatch 와 동일한 기능을 한다
            type: SIGN_UP_SUCCESS,
        })
    }catch(e){
        //로그인 실패시
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            
        })
    }
}
function* logOut(action){
    try{
        yield call(logOutAPI,action.data);
        yield put({ //put 은 dispatch 와 동일한 기능을 한다
            type: LOG_OUT_SUCCESS,
        })
    }catch(e){
        //로그인 실패시
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            
        })
    }
}
function* loadUser(action){
    try{
        const result = yield call(loadUserAPI, action.data);
        yield put({ //put 은 dispatch 와 동일한 기능을 한다
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data
        })
    }catch(e){
        //로그인 실패시
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error:e
        })
    }
}
//액션을 기다림
function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchSignUp(){
    yield takeEvery(SIGN_UP_REQUEST,signUp);
}

function* watchLogOut(){
    yield takeEvery(LOG_OUT_REQUEST,logOut);
}

function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST,loadUser);
}

export default function* userSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchSignUp),
    ]);
}