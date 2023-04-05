import produce from 'immer';
import {
  GET_PARTNERS,
  GET_PARTNERS_SUCCESS,
  GET_PARTNERS_ERROR,
  SAVE_NEW_PARTNER,
  SAVE_NEW_PARTNER_SUCCESS,
  SAVE_NEW_PARTNER_ERROR,
  UPDATE_PARTNER,
  UPDATE_PARTNER_SUCCESS,
  UPDATE_PARTNER_ERROR,
} from './constants';

export const initialState = {
  partners: {
    loading: true,
    error: '',
    results: [],
  },
  saveNewPartner: {
    loading: false,
    error: '',
    result: {},
  },
  updatePartner: {
    loading: false,
    error: '',
    result: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const addPartnersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PARTNERS:
        draft.partners.loading = true;
        draft.partners.error = '';
        draft.partners.results = [];
        break;
      case GET_PARTNERS_SUCCESS:
        draft.partners.loading = false;
        draft.partners.results = action.results;
        break;
      case GET_PARTNERS_ERROR:
        draft.partners.loading = false;
        draft.partners.error = action.error;
        break;
      case SAVE_NEW_PARTNER:
        draft.saveNewPartner.loading = true;
        draft.saveNewPartner.error = '';
        draft.saveNewPartner.result = {};
        break;
      case SAVE_NEW_PARTNER_SUCCESS:
        draft.saveNewPartner.loading = false;
        draft.saveNewPartner.result = action.result;
        break;
      case SAVE_NEW_PARTNER_ERROR:
        draft.saveNewPartner.loading = false;
        draft.saveNewPartner.error = action.error;
        break;
      case UPDATE_PARTNER:
        draft.updatePartner.loading = true;
        draft.updatePartner.error = '';
        draft.updatePartner.result = {};
        break;
      case UPDATE_PARTNER_SUCCESS:
        draft.updatePartner.loading = false;
        draft.updatePartner.result = action.result;
        break;
      case UPDATE_PARTNER_ERROR:
        draft.updatePartner.loading = false;
        draft.updatePartner.error = action.error;
        break;
    }
  });

export default addPartnersReducer;
