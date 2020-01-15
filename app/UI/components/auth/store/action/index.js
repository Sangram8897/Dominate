import {postData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import jwt_decode from 'jwt-decode';

const NAME = 'SIGN';

export const TAG = {
  IN: `${NAME}/IN`,
  OUT: `${NAME}/OUT`,
  REFRESH: `${NAME}/REFRESH`,
};

let timer;

export const AUTHENTICATE = data => async dispatch => {
  const headers = await {
    'Content-Type': 'application/json',
    workspaceId: data.workspace,
  };
  const result = await postData(`${url}/public/login`, data.loginData, headers);
  if (result.status === 200) {
    const res = await result.json();
    const userData = {
      token: res.token,
      refresh_token: res.refresh_token,
      tokenExpiresOn: res.tokenExpiresOn,
    };
    console.warn(res.refresh_token);
    // const userData = jwt_decode(JSON.stringify(res.token));
    AsyncStorage.setItem('userData', JSON.stringify(userData));
    dispatch(LOGIN(res));
  } else {
    errorHandler(result);
    return false;
  }
};

export const LOGIN = userData => async dispatch => {
  await dispatch({type: TAG.IN, payload: userData});
  var exp_time = new Date(
    Math.abs(new Date(userData.exp * 1000) - new Date()),
  ).getTime();
  //exp_time = exp_time - 60000 * 58.5;
  //dispatch(setRefreshTimer(exp_time));
};

export const LOGOUT = () => async dispatch => {
  await dispatch({type: TAG.OUT});
  clearRefreshTimer();
};

const clearRefreshTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setRefreshTimer = exp_time => {
  return dispatch => {
    timer = setTimeout(async () => {
      let data = await AsyncStorage.getItem('userData');
      const newdata = JSON.parse(data);
      dispatch(REFRESH_TOKEN(newdata.refresh_token));
    }, 2000);
  };
};

export const REFRESH_TOKEN = token => async dispatch => {
  const refresh_token = {
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiUkVGUkVTSCIsImlzcyI6ImRvbWluYXRlLmFpIiwidXNlciI6eyJfaWQiOiIxMmQyNTY0MC0zNWM3LTExZWEtOWIxMy1lYmZmMWUwNjNkOGEiLCJlbWFpbCI6InNhbmdyYW1wYXN0ZTk3ODhAZ21haWwuY29tIiwid29ya3NwYWNlSWQiOiJkb21haW4xMDUifSwiaWF0IjoxNTc5MDg1MDE1LCJleHAiOjE1NzkwOTIyMTV9.Dcwxl9kToMbKPZny0qRKyFBMHU0hJy9Ani7btZWUDxc',
  };
  const headers = await {
    'Content-Type': 'application/json',
  };
  const result = await postData(
    `${url}/public/token/refresh`,
    refresh_token,
    headers,
  );
  if (result.status === 200) {
    const res = await result.json();
    console.warn(res);

    let refreshed_userData = await {
      token: res.token,
      refresh_token: res.refresh_token,
      tokenExpiresOn: res.tokenExpiresOn,
    };
    await AsyncStorage.mergeItem(
      'userData',
      JSON.stringify(refreshed_userData),
    );
    dispatch(LOGIN(refreshed_userData));
  } else {
    console.warn('err');
    errorHandler(result);
    return false;
  }
  // await dispatch({type: TAG.REFRESH});
};
