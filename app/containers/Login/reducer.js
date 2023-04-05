/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from './constants';

export const initialState = {
  loading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.loading = true;
        draft.error = '';
        break;
      case LOGIN_SUCCESS:
        draft.loading = false;
        break;
      case LOGIN_FAIL:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default loginReducer;
