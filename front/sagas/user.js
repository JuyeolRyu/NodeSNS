import { all, call, fork, put, take, takeLatest, takeEvery, delay } from "@redux-saga/core/effects";
import {LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE,SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE } from '../reducers/user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065/api';
function* loginAPI(loginData){
    //서버에 로그인 요청 보내는 코드
    return axios.post('/user/login',loginData);
}
function* signUpAPI(signUpData){
    return axios.post('/user/',signUpData);
}
function* login(action){
    try{
        //서버에 loginAPI 요청 보냄
        const result = yield call(loginAPI,action.data);//로그인된 사용자 정보 result로 받음
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

//LOG_IN 액션을 기다림
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchSignUp(){
    yield takeEvery(SIGN_UP_REQUEST,signUp);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
    ]);
}