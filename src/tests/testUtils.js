import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../redux/store';

export function renderWithRedux(ui, { ...renderOptions } = {}) {
  // eslint-disable-next-line
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export default renderWithRedux;
