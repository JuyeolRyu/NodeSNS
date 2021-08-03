import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import post from './post';
import {backurl} from '../config/config';

axios.defaults.baseURL = `${backurl}/api`;

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(post),
  ]);
}