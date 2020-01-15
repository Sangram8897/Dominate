
import Actions from 'actions';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';

import {TAG} from '../action/index';

function* clearRequest() {
  console.warn('in logout saga');
  //clearTimeout();
  // yield call(newlogin, action);
}

export default function* watchLogout() {
  yield takeLatest(TAG.OUT, clearRequest);
}

/**
 *  setTimeout(clearRequest(), 8000);
 * clearTimeout = () => {
  if (timer) {
    clearInterval(timer);
  }
};
 */ 