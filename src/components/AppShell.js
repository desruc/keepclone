import React from 'react';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../constants/theme';

import Navigation from './Navigation';

const AppShell = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Navigation />
  </ThemeProvider>
);

export default AppShell;
