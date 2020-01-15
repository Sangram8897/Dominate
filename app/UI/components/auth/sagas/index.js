import watchLogin from './Login';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';
import watchLogout from './Logout';
export default function* AuthSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
