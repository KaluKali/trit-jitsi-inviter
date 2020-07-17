import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
// eslint-disable-next-line import/no-named-as-default
import App from './app';
import 'materialize-css/dist/css/materialize.min.css';


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
