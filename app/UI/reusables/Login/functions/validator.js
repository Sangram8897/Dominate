export const loginFields_Validation = data => {
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
  return data;
};
