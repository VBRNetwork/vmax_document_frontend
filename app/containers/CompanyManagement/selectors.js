import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companyManagement state domain
 */

const selectCompanyManagementDomain = state =>
  state.companyManagement || initialState;

const makeSelectCompanyManagement = () =>
  createSelector(
    selectCompanyManagementDomain,
    substate => substate,
  );
const makeSelectTeams = () =>
  createSelector(
    selectCompanyManagementDomain,
    substate => substate.teams,
  );

const makeSelectDepts = () =>
  createSelector(
    selectCompanyManagementDomain,
    substate => substate.departments,
  );

const makeSelectTeamMembers = () =>
  createSelector(
    selectCompanyManagementDomain,
    substate => substate.teamMembers,
  );

const makeSelectLastTeam = () =>
  createSelector(
    selectCompanyManagementDomain,
    substate => substate.lastTeam,
  );

export default makeSelectCompanyManagement;
export {
  selectCompanyManagementDomain,
  makeSelectCompanyManagement,
  makeSelectTeams,
  makeSelectDepts,
  makeSelectTeamMembers,
  makeSelectLastTeam,
};
