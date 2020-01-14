const NAME = 'SIGNUP';

export const TAG = {
  LOADING: `${NAME}/LOADING`,
  SUCCESS: `${NAME}/SUCCESS`,
  ERROR: `${NAME}/ERROR`,
  CLEAR: `${NAME}/CLEAR`,
};
export const SignUp_LOADING = (data, onSuccess, onError) => ({
  type: TAG.LOADING,
  data,
  onSuccess,
  onError,
});

export const SignUp_COMPLETE = payload => ({
  type: 'SIGNUP_DATA',
  payload,
});
