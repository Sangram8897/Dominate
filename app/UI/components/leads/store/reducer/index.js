import {LEADS} from '../actions/getAllLeads';

const getDefaultState = () => ({
  loading: false,
  leads: null,
  error: null,
});

const LeadsData = (state, action) => {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case LEADS.LOADING:
      return {
        loading: true,
      };
    case LEADS.SUCCESS:
      return {
        leads: action.payload,
        loading: false,
      };
    case LEADS.UPDATE:
      console.warn(state.leads);
      const items = state.leads.map(x =>
        x._id === action.payload._id ? action.payload : x,
      );
      return {
        leads: items,
        loading: false,
      };
    case LEADS.LOADMORE:
      return {
        leads: action.payload,
        loading: false,
      };

    case LEADS.FAIL:
      return getDefaultState();
    default:
      return state;
  }
};
export default LeadsData;
