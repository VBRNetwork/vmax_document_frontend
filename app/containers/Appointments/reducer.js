import produce from 'immer';
import {
  GET_CALENDAR,
  GET_CALENDAR_SUCCESS,
  GET_CALENDAR_FAILURE,
  UPDATE_CALENDAR,
  UPDATE_CALENDAR_SUCCESS,
  UPDATE_CALENDAR_FAILURE,
} from './constants';

export const initialState = {
  calendar: {
    loading: true,
    error: '',
    results: [],
  },
  updateCalendar: {
    loading: false,
    error: '',
    results: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const appointmentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CALENDAR:
        draft.calendar.loading = true;
        draft.calendar.error = '';
        draft.calendar.results = [];
        break;
      case GET_CALENDAR_SUCCESS:
        draft.calendar.loading = false;
        draft.calendar.error = '';
        draft.calendar.results = action.results;
        break;
      case GET_CALENDAR_FAILURE:
        draft.calendar.loading = false;
        draft.calendar.error = action.error;
        draft.calendar.results = [];
        break;
      case UPDATE_CALENDAR:
        draft.updateCalendar.loading = true;
        draft.updateCalendar.error = '';
        draft.updateCalendar.results = [];
        break;
      case UPDATE_CALENDAR_SUCCESS:
        draft.updateCalendar.loading = false;
        draft.updateCalendar.error = '';
        draft.updateCalendar.results = action.result;
        break;
      case UPDATE_CALENDAR_FAILURE:
        draft.updateCalendar.loading = false;
        draft.updateCalendar.error = action.error;
        draft.updateCalendar.results = [];
        break;
    }
  });

export default appointmentsReducer;
