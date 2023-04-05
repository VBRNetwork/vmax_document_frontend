import {
  GET_TEAMS,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAIL,
  GET_DEPTS,
  GET_DEPTS_SUCCESS,
  GET_DEPTS_FAIL,
  GET_LAST_TEAM,
  GET_LAST_TEAM_SUCCESS,
  GET_LAST_TEAM_FAIL,
  GET_TEAM_MEMBERS,
  GET_TEAM_MEMBERS_SUCCESS,
  GET_TEAM_MEMBERS_FAIL,
} from './constants';

export function getTeams() {
  return {
    type: GET_TEAMS,
  };
}

export function getTeamsSuccess(teams) {
  return {
    type: GET_TEAMS_SUCCESS,
    teams,
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

export function getLastTeam() {
  return {
    type: GET_LAST_TEAM,
  };
}

export function getLastTeamSuccess(results) {
  return {
    type: GET_LAST_TEAM_SUCCESS,
    results,
  };
}

export function getLastTeamFail(error) {
  return {
    type: GET_LAST_TEAM_FAIL,
    error,
  };
}

export function getTeamMembers() {
  return {
    type: GET_TEAM_MEMBERS,
  };
}

export function getTeamMembersSuccess(results) {
  return {
    type: GET_TEAM_MEMBERS_SUCCESS,
    results,
  };
}

export function getTeamMembersFail(error) {
  return {
    type: GET_TEAM_MEMBERS_FAIL,
    error,
  };
}
