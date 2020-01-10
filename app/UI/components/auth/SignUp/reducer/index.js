import {TAG} from '../action/SignUp';

const getDefaultState = () => ({loading: false, data: null, error: null});

const SignUp = (state, action) => {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case TAG.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TAG.SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: null,
      };

    case TAG.ERROR:
      return {
        getError: action.error,
        loading: false,
        data: null,
      };
    case TAG.CLEAR:
      return getDefaultState();
    default:
      return state;
  }
};
export default SignUp;