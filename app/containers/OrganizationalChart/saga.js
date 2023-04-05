/* eslint-disable no-unused-vars */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { toast } from 'react-toastify';
import { GET_TEAMS } from './constants';
import { getTeamsSuccess, getTeamsFail } from './actions';

export function* getTeamsInfo({ info }) {
  const requestURL = `/manage-company/teams/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getTeamsSuccess(response.data));
  } catch (error) {
    yield put(getTeamsFail(error.response));
  }
}
export default function* organizationalChartSaga() {
  yield takeLatest(GET_TEAMS, getTeamsInfo);
}
