import {MEETINGS_COUNT, LEADS_COUNT} from '../store/actions';

const getDefaultState = () => ({
  loading: false,
  counts: null,
  error: null,
});

const AuthData = (state, action) => {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case LEADS_COUNT.LOADING:
      return {
        loading: true,
      };
    case LEADS_COUNT.SUCCESS:
      return {
        counts: action.payload,
        loading: false,
      };

    case LEADS_COUNT.FAIL:
      return getDefaultState();
    default:
      return state;
  }
};
export default AuthData;
