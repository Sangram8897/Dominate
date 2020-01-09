import Actions from 'actions';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';
import {url} from '../../../../../config';
import {TAG} from '../action/index';
import {postData} from 'functions/api';
export function* callRequest(payload) {
  console.warn('in saga', payload.req);
  const headers = {
    'Content-Type': 'application/json',
    workspaceId: 'payment1',
  };
  const result = yield postData(`${url}/public/login`, payload.req, headers);
  if (result.status === 200) {
    console.warn('Login Successfull');
  } else {
    console.warn('Login fail');
  }
}

function* watchLogin() {
  yield takeLatest(TAG.LOADING, callRequest);
}

export default function* Login() {
  yield all([fork(watchLogin)]);
}
