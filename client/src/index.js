import React from 'react';
import { render } from 'react-dom';
import App from './js';
import store from './js/reducers';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
