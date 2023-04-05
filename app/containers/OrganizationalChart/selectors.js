import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOrganizationalChartDomain = state =>
  state.organizationalChart || initialState;

const makeSelectOrganizationalChart = () =>
  createSelector(
    selectOrganizationalChartDomain,
    substate => substate,
  );

const makeSelectTeams = () =>
  createSelector(
    selectOrganizationalChartDomain,
    substate => substate.teams,
  );

const makeSelectDepartments = () =>
  createSelector(
    selectOrganizationalChartDomain,
    substate => substate.departments,
  );

export default makeSelectOrganizationalChart;
export {
  selectOrganizationalChartDomain,
  makeSelectOrganizationalChart,
  makeSelectTeams,
  makeSelectDepartments,
};
