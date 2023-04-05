import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_PAYROLL_DATA } from './constants';
import { getPayrollDataSuccess, getPayrollDataFailure } from './actions';

export function* getPayrollInfo() {
  const requestURL = '/payments/payroll/';

  try {
    const response = yield call(request, requestURL, {}, 'get');
    yield put(getPayrollDataSuccess(response.data));
  } catch (error) {
    yield put(getPayrollDataFailure(error.response));
  }
}

export default function* payrollManagementSaga() {
  yield takeLatest(GET_PAYROLL_DATA, getPayrollInfo);
}
