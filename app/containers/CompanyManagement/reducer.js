/*
 *
 * CompanyManagement reducer
 *
 */
import produce from 'immer';
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

export const initialState = {
  teams: {
    loading: true,
    error: '',
    teams: [],
  },
  departments: {
    loading: true,
    error: '',
    departments: [],
  },
  teamMembers: {
    loading: true,
    error: '',
    teamMembers: [],
  },
  lastTeam: {
    loading: true,
    error: '',
    results: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const companyManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TEAMS:
        draft.teams.loading = true;
        draft.teams.error = '';
        draft.teams.teams = [];
        break;
      case GET_TEAMS_SUCCESS:
        draft.teams.loading = false;
        draft.teams.error = '';
        draft.teams.teams = action.teams;
        break;
      case GET_TEAMS_FAIL:
        draft.teams.loading = false;
        draft.teams.error = action.error;
        draft.teams.teams = [];
        break;
      case GET_DEPTS:
        draft.departments.loading = true;
        draft.departments.error = '';
        draft.departments.departments = [];
        break;
      case GET_DEPTS_SUCCESS:
        draft.departments.loading = false;
        draft.departments.error = '';
        draft.departments.departments = action.departments;
        break;
      case GET_DEPTS_FAIL:
        draft.departments.loading = false;
        draft.departments.error = action.error;
        draft.departments.departments = [];
        break;
      case GET_LAST_TEAM:
        draft.lastTeam.loading = true;
        draft.lastTeam.error = '';
        draft.lastTeam.results = {};
        break;
      case GET_LAST_TEAM_SUCCESS:
        draft.lastTeam.loading = false;
        draft.lastTeam.error = '';
        draft.lastTeam.results = action.results;
        break;
      case GET_LAST_TEAM_FAIL:
        draft.lastTeam.loading = false;
        draft.lastTeam.error = action.error;
        draft.lastTeam.results = {};
        break;
      case GET_TEAM_MEMBERS:
        draft.teamMembers.loading = true;
        draft.teamMembers.error = '';
        draft.teamMembers.teamMembers = [];
        break;
      case GET_TEAM_MEMBERS_SUCCESS:
        draft.teamMembers.loading = false;
        draft.teamMembers.error = '';
        draft.teamMembers.results = action.results;
        break;
      case GET_TEAM_MEMBERS_FAIL:
        draft.teamMembers.loading = false;
        draft.teamMembers.error = action.error;
        draft.teamMembers.teamMembers = [];
        break;
    }
  });

export default companyManagementReducer;
