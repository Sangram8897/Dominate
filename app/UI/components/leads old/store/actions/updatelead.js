import {putData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import Actions from 'action';
import {Item} from 'native-base';

const ACTION = 'LEADS';

export const LEADS = {
  LOADING: `${ACTION}/LOADING`,
  SUCCESS: `${ACTION}/SUCCESS`,
  FAIL: `${ACTION}/FAIL`,
};

export const UPDATE_LEAD_STATUS = (leadId, formData) => async dispatch => {
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
      console.warn('OK');
      return {SUCCESS: true};
    } else {
      errorHandler(result.status);
      return {SUCCESS: false};
    }
  } catch (err) {
    return {SUCCESS: false};
  }
};
//http://18.234.225.144/dinner/all_dinner
