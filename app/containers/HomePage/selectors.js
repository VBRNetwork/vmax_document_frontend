import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomePageDomain = state => state.homePage || initialState;

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.contracts,
  );
const makeSelectDocuments = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.documents,
  );
const makeSelectGetPartners = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.partners,
  );

const makeSelectSubmitDocument = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.submitDocument,
  );

const makeSelectDocumentsRomexpo = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.documentsRomexpo,
  );

const makeSelectDocumentsCluj = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.documentsCluj,
  );

const makeSelectDocumentsTitan = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.documentsTitan,
  );

const makeSelectCompanyLocations = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.locations,
  );

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectHomePage,
  makeSelectDocuments,
  makeSelectGetPartners,
  makeSelectSubmitDocument,
  makeSelectDocumentsRomexpo,
  makeSelectDocumentsCluj,
  makeSelectDocumentsTitan,
  makeSelectCompanyLocations,
};
