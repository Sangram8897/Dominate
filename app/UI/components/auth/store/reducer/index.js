import {TAG} from '../actions';

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
    case TAG.IN:
      return {
        user: {...state.user, ...action.payload},
      };
    case TAG.CONTINUE:
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
