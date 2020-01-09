import * as SignUp from 'components/auth/SignUp/action';
import * as Plans from 'components/auth/SignUp/action/Plans';
import * as Login from 'components/auth/Login/action';

export default {
  ...SignUp,
  ...Login,
  ...Plans,
};
