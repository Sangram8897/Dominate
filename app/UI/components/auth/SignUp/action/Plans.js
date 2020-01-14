const NAME = 'PLANS';

export const TAG = {
  LOADING: `${NAME}/LOADING`,
  SUCCESS: `${NAME}/SUCCESS`,
  ERROR: `${NAME}/ERROR`,
  CLEAR: `${NAME}/CLEAR`,
};
export const Plans_LOADING = (onSuccess, onError) => ({
  type: TAG.LOADING,
  onSuccess,
  onError,
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
