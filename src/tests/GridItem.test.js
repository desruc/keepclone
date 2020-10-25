import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithMuiTheme } from './testUtils';

import GridItem from '../components/GridItem';

const currentItem = {
  text: 'grid item test'
};

describe('<GridItem /> tests', () => {
  test('renders text', () => {
    const { getByText } = renderWithMuiTheme(
      <GridItem currentItem={currentItem} />
    );

    expect(getByText(/grid item test/i)).toBeInTheDocument();
  });

  test('renders footer component', () => {
    const { getByText } = renderWithMuiTheme(
      <GridItem
        currentItem={currentItem}
        footerComponent={<div>footer component</div>}
      />
    );

    expect(getByText(/footer component/i)).toBeInTheDocument();
  });

  test('doesnt render footer component', () => {
    renderWithMuiTheme(<GridItem currentItem={currentItem} />);

    const footerComponent = screen.queryByText('footer component');
    expect(footerComponent).not.toBeInTheDocument();
  });
});
