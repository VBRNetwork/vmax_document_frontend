import produce from 'immer';
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

export const initialState = {
  recruitments: {
    loading: true,
    error: '',
    results: [],
  },
  saveNewRecruitment: {
    loading: false,
    error: '',
    result: {},
  },
  updateRecruitment: {
    loading: false,
    error: '',
    result: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const recruitmentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_RECRUITMENTS:
        draft.recruitments.loading = true;
        draft.recruitments.error = '';
        draft.recruitments.results = [];
        break;
      case GET_RECRUITMENTS_SUCCESS:
        draft.recruitments.loading = false;
        draft.recruitments.results = action.results;
        break;
      case GET_RECRUITMENTS_ERROR:
        draft.recruitments.loading = false;
        draft.recruitments.error = action.error;
        break;
      case SAVE_NEW_RECRUITMENT:
        draft.saveNewRecruitment.loading = true;
        draft.saveNewRecruitment.error = '';
        draft.saveNewRecruitment.result = {};
        break;
      case SAVE_NEW_RECRUITMENT_SUCCESS:
        draft.saveNewRecruitment.loading = false;
        draft.saveNewRecruitment.result = action.result;
        break;
      case SAVE_NEW_RECRUITMENT_ERROR:
        draft.saveNewRecruitment.loading = false;
        draft.saveNewRecruitment.error = action.error;
        break;
      case UPDATE_RECRUITMENT:
        draft.updateRecruitment.loading = true;
        draft.updateRecruitment.error = '';
        draft.updateRecruitment.result = {};
        break;
      case UPDATE_RECRUITMENT_SUCCESS:
        draft.updateRecruitment.loading = false;
        draft.updateRecruitment.error = '';
        draft.updateRecruitment.result = action.result;
        break;
      case UPDATE_RECRUITMENT_ERROR:
        draft.updateRecruitment.loading = false;
        draft.updateRecruitment.error = action.error;
        break;
    }
  });

export default recruitmentReducer;
