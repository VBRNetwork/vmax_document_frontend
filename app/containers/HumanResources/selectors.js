import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHumanResourcesDomain = state =>
  state.humanResources || initialState;

const makeSelectHumanResources = () =>
  createSelector(
    selectHumanResourcesDomain,
    substate => substate.hrData,
  );

const makeSelectSubmitHr = () =>
  createSelector(
    selectHumanResourcesDomain,
    substate => substate.hrSubmit,
  );

const makeSelectHrRequests = () =>
  createSelector(
    selectHumanResourcesDomain,
    substate => substate.hrRequests,
  );
export default makeSelectHumanResources;
export {
  selectHumanResourcesDomain,
  makeSelectHumanResources,
  makeSelectSubmitHr,
  makeSelectHrRequests,
};
