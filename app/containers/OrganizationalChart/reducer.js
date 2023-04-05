/*
 *
 * OrganizationalChart reducer
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
} from './constants';

export const initialState = {
  teams: {
    loading: true,
    error: '',
    results: [],
  },
  departments: {
    loading: true,
    error: '',
    results: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const organizationalChartReducer = (state = initialState, action) =>
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
        draft.teams.results = action.results;
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
    }
  });

export default organizationalChartReducer;
