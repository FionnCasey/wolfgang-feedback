import React from 'react';
import { render } from 'react-dom';
import App from './app';
import store from './app/reducers';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
