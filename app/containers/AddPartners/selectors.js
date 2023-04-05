import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddPartnersDomain = state => state.addPartners || initialState;

const makeSelectAddPartners = () =>
  createSelector(
    selectAddPartnersDomain,
    substate => substate.partners,
  );

const makeSelectSaveNewPartner = () =>
  createSelector(
    selectAddPartnersDomain,
    substate => substate.saveNewPartner,
  );
const makeSelectUpdatePartner = () =>
  createSelector(
    selectAddPartnersDomain,
    substate => substate.updatePartner,
  );
export default makeSelectAddPartners;
export {
  selectAddPartnersDomain,
  makeSelectAddPartners,
  makeSelectSaveNewPartner,
  makeSelectUpdatePartner,
};
