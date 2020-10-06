import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithMuiTheme } from './testUtils';

import DrawerItem from '../components/DrawerItem';

import { lightTheme } from '../constants/themes';

// Mock history.push function
const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush
  })
}));

describe('<DrawerItem /> tests', () => {
  test('renders label when drawer open', () => {
    const { getByText } = renderWithMuiTheme(
      <DrawerItem label="test" drawerOpen />
    );

    expect(getByText(/test/i)).toBeInTheDocument();
  });

  test('label is hidden when drawer closed', () => {
    const { getByText } = renderWithMuiTheme(
      <DrawerItem label="test" drawerOpen={false} />
    );

    expect(getByText(/test/i).parentElement).toHaveStyle({ display: 'none' });
  });

  test('when button variant - onClick function fires once after click', () => {
    const onClick = jest.fn();

    const { getByRole } = renderWithMuiTheme(
      <DrawerItem label="test" drawerOpen onClick={onClick} variant="button" />
    );

    fireEvent.click(getByRole('button'));

    expect(onClick).toBeCalledTimes(1);
  });

  test('when link variant - history.push function fires once after click', () => {
    const { getByRole } = renderWithMuiTheme(
      <DrawerItem label="test" drawerOpen variant="link" />
    );

    fireEvent.click(getByRole('button'));

    expect(mockPush).toBeCalledTimes(1);
  });

  test('background color is theme warning when active', () => {
    const { getByRole } = renderWithMuiTheme(
      <DrawerItem label="test" drawerOpen active />,
      { theme: 'light' }
    );

    expect(getByRole('button')).toHaveStyle({
      backgroundColor: lightTheme.palette.warning.light
    });
  });

  test('border radius is 50% when drawer closed', () => {
    const { getByRole } = renderWithMuiTheme(
      <DrawerItem label="test" drawerOpen={false} />,
      { theme: 'light' }
    );

    expect(getByRole('button')).toHaveStyle({ borderRadius: '50%' });
  });
});
