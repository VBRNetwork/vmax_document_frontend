/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const SAVE_USER = Symbol('SAVE_USER');
export const SAVED_USER = Symbol('SAVED_USER');
export const SAVE_USER_ERROR = Symbol('SAVE_USER_ERROR');
export const LOGOUT_USER = Symbol('LOGOUT_USER');
export const LOGGED_OUT_USER = Symbol('LOGGED_OUT_USER');
export const LOGOUT_USER_FAILED = Symbol('LOGOUT_USER_FAILED');
export const REFRESH_USER = Symbol('REFRESH_USER');
export const REFRESHED_USER = Symbol('REFRESHED_USER');
export const REFRESH_USER_ERROR = Symbol('REFRESH_USER_ERROR');
export const COMPLETE_PROFILE = Symbol('COMPLETE_PROFILE');
export const COMPLETE_WALLET = Symbol('COMPLETE_WALLET');

export const FACEBOOK_LOGIN = Symbol('FACEBOOK_LOGIN');
export const FACEBOOK_LOGGED_IN = Symbol('FACEBOOK_LOGGED_IN');
export const FACEBOOK_LOGIN_FAILED = Symbol('FACEBOOK_LOGIN_FAILED');
