import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { save } from 'containers/App/user/actions';
import { LOGIN } from './constants';
import { loginSuccess, loginFail } from './actions';

export function* loginUser({ email, password }) {
  const requestURL = `/auth/login/`;
  const headers = {};
  const body = {
    email,
    password,
  };

  try {
    const response = yield call(request, requestURL, headers, 'post', body);
    if (response.status !== 200) {
      if (response.data) {
        yield put(loginFail(response.data.non_field_errors[0]));
        toast.error(response.data.non_field_errors[0]);
      } else {
        yield put(loginFail(response.message));
        toast.error(response.data.detail);
      }
    } else {
      const dateNow = new Date();
      const utc = dateNow.getTime() + dateNow.getTimezoneOffset() * 60000;
      const time = utc + 3600000 * 3;
      yield put(save({ user: response.data, lastRefreshed: time }));
      yield put(loginSuccess(response.data));
      toast.success('Login Successful');
      yield put(push('/'));
    }
  } catch (error) {
    yield put(loginFail(error.message));
    toast.error(error.message);
  }
}

export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN, loginUser);
}
