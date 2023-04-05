import produce from 'immer';
import {
  GET_CONTRACTS,
  GET_CONTRACTS_SUCCESS,
  GET_CONTRACTS_FAIL,
  GET_DOCUMENTS,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAIL,
  GET_PARTNERS,
  GET_PARTNERS_SUCCESS,
  GET_PARTNERS_FAIL,
  SUBMIT_DOCUMENT,
  SUBMIT_DOCUMENT_SUCCESS,
  SUBMIT_DOCUMENT_FAIL,
  GET_DOCUMENTS_ROMEXPO,
  GET_DOCUMENTS_ROMEXPO_SUCCESS,
  GET_DOCUMENTS_ROMEXPO_FAIL,
  GET_DOCUMENTS_CLUJ,
  GET_DOCUMENTS_CLUJ_SUCCESS,
  GET_DOCUMENTS_CLUJ_FAIL,
  GET_DOCUMENTS_TITAN,
  GET_DOCUMENTS_TITAN_SUCCESS,
  GET_DOCUMENTS_TITAN_FAIL,
  GET_COMPANY_LOCATIONS,
  GET_COMPANY_LOCATIONS_SUCCESS,
  GET_COMPANY_LOCATIONS_FAIL,
} from './constants';

export const initialState = {
  contracts: {
    loading: true,
    error: '',
    results: [],
  },
  documents: {
    loading: true,
    error: '',
    results: [],
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
  documentsRomexpo: {
    loading: true,
    error: '',
    results: [],
  },
  documentsCluj: {
    loading: true,
    error: '',
    results: [],
  },
  documentsTitan: {
    loading: true,
    error: '',
    results: [],
  },
  locations: {
    loading: true,
    error: '',
    results: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CONTRACTS:
        draft.contracts.loading = true;
        draft.contracts.error = '';
        draft.contracts.results = [];
        break;
      case GET_CONTRACTS_SUCCESS:
        draft.contracts.loading = false;
        draft.contracts.error = '';
        draft.contracts.results = action.results;
        break;
      case GET_CONTRACTS_FAIL:
        draft.contracts.loading = false;
        draft.contracts.error = action.error;
        draft.contracts.results = [];
        break;
      case GET_DOCUMENTS:
        draft.documents.loading = true;
        draft.documents.error = '';
        draft.documents.results = [];
        break;
      case GET_DOCUMENTS_SUCCESS:
        draft.documents.loading = false;
        draft.documents.error = '';
        draft.documents.results = action.results;
        break;
      case GET_DOCUMENTS_FAIL:
        draft.documents.loading = false;
        draft.documents.error = action.error;
        draft.documents.results = [];
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
      case GET_DOCUMENTS_ROMEXPO:
        draft.documentsRomexpo.loading = true;
        draft.documentsRomexpo.error = '';
        draft.documentsRomexpo.results = [];
        break;
      case GET_DOCUMENTS_ROMEXPO_SUCCESS:
        draft.documentsRomexpo.loading = false;
        draft.documentsRomexpo.error = '';
        draft.documentsRomexpo.results = action.results;
        break;
      case GET_DOCUMENTS_ROMEXPO_FAIL:
        draft.documentsRomexpo.loading = false;
        draft.documentsRomexpo.error = action.error;
        draft.documentsRomexpo.results = [];
        break;
      case GET_DOCUMENTS_CLUJ:
        draft.documentsCluj.loading = true;
        draft.documentsCluj.error = '';
        draft.documentsCluj.results = [];
        break;
      case GET_DOCUMENTS_CLUJ_SUCCESS:
        draft.documentsCluj.loading = false;
        draft.documentsCluj.error = '';
        draft.documentsCluj.results = action.results;
        break;
      case GET_DOCUMENTS_CLUJ_FAIL:
        draft.documentsCluj.loading = false;
        draft.documentsCluj.error = action.error;
        draft.documentsCluj.results = [];
        break;
      case GET_DOCUMENTS_TITAN:
        draft.documentsTitan.loading = true;
        draft.documentsTitan.error = '';
        draft.documentsTitan.results = [];
        break;
      case GET_DOCUMENTS_TITAN_SUCCESS:
        draft.documentsTitan.loading = false;
        draft.documentsTitan.error = '';
        draft.documentsTitan.results = action.results;
        break;
      case GET_DOCUMENTS_TITAN_FAIL:
        draft.documentsTitan.loading = false;
        draft.documentsTitan.error = action.error;
        draft.documentsTitan.results = [];
        break;
      case GET_COMPANY_LOCATIONS:
        draft.locations.loading = true;
        draft.locations.error = '';
        draft.locations.results = [];
        break;
      case GET_COMPANY_LOCATIONS_SUCCESS:
        draft.locations.loading = false;
        draft.locations.error = '';
        draft.locations.results = action.results;
        break;
      case GET_COMPANY_LOCATIONS_FAIL:
        draft.locations.loading = false;
        draft.locations.error = action.error;
        draft.locations.results = [];
        break;
    }
  });

export default homePageReducer;
