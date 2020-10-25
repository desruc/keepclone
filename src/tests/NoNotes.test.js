import React from 'react';
import { renderWithMuiTheme } from './testUtils';

import NoNotes from '../components/NoNotes';

describe('<NoNotes /> tests', () => {
  test('renders with default message', () => {
    const { getByText } = renderWithMuiTheme(<NoNotes />);

    expect(getByText(/there's nothing here.../i)).toBeInTheDocument();
  });

  test('renders with custom message', () => {
    const { getByText } = renderWithMuiTheme(
      <NoNotes message="Custom message" />
    );

    expect(getByText(/custom message/i)).toBeInTheDocument();
  });
});
