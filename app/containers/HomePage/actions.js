import {
  GET_CONTRACTS,
  GET_CONTRACTS_SUCCESS,
  GET_CONTRACTS_FAIL,
  SUBMIT_SIGNATURE,
  SUBMIT_SIGNATURE_SUCCESS,
  SUBMIT_SIGNATURE_FAIL,
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

export function getContracts() {
  return {
    type: GET_CONTRACTS,
  };
}

export function getContractsSuccess(results) {
  return {
    type: GET_CONTRACTS_SUCCESS,
    results,
  };
}

export function getContractsFail(error) {
  return {
    type: GET_CONTRACTS_FAIL,
    error,
  };
}

export function submitSignature(signature, id) {
  return {
    type: SUBMIT_SIGNATURE,
    signature,
    id,
  };
}

export function submitSignatureSuccess(results) {
  return {
    type: SUBMIT_SIGNATURE_SUCCESS,
    results,
  };
}

export function submitSignatureFail(error) {
  return {
    type: SUBMIT_SIGNATURE_FAIL,
    error,
  };
}

export function getDocuments() {
  return {
    type: GET_DOCUMENTS,
  };
}

export function getDocumentsSuccess(results) {
  return {
    type: GET_DOCUMENTS_SUCCESS,
    results,
  };
}

export function getDocumentsFail(error) {
  return {
    type: GET_DOCUMENTS_FAIL,
    error,
  };
}

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

export function getDocumentsRomexpo() {
  return {
    type: GET_DOCUMENTS_ROMEXPO,
  };
}

export function getDocumentsRomexpoSuccess(results) {
  return {
    type: GET_DOCUMENTS_ROMEXPO_SUCCESS,
    results,
  };
}

export function getDocumentsRomexpoFail(error) {
  return {
    type: GET_DOCUMENTS_ROMEXPO_FAIL,
    error,
  };
}

export function getDocumentsCluj() {
  return {
    type: GET_DOCUMENTS_CLUJ,
  };
}

export function getDocumentsClujSuccess(results) {
  return {
    type: GET_DOCUMENTS_CLUJ_SUCCESS,
    results,
  };
}

export function getDocumentsClujFail(error) {
  return {
    type: GET_DOCUMENTS_CLUJ_FAIL,
    error,
  };
}

export function getDocumentsTitan() {
  return {
    type: GET_DOCUMENTS_TITAN,
  };
}

export function getDocumentsTitanSuccess(results) {
  return {
    type: GET_DOCUMENTS_TITAN_SUCCESS,
    results,
  };
}

export function getDocumentsTitanFail(error) {
  return {
    type: GET_DOCUMENTS_TITAN_FAIL,
    error,
  };
}

export function getCompanyLocations() {
  return {
    type: GET_COMPANY_LOCATIONS,
  };
}

export function getCompanyLocationsSuccess(results) {
  return {
    type: GET_COMPANY_LOCATIONS_SUCCESS,
    results,
  };
}

export function getCompanyLocationsFail(error) {
  return {
    type: GET_COMPANY_LOCATIONS_FAIL,
    error,
  };
}
