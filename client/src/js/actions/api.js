import { api } from '../utils';
import * as actionTypes from './types';

const MESSAGE_DURATION = 3000;

export const tryGetUserFromStorage = () => {
  return dispatch => {
    const user = localStorage.getItem('wolfganger');
    if (user) {
      dispatch({
        type: actionTypes.USER_AUTH_SUCCESS,
        user: JSON.parse(user)
      });
    }
  };
};

const setErrorMessage = (dispatch, errorMsgs) => {
  window.setTimeout(() => dispatch({
    type: actionTypes.POP_API_MESSAGE
  }), MESSAGE_DURATION);
  dispatch({
    type: actionTypes.API_ERROR,
    errorMsgs
  });
};

export const login = data => {
  return dispatch => {
    api.login(data)
      .then(res => {
        if (res.success) {
          // Save user to local storage.
          const user = res.data;
          localStorage.setItem('wolfganger', JSON.stringify(user));

          dispatch({
            type: actionTypes.USER_AUTH_SUCCESS,
            user
          });

        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch (err => {
        console.log(err);
      });
  };
};

export const signup = data => {
  return dispatch => {
    api.signup(data)
      .then(res => {
        if (res.success) {
          // Save user to local storage.
          const user = res.data;
          localStorage.setItem('wolfganger', JSON.stringify(user));

          dispatch({
            type: actionTypes.USER_AUTH_SUCCESS,
            user
          });

        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch (err => {
        console.log(err);
      })
  };
};

export const fetchPosts = token => {
  return dispatch => {
    api.fetchPosts(token)
      .then(res => {
        if (res.success) {
          // Dispatch posts success.
          dispatch({
            type: actionTypes.FETCH_POSTS_SUCCESS,
            posts: res.data
          });
        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};