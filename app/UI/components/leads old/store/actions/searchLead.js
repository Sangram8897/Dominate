import {postData, putData} from 'functions/api';
import {url} from 'config/index';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';



export const SEARCH_LEADS = (formData, onSuccess) => async dispatch => {
  let data1 = await AsyncStorage.getItem('userData');
  const newdata = JSON.parse(data1);
  const headers = await {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newdata.token,
  };

  try {
    const result = await postData(`${url}/api/leads/search`, formData, headers);
    if (result.status === 200) {
      const res = await result.json();
      onSuccess(res);
    } else {
      errorHandler(result.status);
    }
  } catch (err) {
    console.warn('leading soon fail catch');
  }
};