const NAME = 'SIGNUP';

export const TAG = {
  LOADING: `${NAME}/LOADING`,
  SUCCESS: `${NAME}/SUCCESS`,
  ERROR: `${NAME}/ERROR`,
  CLEAR: `${NAME}/CLEAR`,
};
export const SignUp_LOADING = (onSuccess, onError) => ({
  type: TAG.LOADING,
  onSuccess,
  onError,
});

export const SignUp_SUCCESS = result => ({
  type: TAG.SUCCESS,
  result,
});

export const SignUp_ERROR = err => ({
  type: TAG.ERROR,
  err,
});

export const SignUp_CLEAR = () => ({
  type: TAG.CLEAR,
});
