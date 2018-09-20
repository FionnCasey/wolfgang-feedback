import * as actionTypes from '../actions/actionTypes';
 const initialState = {
  activePostId: 0,
  sortMode: 'BY_MOST_RECENT'
};
 export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_ACTIVE_POST_ID:
      console.log('Post ID: ', action.id);
      return {
        ...state,
        activePostId: action.id
      };
    default:
    return state;
  }
};