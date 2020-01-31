import * as SignUpActions from './SignupActions';
import * as LoginActions from './LoginActions';
const AuthActions = {
  ...SignUpActions,
  ...LoginActions,
};
export default AuthActions;
