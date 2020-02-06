/* eslint-disable no-undef */
import {postData, getData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';

let userData = AsyncStorage.getItem('userData');
let newuserData = JSON.parse(userData);

let headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + newuserData.token,
};

export const GET_DATA_SORTED = (_sub, _pageno) => async dispatch => {
  const allLeadQuery = {
    pageNo: _pageno,
    pageSize: 10,
    query: {},
  };
  // await checkSwitch(allLeadQuery, _category);
  const result = await postData(
    `${url}/api/${_sub}/search`,
    allLeadQuery,
    headers,
  ); //LEADS,CUSTOMER,USERS

  if (result.status === 200) {
    const res = await result.json();
  } else {
    errorHandler(result.status);
  }
  return false;
};

export const GET_DATA = _sub => async dispatch => {
  // await checkSwitch(allLeadQuery, _category);
  const result = await postData(`${url}/api/${_sub}/search`, headers); //LEADS,CUSTOMER,USERS

  if (result.status === 200) {
    const res = await result.json();
  } else {
    errorHandler(result.status);
  }
  return false;
};

export const GET_COUNTS = _sub => async dispatch => {
  const result = await getData(
    `${url}/api/${_sub}/count`,
    allLeadQuery,
    headers,
  ); //LEADS,CUSTOMER,USERS,TASKS,ACTIVITIES

  if (result.status === 200) {
    const res = await result.json();
  } else {
    errorHandler(result.status);
  }
  return false;
};

export const LIVE_SEARCH = (formData, _sub) => async dispatch => {
  const result = await postData(`${url}/api/${_sub}/search`, formData, headers);
  if (result.status === 200) {
    const res = await result.json();
  } else {
    errorHandler(result.status);
  }
};
