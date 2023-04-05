import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => state.login || initialState;

const makeSelectError = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.error,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.loading,
  );

const makeSelectLogin = () =>
  createSelector(
    selectLoginDomain,
    substate => substate,
  );

export default makeSelectLogin;
export {
  selectLoginDomain,
  makeSelectError,
  makeSelectLoading,
  makeSelectLogin,
};
