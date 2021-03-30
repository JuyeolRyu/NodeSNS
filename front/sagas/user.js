import { all, call, fork, put, take, takeLatest } from "@redux-saga/core/effects";
import {LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILURE } from '../reducers/user';

const HELLO_SAGA = 'HELLO_SAGA';

function* loginAPI(){
    //서버에 로그인 요청 보내는 코드
}
function* login(){
    try{
        //서버에 loginAPI 요청 보냄
        yield call(loginAPI);
        //로그인 성공시
        yield put({ //put 은 dispatch 와 동일한 기능을 한다
            type: LOG_IN_SUCCESS,
        })
    }catch(e){
        //로그인 실패시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        })
    }
}

//LOG_IN 액션을 기다림
function* watchLogin(){
    yield takeLatest(LOG_IN, login)
}

function* helloSaga(){
    console.log('before saga');
    //일종의 이벤트리스너라고 생각하자
    while(true){//무한히 HELLO_SAGA라는 액션이 들어오는것을 기다린다.
        yield take(HELLO_SAGA);
        console.log('hello saga');
    }
    //비동기 요청, 타이머 코드 넣을수 있다.
}
export default function* userSaga(){
    yield helloSaga();
}
