import {all, call} from 'redux-saga/effects';
import user from './user';
import post from './post';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3065/api';
axios.defaults.withCredentials = true;

export default function* rootSaga(){
    //리듀서와 마찬가지로 루트 사가에서 합쳐준다
    yield all([
        call(user),
        call(post),
    ]);

}