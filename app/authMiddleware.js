import { REFRESH_USER, REFRESHED_USER } from './containers/App/user/constants';

const loggerMiddleware = ({ dispatch, getState }) => next => action => {
  if (
    getState().user &&
    getState().user.token &&
    !getState().user.loading &&
    !getState().user.error
  ) {
    if (action.type === REFRESH_USER || action.type === REFRESHED_USER) {
      return typeof action === 'function'
        ? action({ dispatch, getState })
        : next(action);
    }
  }
  if (typeof action === 'function') return action({ dispatch, getState });
  return next(action);
};
export default loggerMiddleware;
