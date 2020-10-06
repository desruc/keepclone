import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import { lightTheme, darkTheme } from '../constants/themes';

import store from '../redux/store';

export function renderWithRedux(ui, { ...renderOptions } = {}) {
  // eslint-disable-next-line
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export function renderWithMuiTheme(
  ui,
  { theme = 'light', ...renderOptions } = {}
) {
  const isLightMode = theme === 'light';
  // eslint-disable-next-line
  function Wrapper({ children }) {
    return (
      <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
