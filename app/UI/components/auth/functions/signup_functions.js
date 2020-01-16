import Actions from 'actions';
import {url} from 'config';
import {getData} from 'functions/api';
import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';

export const get_Plans = async data => {
    const headers = await {
        'Content-Type': 'application/json',
      };
  try {
    const result = await getData(`${url}/public/plans`, headers);
    if (result.status === 200) {
      const res = await result.json();
      return res.plans;
    } else {
      errorHandler(result.status);
      return false;
    }
  } catch (err) {
    return false;
  }
};
export const set_Users = no => {
  if (no == 1) {
    return '1';
  }
  if (no == 5) {
    return '2-5';
  }
  if (no == 10) {
    return '6-10';
  }
  if (no == 15) {
    return '11-15';
  }
  return null;
};

export const plan_Checker = (plans, signupdata) => {
  const isPlan_selected = plans.some(item => {
    return item.isEnterprise === true;
  });
  if (!isPlan_selected) {
    throw new Error('Please Comfirm your Package !');
  }

  const data = plans.filter(value => {
    return value.isEnterprise === true;
  });

  const result = {
    // organizationName: signupdata._workspace.toLowerCase(),
    // workspaceId: signupdata._workspace.toLowerCase(),
    // billingType: data[0].label,
    // defaultUserEmailId: signupdata._companyemail,
    // defaultUserPassword: signupdata._password,
    // defaultUserFirstName: signupdata._firstname,
    // defaultUserLastName: signupdata._lastname,
    // features: ['call'],
    organizationName: 'domain143',
    workspaceId: 'domain143',
    billingType: 'SPACESHIP',
    defaultUserEmailId: 'sangrampaste9788@gmail.com',
    defaultUserPassword: '123456',
    defaultUserFirstName: 'Sangram',
    defaultUserLastName: 'Paste',
    features: ['call'],
  };
  return result;
};
