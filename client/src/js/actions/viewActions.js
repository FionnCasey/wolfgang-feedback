import * as actionTypes from './actionTypes';

export const setActivePostId = id => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_ACTIVE_POST_ID,
      id
    });
  };
};