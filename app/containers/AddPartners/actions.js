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

export function getPartners() {
  return {
    type: GET_PARTNERS,
  };
}

export function getPartnersSuccess(results) {
  return {
    type: GET_PARTNERS_SUCCESS,
    results,
  };
}

export function getPartnersError(error) {
  return {
    type: GET_PARTNERS_ERROR,
    error,
  };
}

export function saveNewPartner(partner) {
  return {
    type: SAVE_NEW_PARTNER,
    partner,
  };
}

export function saveNewPartnerSuccess(result) {
  return {
    type: SAVE_NEW_PARTNER_SUCCESS,
    result,
  };
}

export function saveNewPartnerError(error) {
  return {
    type: SAVE_NEW_PARTNER_ERROR,
    error,
  };
}

export function updatePartner(id, partner) {
  return {
    type: UPDATE_PARTNER,
    id,
    partner,
  };
}

export function updatePartnerSuccess(result) {
  return {
    type: UPDATE_PARTNER_SUCCESS,
    result,
  };
}

export function updatePartnerError(error) {
  return {
    type: UPDATE_PARTNER_ERROR,
    error,
  };
}
