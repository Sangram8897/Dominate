import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
export const loginFields_Validation = (data, networkStatus) => {
  if (!networkStatus) {
    NONetworkAlert();
    return false;
  } else {
    try {
      if (!data._workspace && !data._email && !data._password) {
        throw new Error('Please enter All the fields');
      }
      if (!data._workspace) {
        throw new Error('Please enter your Workspace');
      }
      if (!data._email) {
        throw new Error('Please enter your Email');
      }
      if (!data._password) {
        throw new Error('Please enter your Password');
      }

      const result = {
        workspace: data._workspace,
        loginData: {email: data._email, password: data._password, errors: {}},
      };
      return result;
    } catch (err) {
      SnackMessage(err.message);
      return false;
    }
  }
};

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

export const isworkspace_exist = _workspace => {
  return fetch(
    `https://login.dominate.ai/public/workspace/exist?workspaceId=${_workspace}`,
  )
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.exist) {
        return true;
      }
      return false;
    })
    .catch(error => {
      throw new Error(error);
    });
};