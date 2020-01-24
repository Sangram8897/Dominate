import {postData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import jwt_decode from 'jwt-decode';

const NAME = 'SIGN';

export const TAG = {
  IN: `${NAME}/IN`,
  UP: `${NAME}/UP`,
  OUT: `${NAME}/OUT`,
  REFRESH: `${NAME}/REFRESH`,
  CONTINUE: `${NAME}/CONTINUE`,
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
    const TokenData = await jwt_decode(JSON.stringify(res.token));
    console.warn(res.token)
    const userData = {
      token: res.token,
      refresh_token: res.refresh_token,
      exp: TokenData.exp,
    };
    AsyncStorage.setItem('userData', JSON.stringify(userData));
    await dispatch({type: TAG.UP, payload:{}});
    dispatch(LOGIN(res));
  } else {
    errorHandler(result);
    return false;
  }
};

export const LOGIN = userData => async dispatch => {
  await dispatch({type: TAG.IN, payload: userData});
  let data = await AsyncStorage.getItem('userData');
  const newdata = JSON.parse(data);
  var exp_time = new Date(
    Math.abs(new Date(newdata.exp * 1000) - new Date()),
  ).getTime();
  //var minutes = Moment.duration(exp_time).minutes();
  // console.warn('in login', minutes);
  //exp_time = exp_time - 60000 * 58.5;

  //   dispatch(setRefreshTimer(exp_time));
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
    refresh_token: token,
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
    const TokenData = await jwt_decode(JSON.stringify(res.token));
    let refreshed_userData = await {
      token: res.token,
      refresh_token: res.refresh_token,
      exp: TokenData.exp,
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

export const SIGNUP = userData => async dispatch => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const result = await postData(`${url}/public/signup`, userData, headers);
    if (result.status === 200) {
      const res = await result.json();
      const data = {
        email: res.email,
        workspaceId: res.workspaceId,
        workspaceUrl: res.workspaceUrl,
      };
      await dispatch({type: TAG.UP});
      return data;
    } else {
      errorHandler(result.status);
    }
  } catch (err) {
    return false;
  }
};

export const SIGNUPCONTINUE = userData => async dispatch => {
  await dispatch({type: TAG.CONTINUE, payload: userData});
};
