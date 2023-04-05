import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { toast } from 'react-toastify';
import {
  GET_RECRUITMENTS,
  SAVE_NEW_RECRUITMENT,
  UPDATE_RECRUITMENT,
} from './constants';

import {
  getRecruitmentsSuccess,
  getRecruitmentsError,
  saveNewRecruitmentSuccess,
  saveNewRecruitmentError,
  updateRecruitmentSuccess,
  updateRecruitmentError,
} from './actions';

export function* getRecruitmentsInfo() {
  const requestURL = `/hr/recruitments/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getRecruitmentsSuccess(response.data));
  } catch (error) {
    yield put(getRecruitmentsError(error.response));
  }
}

export function* submitRecruitmentsData({ recruitment }) {
  const requestURL = `/hr/recruitments/`;

  const body = recruitment;

  try {
    const response = yield call(request, requestURL, {}, 'post', body);

    yield put(saveNewRecruitmentSuccess(response.data));
    toast.success('Recruitment added successfully', {
      icon: '⏃',
    });
    window.location.reload();
  } catch (error) {
    yield put(saveNewRecruitmentError(error.message));
    toast.error(error.response.data.detail);
  }
}

export function* updateRecruitmentsData({ id, recruitment }) {
  const requestURL = `/hr/recruitments/update/${id}`;

  const body = recruitment;

  try {
    const response = yield call(request, requestURL, {}, 'put', body);

    yield put(updateRecruitmentSuccess(response.data));
    toast.success('Recruitment updated successfully', {
      icon: '⏃',
    });
    window.location.reload();
  } catch (error) {
    yield put(updateRecruitmentError(error.message));
    toast.error(error.response.data.detail);
  }
}

export default function* recruitmentSaga() {
  yield takeLatest(GET_RECRUITMENTS, getRecruitmentsInfo);
  yield takeLatest(SAVE_NEW_RECRUITMENT, submitRecruitmentsData);
  yield takeLatest(UPDATE_RECRUITMENT, updateRecruitmentsData);
}
