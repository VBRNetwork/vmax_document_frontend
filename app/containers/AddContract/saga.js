/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { toast } from 'react-toastify';
import { makeSelectToken } from 'containers/App/selectors';
import { SUBMIT_CONTRACT, GET_PARTNERS, SUBMIT_DOCUMENT } from './constants';
import {
  submitContractSuccess,
  submitContractFail,
  getPartnersSuccess,
  getPartnersFail,
  submitDocumentSuccess,
  submitDocumentFail,
} from './actions';

function* submitFilesData({ file, info }) {
  const requestURL = `/documents/`;
  const headers = {};

  const body = new FormData();
  file.forEach(f => {
    body.append('file', f);
  });
  Object.entries(info).forEach(entry => {
    const [key, value] = entry;
    body.append(key, value);
  });

  try {
    const response = yield call(request, requestURL, headers, 'post', body);

    if (response.status !== 200)
      yield put(submitDocumentFail(response.data.detail));

    yield put(submitDocumentSuccess(response.data));
    toast.success('File uploaded successfully', {
      icon: '⏃',
    });
  } catch (error) {
    console.log(error);
    if (error.response) yield put(submitDocumentFail(error.response.details));
    else yield put(submitDocumentFail('Unexpected error.'));
  }
}

export function* getPartnersInfo({ info }) {
  const requestURL = `/partners/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getPartnersSuccess(response.data));
  } catch (error) {
    yield put(getPartnersFail(error.response));
  }
}

export default function* addContractSaga() {
  yield takeLatest(SUBMIT_DOCUMENT, submitFilesData);
  yield takeLatest(GET_PARTNERS, getPartnersInfo);
}
