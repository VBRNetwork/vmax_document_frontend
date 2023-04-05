import produce from 'immer';
import {
  SAVE_USER,
  SAVED_USER,
  SAVE_USER_ERROR,
  LOGOUT_USER,
  LOGGED_OUT_USER,
  LOGOUT_USER_FAILED,
  REFRESH_USER,
  REFRESHED_USER,
  REFRESH_USER_ERROR,
  COMPLETE_PROFILE,
  COMPLETE_WALLET,
  FACEBOOK_LOGIN,
  FACEBOOK_LOGGED_IN,
  FACEBOOK_LOGIN_FAILED,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  user: {},
  token: '',
  lastRefreshed: '',
  social: {
    loading: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case COMPLETE_PROFILE:
        draft.user.profile.completed = true;
        break;
      case REFRESH_USER:
        draft.loading = true;
        break;
      case REFRESHED_USER:
        draft.token = action.token;
        draft.loading = false;
        draft.lastRefreshed = action.lastRefreshed;
        break;
      case REFRESH_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SAVE_USER:
        draft.loading = true;
        draft.token = action.user.token;
        draft.user = action.user.user;
        draft.lastRefreshed = action.lastRefreshed;
        break;
      case SAVED_USER:
        draft.error = '';
        draft.loading = false;
        break;
      case SAVE_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOGOUT_USER:
        draft.loading = true;
        break;
      case LOGGED_OUT_USER:
        draft.user = {};
        draft.loading = false;
        draft.token = '';
        break;
      case LOGOUT_USER_FAILED:
        draft.error = action.error;
        draft.loading = false;
        break;
      case COMPLETE_WALLET:
        draft.user.vee_wallet = true;
        break;
      case FACEBOOK_LOGIN:
        draft.social.loading = true;
        break;
      case FACEBOOK_LOGGED_IN:
        draft.social.loading = false;
        break;
      case FACEBOOK_LOGIN_FAILED:
        draft.social.loading = false;
    }
  });

export default userReducer;
