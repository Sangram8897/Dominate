import Actions from 'actions';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';

import {TAG} from './../action/Plans';
import {url} from 'config';
import {getData} from 'functions/api';

export function* callRequest() {
  const result = yield getData(`${url}/public/plans`, {});
  if (result.status === 200) {
    const res = yield result.json();
    console.warn('Plans Successfull', res);
  } else {
    console.warn('Plans fail');
  }
}

function* watchPlans() {
  yield takeLatest(TAG.LOADING, callRequest);
}

export default function* Plans() {
  yield all([fork(watchPlans)]);
}
