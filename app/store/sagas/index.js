import {all, fork} from 'redux-saga/effects';
import AuthSaga from '../../UI/components/auth/sagas';

export default function* root() {
  yield all([fork(AuthSaga)]);
}
