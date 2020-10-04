import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Navigation from './Navigation';
import Notes from '../pages/Notes';

import { lightTheme, darkTheme } from '../constants/themes';
import { selectColorMode } from '../redux/reducer';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(16)
  }
}));

const AppShell = () => {
  // Hooks
  const classes = useStyles();
  const colorMode = useSelector((state) => selectColorMode(state));

  const theme = colorMode === 'light' ? lightTheme : darkTheme;

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex">
          <Navigation colorMode={colorMode} />
          <Container maxWidth="xl" className={classes.container}>
            <Switch>
              <Route path="/" component={Notes} />
            </Switch>
          </Container>
        </Box>
      </ThemeProvider>
    </DndProvider>
  );
};

export default AppShell;
