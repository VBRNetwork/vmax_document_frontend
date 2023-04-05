import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddContractDomain = state => state.addContract || initialState;

const makeSelectAddContract = () =>
  createSelector(
    selectAddContractDomain,
    substate => substate.addContract,
  );

const makeSelectGetPartners = () =>
  createSelector(
    selectAddContractDomain,
    substate => substate.partners,
  );

const makeSelectSubmitDocument = () =>
  createSelector(
    selectAddContractDomain,
    substate => substate.submitDocument,
  );
export default makeSelectAddContract;
export {
  selectAddContractDomain,
  makeSelectAddContract,
  makeSelectGetPartners,
  makeSelectSubmitDocument,
};
