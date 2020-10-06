import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithRedux } from './testUtils';

import AppShell from '../components/AppShell';

describe('<Appshell /> tests', () => {
  test('renders with page-wrap and content-container divs', () => {
    const { container } = renderWithRedux(
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    );

    expect(container.querySelector('#page-wrap')).toBeInTheDocument();
    expect(container.querySelector('#content-container')).toBeInTheDocument();
  });
});
