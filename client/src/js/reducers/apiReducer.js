import * as actionTypes from '../actions/actionTypes';
 const initialState = {
  user: null,
  posts: [],
  errorMsgs: []
};
 export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.USER_AUTH_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts
      };
    case actionTypes.API_ERROR:
      console.log('Error: ', action.errorMsgs);
      return {
        ...state,
        errorMsgs: state.errorMsgs.concat(action.errorMsgs)
      };
    case actionTypes.POP_API_MESSAGE:
      return {
        ...state,
        errorMsgs: state.errorMsgs.slice(0, state.errorMsgs.length - 2)
      };
    default:
    return state;
  }
};