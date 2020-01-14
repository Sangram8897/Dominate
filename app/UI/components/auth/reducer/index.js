import {TAG} from '../Login/action/Login';

const getDefaultState = () => ({
  loading: false,
  user: null,
  token: null,
  error: null,
});

const AuthData = (state, action) => {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      };
    case 'SIGNUP_DATA':
      return {
        user: action.payload,
      };

    case 'LOGOUT':
      return getDefaultState();

    default:
      return state;
  }
};
export default AuthData;
