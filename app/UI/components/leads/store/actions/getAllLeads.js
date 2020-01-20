import {postData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import jwt_decode from 'jwt-decode';

export const GET_ALL_LEADS = formData => async dispatch => {
  console.warn('leading soon');
  const headers = await {
    'Content-Type': 'application/json',
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
      console.warn(res);
      //return res.plans;
    } else {
      console.warn('leading soon fail');
      errorHandler(result.status);
      return false;
    }
  } catch (err) {
    console.warn('leading soon fail catch');
    return false;
  }
};
//http://18.234.225.144/dinner/all_dinner