import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithMuiTheme } from './testUtils';

import ToastNotification from '../components/ToastNotification';

describe('<ToastNotification /> tests', () => {
  test('renders message', () => {
    const { getByText } = renderWithMuiTheme(
      <ToastNotification
        open
        handleClose={jest.fn()}
        message="toast notification test"
      />
    );

    expect(getByText(/toast notification test/i)).toBeInTheDocument();
  });

  test('not in document when open is false', () => {
    renderWithMuiTheme(
      <ToastNotification
        open={false}
        handleClose={jest.fn()}
        message="Toast notification test"
      />
    );

    const toast = screen.queryByText('toast notification test');
    expect(toast).not.toBeInTheDocument();
  });
});
