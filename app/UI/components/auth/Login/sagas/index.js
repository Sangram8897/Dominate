/* eslint-disable no-undef */
import jwt_decode from 'jwt-decode';
import {put, call, all, fork, take, takeLatest} from 'redux-saga/effects';
import {url} from '../../../../../config';
import {TAG} from '../action/Login';
import {postData} from 'functions/api';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import Actions from 'actions';

export function* callRequest(action) {
  // console.warn('in saga', action.req_data);
  const headers = {
    'Content-Type': 'application/json',
    workspaceId: action.req_data.workspace,
  };
  const result = yield postData(
    `${url}/public/login`,
    action.req_data.loginData,
    headers,
  );
  if (result.status === 200) {
    const res = yield result.json();
    AsyncStorage.setItem('userData', JSON.stringify(res));
    const decoded = jwt_decode(JSON.stringify(res.token));
    // var exp_time = new Date(
    //   Math.abs(new Date(decoded.exp * 1000) - new Date()),
    // ).getTime();
    var exp_time = 2000;
    console.warn(res);
    console.warn(decoded);
    console.warn(exp_time, 'current');
    action.onSuccess();
  } else {
    console.warn('Login fail');
    action.onError();
  }
}

function* watchLogin() {
  yield takeLatest(TAG.LOADING, callRequest);
}

export default function* Login() {
  yield all([fork(watchLogin)]);
}

/**
 *  if (b > a) {
      let u = Moment(1578766069).format('DD-MM-YYYY');
      console.warn(u);
      let s = Moment(1578770532).format('hh:mm A');
      console.warn(s);
      let k = Moment(b).format('hh:mm A');
      console.warn(k);
    }
 */
