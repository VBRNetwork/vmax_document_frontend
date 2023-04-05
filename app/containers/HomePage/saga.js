/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { toast } from 'react-toastify';
import { makeSelectToken } from 'containers/App/selectors';
import {
  GET_PARTNERS,
  SUBMIT_DOCUMENT,
  GET_DOCUMENTS,
  GET_DOCUMENTS_ROMEXPO,
  GET_DOCUMENTS_CLUJ,
  GET_DOCUMENTS_TITAN,
  GET_COMPANY_LOCATIONS,
} from './constants';
import {
  getPartnersSuccess,
  getPartnersFail,
  submitDocumentSuccess,
  submitDocumentFail,
  getDocumentsSuccess,
  getDocumentsFail,
  getDocumentsRomexpoSuccess,
  getDocumentsRomexpoFail,
  getDocumentsClujSuccess,
  getDocumentsClujFail,
  getDocumentsTitanSuccess,
  getDocumentsTitanFail,
  getCompanyLocationsSuccess,
  getCompanyLocationsFail,
} from './actions';

export function* getDocumentsInfo() {
  const requestURL = `/documents/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getDocumentsSuccess(response.data));
  } catch (error) {
    yield put(getDocumentsFail(error.response));
  }
}

export function* getDocumentsRomexpoInfo() {
  const requestURL = `/documents/romexpo/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    if (response.ok) yield put(getDocumentsRomexpoSuccess(response.data));
    else throw new Error(response.data.detail);
  } catch (error) {
    yield put(getDocumentsRomexpoFail(error.response));
  }
}

export function* getDocumentsClujInfo() {
  const requestURL = `/documents/cluj/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    if (response.ok) yield put(getDocumentsClujSuccess(response.data));
    else throw new Error(response.data.detail);
  } catch (error) {
    yield put(getDocumentsClujFail(error.response));
  }
}

export function* getDocumentsTitanInfo() {
  const requestURL = `/documents/titan/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');

    if (response.ok) yield put(getDocumentsTitanSuccess(response.data));
    else throw new Error(response.data.detail);
  } catch (error) {
    yield put(getDocumentsTitanFail(error.response));
  }
}

export function* getLocationsInfo() {
  const requestURL = `/locations/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getCompanyLocationsSuccess(response.data));
  } catch (error) {
    yield put(getCompanyLocationsSuccess(error.response));
  }
}

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
    window.location.reload();
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

export default function* homePageSaga() {
  yield takeLatest(GET_DOCUMENTS, getDocumentsInfo);
  yield takeLatest(SUBMIT_DOCUMENT, submitFilesData);
  yield takeLatest(GET_PARTNERS, getPartnersInfo);
  yield takeLatest(GET_DOCUMENTS_ROMEXPO, getDocumentsRomexpoInfo);
  yield takeLatest(GET_DOCUMENTS_CLUJ, getDocumentsClujInfo);
  yield takeLatest(GET_DOCUMENTS_TITAN, getDocumentsTitanInfo);
  yield takeLatest(GET_COMPANY_LOCATIONS, getLocationsInfo);
}
