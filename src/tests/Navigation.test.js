import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithMuiTheme } from './testUtils';

import Navigation from '../components/Navigation';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/'
  })
}));

describe('<Navigation /> tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the toggle menu button', () => {
    const { getByLabelText } = renderWithMuiTheme(
      <Navigation colorMode="light" />
    );

    expect(getByLabelText(/open menu/i)).toBeInTheDocument();
  });

  test('renders the theme swtich', () => {
    const { getByLabelText } = renderWithMuiTheme(
      <Navigation colorMode="light" />
    );

    expect(getByLabelText(/theme switch/i)).toBeInTheDocument();
  });

  test('clicking the theme switch dispatchs an action', () => {
    const { getByLabelText } = renderWithMuiTheme(
      <Navigation colorMode="light" />
    );

    fireEvent.click(getByLabelText(/theme switch/i));
    expect(mockDispatch).toBeCalledTimes(1);
  });
});
