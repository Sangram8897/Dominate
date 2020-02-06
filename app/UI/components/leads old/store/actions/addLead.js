import {postData, putData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import Actions from 'action';

const ACTION = 'LEADS';

export const LEADS = {
  LOADING: `${ACTION}/LOADING`,
  SUCCESS: `${ACTION}/SUCCESS`,
  FAIL: `${ACTION}/FAIL`,
};

export const ADD_LEAD = (formData, onSuccess) => async dispatch => {
  let data1 = await AsyncStorage.getItem('userData');
  const newdata = JSON.parse(data1);
  const headers = await {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newdata.token,
  };

  try {
    const result = await postData(`${url}/api/leads`, formData, headers);
    if (result.status === 200) {
      const res = await result.json();
      console.warn('working', res);
      dispatch(Actions.GET_ALL_LEADS());
      onSuccess();
    } else {
      errorHandler(result.status);
    }
  } catch (err) {
    console.warn('leading soon fail catch');
  }
};
export const UPDATE_LEAD = (leadId, formData, onSuccess) => async dispatch => {
  let data1 = await AsyncStorage.getItem('userData');
  const newdata = JSON.parse(data1);
  const headers = await {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newdata.token,
  };

  try {
    const result = await putData(
      `${url}/api/leads/${leadId}`,
      formData,
      headers,
    );
    if (result.status === 200) {
      const res = await result.json();
      await dispatch(Actions.GET_ALL_LEADS());
      onSuccess();
    } else {
      errorHandler(result.status);
    }
  } catch (err) {
    console.warn('leading soon fail catch');
  }
};
//http://18.234.225.144/dinner/all_dinner
