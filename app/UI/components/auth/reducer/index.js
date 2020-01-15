import {TAG} from '../action/index';

const getDefaultState = () => ({
  loading: false,
  userData: null,
  token: null,
  error: null,
});

const AuthData = (state, action) => {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case TAG.IN:
      return {
        user: action.payload,
      };
    case 'SIGNUP_DATA':
      return {
        user: action.payload,
      };

    case TAG.OUT:
      return getDefaultState();

    default:
      return state;
  }
};
export default AuthData;
