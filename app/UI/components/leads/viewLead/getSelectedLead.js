import Actions from 'actions';
import {url} from 'config';
import {getData, postData} from 'functions/api';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import AsyncStorage from '@react-native-community/async-storage';

export const getSelectedLead = async leadname => {
  let data1 = await AsyncStorage.getItem('userData');
  const newdata = JSON.parse(data1);
  const headers = await {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + newdata.token,
  };
  let error = [];
  const allLeadQuery = {
    // pageNo: 1,
    // pageSize: 0,
    query: {
      name: leadname,
    },
  };
  try {
    const result = await postData(
      `${url}/api/leads/search`,
      allLeadQuery,
      headers,
    );
    if (result.status === 200) {
      let res = await result.json();
      return res;
    } else {
      console.warn('not ok');
    }
  } catch (err) {
    return false;
  }
};
//{{url}}/api/leads/search/text?text=hot&isHidden=false&assigned=83987620-8212-11e9-9932-5b1fa6f8b7ce&status=ACTIVE
