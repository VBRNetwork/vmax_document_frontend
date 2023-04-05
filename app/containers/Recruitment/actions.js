import {
  GET_RECRUITMENTS,
  GET_RECRUITMENTS_SUCCESS,
  GET_RECRUITMENTS_ERROR,
  SAVE_NEW_RECRUITMENT,
  SAVE_NEW_RECRUITMENT_SUCCESS,
  SAVE_NEW_RECRUITMENT_ERROR,
  UPDATE_RECRUITMENT,
  UPDATE_RECRUITMENT_SUCCESS,
  UPDATE_RECRUITMENT_ERROR,
} from './constants';

export function getRecruitments() {
  return {
    type: GET_RECRUITMENTS,
  };
}

export function getRecruitmentsSuccess(results) {
  return {
    type: GET_RECRUITMENTS_SUCCESS,
    results,
  };
}

export function getRecruitmentsError(error) {
  return {
    type: GET_RECRUITMENTS_ERROR,
    error,
  };
}

export function saveNewRecruitment(recruitment) {
  return {
    type: SAVE_NEW_RECRUITMENT,
    recruitment,
  };
}

export function saveNewRecruitmentSuccess(result) {
  return {
    type: SAVE_NEW_RECRUITMENT_SUCCESS,
    result,
  };
}

export function saveNewRecruitmentError(error) {
  return {
    type: SAVE_NEW_RECRUITMENT_ERROR,
    error,
  };
}

export function updateRecruitment(id, recruitment) {
  return {
    type: UPDATE_RECRUITMENT,
    id,
    recruitment,
  };
}

export function updateRecruitmentSuccess(result) {
  return {
    type: UPDATE_RECRUITMENT_SUCCESS,
    result,
  };
}

export function updateRecruitmentError(error) {
  return {
    type: UPDATE_RECRUITMENT_ERROR,
    error,
  };
}
