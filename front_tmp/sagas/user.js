import { all, call, fork, put, take, takeLatest, takeEvery, delay } from "@redux-saga/core/effects";
import {EDIT_NICKNAME_REQUEST,EDIT_NICKNAME_SUCCESS,EDIT_NICKNAME_FAILURE,REMOVE_FOLLOWER_REQUEST,REMOVE_FOLLOWER_SUCCESS,REMOVE_FOLLOWER_FAILURE,LOAD_FOLLOWINGS_REQUEST,LOAD_FOLLOWINGS_SUCCESS,LOAD_FOLLOWINGS_FAILURE,LOAD_FOLLOWERS_REQUEST,LOAD_FOLLOWERS_SUCCESS,LOAD_FOLLOWERS_FAILURE,UNFOLLOW_USER_REQUEST,UNFOLLOW_USER_SUCCESS,UNFOLLOW_USER_FAILURE,FOLLOW_USER_REQUEST,FOLLOW_USER_SUCCESS,FOLLOW_USER_FAILURE,LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE,SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,
        LOG_OUT_REQUEST,LOG_OUT_SUCCESS,LOG_OUT_FAILURE, LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAILURE } from '../reducers/user';
import axios from 'axios';

function logInAPI(loginData){
    //서버에 로그인 요청 보내는 코드
    return axios.post('/user/login',loginData, {
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
function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn);
}


function signUpAPI(signUpData){
    return axios.post('/user/',signUpData);
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
function* watchSignUp(){
    yield takeEvery(SIGN_UP_REQUEST,signUp);
}

function logOutAPI(){//post 두번째 인자는 data인데 빈 객체라도 넣어줘야한다
    return axios.post('/user/logout',{},{
        withCredentials: true,//쿠키를 주고 받을수 있게 해줌(서버쪽은 따로 해줘야함)
    });
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
function* watchLogOut(){
    yield takeEvery(LOG_OUT_REQUEST,logOut);
}

function loadUserAPI(userId){
    return axios.get(userId ? `/user/${userId}` : '/user/',{
        withCredentials: true,//쿠키를 주고 받을수 있게 해줌(서버쪽은 따로 해줘야함)
    });
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
function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST,loadUser);
}

function followAPI(userId){
    return axios.post(`/user/${userId}/follow`,{},{
        withCredentials: true,//쿠키를 주고 받을수 있게 해줌(서버쪽은 따로 해줘야함)
    });
}
function* follow(action){
    try{
        const result = yield call(followAPI, action.data);
        yield put({ //put 은 dispatch 와 동일한 기능을 한다
            type: FOLLOW_USER_SUCCESS,
            data: result.data,
        })
    }catch(e){
        //로그인 실패시
        console.error(e);
        yield put({
            type: FOLLOW_USER_FAILURE,
            error:e
        })
    }
}
function* watchFollow(){
    yield takeEvery(FOLLOW_USER_REQUEST,follow);
}

function unfollowAPI(userId){
    return axios.delete(`/user/${userId}/follow`,{},{
        withCredentials: true,//쿠키를 주고 받을수 있게 해줌(서버쪽은 따로 해줘야함)
    });
}
function* unfollow(action){
    try{
        const result = yield call(unfollowAPI, action.data);
        yield put({ //put 은 dispatch 와 동일한 기능을 한다
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data,
        })
    }catch(e){
        //로그인 실패시
        console.error(e);
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error:e
        })
    }
}
function* watchUnfollow(){
    yield takeEvery(UNFOLLOW_USER_REQUEST,unfollow);
}

function loadFollowersAPI(userId){
    return axios.get(`/user/${userId}/followers`,{},{
        withCredentials: true,//쿠키를 주고 받을수 있게 해줌(서버쪽은 따로 해줘야함)
    });
}
function* loadFollowers(action){
    try{
        const result = yield call(loadFollowersAPI, action.data);
        yield put({ //put 은 dispatch 와 동일한 기능을 한다
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        })
    }catch(e){
        //로그인 실패시
        console.error(e);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error:e
        })
    }
}
function* watchLoadFollowers(){
    yield takeEvery(LOAD_FOLLOWERS_REQUEST,loadFollowers);
}

function loadFollowingsAPI(userId){
    return axios.get(`/user/${userId}/followings`,{},{
        withCredentials: true,//쿠키를 주고 받을수 있게 해줌(서버쪽은 따로 해줘야함)
    });
}
function* loadFollowings(action){
    try{
        const result = yield call(loadFollowingsAPI, action.data);
        yield put({ //put 은 dispatch 와 동일한 기능을 한다
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        })
    }catch(e){
        //로그인 실패시
        console.error(e);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error:e
        })
    }
}
function* watchLoadFollowings(){
    yield takeEvery(LOAD_FOLLOWINGS_REQUEST,loadFollowings);
}

function removeFollowerAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.delete(`/user/${userId}/follower`, {
      withCredentials: true,
    });
}

function* removeFollower(action) {
    try {
        // yield call(loadFollowersAPI);
        const result = yield call(removeFollowerAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: e,
        });
    }
}

function* watchRemoveFollower() {
    yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function watchEditNicknameAPI(nickname) {
    // 서버에 요청을 보내는 부분
    return axios.patch('/user/nickname', {nickname},{
      withCredentials: true,
    });
}

function* editNickname(action) {
    try {
        // yield call(loadFollowersAPI);
        const result = yield call(watchEditNicknameAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: EDIT_NICKNAME_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: EDIT_NICKNAME_FAILURE,
            error: e,
        });
    }
}

function* watchEditNickname() {
    yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
    ]);
}