import {
  GET_CALENDAR,
  GET_CALENDAR_SUCCESS,
  GET_CALENDAR_FAILURE,
  UPDATE_CALENDAR,
  UPDATE_CALENDAR_SUCCESS,
  UPDATE_CALENDAR_FAILURE,
} from './constants';

export function getCalendar() {
  return {
    type: GET_CALENDAR,
  };
}

export function getCalendarSuccess(results) {
  return {
    type: GET_CALENDAR_SUCCESS,
    results,
  };
}

export function getCalendarFailure(error) {
  return {
    type: GET_CALENDAR_FAILURE,
    error,
  };
}

export function updateCalendar(data) {
  return {
    type: UPDATE_CALENDAR,
    data,
  };
}

export function updateCalendarSuccess(result) {
  return {
    type: UPDATE_CALENDAR_SUCCESS,
    result,
  };
}

export function updateCalendarFailure(error) {
  return {
    type: UPDATE_CALENDAR_FAILURE,
    error,
  };
}
