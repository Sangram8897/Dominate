import {combineReducers} from 'redux';
import AuthData from '../../UI/components/auth/store/reducer';
import LeadsData from '../../UI/components/leads/store/reducer'

const rootReducer = combineReducers({
  AuthData,
  LeadsData,
});
export default rootReducer;
