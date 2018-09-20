import * as actionTypes from '../actions/types';

const initialState = {
  activePost: {},
  sortMode: 'BY_MOST_RECENT'
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_ACTIVE_POST:
      return {
        ...state,
        activePost: action.activePost
      };
    default:
    return state;
  }
};