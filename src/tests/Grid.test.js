import React from 'react';
import { render } from '@testing-library/react';

import Grid from '../components/Grid';

describe('<Grid /> tests', () => {
  test('renders children', () => {
    const { getByText } = render(
      <Grid>
        <div>
          <p>test</p>
        </div>
      </Grid>
    );

    expect(getByText(/test/i)).toBeInTheDocument();
  });
});
