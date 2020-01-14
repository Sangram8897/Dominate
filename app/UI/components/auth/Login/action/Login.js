const NAME = 'AUTH';

export const TAG = {
  LOADING: `${NAME}/LO`,
};

export const LOGIN = (req_data, onSuccess, onError) => ({
  type: TAG.LOADING,
  req_data,
  onSuccess,
  onError,
});

export const LOGOUT = req => ({
  type: TAG.LOADING,
  req,
});

