/* eslint-disable no-undef */
import {postData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';

const ACTION = 'LEADS';

export const LEADS = {
  LOADING: `${ACTION}/LOADING`,
  SUCCESS: `${ACTION}/SUCCESS`,
  LOADMORE: `${ACTION}/LOADMORE`,
  UPDATE: `${ACTION}/UPDATE`,
  UPDATE2: `${ACTION}/UPDATE2`,
  FAIL: `${ACTION}/FAIL`,
};

export const GET_ALL_LEADS = (_pageno, _category) => async dispatch => {
  await dispatch({type: LEADS.LOADING});
  let data1 = await AsyncStorage.getItem('userData');
  const newdata = JSON.parse(data1);
  const headers = await {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newdata.token,
  };

  const allLeadQuery = {
    pageNo: _pageno,
    pageSize: 10,
    query: {},
  };
  await checkSwitch(allLeadQuery, _category);
  try {
    const result = await postData(
      `${url}/api/leads/search`,
      allLeadQuery,
      headers,
    );
    if (result.status === 200) {
      const res = await result.json();
      await dispatch({type: LEADS.SUCCESS, payload: res});
      return {SUCCESS: true};
    } else {
      await dispatch({type: LEADS.FAIL});
      errorHandler(result.status);
    }
    return false;
  } catch (err) {
    console.warn('leading soon fail catch');
    return {SUCCESS: true};
  }
};

checkSwitch = (allLeadQuery, param) => {
  switch (param) {
    case 'ALL':
      return allLeadQuery;

    case 'SUPER_HOT':
      return (allLeadQuery.query.degree = 'SUPER_HOT');

    case 'HOT':
      return (allLeadQuery.query.degree = 'HOT');

    case 'WARM':
      return (allLeadQuery.query.degree = 'WARM');

    case 'COLD':
      return (allLeadQuery.query.degree = 'COLD');

    default:
      return allLeadQuery;
  }
};

export const STATIC_UPDATE_LEAD_STATUS = item => async dispatch => {
  // console.warn(item)
  dispatch({type: LEADS.UPDATE, payload: item});
};
//http://18.234.225.144/dinner/all_dinner
export const LOAD_MORE_LEADS = (_pageno, _category) => async dispatch => {

  let data1 = await AsyncStorage.getItem('userData');
  const newdata = JSON.parse(data1);
  const headers = await {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newdata.token,
  };
  const allLeadQuery = {
    pageNo: _pageno,
    pageSize: 10,
    query: {},
  };
  await checkSwitch(allLeadQuery, _category);
  try {
    const result = await postData(
      `${url}/api/leads/search`,
      allLeadQuery,
      headers,
    );
    if (result.status === 200) {
      const res = await result.json();
      return res;
    } else {
      errorHandler(result.status);
    }
    return false;
  } catch (err) {
    console.warn('leading soon fail catch');
    return {SUCCESS: true};
  }
};

export const UPDATE_MORE_LEADS = item => async dispatch => {
  dispatch({type: LEADS.LOADMORE, payload: item});
};
