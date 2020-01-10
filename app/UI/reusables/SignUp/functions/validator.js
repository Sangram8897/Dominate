export const signupFields_Validation = data => {
  if (
    !data._firstname &&
    !data._lastname &&
    !data._workspace &&
    !data._companyemail &&
    !data._password &&
    !data._confirmpassword
  ) {
    throw new Error('Please enter All the fields');
  }
  if (!data._firstname) {
    throw new Error('Please enter your first name');
  }
  if (!data._lastname) {
    throw new Error('Please enter your last name');
  }
  if (!data._workspace) {
    throw new Error('Please enter your Workspace');
  }
  if (!data._companyemail) {
    throw new Error('Please enter your Company Email');
  }
  if (!data._password) {
    throw new Error('Please enter your Password');
  }
  if (!data._confirmpassword) {
    throw new Error('Please Comfirm your Password');
  }
  return data;
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
    organizationName: signupdata._workspace,
    workspaceId: signupdata._workspace,
    billingType: data[0].label,
    defaultUserEmailId: signupdata._companyemail,
    defaultUserPassword: signupdata._password,
    defaultUserFirstName: signupdata._firstname,
    defaultUserLastName: signupdata._lastname,
    features: ['call'],
  };
  return result;
};
