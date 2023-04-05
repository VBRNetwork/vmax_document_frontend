import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { toast } from 'react-toastify';
import { GET_CALENDAR, UPDATE_CALENDAR } from './constants';
import {
  getCalendarSuccess,
  getCalendarFailure,
  updateCalendarSuccess,
  updateCalendarFailure,
} from './actions';

export function* getContractsCalendarInfo() {
  const requestURL = `/appointments/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getCalendarSuccess(response.data));
  } catch (error) {
    yield put(getCalendarFailure(error.response));
  }
}

function* updateCalendarInfo({ data }) {
  const requestURL = `/appointments/`;
  const headers = {};

  const body = data;
  try {
    const response = yield call(request, requestURL, headers, 'post', body);

    if (response.status !== 200)
      yield put(updateCalendarFailure(response.data.detail));

    yield put(updateCalendarSuccess(response.data));
    toast.success('Appointment submmited successfully', {
      icon: '⏃',
    });
  } catch (error) {
    console.log(error);
    if (error.response)
      yield put(updateCalendarFailure(error.response.details));
    else yield put(updateCalendarFailure('Unexpected error.'));
  }
}

export default function* appointmentsSaga() {
  yield takeLatest(GET_CALENDAR, getContractsCalendarInfo);
  yield takeLatest(UPDATE_CALENDAR, updateCalendarInfo);
}
