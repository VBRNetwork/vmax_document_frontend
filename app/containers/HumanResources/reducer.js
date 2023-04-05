import produce from 'immer';
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

export const initialState = {
  hrData: {
    loading: true,
    error: '',
    results: [],
  },
  hrSubmit: {
    loading: false,
    error: '',
    results: [],
  },
  hrRequests: {
    loading: true,
    error: '',
    results: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const humanResourcesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_HR_DATA:
        draft.hrData.loading = true;
        draft.hrData.error = '';
        draft.hrData.results = [];
        break;
      case GET_HR_DATA_SUCCESS:
        draft.hrData.loading = false;
        draft.hrData.error = '';
        draft.hrData.results = action.results;
        break;
      case GET_HR_DATA_FAILURE:
        draft.hrData.loading = false;
        draft.hrData.error = action.error;
        draft.hrData.results = [];
        break;
      case SUBMIT_HR_REQUEST:
        draft.hrSubmit.loading = true;
        draft.hrSubmit.error = '';
        draft.hrSubmit.results = [];
        break;
      case SUBMIT_HR_SUCCESS:
        draft.hrSubmit.loading = false;
        draft.hrSubmit.error = '';
        draft.hrSubmit.results = action.results;
        break;
      case SUBMIT_HR_FAILURE:
        draft.hrSubmit.loading = false;
        draft.hrSubmit.error = action.error;
        draft.hrSubmit.results = [];
        break;
      case GET_HR_REQUESTS:
        draft.hrRequests.loading = true;
        draft.hrRequests.error = '';
        draft.hrRequests.results = [];
        break;
      case GET_HR_REQUESTS_SUCCESS:
        draft.hrRequests.loading = false;
        draft.hrRequests.error = '';
        draft.hrRequests.results = action.results;
        break;
      case GET_HR_REQUESTS_FAILURE:
        draft.hrRequests.loading = false;
        draft.hrRequests.error = action.error;
        draft.hrRequests.results = [];
        break;
    }
  });

export default humanResourcesReducer;
