import produce from 'immer';
import {
  GET_PAYROLL_DATA,
  GET_PAYROLL_DATA_SUCCESS,
  GET_PAYROLL_DATA_FAILURE,
} from './constants';

export const initialState = {
  payroll: {
    loading: true,
    error: '',
    results: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const payrollManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PAYROLL_DATA:
        draft.payroll.loading = true;
        draft.payroll.error = '';
        draft.payroll.results = [];
        break;
      case GET_PAYROLL_DATA_SUCCESS:
        draft.payroll.loading = false;
        draft.payroll.error = '';
        draft.payroll.results = action.results;
        break;
      case GET_PAYROLL_DATA_FAILURE:
        draft.payroll.loading = false;
        draft.payroll.error = action.error;
        draft.payroll.results = [];
        break;
    }
  });

export default payrollManagementReducer;
