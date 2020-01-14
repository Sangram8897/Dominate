import {combineReducers} from 'redux';
import SignUp from '../../UI/components/auth/SignUp/reducer';
import AuthData from '../../UI/components/auth/reducer/index';

const rootReducer = combineReducers({
  SignUp,
  AuthData,
});
export default rootReducer;
