import {
  GET_HR_DATA,
  GET_HR_DATA_SUCCESS,
  GET_HR_DATA_FAILURE,
  SUBMIT_HR_REQUEST,
  SUBMIT_HR_SUCCESS,
  SUBMIT_HR_FAILURE,
  GET_HR_REQUESTS,
  GET_HR_REQUESTS_SUCCESS,
  GET_HR_REQUESTS_FAILURE,
} from './constants';

export function getHrData() {
  return {
    type: GET_HR_DATA,
  };
}

export function getHrDataSuccess(results) {
  return {
    type: GET_HR_DATA_SUCCESS,
    results,
  };
}

export function getHrDataFailure(error) {
  return {
    type: GET_HR_DATA_FAILURE,
    error,
  };
}

export function submitHr(data) {
  return {
    type: SUBMIT_HR_REQUEST,
    data,
  };
}

export function submitHrSuccess(results) {
  return {
    type: SUBMIT_HR_SUCCESS,
    results,
  };
}

export function submitHrFailure(error) {
  return {
    type: SUBMIT_HR_FAILURE,
    error,
  };
}

export function getHrRequests() {
  return {
    type: GET_HR_REQUESTS,
  };
}

export function getHrRequestsSuccess(results) {
  return {
    type: GET_HR_REQUESTS_SUCCESS,
    results,
  };
}

export function getHrRequestsFailure(error) {
  return {
    type: GET_HR_REQUESTS_FAILURE,
    error,
  };
}
