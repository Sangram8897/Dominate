import Actions from 'actions';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';
import {url} from '../../../../../config';
import {postData} from 'functions/api';
import {TAG} from './../action/SignUp';
import Plans from './Plans';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';

export function* callRequest(action) {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const result = yield postData(`${url}/public/signup`, action.data, headers);
    if (result.status === 200) {
      const res = yield result.json();
      const data = {
        email: res.email,
        workspaceId: res.workspaceId,
        workspaceUrl: res.workspaceUrl,
      };
      action.onSuccess(data);
    } else {
      action.onError();
      console.warn('in else', result);
      errorHandler(result.status);
    }
  } catch (err) {
    action.onError();
    console.warn('in catch');
    NONetworkAlert(err);
  }
}

function* watchSignUp() {
  yield takeLatest(TAG.LOADING, callRequest);
}

export default function* SignUp() {
  yield all([fork(Plans), fork(watchSignUp)]);
}
