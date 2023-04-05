import {
  save,
  saved,
  saveError,
  refreshUser,
  refreshedUser,
  refreshUserError,
} from '../actions';
import {
  SAVE_USER,
  SAVED_USER,
  SAVE_USER_ERROR,
  REFRESH_USER,
  REFRESHED_USER,
  REFRESH_USER_ERROR,
} from '../constants';

describe('User actions', () => {
  describe('save Action', () => {
    it('has a type of SAVE_USER', () => {
      const expected = {
        type: SAVE_USER,
        user: {},
      };
      expect(save({})).toEqual(expected);
    });
  });

  describe('saved Action', () => {
    it('has a type of SAVED_USER', () => {
      const expected = {
        type: SAVED_USER,
        user: {},
      };
      expect(saved({})).toEqual(expected);
    });
  });

  describe('saveError Action', () => {
    it('has a type of SAVE_USER_ERROR', () => {
      const expected = {
        type: SAVE_USER_ERROR,
        error: '',
      };
      expect(saveError('')).toEqual(expected);
    });
  });

  describe('refreshUser Action', () => {
    it('has a type of REFRESH_USER', () => {
      const expected = {
        type: REFRESH_USER,
      };
      expect(refreshUser()).toEqual(expected);
    });
  });

  describe('refreshedUser Action', () => {
    it('has a type of REFRESHED_USER', () => {
      const expected = {
        type: REFRESHED_USER,
        token: '',
      };
      expect(refreshedUser({ token: '' })).toEqual(expected);
    });
  });

  describe('refreshUserError Action', () => {
    it('has a type of REFRESH_USER_ERROR', () => {
      const expected = {
        type: REFRESH_USER_ERROR,
        error: '',
      };
      expect(refreshUserError('')).toEqual(expected);
    });
  });
});
