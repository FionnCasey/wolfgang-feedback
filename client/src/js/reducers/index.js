import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import apiReducer from './apiReducer';
import viewReducer from './viewReducer';

const rootReducer = combineReducers({
  apiState: apiReducer,
  viewState: viewReducer
});

const store = createStore(
  rootReducer,
  devToolsEnhancer(),
  applyMiddleware(thunkMiddleware)
);

export default store;