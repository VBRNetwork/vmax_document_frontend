import {
  call,
  put,
  takeLatest,
  select,
  delay,
  race,
  spawn,
} from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';

import {
  REFRESH_USER,
  SAVE_USER,
  LOGOUT_USER,
  REFRESHED_USER,
  FACEBOOK_LOGIN,
} from './constants';
import {
  refreshUserError,
  refreshedUser,
  saved,
  loggedOutUser,
  logoutUserFailed,
  logoutUser,
  saveError,
  facebookLoggedIn,
  facebookLoginFailed,
  save,
} from './actions';
import { makeSelectUser } from './selectors';

export function* timer(ms) {
  const { timeout } = yield race({
    timeout: delay(ms),
  });

  if (timeout) {
    yield put({ type: REFRESH_USER });
  }
}

export function* logoutSagaUser() {
  try {
    yield put(loggedOutUser());
    // yield put(push('/login'));
  } catch (error) {
    yield put(logoutUserFailed());
  }
}

export function* saveUser({ user }) {
  try {
    yield put(saved(user));
    yield spawn(timer, 250000);
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(saveError());
  }
}

export function* refreshUser() {
  const selector = yield call(makeSelectUser);
  const { token } = yield select(selector);
  const requestURL = `/auth/refresh/`;
  const headers = {
    Authorization: token ? `JWT ${token}` : '',
  };
  const body = {
    token,
  };

  const dateNow = new Date();
  const utc = dateNow.getTime() + dateNow.getTimezoneOffset() * 60000;
  const time = utc + 3600000 * 3;

  if (!token) return;

  try {
    const response = yield call(request, requestURL, headers, 'post', body);
    if (response.status !== 200) {
      yield put(logoutUser());
    } else {
      yield put(
        refreshedUser({ token: response.data.token, lastRefreshed: time }),
      );
    }
  } catch (error) {
    yield put(refreshUserError(String(error.message)));
    yield put(logoutUser());
  }
}

export function* refreshedUserSaga({ token, lastRefreshed }) {
  yield spawn(timer, 250000);
}

export function* facebookLogin({ data }) {
  const requestURL = `/auth/login/facebook`;
  const headers = {};

  try {
    const response = yield call(request, requestURL, headers, 'post', {
      access_token: data.accessToken,
      ...data,
    });
    if (response.status !== 200) {
      if (response.data) {
        yield put(facebookLoginFailed(response.data.non_field_errors[0]));
      } else {
        yield put(facebookLoginFailed(response.message));
      }
    } else {
      const dateNow = new Date();
      const utc = dateNow.getTime() + dateNow.getTimezoneOffset() * 60000;
      const time = utc + 3600000 * 3;
      yield put(facebookLoggedIn(response.data));
      yield put(save({ user: response.data, lastRefreshed: time }));
    }
  } catch (error) {
    yield put(facebookLoginFailed(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(REFRESH_USER, refreshUser);
  yield takeLatest(SAVE_USER, saveUser);
  yield takeLatest(LOGOUT_USER, logoutSagaUser);
  yield takeLatest(REFRESHED_USER, refreshedUserSaga);
  yield takeLatest(FACEBOOK_LOGIN, facebookLogin);
}
