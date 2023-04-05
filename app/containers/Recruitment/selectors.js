import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRecruitmentDomain = state => state.recruitment || initialState;

const makeSelectRecruitment = () =>
  createSelector(
    selectRecruitmentDomain,
    substate => substate.recruitments,
  );
const makeSelectSaveNewRecruitment = () =>
  createSelector(
    selectRecruitmentDomain,
    substate => substate.saveNewRecruitment,
  );
const makeSelectUpdateRecruitment = () =>
  createSelector(
    selectRecruitmentDomain,
    substate => substate.updateRecruitment,
  );

export default makeSelectRecruitment;
export {
  selectRecruitmentDomain,
  makeSelectRecruitment,
  makeSelectSaveNewRecruitment,
  makeSelectUpdateRecruitment,
};
