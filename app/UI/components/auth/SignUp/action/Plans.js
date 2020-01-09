const NAME = 'PLANS';

export const TAG = {
  LOADING: `${NAME}/LOADING`,
  SUCCESS: `${NAME}/SUCCESS`,
  ERROR: `${NAME}/ERROR`,
  CLEAR: `${NAME}/CLEAR`,
};
export const Plans_LOADING = req => ({
  type: TAG.LOADING,
  req,
});

export const Plans_SUCCESS = result => ({
  type: TAG.SUCCESS,
  result,
});

export const Plans_ERROR = err => ({
  type: TAG.ERROR,
  err,
});

export const Plans_CLEAR = () => ({
  type: TAG.CLEAR,
});
