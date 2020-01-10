import Actions from 'actions';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';
import {url} from '../../../../../config';
import {postData} from 'functions/api';
import {TAG} from './../action/SignUp';
import Plans from './Plans';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';

export function* callRequest(action) {
  console.warn('in saga', action.data);
  try {
    const result = yield postData(`${url}/public/signup`, action.data, {});
    if (result.status === 200) {
      const res = yield result.json();
     console.warn('Success')
    } else {
      errorHandler(result.status);
     console.warn('fail')
    }
  } catch (err) {
   console.warn('fail')
    NONetworkAlert(err);
  }
}

function* watchSignUp() {
  yield takeLatest(TAG.LOADING, callRequest);
}

export default function* SignUp() {
  yield all([fork(Plans), fork(watchSignUp)]);
}
