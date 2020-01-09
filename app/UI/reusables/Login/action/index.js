const NAME = 'LOGIN';

export const TAG = {
  LOADING: `${NAME}/LOADING`,
  SUCCESS: `${NAME}/SUCCESS`,
  ERROR: `${NAME}/ERROR`,
  CLEAR: `${NAME}/CLEAR`,
};

export const Login_LOADING = req => ({
  type: TAG.LOADING,
  req,
});

export const Login_SUCCESS = result => ({
  type: TAG.SUCCESS,
  result,
});

export const Login_ERROR = err => ({
  type: TAG.ERROR,
  err,
});

export const Login_CLEAR = () => ({
  type: TAG.CLEAR,
});
