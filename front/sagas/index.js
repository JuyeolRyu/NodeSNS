import {all, call} from 'redux-saga/effects';
import user from './user';
import post from './post';

export default function* rootSaga(){
    //리듀서와 마찬가지로 루트 사가에서 합쳐준다
    yield all([
        call(user),
        call(post),
    ]);

}