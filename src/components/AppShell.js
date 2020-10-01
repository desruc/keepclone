import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { lightTheme, darkTheme } from '../constants/themes';

import Navigation from './Navigation';

import { selectColorMode } from '../redux/reducer';

const AppShell = () => {
  const colorMode = useSelector((state) => selectColorMode(state));

  const theme = colorMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation colorMode={colorMode} />
    </ThemeProvider>
  );
};

export default AppShell;
