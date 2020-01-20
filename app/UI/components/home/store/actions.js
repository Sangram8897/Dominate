import {postData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import jwt_decode from 'jwt-decode';

const ACTION1 = 'LEADS_COUNT';
const ACTION2 = 'MEETINGS_COUNT';

export const LEADS_COUNT = {
  LOADING: `${ACTION1}/LOADING`,
  SUCCESS: `${ACTION1}/SUCCESS`,
  FAIL: `${ACTION1}/FAIL`,
};
export const MEETINGS_COUNT = {
  LOADING: `${ACTION2}/LOADING`,
  SUCCESS: `${ACTION2}/SUCCESS`,
  FAIL: `${ACTION2}/FAIL`,
};
export const GET_ALL_LEADS_COUNT = () => async dispatch => {
    await dispatch({type: LEADS_COUNT.LOADING});
  console.warn('getting soon');
};
export const GET_ALL_MEETINGS_COUNT = () => async dispatch => {
  console.warn('getting soon');
};
