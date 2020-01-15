const NAME = 'SIGN';

export const TAG = {
  IN: `${NAME}/IN`,
  OUT: `${NAME}/OUT`,
};

export const LOGIN = payload => ({
  type: TAG.IN,
  payload,
});

export const LOGOUT = req => ({
  type: TAG.OUT,
  req,
});
