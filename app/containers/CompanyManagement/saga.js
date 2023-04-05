/* eslint-disable no-unused-vars */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { toast } from 'react-toastify';
import {
  GET_TEAMS,
  GET_DEPTS,
  GET_LAST_TEAM,
  GET_TEAM_MEMBERS,
} from './constants';
import {
  getTeamsSuccess,
  getTeamsFail,
  getDepartmentsSuccess,
  getDepartmentsFail,
  getLastTeamSuccess,
  getLastTeamFail,
  getTeamMembersSuccess,
  getTeamMembersFail,
} from './actions';

export function* getTeamsInfo() {
  const requestURL = `/manage-company/teams/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getTeamsSuccess(response.data));
  } catch (error) {
    yield put(getTeamsFail(error.response));
  }
}

export function* getDeptsInfo() {
  const requestURL = `/manage-company/departments/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getDepartmentsSuccess(response.data));
  } catch (error) {
    yield put(getDepartmentsFail(error.response));
  }
}

export function* getTeamMembersInfo() {
  const requestURL = `/manage-company/team-members/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getTeamMembersSuccess(response.data));
  } catch (error) {
    yield put(getTeamMembersFail(error.response));
  }
}

export function* getLastTeamInfo() {
  const requestURL = `/manage-company/last-team/`;

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getLastTeamSuccess(response.data));
  } catch (error) {
    yield put(getLastTeamFail(error.response));
  }
}
export default function* companyManagementSaga() {
  yield takeLatest(GET_TEAMS, getTeamsInfo);
  yield takeLatest(GET_DEPTS, getDeptsInfo);
  yield takeLatest(GET_LAST_TEAM, getLastTeamInfo);
  yield takeLatest(GET_TEAM_MEMBERS, getTeamMembersInfo);
}
