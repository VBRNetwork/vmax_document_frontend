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

export function submitDocument(file, info) {
  return {
    type: SUBMIT_DOCUMENT,
    file,
    info,
  };
}

export function submitDocumentSuccess(result) {
  return {
    type: SUBMIT_DOCUMENT_SUCCESS,
    result,
  };
}

export function submitDocumentFail(error) {
  return {
    type: SUBMIT_DOCUMENT_FAIL,
    error,
  };
}

export function submitContract(file, info) {
  return {
    type: SUBMIT_CONTRACT,
    file,
    info,
  };
}

export function submitContractSuccess(result) {
  return {
    type: SUBMIT_CONTRACT_SUCCESS,
    result,
  };
}

export function submitContractFail(error) {
  return {
    type: SUBMIT_CONTRACT_FAIL,
    error,
  };
}

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

export function getPartnersFail(error) {
  return {
    type: GET_PARTNERS_FAIL,
    error,
  };
}
