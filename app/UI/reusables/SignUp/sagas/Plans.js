import Actions from 'actions';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';

import {TAG} from './../action/Plans';
import {url} from 'config';
import {getData} from 'functions/api';
import {SnackMessage, NONetworkAlert,errorHandler} from 'functions/message';
export function* callRequest(action) {
  try {
    const result = yield getData(`${url}/public/plans`, {});
    if (result.status === 200) {
      const res = yield result.json();
      action.onSuccess(res.plans);
    } else {
      errorHandler(result.status);
      action.onError();
    }
  } catch (err) {
    action.onError();
    NONetworkAlert(err);
  }
}

function* watchPlans() {
  yield takeLatest(TAG.LOADING, callRequest);
}

export default function* Plans() {
  yield all([fork(watchPlans)]);
}
