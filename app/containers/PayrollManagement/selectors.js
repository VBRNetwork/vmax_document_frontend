import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPayrollManagementDomain = state =>
  state.payrollManagement || initialState;

const makeSelectPayrollManagement = () =>
  createSelector(
    selectPayrollManagementDomain,
    substate => substate.payroll,
  );

export default makeSelectPayrollManagement;
export { selectPayrollManagementDomain, makeSelectPayrollManagement };
