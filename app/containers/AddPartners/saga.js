import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { toast } from 'react-toastify';
import { GET_PARTNERS, SAVE_NEW_PARTNER, UPDATE_PARTNER } from './constants';

import {
  getPartnersSuccess,
  getPartnersError,
  saveNewPartnerSuccess,
  saveNewPartnerError,
  updatePartnerSuccess,
  updatePartnerError,
} from './actions';

export function* getPartnersInfo() {
  const requestURL = `/partners/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getPartnersSuccess(response.data));
  } catch (error) {
    yield put(getPartnersError(error.response));
  }
}

export function* submitPartnersData({ partner }) {
  const requestURL = `/partners/`;

  const body = partner;

  try {
    const response = yield call(request, requestURL, {}, 'post', body);

    yield put(saveNewPartnerSuccess(response.data));
    toast.success('Partner added successfully', {
      icon: '⏃',
    });
    window.location.reload();
  } catch (error) {
    yield put(saveNewPartnerError(error.message));
    toast.error(error.response.data.detail);
  }
}

export function* updatePartnerData({ id, partner }) {
  const requestURL = `/partners/update/${id}`;

  const body = partner;

  try {
    const response = yield call(request, requestURL, {}, 'put', body);

    yield put(updatePartnerSuccess(response.data));
    toast.success('Partner updated successfully', {
      icon: '⏃',
    });
    window.location.reload();
  } catch (error) {
    yield put(updatePartnerError(error.message));
    toast.error(error.response.data.detail);
  }
}

export default function* addPartnersSaga() {
  yield takeLatest(GET_PARTNERS, getPartnersInfo);
  yield takeLatest(SAVE_NEW_PARTNER, submitPartnersData);
  yield takeLatest(UPDATE_PARTNER, updatePartnerData);
}
