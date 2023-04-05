import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from './constants';

/**
 * Login user
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */

export function login({ email, password }) {
  return {
    type: LOGIN,
    email,
    password,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginFail(error) {
  return {
    type: LOGIN_FAIL,
    error,
  };
}
