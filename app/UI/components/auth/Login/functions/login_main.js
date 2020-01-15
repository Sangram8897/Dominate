import {postData} from '../../../../../functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import jwt_decode from 'jwt-decode';

export const setLogin = async data => {
  if (data) {
    const headers = await {
      'Content-Type': 'application/json',
      workspaceId: data.workspace,
    };
    const result = await postData(
      `${url}/public/login`,
      data.loginData,
      headers,
    );
    if (result.status === 200) {
      const res = await result.json();
      const userData = jwt_decode(JSON.stringify(res.token));
      AsyncStorage.setItem('userData', JSON.stringify(userData));
      // var exp_time = new Date(
      //   Math.abs(new Date(decoded.exp * 1000) - new Date()),
      // ).getTime();
      return userData;
    } else {
      errorHandler(result);
      return false;
    }
  }
};
