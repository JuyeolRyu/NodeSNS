import { all, delay, fork, put, takeLatest, call } from "@redux-saga/core/effects";
import axios from "axios";
import { useCallback } from "react";
import {ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_FAILURE,ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
    ,LOAD_MAIN_POSTS_REQUEST,LOAD_MAIN_POSTS_SUCCESS,LOAD_MAIN_POSTS_FAILURE} from '../reducers/post';

function addPostAPI(postData) {
    return axios.post('/post', postData, {
        withCredentials: true,
    })
}
function* addPost(action){
    try{
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
    }catch(e){
        yield put({
            type:ADD_POST_FAILURE,
            error: e
        })
    }
}
function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,addPost);
}

function addCommentAPI() {
    //todo
}
function* addComment(action){
    try{
        yield delay(2000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId:action.data.postId,
            },
        });
    }catch(e){
        yield put({
            type:ADD_COMMENT_FAILURE,
            error:e
        })
    }
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment);
}

function loadMainPostsAPI() {
    return axios.get('/posts');
}
function* loadMainPosts(action){
    try{
        const result = yield call(loadMainPostsAPI);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data,
        });
    }catch(e){
        yield put({
            type:LOAD_MAIN_POSTS_FAILURE,
            error:e
        })
    }
}
function* watchLoadMainPosts(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST,loadMainPosts);
}
export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadMainPosts),
        fork(watchAddComment),
    ]);
}