import {combineReducers} from 'redux';
import SignUp from '../../UI/components/auth/SignUp/reducer';
import Login from '../../UI/components/auth/Login/reducer';

const rootReducer = combineReducers({
  SignUp,
});
export default rootReducer;
