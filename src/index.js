import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Initialize firebase
import './firebase/fb';

import store from './redux/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
