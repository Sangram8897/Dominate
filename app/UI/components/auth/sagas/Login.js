/* eslint-disable no-unused-vars */
import Actions from 'actions';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {TAG} from '../action/index';
function* callRequest({payload}) {
  //  yield call(delay,2000)
  console.warn('in saga', payload.exp);
  if (payload.exp) {
    yield put(Actions.LOGOUT());
   
  }
}

export default function* watchLogin() {
  yield takeLatest(TAG.IN, callRequest);
}

/**
import Actions from 'actions';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';

import {TAG} from '../action/index';
let timer = null;

function* callRequest({payload}) {
  console.warn('in saga', payload.exp);
  if (payload.exp) {


  }
  // yield call(newlogin, action);
}

export function* watchLogin() {
  yield takeLatest(TAG.IN, callRequest);
}


function* clearRequest() {
  console.warn('in logout saga');
  //clearTimeout();
  // yield call(newlogin, action);
}

export function* watchLogout() {
  yield takeLatest(TAG.OUT, clearRequest);
}
*/

/**
 *  setTimeout(clearRequest(), 8000);
 * clearTimeout = () => {
  if (timer) {
    clearInterval(timer);
  }
};
 */
