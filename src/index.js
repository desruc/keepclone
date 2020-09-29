import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Initialize firebase
import './firebase/fb';

import store from './redux/store';
import theme from './constants/theme';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
