import {postData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';

const ACTION = 'LEADS';

export const LEADS = {
  LOADING: `${ACTION}/LOADING`,
  SUCCESS: `${ACTION}/SUCCESS`,
  FAIL: `${ACTION}/FAIL`,
};

export const GET_ALL_LEADS = formData => async dispatch => {
  await dispatch({type: LEADS.LOADING});
  let data1 = await AsyncStorage.getItem('userData');
  const newdata = JSON.parse(data1);
  const headers = await {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newdata.token,
  };
  const allLeadQuery = {
    // pageNo: 10,
    // pageSize: 0,
    query: {},
  };
  try {
    const result = await postData(
      `${url}/api/leads/search`,
      allLeadQuery,
      headers,
    );
    if (result.status === 200) {
      const res = await result.json();
      await dispatch({type: LEADS.SUCCESS, payload: res});
    } else {
      await dispatch({type: LEADS.FAIL});
      errorHandler(result.status);
    }
  } catch (err) {
    console.warn('leading soon fail catch');
  }
};
//http://18.234.225.144/dinner/all_dinner
