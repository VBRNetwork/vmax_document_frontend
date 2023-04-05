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

export function completeProfile() {
  return {
    type: COMPLETE_PROFILE,
  };
}

export function completeWallet() {
  return {
    type: COMPLETE_WALLET,
  };
}

export function refreshUser() {
  return {
    type: REFRESH_USER,
  };
}

export function refreshedUser({ token, lastRefreshed }) {
  return {
    type: REFRESHED_USER,
    token,
    lastRefreshed,
  };
}

export function refreshUserError(error) {
  return {
    type: REFRESH_USER_ERROR,
    error,
  };
}

export function save({ user, lastRefreshed }) {
  return {
    type: SAVE_USER,
    user,
    lastRefreshed,
  };
}

export function saved() {
  return {
    type: SAVED_USER,
  };
}

export function saveError(error) {
  return {
    type: SAVE_USER_ERROR,
    error,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function loggedOutUser() {
  return {
    type: LOGGED_OUT_USER,
  };
}

export function logoutUserFailed(error) {
  return {
    type: LOGOUT_USER_FAILED,
    error,
  };
}

export function facebookLogin(data) {
  return {
    type: FACEBOOK_LOGIN,
    data,
  };
}

export function facebookLoggedIn(result) {
  return {
    type: FACEBOOK_LOGGED_IN,
    result,
  };
}

export function facebookLoginFailed(error) {
  return {
    type: FACEBOOK_LOGIN_FAILED,
    error,
  };
}
