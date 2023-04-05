import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectUserDomain = state => state.user;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    userState => userState,
  );

const makeSelectToken = () =>
  createSelector(
    selectUserDomain,
    userState => userState.token,
  );

export {
  makeSelectLocation,
  makeSelectUser,
  makeSelectToken,
  selectUserDomain,
};
