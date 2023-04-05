import produce from 'immer';
import {
  SUBMIT_CONTRACT,
  SUBMIT_CONTRACT_SUCCESS,
  SUBMIT_CONTRACT_FAIL,
  GET_PARTNERS,
  GET_PARTNERS_SUCCESS,
  GET_PARTNERS_FAIL,
  SUBMIT_DOCUMENT,
  SUBMIT_DOCUMENT_SUCCESS,
  SUBMIT_DOCUMENT_FAIL,
} from './constants';

export const initialState = {
  submitContract: {
    loading: true,
    error: null,
    file: [],
  },
  partners: {
    loading: true,
    error: null,
    results: [],
  },
  submitDocument: {
    loading: false,
    error: '',
    file: [],
    result: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const addContractReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SUBMIT_CONTRACT:
        draft.submitContract.loading = true;
        draft.submitContract.error = null;
        draft.submitContract.file = action.file;
        break;
      case SUBMIT_CONTRACT_SUCCESS:
        draft.submitContract.loading = false;
        draft.submitContract.error = null;
        draft.submitContract.result = action.result;
        break;
      case SUBMIT_CONTRACT_FAIL:
        draft.submitContract.loading = false;
        draft.submitContract.error = action.error;
        break;
      case GET_PARTNERS:
        draft.partners.loading = true;
        draft.partners.error = null;
        draft.partners.results = [];
        break;
      case GET_PARTNERS_SUCCESS:
        draft.partners.loading = false;
        draft.partners.error = null;
        draft.partners.results = action.results;
        break;
      case GET_PARTNERS_FAIL:
        draft.partners.loading = false;
        draft.partners.error = action.error;
        draft.partners.results = [];
        break;
      case SUBMIT_DOCUMENT:
        draft.submitDocument.loading = true;
        draft.submitDocument.error = null;
        draft.submitDocument.file = action.file;
        break;
      case SUBMIT_DOCUMENT_SUCCESS:
        draft.submitDocument.loading = false;
        draft.submitDocument.error = null;
        draft.submitDocument.result = action.result;
        break;
      case SUBMIT_DOCUMENT_FAIL:
        draft.submitDocument.loading = false;
        draft.submitDocument.error = action.error;
        break;
    }
  });

export default addContractReducer;
