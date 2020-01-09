import Actions from 'actions';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';


import {TAG} from './../action/index';

export function* callRequest({payload}) {
    console.warn('in saga')
  // yield call(newlogin, action);
}

function* watchSignUp() {
  yield takeLatest(TAG.LOADING, callRequest);
}

export default function* SignUp() {
  yield all([fork(watchSignUp)]);
}
