import {all, fork} from 'redux-saga/effects';
import SignUp from 'components/auth/SignUp/sagas';
import Login from 'components/auth/Login/sagas';

export default function* root() {
  yield all([fork(SignUp, Login)]);
}
