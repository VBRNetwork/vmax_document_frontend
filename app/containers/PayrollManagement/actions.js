import {
  GET_PAYROLL_DATA,
  GET_PAYROLL_DATA_SUCCESS,
  GET_PAYROLL_DATA_FAILURE,
} from './constants';

export function getPayrollData() {
  return {
    type: GET_PAYROLL_DATA,
  };
}

export function getPayrollDataSuccess(results) {
  return {
    type: GET_PAYROLL_DATA_SUCCESS,
    results,
  };
}

export function getPayrollDataFailure(error) {
  return {
    type: GET_PAYROLL_DATA_FAILURE,
    error,
  };
}
