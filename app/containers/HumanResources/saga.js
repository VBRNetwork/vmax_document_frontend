import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { toast } from 'react-toastify';
import { GET_HR_DATA, SUBMIT_HR_REQUEST } from './constants';
import {
  getHrDataSuccess,
  getHrDataFailure,
  submitHrSuccess,
  submitHrFailure,
} from './actions';

export function* getPayrollInfo() {
  const requestURL = '/hr/hr-files/';

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getHrDataSuccess(response.data));
  } catch (error) {
    yield put(getHrDataFailure(error.response));
  }
}

export function* getHrRequests() {
  const requestURL = '/hr-files-requests/';

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getHrDataSuccess(response.data));
  } catch (error) {
    yield put(getHrDataFailure(error.response));
  }
}

function* submitHrRequestData({ data }) {
  const requestURL = `/hr/hr-files-requests/`;
  const headers = {};

  const body = data;

  try {
    const response = yield call(request, requestURL, headers, 'post', body);

    if (response.status !== 200)
      yield put(submitHrFailure(response.data.detail));

    yield put(submitHrSuccess(response.data));
    toast.success('File uploaded successfully', {
      icon: '⏃',
    });
  } catch (error) {
    console.log(error);
    if (error.response) yield put(submitHrFailure(error.response.details));
    else yield put(submitHrFailure('Unexpected error.'));
  }
}

export default function* humanResourcesSaga() {
  yield takeLatest(GET_HR_DATA, getPayrollInfo);
  yield takeLatest(SUBMIT_HR_REQUEST, submitHrRequestData);
}
