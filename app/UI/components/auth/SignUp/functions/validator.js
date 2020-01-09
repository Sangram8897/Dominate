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
