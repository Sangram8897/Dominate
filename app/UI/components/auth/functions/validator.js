import {SnackMessage, NONetworkAlert, errorHandler} from 'functions/message';
import validate from 'utils/validation';
import IsEmpty from '../../../../utils/IsEmpty';
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
  let errors = {};
  if (IsEmpty(data._workspace)) {
    errors._workspace = 'please enter your workspace';
  }

  let firstname_error = validate.stringValidation(data._firstname);
  if (firstname_error.isEmpty) {
    errors._firstname = 'enter firstname';
  } else {
    if (!firstname_error.valid) {
      errors._firstname = 'enter valid firstname';
    }
  }
  let lastname_error = validate.stringValidation(data._lastname);
  if (lastname_error.isEmpty) {
    errors._lastname = 'enter lastname';
  } else {
    if (!lastname_error.valid) {
      errors._lastname = 'enter valid lastname';
    }
  }
  let email_error = validate.emailValidation(data._companyemail);
  if (email_error.isEmpty) {
    errors._companyemail = 'please enter your email address';
  } else {
    if (!email_error.valid) {
      errors._companyemail = 'please enter valid email address';
    }
  }
  let password_error = validate.passwordValidation(data._password);
  if (password_error.isEmpty) {
    errors._password = 'please enter password';
  } else {
    if (!password_error.valid) {
      errors._password = 'please enter Strong Password';
    }
  }

  if (IsEmpty(data._confirmpassword)) {
    errors._confirmpassword = 'please confirm your password';
  } else {
    if (data._password != data._confirmpassword) {
      errors._confirmpassword = 'password does not match';
    }
  }
  if (!IsEmpty(errors)) {
    return errors;
  }
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
