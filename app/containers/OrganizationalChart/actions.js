import {
  GET_TEAMS,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAIL,
  GET_DEPTS,
  GET_DEPTS_SUCCESS,
  GET_DEPTS_FAIL,
} from './constants';

export function getTeams() {
  return {
    type: GET_TEAMS,
  };
}

export function getTeamsSuccess(results) {
  return {
    type: GET_TEAMS_SUCCESS,
    results,
  };
}

export function getTeamsFail(error) {
  return {
    type: GET_TEAMS_FAIL,
    error,
  };
}

export function getDepartments() {
  return {
    type: GET_DEPTS,
  };
}

export function getDepartmentsSuccess(departments) {
  return {
    type: GET_DEPTS_SUCCESS,
    departments,
  };
}

export function getDepartmentsFail(error) {
  return {
    type: GET_DEPTS_FAIL,
    error,
  };
}
